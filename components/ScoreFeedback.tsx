"use client";

import type { AnswerScore } from "@/lib/types";

interface ScoreFeedbackProps {
  score: Partial<AnswerScore>;
  streaming?: boolean;
}

const SCORE_META = {
  pending:   { label: "Scoring…",       color: "text-zinc-400",    bg: "bg-zinc-500/10",    ring: "ring-zinc-500/20",    bar: "from-zinc-600 to-zinc-400" },
  low:       { label: "Needs Work",     color: "text-rose-400",    bg: "bg-rose-500/10",    ring: "ring-rose-500/20",    bar: "from-rose-600 to-rose-400" },
  mid:       { label: "Getting There",  color: "text-amber-400",   bg: "bg-amber-500/10",   ring: "ring-amber-500/20",   bar: "from-amber-600 to-amber-400" },
  good:      { label: "Good Answer",    color: "text-emerald-400", bg: "bg-emerald-500/10", ring: "ring-emerald-500/20", bar: "from-emerald-600 to-emerald-400" },
  excellent: { label: "Excellent",      color: "text-violet-400",  bg: "bg-violet-500/10",  ring: "ring-violet-500/20",  bar: "from-violet-600 to-violet-400" },
};

function getMeta(score: number | undefined) {
  if (score == null) return SCORE_META.pending;
  if (score <= 3) return SCORE_META.low;
  if (score <= 6) return SCORE_META.mid;
  if (score <= 8) return SCORE_META.good;
  return SCORE_META.excellent;
}

export function ScoreFeedback({ score: data, streaming = false }: ScoreFeedbackProps) {
  const hasScore = typeof data.score === "number";
  const meta = getMeta(data.score);
  const pct = hasScore ? (data.score! / 10) * 100 : 0;
  const strengths = data.strengths ?? [];
  const improvements = data.improvements ?? [];
  const sample = data.sample_better_answer ?? "";

  return (
    <div className="space-y-4">
      {/* Score header */}
      <div className={`rounded-xl border ${meta.ring} ring-1 ${meta.bg} px-5 py-4 flex items-center gap-4`}>
        <div className="shrink-0">
          {hasScore ? (
            <p className={`text-4xl font-extrabold tabular-nums ${meta.color}`}>
              {data.score}<span className="text-lg font-medium text-zinc-600">/10</span>
            </p>
          ) : (
            <div className="h-10 w-16 rounded-md bg-zinc-800/60 animate-pulse" />
          )}
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center justify-between">
            <span className={`text-sm font-semibold ${meta.color}`}>
              {meta.label}
              {streaming && hasScore && <span className="ml-1.5 text-zinc-600">•</span>}
            </span>
            {hasScore && <span className="text-xs text-zinc-600">{pct}%</span>}
          </div>
          <div className="h-1.5 w-full rounded-full bg-zinc-800/80 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${meta.bar} transition-all duration-700`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Strengths + Improvements */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-900 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <svg className="size-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Strengths</p>
          </div>
          {strengths.length === 0 && streaming ? (
            <SkeletonList />
          ) : (
            <ul className="space-y-2">
              {strengths.map((s, i) => (
                <li key={i} className="flex gap-2.5 text-xs text-zinc-300 leading-relaxed fade-in-up">
                  <span className="mt-1.5 shrink-0 size-1 rounded-full bg-emerald-500" />
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-zinc-900 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-full bg-amber-500/15 flex items-center justify-center">
              <svg className="size-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Improve</p>
          </div>
          {improvements.length === 0 && streaming ? (
            <SkeletonList />
          ) : (
            <ul className="space-y-2">
              {improvements.map((s, i) => (
                <li key={i} className="flex gap-2.5 text-xs text-zinc-300 leading-relaxed fade-in-up">
                  <span className="mt-1.5 shrink-0 size-1 rounded-full bg-amber-500" />
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Stronger answer */}
      <div className="rounded-xl border border-violet-500/15 bg-violet-950/20 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="size-5 rounded-full bg-violet-500/15 flex items-center justify-center">
            <svg className="size-3 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Stronger Answer</p>
        </div>
        {sample ? (
          <p className="text-sm text-zinc-300 leading-relaxed">
            {sample}
            {streaming && <span className="inline-block ml-0.5 w-1.5 h-3.5 align-middle bg-violet-400/70 animate-pulse" />}
          </p>
        ) : streaming ? (
          <div className="space-y-1.5">
            <div className="h-3 w-full rounded bg-zinc-800/60 animate-pulse" />
            <div className="h-3 w-11/12 rounded bg-zinc-800/60 animate-pulse" />
            <div className="h-3 w-4/5 rounded bg-zinc-800/60 animate-pulse" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-2">
      <div className="h-3 w-full rounded bg-zinc-800/60 animate-pulse" />
      <div className="h-3 w-5/6 rounded bg-zinc-800/60 animate-pulse" />
      <div className="h-3 w-3/4 rounded bg-zinc-800/60 animate-pulse" />
    </div>
  );
}
