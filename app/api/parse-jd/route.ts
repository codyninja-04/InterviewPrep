import { NextRequest, NextResponse } from "next/server";
import { askGeminiJSON } from "@/lib/gemini";
import { JD_PARSER_PROMPT } from "@/lib/prompts";
import type { ParsedJD } from "@/lib/types";

// Only send the first 4,000 chars — enough for any JD, saves ~70% of input tokens
const JD_CHAR_LIMIT = 4_000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const jdText: string = body?.jdText ?? "";

    if (!jdText || jdText.trim().length < 50) {
      return NextResponse.json(
        { error: "Job description is too short. Paste the full JD." },
        { status: 400 }
      );
    }

    const truncated = jdText.trim().slice(0, JD_CHAR_LIMIT);
    const prompt = JD_PARSER_PROMPT.replace("{jd_text}", truncated);
    const parsed = await askGeminiJSON<ParsedJD>(prompt);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("[parse-jd]", error);
    return NextResponse.json(
      { error: "Failed to analyse the job description. Please try again." },
      { status: 500 }
    );
  }
}
