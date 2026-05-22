// Polyfill DOMMatrix for serverless/Node.js environments where browser-native APIs are absent.
// This is strictly required by the modern pdfjs-dist dependency of pdf-parse to prevent
// a "DOMMatrix is not defined" evaluation error at runtime.
if (typeof global.DOMMatrix === "undefined") {
  global.DOMMatrix = class DOMMatrix {
    constructor(init) {
      this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
      this.is2D = true;
      this.isIdentity = true;
      if (typeof init === "string") {
        const match = init.match(/matrix\(([^)]+)\)/);
        if (match) {
          const values = match[1].split(",").map(Number);
          this.a = values[0] ?? 1;
          this.b = values[1] ?? 0;
          this.c = values[2] ?? 0;
          this.d = values[3] ?? 1;
          this.e = values[4] ?? 0;
          this.f = values[5] ?? 0;
        }
      } else if (Array.isArray(init)) {
        this.a = init[0] ?? 1;
        this.b = init[1] ?? 0;
        this.c = init[2] ?? 0;
        this.d = init[3] ?? 1;
        this.e = init[4] ?? 0;
        this.f = init[5] ?? 0;
      }
    }
    toString() {
      return `matrix(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.e}, ${this.f})`;
    }
  };
}

import "pdf-parse/worker";
import { PDFParse } from "pdf-parse";

/**
 * Extracts text from a PDF Buffer.
 * Uses the modern, secure pdf-parse v2 class structure compatible with Vercel.
 */
export async function parsePDF(buffer) {
  let parser = null;
  try {
    parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    return result.text;
  } catch (error) {
    console.error("PDF Parsing Error:", error.message);
    throw new Error("Failed to parse PDF file. Please ensure it is a valid PDF document.");
  } finally {
    if (parser) {
      try {
        await parser.destroy();
      } catch (destroyError) {
        console.error("Failed to destroy PDF parser:", destroyError.message);
      }
    }
  }
}
