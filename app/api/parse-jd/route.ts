import { NextRequest, NextResponse } from "next/server";
import { askGeminiJSON } from "@/lib/gemini";
import { JD_PARSER_PROMPT } from "@/lib/prompts";
import type { ParsedJD } from "@/lib/types";

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

    if (jdText.trim().length > 15_000) {
      return NextResponse.json(
        { error: "Job description exceeds maximum length (15,000 chars)." },
        { status: 400 }
      );
    }

    const prompt = JD_PARSER_PROMPT.replace("{jd_text}", jdText);
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
