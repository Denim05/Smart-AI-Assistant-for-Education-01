import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey.includes("your-api-key")) {
  console.warn("⚠️ GEMINI_API_KEY is missing or invalid in .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

// Primary and fallback models
const PRIMARY_MODEL = "gemini-2.5-flash";
const FALLBACK_MODEL = "gemini-2.5-pro";

export const model = genAI.getGenerativeModel({ model: PRIMARY_MODEL });

/**
 * Enhanced generateContent with automatic retry and model fallback.
 */
export async function generateWithFallback(prompt, options = {}) {
  if (!apiKey) {
    throw new Error("Gemini API key is not configured. Please add GEMINI_API_KEY to your .env file.");
  }

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(`Primary model (${PRIMARY_MODEL}) failed:`, error.message);
    
    // Handle invalid API key specifically
    if (error.message.includes("API key not valid")) {
      throw new Error("The GEMINI_API_KEY provided in your .env file is invalid or expired. Please check your Google AI Studio dashboard.");
    }
    
    if (error.status === 503 || error.message.includes("503") || error.message.includes("overload")) {
      try {
        console.log(`Attempting fallback to ${FALLBACK_MODEL}...`);
        const fallbackModel = genAI.getGenerativeModel({ model: FALLBACK_MODEL });
        const result = await fallbackModel.generateContent(prompt);
        return result.response.text();
      } catch (fallbackError) {
        console.error(`Fallback model (${FALLBACK_MODEL}) also failed:`, fallbackError.message);
        throw fallbackError;
      }
    }
    throw error;
  }
}

/**
 * Safely extract and parse JSON from an AI response.
 */
export function extractJSON(text) {
  try {
    const stripped = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
    const startChar = stripped.includes('{') ? '{' : '[';
    const endChar = startChar === '{' ? '}' : ']';
    const startIndex = stripped.indexOf(startChar);
    const endIndex = stripped.lastIndexOf(endChar);
    
    if (startIndex === -1 || endIndex === -1) throw new Error("No JSON found");
    return JSON.parse(stripped.substring(startIndex, endIndex + 1));
  } catch (error) {
    throw new Error("AI returned an invalid response format. Please try again.");
  }
}
