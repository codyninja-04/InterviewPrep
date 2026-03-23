"use client";

import { Card } from "@/components/ui/Card";
import type { AnswerScore } from "@/lib/types";

interface ScoreFeedbackProps {
  score: AnswerScore;
}

const SCORE_META: Record<
  string,
  { label: string; color: string; bg: string; ring: string }
> = {
  low: {
    label: "Needs Work",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    ring: "ring-rose-500/25",
  },
  mid: {
    label: "Getting There",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    ring: "ring-amber-500/25",
  },
  good: {
    label: "Good Answer",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    ring: "ring-emerald-500/25",
  },
  excellent: {
    label: "Excellent",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    ring: "ring-violet-500/25",
  },
};

function getMeta(score: number) {
  if (score <= 3) return SCORE_META.low;
  if (score <= 6) return SCORE_META.mid;
  if (score <= 8) return SCORE_META.good;
  return SCORE_META.excellent;
}

export function ScoreFeedback({ score: data }: ScoreFeedbackProps) {
  const meta = getMeta(data.score);

  return (
    <div className="space-y-4 pt-2">
      {/* Score badge */}
      <div className="flex items-center gap-3">
        <div
          className={`inline-flex items-baseline gap-1 rounded-xl px-4 py-2 ring-1 ${meta.bg} ${meta.ring}`}
        >
          <span className={`text-3xl font-extrabold tabular-nums ${meta.color}`}>
            {data.score}
          </span>
          <span className="text-sm text-zinc-500">/10</span>
        </div>
        <span className={`text-sm font-semibold ${meta.color}`}>
          {meta.label}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* Strengths */}
        <Card className="p-4 space-y-2">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Strengths
          </p>
          <ul className="space-y-2">
            {data.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-zinc-300">
                <span className="mt-1 shrink-0 size-1.5 rounded-full bg-emerald-500" />
                {s}
              </li>
            ))}
          </ul>
        </Card>

        {/* Improvements */}
        <Card className="p-4 space-y-2">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Improvements
          </p>
          <ul className="space-y-2">
            {data.improvements.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-zinc-300">
                <span className="mt-1 shrink-0 size-1.5 rounded-full bg-amber-500" />
                {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Sample better answer */}
      <Card className="p-4 space-y-2 border-violet-900/30 bg-violet-950/30">
        <p className="text-xs font-medium uppercase tracking-widest text-violet-400">
          Stronger Answer
        </p>
        <p className="text-sm text-zinc-300 leading-relaxed">
          {data.sample_better_answer}
        </p>
      </Card>
    </div>
  );
}
