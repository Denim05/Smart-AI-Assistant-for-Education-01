"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Check if industry exists first OUTSIDE the transaction
    let industryInsight = await db.industryInsight.findUnique({
      where: {
        industry: data.industry,
      },
    });

    // If it doesn't exist, generate the insights OUTSIDE the transaction
    if (!industryInsight) {
      const insights = await generateAIInsights(data.industry);

      industryInsight = await db.industryInsight.create({
        data: {
          industry: data.industry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // Now update the user in a simple fast query
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        industry: data.industry,
        experience: Number(data.experience),
        bio: data.bio,
        skills: typeof data.skills === "string" 
          ? data.skills.split(",").map(s => s.trim()).filter(Boolean) 
          : data.skills,
      },
    });

    revalidatePath("/");
    return updatedUser;
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
    },
  });

  if (!user) {
    // If not found, they might have just signed up and the DB isn't synced yet.
    // Call checkUser to force sync.
    const { checkUser } = await import("@/lib/checkUser");
    await checkUser();
    
    // Try again
    user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        industry: true,
      },
    });
  }

  if (!user) throw new Error("User not found in database even after sync");

  try {
    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}
