import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { generateWithFallback, extractJSON } from "@/lib/gemini";

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    let resumeText = "";
    let jobDescription = "";

    const contentType = req.headers.get("content-type") || "";
    
    if (contentType.includes("application/json")) {
      const body = await req.json();
      resumeText = body.resumeText;
      jobDescription = body.jobDescription;
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("resume");
      jobDescription = formData.get("jobDescription") || "";
      
      if (file && file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const { parsePDF } = await import("@/lib/pdf-parser-v2");
        resumeText = await parsePDF(buffer);
      }
    }

    if (!resumeText) {
      return NextResponse.json({ error: "Resume content is required (paste text or upload PDF)" }, { status: 400 });
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

    const text = await generateWithFallback(prompt);
    const data = extractJSON(text);
    return NextResponse.json({ success: true, analysis: data });
  } catch (error) {
    console.error("ATS analysis error:", error);
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}
