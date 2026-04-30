import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { currentRole, targetRole, currentSkills, timeframe } = await req.json();

    const prompt = `
You are a Staff-level Engineer, Senior Hiring Manager, and Elite Career Mentor.
Your task is to generate a highly specific, actionable, and realistic career roadmap. Do NOT provide generic advice like "learn the basics" or "build a project." Name specific modern frameworks, specific complex project ideas, and specific industry-standard resources.

Current Role: ${currentRole || "Student/Fresher"}
Target Role: ${targetRole}
Current Skills: ${currentSkills || "None specified"}
Timeframe: ${timeframe || "12 months"}

Guidelines:
1. Divide the timeframe into 4 to 5 logical, sequential phases.
2. In 'skills', list exact modern technologies (e.g., 'Next.js 14 App Router', not just 'React').
3. In 'projects', suggest portfolio-grade, production-ready projects (e.g., 'A multi-tenant SaaS dashboard with role-based RBAC', not 'A to-do app').
4. In 'resources', name actual, highly-rated courses, books, or documentation (e.g., 'Designing Data-Intensive Applications by Martin Kleppmann').
5. Provide realistic Indian market salary progression for this exact path.

Return ONLY a valid JSON object in this exact format. Do NOT wrap it in markdown block quotes (\`\`\`json).
{
  "title": "Roadmap to ${targetRole}",
  "summary": "A 2-3 sentence blunt, professional overview of what this transition takes.",
  "phases": [
    {
      "phase": 1,
      "title": "Specific phase title (e.g., Systems Foundations)",
      "duration": "e.g. Months 1-3",
      "focus": "Main focus area",
      "skills": ["Specific Skill 1", "Specific Skill 2", "Specific Skill 3"],
      "projects": ["Portfolio-grade project idea 1", "Portfolio-grade project idea 2"],
      "resources": ["Specific book/course 1", "Specific book/course 2"],
      "milestone": "What MUST be achieved to move to the next phase"
    }
  ],
  "topResources": [
    { "name": "Exact Name of Course/Book", "type": "Course/Book/Docs", "url": "" }
  ],
  "salaryProgression": [
    { "stage": "Junior (0-2 yrs)", "range": "₹X-Y LPA", "yearsExp": "0-2" },
    { "stage": "Mid-Level (2-5 yrs)", "range": "₹X-Y LPA", "yearsExp": "2-5" },
    { "stage": "Senior (5+ yrs)", "range": "₹X-Y LPA", "yearsExp": "5+" }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (!match) throw new Error("Failed to parse JSON from AI response");
    const roadmap = JSON.parse(match[0]);

    return NextResponse.json({ success: true, roadmap });
  } catch (error) {
    console.error("Career roadmap error:", error);
    return NextResponse.json({ error: "Failed to generate roadmap" }, { status: 500 });
  }
}
