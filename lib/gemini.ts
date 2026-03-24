import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

export const genAI = new GoogleGenerativeAI(apiKey);

export const flash = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/** Call Gemini and extract the raw text response */
export async function askGemini(prompt: string): Promise<string> {
  const result = await flash.generateContent(prompt);
  return result.response.text();
}

/** Call Gemini and parse the response as JSON */
export async function askGeminiJSON<T>(prompt: string): Promise<T> {
  const text = await askGemini(prompt);
  // Strip markdown fences if the model wraps in ```json ... ```
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  return JSON.parse(cleaned) as T;
}
