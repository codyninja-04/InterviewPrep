"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/store/useSessionStore";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { AnswerScore, ParsedJD, Question } from "@/lib/types";

export default function SessionPage() {
  const router = useRouter();
  const { parsedJD, questions, setScore, setAnswer, reset } = useSessionStore();

  const [activeIndex, setActiveIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!parsedJD || questions.length === 0) router.replace("/prep");
  }, [parsedJD, questions, router]);

  if (!parsedJD || questions.length === 0) return null;

  const answered = questions.filter((q) => !!q.score).length;
  const progress = Math.round((answered / questions.length) * 100);
  const avgScore =
    answered === 0
      ? null
      : Math.round(questions.filter((q) => q.score).reduce((sum, q) => sum + (q.score?.score ?? 0), 0) / answered);

  function handleScore(score: AnswerScore) {
    const q = questions[activeIndex];
    setAnswer(q.id, q.user_answer ?? "");
    setScore(q.id, score);
  }

  function handleNext() {
    if (activeIndex < questions.length - 1) setActiveIndex((i) => i + 1);
    else setDone(true);
  }

  if (done) {
    return (
      <ResultsScreen
        parsedJD={parsedJD}
        questions={questions}
        avgScore={avgScore}
        onReset={() => { reset(); router.push("/prep"); }}
      />
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 pt-20 pb-20">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dot-grid opacity-25" />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full bg-violet-600/6 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-2xl px-5 sm:px-8 space-y-5">
        {/* Session header */}
        <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/60 backdrop-blur-sm p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-violet-400 mb-1">
                Interview Session
              </p>
              <h1 className="text-base sm:text-lg font-bold text-zinc-100 truncate">
                {parsedJD.job_title}
                {parsedJD.company && (
                  <span className="text-zinc-500 font-normal"> · {parsedJD.company}</span>
                )}
              </h1>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-2xl font-extrabold text-zinc-100 tabular-nums leading-none">
                {answered}
                <span className="text-sm text-zinc-600 font-normal">/{questions.length}</span>
              </p>
              <p className="text-[11px] text-zinc-600 mt-0.5">answered</p>
            </div>
          </div>

          <ProgressBar value={progress} showLabel size="sm" />

          {avgScore !== null && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-zinc-600">Avg score:</span>
              <span className={`text-xs font-bold tabular-nums ${
                avgScore >= 8 ? "text-violet-400" : avgScore >= 6 ? "text-emerald-400" : avgScore >= 4 ? "text-amber-400" : "text-rose-400"
              }`}>
                {avgScore}/10
              </span>
            </div>
          )}
        </div>

        {/* Question tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => i <= answered && setActiveIndex(i)}
              title={q.question}
              className={`shrink-0 size-8 rounded-lg text-xs font-semibold transition-all duration-200 ${
                i === activeIndex
                  ? "bg-violet-600 text-white shadow-md shadow-violet-900/40 scale-105"
                  : q.score
                  ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25"
                  : i <= answered
                  ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                  : "bg-zinc-900 text-zinc-700 cursor-not-allowed"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Active question */}
        <QuestionCard
          key={questions[activeIndex].id}
          question={questions[activeIndex]}
          index={activeIndex}
          total={questions.length}
          onScore={handleScore}
          onNext={handleNext}
          isLast={activeIndex === questions.length - 1}
        />
      </div>
    </main>
  );
}

// ── Results screen ─────────────────────────────────────────────────────────────

function ResultsScreen({
  parsedJD,
  questions,
  avgScore,
  onReset,
}: {
  parsedJD: ParsedJD;
  questions: Question[];
  avgScore: number | null;
  onReset: () => void;
}) {
  const readiness = avgScore === null ? 0 : Math.round((avgScore / 10) * 100);

  const { label, color, barColor, bg, ring } =
    readiness >= 80
      ? { label: "Interview Ready",  color: "text-violet-400",  barColor: "violet"  as const, bg: "bg-violet-500/10",  ring: "ring-violet-500/20" }
      : readiness >= 60
      ? { label: "Almost There",     color: "text-emerald-400", barColor: "emerald" as const, bg: "bg-emerald-500/10", ring: "ring-emerald-500/20" }
      : readiness >= 40
      ? { label: "Keep Practising",  color: "text-amber-400",   barColor: "amber"   as const, bg: "bg-amber-500/10",   ring: "ring-amber-500/20" }
      : { label: "Needs Work",       color: "text-rose-400",    barColor: "rose"    as const, bg: "bg-rose-500/10",    ring: "ring-rose-500/20" };

  return (
    <main className="min-h-screen bg-zinc-950 pt-20 pb-20">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dot-grid opacity-25" />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full bg-violet-600/8 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-2xl px-5 sm:px-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-1 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-violet-400">Session Complete</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">{parsedJD.job_title}</h1>
          {parsedJD.company && <p className="text-sm text-zinc-500">{parsedJD.company}</p>}
        </div>

        {/* Score hero */}
        <div className={`rounded-2xl border ${ring} ring-1 ${bg} p-6 sm:p-8 text-center space-y-4`}>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Overall Readiness</p>
          <p className={`text-7xl sm:text-8xl font-extrabold tabular-nums tracking-tight ${color}`}>
            {readiness}<span className="text-2xl text-zinc-600 font-medium">%</span>
          </p>
          <div className="flex justify-center">
            <Badge
              variant={readiness >= 80 ? "violet" : readiness >= 60 ? "emerald" : readiness >= 40 ? "amber" : "rose"}
              className="text-xs px-3 py-1"
            >
              {label}
            </Badge>
          </div>
          <div className="max-w-xs mx-auto">
            <ProgressBar value={readiness} color={barColor} size="md" />
          </div>
          <p className="text-xs text-zinc-600">{questions.filter(q => q.score).length} of {questions.length} questions answered</p>
        </div>

        {/* Per-question breakdown */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 px-1">Question Breakdown</p>
          <div className="rounded-2xl border border-white/[0.06] bg-zinc-900 divide-y divide-white/[0.04] overflow-hidden">
            {questions.map((q, i) => (
              <div key={q.id} className="flex items-center gap-3 px-4 py-3">
                <span className="shrink-0 size-7 rounded-lg bg-zinc-800/80 text-[11px] font-bold text-zinc-500 flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="flex-1 text-sm text-zinc-400 line-clamp-1 min-w-0">{q.question}</p>
                {q.score ? (
                  <span className={`shrink-0 text-sm font-bold tabular-nums ${
                    q.score.score >= 8 ? "text-violet-400" : q.score.score >= 6 ? "text-emerald-400" : q.score.score >= 4 ? "text-amber-400" : "text-rose-400"
                  }`}>
                    {q.score.score}/10
                  </span>
                ) : (
                  <span className="shrink-0 text-[11px] text-zinc-700 bg-zinc-800/60 px-2 py-0.5 rounded-full">skipped</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button variant="outline" size="lg" onClick={onReset}>
            ← Prep for Another Role
          </Button>
          <Button size="lg" onClick={onReset}>
            Start New Session →
          </Button>
        </div>
      </div>
    </main>
  );
}
