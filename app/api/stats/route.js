import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {
  try {
    const userCount = await db.user.count();
    const resumeCount = await db.resume.count();
    const coverLetterCount = await db.coverLetter.count();

    return NextResponse.json({
      success: true,
      stats: {
        users: userCount,
        resumes: resumeCount,
        coverLetters: coverLetterCount,
      },
    });
  } catch (error) {
    // If DB isn't reachable, return zeros gracefully
    return NextResponse.json({
      success: false,
      stats: { users: 0, resumes: 0, coverLetters: 0 },
    });
  }
}
