import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { currentBio, targetRole, industry } = await req.json();

    const prompt = `
You are a LinkedIn profile optimization expert and career coach.
Analyze and optimize the following LinkedIn profile details.

Current Bio/About Section:
${currentBio || "No bio provided"}

Target Role: ${targetRole || "Not specified"}
Industry: ${industry || "Not specified"}

Return ONLY a JSON object in this exact format:
{
  "optimizedHeadlines": [
    "headline option 1 (max 220 chars)",
    "headline option 2 (max 220 chars)",
    "headline option 3 (max 220 chars)"
  ],
  "optimizedAbout": "A professional, engaging About section (250-300 words) with relevant keywords, value proposition, and a call-to-action",
  "keywordsToAdd": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "profileTips": [
    "Actionable tip 1",
    "Actionable tip 2",
    "Actionable tip 3"
  ]
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```(?:json)?\n?/g, "").trim();
    const optimized = JSON.parse(text);

    return NextResponse.json({ success: true, optimized });
  } catch (error) {
    console.error("LinkedIn optimizer error:", error);
    return NextResponse.json({ error: "Failed to optimize profile" }, { status: 500 });
  }
}
