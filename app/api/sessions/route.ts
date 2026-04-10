import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import type { ParsedJD, Question } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const body = await req.json() as {
      rawJD: string;
      parsedJD: ParsedJD;
      questions: Question[];
    };

    if (!body.rawJD || !body.parsedJD || !body.questions?.length) {
      return NextResponse.json({ error: "Missing session data" }, { status: 400 });
    }

    const scored = body.questions.filter((q) => q.score);
    const avgScore = scored.length
      ? Math.round((scored.reduce((s, q) => s + (q.score?.score ?? 0), 0) / scored.length) * 10) / 10
      : null;

    const { data, error } = await supabase.from("prep_sessions").insert({
      user_id: user.id,
      job_title: body.parsedJD.job_title,
      company: body.parsedJD.company,
      raw_jd: body.rawJD,
      parsed_jd: body.parsedJD,
      questions: body.questions,
      avg_score: avgScore,
    }).select("id").single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ id: data.id });
  } catch {
    return NextResponse.json({ error: "Failed to save session" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const full = new URL(req.url).searchParams.get("full") === "true";

    if (full) {
      const { data, error } = await supabase
        .from("prep_sessions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data ?? []);
    }

    const { data, error } = await supabase
      .from("prep_sessions")
      .select("id, job_title, company, avg_score, created_at, questions")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const sessions = (data ?? []).map((s) => ({
      id: s.id,
      job_title: s.job_title,
      company: s.company,
      avg_score: s.avg_score,
      created_at: s.created_at,
      question_count: Array.isArray(s.questions) ? s.questions.length : 0,
      answered_count: Array.isArray(s.questions) ? s.questions.filter((q: any) => q.score).length : 0,
    }));

    return NextResponse.json(sessions);
  } catch {
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}
