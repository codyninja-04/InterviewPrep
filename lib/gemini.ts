import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

export const genAI = new GoogleGenerativeAI(apiKey);

export const flash = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const flashJSON = genAI.getGenerativeModel(
  { model: "gemini-2.0-flash" },
  { apiVersion: "v1beta" }
);

/** Call Gemini and extract the raw text response */
export async function askGemini(prompt: string): Promise<string> {
  const result = await flash.generateContent(prompt);
  return result.response.text();
}

/** Call Gemini with JSON mode — guarantees valid JSON output */
export async function askGeminiJSON<T>(prompt: string): Promise<T> {
  const result = await flashJSON.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json" },
  });
  return JSON.parse(result.response.text()) as T;
}
