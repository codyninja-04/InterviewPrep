import { NextRequest, NextResponse } from "next/server";
import { mockDelay, MOCK_QUESTIONS } from "@/lib/mocks";
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

    await mockDelay(1800);

    const questions: Question[] = MOCK_QUESTIONS.map((q, i) => ({
      ...q,
      id: `mock-q-${i}`,
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
