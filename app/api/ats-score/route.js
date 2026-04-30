import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 });
    }

    const prompt = `
You are an enterprise-grade Applicant Tracking System (ATS) evaluator (similar to Workday, Taleo, or Greenhouse) and a strict senior technical recruiter.
Your job is to rigorously parse and score the following resume against the provided job description. Do NOT be overly generous. Most resumes should score between 40-70. Only exceptional, perfectly tailored resumes should score 80+.

Evaluate based on:
1. Keyword Match: Exact and semantic matches of hard skills, soft skills, and domain terms from the JD.
2. Formatting: Check for standard ATS-readable sections (Experience, Education, Skills) and avoid complex layouts.
3. Experience: Depth of experience, use of action verbs (e.g., "Led", "Architected", "Optimized" vs "Helps with", "Did"), and quantified impact metrics (%, $, time saved).
4. Skills: Presence of required technical/domain skills.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription || "No job description provided. Perform a general ATS readiness and impact analysis."}

Return ONLY a valid JSON object in this exact format. Do NOT wrap it in markdown block quotes (\`\`\`json).
{
  "overallScore": <number 0-100>,
  "sections": {
    "keywordsMatch": <number 0-100>,
    "formatting": <number 0-100>,
    "experience": <number 0-100>,
    "skills": <number 0-100>
  },
  "missingKeywords": ["keyword1", "keyword2", "keyword3", "keyword4"],
  "strengths": ["Specific strength 1 based on actual resume content", "Specific strength 2"],
  "improvements": ["Specific, actionable fix 1 (e.g., 'Quantify your 2021 Infosys role with exact metrics')", "Specific fix 2"],
  "summary": "A 2-sentence blunt, professional summary of the resume's competitiveness for this specific role."
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (!match) throw new Error("Failed to parse JSON from AI response");
    const analysis = JSON.parse(match[0]);

    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    console.error("ATS analysis error:", error);
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}
