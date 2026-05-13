import { createRequire } from "module";

/**
 * Extracts text from a PDF Buffer.
 * Uses createRequire to safely load the CommonJS pdf-parse library in an ESM environment.
 */
export async function parsePDF(buffer) {
  try {
    const require = createRequire(import.meta.url);
    const pdf = require("pdf-parse");
    
    // Some versions of pdf-parse might export the function as default or directly
    const parser = typeof pdf === "function" ? pdf : pdf.default;
    
    if (typeof parser !== "function") {
      throw new Error("PDF parser library could not be initialized correctly.");
    }

    const data = await parser(buffer);
    return data.text;
  } catch (error) {
    console.error("PDF Parsing Error:", error.message);
    throw new Error("Failed to parse PDF file. Please ensure it is a valid PDF document.");
  }
}
