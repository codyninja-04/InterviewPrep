import { NextRequest, NextResponse } from "next/server";
import { mockDelay, MOCK_SCORES } from "@/lib/mocks";

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

    await mockDelay(1200);

    // Rotate through mock scores based on answer length so repeated
    // submissions feel varied rather than identical.
    const index = answer.length % MOCK_SCORES.length;
    return NextResponse.json(MOCK_SCORES[index]);
  } catch (error) {
    console.error("[score-answer]", error);
    return NextResponse.json(
      { error: "Failed to score your answer. Please try again." },
      { status: 500 }
    );
  }
}
