import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 });
    }

    const prompt = `
You are an expert ATS (Applicant Tracking System) and career coach.
Analyze the following resume against the job description and provide a detailed score.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription || "No specific job description provided. Provide general ATS analysis."}

Return ONLY a JSON object in this exact format, no markdown or extra text:
{
  "overallScore": <number 0-100>,
  "sections": {
    "keywordsMatch": <number 0-100>,
    "formatting": <number 0-100>,
    "experience": <number 0-100>,
    "skills": <number 0-100>
  },
  "missingKeywords": ["keyword1", "keyword2"],
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"],
  "summary": "<2 sentence summary of findings>"
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```(?:json)?\n?/g, "").trim();
    const analysis = JSON.parse(text);

    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    console.error("ATS analysis error:", error);
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}
