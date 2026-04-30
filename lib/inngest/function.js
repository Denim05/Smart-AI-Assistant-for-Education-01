import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/** Safely extract and parse the first JSON object from a string */
function extractJSON(text) {
  // Strip markdown code fences if present
  const stripped = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "");
  const match = stripped.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON object found in AI response");
  return JSON.parse(match[0]);
}

export const generateIndustryInsights = inngest.createFunction(
  { id: "generate-industry-insights", name: "Generate Industry Insights" },
  { cron: "0 0 * * 0" }, // Run every Sunday at midnight
  async ({ event, step }) => {
    const industries = await step.run("Fetch industries", async () => {
      return await db.industryInsight.findMany({
        select: { industry: true },
      });
    });

    for (const { industry } of industries) {
      try {
        const prompt = `
          Analyze the ${industry} industry and return ONLY a valid JSON object.
          No markdown, no explanation, no code fences — raw JSON only.
          Limit salaryRanges to exactly 5 roles. Limit arrays to exactly 5 items each.
          
          Required format:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2", "trend3", "trend4", "trend5"],
            "recommendedSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"]
          }
        `;

        const res = await step.ai.wrap(
          "gemini",
          async (p) => {
            return await model.generateContent(p);
          },
          prompt
        );

        const text = res.response.candidates[0].content.parts[0].text || "";
        const insights = extractJSON(text);

        await step.run(`Update ${industry} insights`, async () => {
          await db.industryInsight.update({
            where: { industry },
            data: {
              ...insights,
              lastUpdated: new Date(),
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        });
      } catch (err) {
        // Log the failure but continue processing remaining industries
        console.error(`Failed to update insights for "${industry}":`, err.message);
      }
    }
  }
);
