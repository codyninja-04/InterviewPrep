import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

// ── Gemini keys ───────────────────────────────────────────
const geminiKeys = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

// ── Groq keys ─────────────────────────────────────────────
const groqKeys = [
  process.env.GROQ_API_KEY,
  process.env.GROQ_API_KEY_2,
  process.env.GROQ_API_KEY_3,
].filter(Boolean) as string[];

// ── OpenRouter keys ───────────────────────────────────────
const openRouterKeys = [
  process.env.OPENROUTER_API_KEY,
  process.env.OPENROUTER_API_KEY_2,
  process.env.OPENROUTER_API_KEY_3,
].filter(Boolean) as string[];

function isRateLimit(err: unknown): boolean {
  if (err && typeof err === "object" && "status" in err) {
    return (err as { status: number }).status === 429;
  }
  return String(err).includes("429") || String(err).includes("quota");
}

// ── Provider: Groq ────────────────────────────────────────
async function askGroqJSON<T>(prompt: string): Promise<T> {
  for (const key of groqKeys) {
    const groq = new Groq({ apiKey: key });
    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });
      return JSON.parse(completion.choices[0]?.message?.content ?? "{}") as T;
    } catch (err) {
      if (isRateLimit(err)) {
        console.warn(`[AI] Groq key ...${key.slice(-6)} rate limited — trying next`);
        continue;
      }
      throw err;
    }
  }
  throw new Error("All Groq keys exhausted.");
}

// ── Provider: OpenRouter ──────────────────────────────────
async function askOpenRouterJSON<T>(prompt: string): Promise<T> {
  for (const key of openRouterKeys) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://prepsync.vercel.app",
          "X-Title": "PrepSync",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-70b-instruct:free",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" },
        }),
      });

      if (res.status === 429) {
        console.warn(`[AI] OpenRouter key ...${key.slice(-6)} rate limited — trying next`);
        continue;
      }

      if (!res.ok) throw new Error(`OpenRouter error: ${res.status}`);

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content ?? "{}";
      return JSON.parse(text) as T;
    } catch (err) {
      if (isRateLimit(err)) {
        console.warn(`[AI] OpenRouter key ...${key.slice(-6)} rate limited — trying next`);
        continue;
      }
      throw err;
    }
  }
  throw new Error("All OpenRouter keys exhausted.");
}

/** Fallback chain: Gemini → Groq → OpenRouter */
export async function askGeminiJSON<T>(prompt: string): Promise<T> {
  // 1. Try Gemini keys
  for (const key of geminiKeys) {
    const model = new GoogleGenerativeAI(key).getGenerativeModel({ model: "gemini-2.0-flash" });
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" },
      });
      return JSON.parse(result.response.text()) as T;
    } catch (err) {
      if (isRateLimit(err)) {
        console.warn(`[AI] Gemini key ...${key.slice(-6)} rate limited — trying next`);
        continue;
      }
      throw err;
    }
  }

  // 2. Try Groq keys
  if (groqKeys.length > 0) {
    console.warn("[AI] All Gemini keys exhausted — falling back to Groq");
    try {
      return await askGroqJSON<T>(prompt);
    } catch {
      console.warn("[AI] All Groq keys exhausted — falling back to OpenRouter");
    }
  }

  // 3. Try OpenRouter keys
  if (openRouterKeys.length > 0) {
    return askOpenRouterJSON<T>(prompt);
  }

  throw new Error("All AI providers are rate limited. Please try again later.");
}
