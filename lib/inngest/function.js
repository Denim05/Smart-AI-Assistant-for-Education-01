import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { model, extractJSON } from "../gemini";

export const generateIndustryInsights = inngest.createFunction(
  { 
    id: "generate-industry-insights", 
    name: "Generate Industry Insights",
    triggers: [{ cron: "0 0 * * 0" }] 
  },
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

        const result = await step.run(`Generate ${industry} insights`, async () => {
          const res = await model.generateContent(prompt);
          const text = res.response.candidates[0].content.parts[0].text || "";
          return extractJSON(text);
        });

        await step.run(`Update ${industry} insights`, async () => {
          await db.industryInsight.update({
            where: { industry },
            data: {
              ...result,
              lastUpdated: new Date(),
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        });
      } catch (err) {
        console.error(`Failed to update insights for "${industry}":`, err.message);
      }
    }
  }
);
