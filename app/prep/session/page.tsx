"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/store/useSessionStore";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsView } from "@/components/ResultsView";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { AnswerScore } from "@/lib/types";

export default function SessionPage() {
  const router = useRouter();
  const { parsedJD, questions, setScore, setAnswer, clearScore, reset } = useSessionStore();

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
      <ResultsView
        parsedJD={parsedJD}
        questions={questions}
        avgScore={avgScore}
        rawJD={useSessionStore.getState().rawJD}
        mode="live"
        onReset={() => { reset(); router.push("/prep"); }}
      />
    );
  }

  const motivationMsg =
    progress === 0 ? "Let's go — answer your first question" :
    progress < 40   ? "Good start, keep going!" :
    progress < 75   ? "You're halfway there 💪" :
    progress < 100  ? "Almost done, finish strong!" : "";

  return (
    <main className="min-h-screen bg-[#09090b] pt-20 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full bg-violet-600/6 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-2xl px-5 sm:px-8 space-y-4">

        {/* Session header */}
        <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/70 backdrop-blur-md p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-violet-400 mb-1">Interview Session</p>
              <h1 className="text-sm sm:text-base font-bold text-zinc-100 truncate leading-snug">
                {parsedJD.job_title}
                {parsedJD.company && <span className="text-zinc-500 font-normal"> · {parsedJD.company}</span>}
              </h1>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xl font-extrabold text-zinc-100 tabular-nums leading-none">
                {answered}<span className="text-sm text-zinc-700 font-normal">/{questions.length}</span>
              </p>
              <p className="text-[10px] text-zinc-600 mt-0.5">answered</p>
            </div>
          </div>

          <div className="space-y-2">
            <ProgressBar value={progress} showLabel size="sm" />
            <div className="flex items-center justify-between">
              {motivationMsg && (
                <p className="text-[11px] text-zinc-500 italic">{motivationMsg}</p>
              )}
              {avgScore !== null && (
                <p className="text-[11px] text-zinc-600 ml-auto">
                  Avg: <span className={`font-bold ${avgScore >= 8 ? "text-violet-400" : avgScore >= 6 ? "text-emerald-400" : avgScore >= 4 ? "text-amber-400" : "text-rose-400"}`}>{avgScore}/10</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Question tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => i <= answered && setActiveIndex(i)}
              title={q.question}
              className={`shrink-0 size-8 rounded-lg text-xs font-bold transition-all duration-200 ${
                i === activeIndex
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-900/50 scale-110"
                  : q.score
                  ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25 hover:bg-emerald-500/25"
                  : i <= answered
                  ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                  : "bg-zinc-900/50 text-zinc-700 cursor-not-allowed"
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
          onRetry={() => clearScore(questions[activeIndex].id)}
          isLast={activeIndex === questions.length - 1}
        />
      </div>
    </main>
  );
}

