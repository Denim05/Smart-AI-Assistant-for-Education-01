import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { currentRole, targetRole, currentSkills, timeframe } = await req.json();

    const prompt = `
You are a senior career strategist and tech mentor. Create a detailed, actionable career roadmap.

Current Role: ${currentRole || "Student/Fresher"}
Target Role: ${targetRole}
Current Skills: ${currentSkills || "None specified"}
Timeframe: ${timeframe || "12 months"}

Return ONLY a JSON object in this exact format:
{
  "title": "Roadmap to ${targetRole}",
  "summary": "2-3 sentence overview of the journey",
  "phases": [
    {
      "phase": 1,
      "title": "Phase title",
      "duration": "e.g. Month 1-2",
      "focus": "Main focus area",
      "skills": ["skill1", "skill2"],
      "projects": ["project idea 1", "project idea 2"],
      "resources": ["resource 1", "resource 2"],
      "milestone": "What to achieve by end of this phase"
    }
  ],
  "topResources": [
    { "name": "Resource name", "type": "Course/Book/Platform", "url": "URL if known" }
  ],
  "salaryProgression": [
    { "stage": "Junior", "range": "₹4-8 LPA", "yearsExp": "0-2" },
    { "stage": "Mid", "range": "₹8-18 LPA", "yearsExp": "2-5" },
    { "stage": "Senior", "range": "₹18-40 LPA", "yearsExp": "5+" }
  ]
}

Create 4-6 phases covering the full journey. Be specific and actionable.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```(?:json)?\n?/g, "").trim();
    const roadmap = JSON.parse(text);

    return NextResponse.json({ success: true, roadmap });
  } catch (error) {
    console.error("Career roadmap error:", error);
    return NextResponse.json({ error: "Failed to generate roadmap" }, { status: 500 });
  }
}
