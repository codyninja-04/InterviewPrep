import { NextRequest, NextResponse } from "next/server";
import { askGeminiJSON } from "@/lib/gemini";
import { ANSWER_SCORER_PROMPT } from "@/lib/prompts";
import type { AnswerScore } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, answer, type, skill } = body ?? {};

    if (!question || !answer) {
      return NextResponse.json(
        { error: "question and answer are required." },
        { status: 400 }
      );
    }

    if (answer.trim().length < 10) {
      return NextResponse.json(
        { error: "Answer is too short to score meaningfully." },
        { status: 400 }
      );
    }

    const prompt = ANSWER_SCORER_PROMPT
      .replace("{question}", question)
      .replace("{type}", type ?? "technical")
      .replace("{skill}", skill ?? "general")
      .replace("{answer}", answer);

    const scored = await askGeminiJSON<AnswerScore>(prompt);

    return NextResponse.json(scored);
  } catch (error) {
    console.error("[score-answer]", error);
    return NextResponse.json(
      { error: "Failed to score your answer. Please try again." },
      { status: 500 }
    );
  }
}
