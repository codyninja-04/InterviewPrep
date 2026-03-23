"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/store/useSessionStore";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { AnswerScore, ParsedJD, Question } from "@/lib/types";

export default function SessionPage() {
  const router = useRouter();
  const { parsedJD, questions, setScore, setAnswer, reset } = useSessionStore();

  const [activeIndex, setActiveIndex] = useState(0);
  const [done, setDone] = useState(false);

  // Guard: if store is empty (e.g. hard refresh), send back
  useEffect(() => {
    if (!parsedJD || questions.length === 0) {
      router.replace("/prep");
    }
  }, [parsedJD, questions, router]);

  if (!parsedJD || questions.length === 0) return null;

  const answered = questions.filter((q) => !!q.score).length;
  const progress = Math.round((answered / questions.length) * 100);
  const avgScore =
    answered === 0
      ? null
      : Math.round(
          questions
            .filter((q) => q.score)
            .reduce((sum, q) => sum + (q.score?.score ?? 0), 0) / answered
        );

  function handleScore(score: AnswerScore) {
    const q = questions[activeIndex];
    setAnswer(q.id, q.user_answer ?? "");
    setScore(q.id, score);
  }

  function handleNext() {
    if (activeIndex < questions.length - 1) {
      setActiveIndex((i) => i + 1);
    } else {
      setDone(true);
    }
  }

  // ── Results screen ──────────────────────────────────────────────────────────
  if (done) {
    return (
      <ResultsScreen
        parsedJD={parsedJD}
        questions={questions}
        avgScore={avgScore}
        onReset={() => {
          reset();
          router.push("/prep");
        }}
      />
    );
  }

  // ── Active session ──────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-zinc-950 pt-20 pb-20">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40rem] w-full max-w-3xl rounded-full bg-violet-600/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 space-y-6">
        {/* Session header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-violet-400 mb-1">
                Interview Prep
              </p>
              <h1 className="text-lg font-bold text-zinc-100 tracking-tight">
                {parsedJD.job_title}
                {parsedJD.company && (
                  <span className="text-zinc-400 font-normal">
                    {" "}
                    · {parsedJD.company}
                  </span>
                )}
              </h1>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-zinc-100 tabular-nums">
                {answered}
                <span className="text-sm text-zinc-500 font-normal">
                  /{questions.length}
                </span>
              </p>
              <p className="text-xs text-zinc-500">answered</p>
            </div>
          </div>

          <ProgressBar value={progress} showLabel />
        </div>

        {/* Question tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => i <= answered && setActiveIndex(i)}
              className={`shrink-0 size-8 rounded-lg text-xs font-medium transition-colors ${
                i === activeIndex
                  ? "bg-violet-600 text-white"
                  : q.score
                  ? "bg-emerald-500/20 text-emerald-400"
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

// ── Results screen ────────────────────────────────────────────────────────────

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
  const readiness =
    avgScore === null ? 0 : Math.round((avgScore / 10) * 100);

  const scoreColor =
    readiness >= 80
      ? "text-violet-400"
      : readiness >= 60
      ? "text-emerald-400"
      : readiness >= 40
      ? "text-amber-400"
      : "text-rose-400";

  const scoreLabel =
    readiness >= 80
      ? "Interview Ready"
      : readiness >= 60
      ? "Almost There"
      : readiness >= 40
      ? "Keep Practising"
      : "Needs Work";

  return (
    <main className="min-h-screen bg-zinc-950 pt-20 pb-20">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40rem] w-full max-w-3xl rounded-full bg-violet-600/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-xs font-medium uppercase tracking-widest text-violet-400">
            Session Complete
          </p>
          <h1 className="text-3xl font-extrabold text-zinc-100 tracking-tight">
            {parsedJD.job_title}
          </h1>
          {parsedJD.company && (
            <p className="text-zinc-400">{parsedJD.company}</p>
          )}
        </div>

        {/* Readiness score */}
        <Card glow className="p-8 flex flex-col items-center gap-3">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Overall Readiness
          </p>
          <p className={`text-7xl font-extrabold tabular-nums ${scoreColor}`}>
            {readiness}%
          </p>
          <Badge
            variant={
              readiness >= 80
                ? "violet"
                : readiness >= 60
                ? "emerald"
                : readiness >= 40
                ? "amber"
                : "rose"
            }
            className="text-sm px-3 py-1"
          >
            {scoreLabel}
          </Badge>
          <ProgressBar value={readiness} className="w-full max-w-xs mt-2" />
        </Card>

        {/* Per-question breakdown */}
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Question Breakdown
          </p>
          {questions.map((q, i) => (
            <div
              key={q.id}
              className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3"
            >
              <span className="shrink-0 size-7 rounded-lg bg-zinc-800 text-xs font-semibold text-zinc-400 flex items-center justify-center">
                {i + 1}
              </span>
              <p className="flex-1 text-sm text-zinc-300 line-clamp-1">
                {q.question}
              </p>
              {q.score ? (
                <span
                  className={`shrink-0 text-sm font-bold tabular-nums ${
                    q.score.score >= 8
                      ? "text-violet-400"
                      : q.score.score >= 6
                      ? "text-emerald-400"
                      : q.score.score >= 4
                      ? "text-amber-400"
                      : "text-rose-400"
                  }`}
                >
                  {q.score.score}/10
                </span>
              ) : (
                <span className="shrink-0 text-xs text-zinc-600">skipped</span>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-center">
          <Button size="lg" onClick={onReset}>
            Prep for Another Role →
          </Button>
        </div>
      </div>
    </main>
  );
}
