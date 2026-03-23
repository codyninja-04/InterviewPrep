import { NextRequest, NextResponse } from "next/server";
import { mockDelay, MOCK_PARSED_JD } from "@/lib/mocks";

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

    await mockDelay(1400);
    return NextResponse.json(MOCK_PARSED_JD);
  } catch (error) {
    console.error("[parse-jd]", error);
    return NextResponse.json(
      { error: "Failed to analyse the job description. Please try again." },
      { status: 500 }
    );
  }
}
