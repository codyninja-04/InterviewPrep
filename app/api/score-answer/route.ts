import { NextRequest, NextResponse } from "next/server";
import { askGeminiStream } from "@/lib/gemini";
import { ANSWER_SCORER_PROMPT } from "@/lib/prompts";

// Cap answer length sent to AI — saves tokens on every scoring call
const ANSWER_CHAR_LIMIT = 1_200;

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

    const truncatedAnswer = answer.trim().slice(0, ANSWER_CHAR_LIMIT);

    const prompt = ANSWER_SCORER_PROMPT
      .replace("{question}", question)
      .replace("{type}", type ?? "technical")
      .replace("{skill}", skill ?? "general")
      .replace("{answer}", truncatedAnswer);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of askGeminiStream(prompt)) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        } catch (err) {
          console.error("[score-answer:stream]", err);
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("[score-answer]", error);
    return NextResponse.json(
      { error: "Failed to score your answer. Please try again." },
      { status: 500 }
    );
  }
}
