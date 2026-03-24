import { NextRequest, NextResponse } from "next/server";
import { askGeminiJSON } from "@/lib/gemini";
import { QUESTION_GEN_PROMPT } from "@/lib/prompts";
import type { Question } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobTitle, skills, level } = body ?? {};

    if (!jobTitle || !skills?.length) {
      return NextResponse.json(
        { error: "jobTitle and skills are required." },
        { status: 400 }
      );
    }

    const prompt = QUESTION_GEN_PROMPT
      .replace("{job_title}", jobTitle)
      .replace("{skills}", (skills as string[]).join(", "))
      .replace("{level}", level ?? "mid");

    const raw = await askGeminiJSON<Omit<Question, "id">[]>(prompt);

    const questions: Question[] = raw.map((q, i) => ({
      ...q,
      id: `q-${i}`,
    }));

    return NextResponse.json(questions);
  } catch (error) {
    console.error("[generate-questions]", error);
    return NextResponse.json(
      { error: "Failed to generate questions. Please try again." },
      { status: 500 }
    );
  }
}
