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
You are an elite LinkedIn Profile SEO Expert and Executive Career Coach.
Your task is to optimize the provided LinkedIn profile data to rank #1 in LinkedIn Recruiter searches for the target role.

Current Bio/About Section:
${currentBio || "No bio provided. Generate a high-impact one from scratch."}

Target Role: ${targetRole || "Not specified"}
Industry: ${industry || "Not specified"}

Optimization Rules:
1. Headlines: Must strictly be under 220 characters. Include the target role, a unique value proposition, and key hard skills. Provide 3 distinct variations (e.g., one standard/professional, one achievement-focused, one creative).
2. About Section: Must be 150-250 words. Write in the first person. Structure with a hook, core competencies, major achievements, and a call-to-action (CTA). Naturally weave in industry keywords.
3. Keywords: Extract the top 5-7 highly searched keywords for this specific role/industry.
4. Tips: Provide 3 non-obvious, high-ROI tips for LinkedIn algorithm hacking (e.g., 'Turn on Creator Mode', 'Add X skill to the Skills section and get 3 endorsements', 'Comment on 3 industry posts daily').

Return ONLY a valid JSON object in this exact format. Do NOT wrap it in markdown block quotes (\`\`\`json).
{
  "optimizedHeadlines": [
    "Variation 1 (max 220 chars)",
    "Variation 2 (max 220 chars)",
    "Variation 3 (max 220 chars)"
  ],
  "optimizedAbout": "The fully rewritten, highly engaging About section.",
  "keywordsToAdd": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "profileTips": [
    "Specific algorithmic tip 1",
    "Specific algorithmic tip 2",
    "Specific algorithmic tip 3"
  ]
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (!match) throw new Error("Failed to parse JSON from AI response");
    const optimized = JSON.parse(match[0]);

    return NextResponse.json({ success: true, optimized });
  } catch (error) {
    console.error("LinkedIn optimizer error:", error);
    return NextResponse.json({ error: "Failed to optimize profile" }, { status: 500 });
  }
}
