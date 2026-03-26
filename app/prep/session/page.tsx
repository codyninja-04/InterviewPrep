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
          isLast={activeIndex === questions.length - 1}
        />
      </div>
    </main>
  );
}

// ── Results screen ─────────────────────────────────────────────────────────────

function ResultsScreen({ parsedJD, questions, avgScore, onReset }: {
  parsedJD: ParsedJD;
  questions: Question[];
  avgScore: number | null;
  onReset: () => void;
}) {
  const readiness = avgScore === null ? 0 : Math.round((avgScore / 10) * 100);
  const answered = questions.filter(q => q.score).length;

  const tier =
    readiness >= 80 ? { label: "Interview Ready 🎉", color: "text-violet-300", ringColor: "stroke-violet-500", bg: "from-violet-950/40", border: "border-violet-500/20", badge: "violet" as const } :
    readiness >= 60 ? { label: "Almost There",      color: "text-emerald-300", ringColor: "stroke-emerald-500", bg: "from-emerald-950/40", border: "border-emerald-500/20", badge: "emerald" as const } :
    readiness >= 40 ? { label: "Keep Practising",   color: "text-amber-300",   ringColor: "stroke-amber-500",   bg: "from-amber-950/40",   border: "border-amber-500/20",   badge: "amber" as const } :
                      { label: "Needs Work",         color: "text-rose-300",    ringColor: "stroke-rose-500",    bg: "from-rose-950/40",    border: "border-rose-500/20",    badge: "rose" as const };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (readiness / 100) * circumference;

  return (
    <main className="min-h-screen bg-[#09090b] pt-20 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[50rem] w-[50rem] rounded-full bg-violet-600/8 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-2xl px-5 sm:px-8 space-y-5">

        {/* Completion header */}
        <div className="text-center space-y-1 pt-4 fade-in-up">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">Session Complete</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">{parsedJD.job_title}</h1>
          {parsedJD.company && <p className="text-sm text-zinc-500">{parsedJD.company}</p>}
        </div>

        {/* Score hero card */}
        <div className={`fade-in-up-1 relative rounded-2xl border ${tier.border} bg-gradient-to-b ${tier.bg} to-zinc-900 overflow-hidden`}>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8">

            {/* Animated SVG ring */}
            <div className="relative shrink-0">
              <svg className="size-36 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-zinc-800" />
                <circle
                  cx="50" cy="50" r="45"
                  fill="none"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className={tier.ringColor}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className={`text-3xl font-extrabold tabular-nums ${tier.color}`}>{readiness}%</p>
                <p className="text-[10px] text-zinc-600 font-medium">readiness</p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex-1 text-center sm:text-left space-y-4">
              <div>
                <Badge variant={tier.badge} className="text-xs px-3 py-1 mb-3">{tier.label}</Badge>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  You answered <span className="text-zinc-200 font-semibold">{answered} of {questions.length}</span> questions with an average score of <span className={`font-bold ${tier.color}`}>{avgScore ?? 0}/10</span>.
                </p>
              </div>

              {/* Mini score breakdown */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Technical",   type: "technical",   color: "text-violet-400" },
                  { label: "Behavioral",  type: "behavioral",  color: "text-emerald-400" },
                  { label: "Situational", type: "situational", color: "text-sky-400" },
                ].map(({ label, type, color }) => {
                  const typeQs = questions.filter(q => q.type === type && q.score);
                  const avg = typeQs.length ? Math.round(typeQs.reduce((s, q) => s + (q.score?.score ?? 0), 0) / typeQs.length) : null;
                  return (
                    <div key={type} className="rounded-xl bg-zinc-800/50 border border-white/[0.05] p-2.5 text-center">
                      <p className={`text-base font-extrabold tabular-nums ${color}`}>{avg ?? "–"}{avg ? "/10" : ""}</p>
                      <p className="text-[10px] text-zinc-600 mt-0.5">{label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Per-question breakdown */}
        <div className="fade-in-up-2 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-600 px-1">Question Breakdown</p>
          <div className="rounded-2xl border border-white/[0.06] bg-zinc-900 divide-y divide-white/[0.04] overflow-hidden">
            {questions.map((q, i) => (
              <div key={q.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors">
                <div className="shrink-0 size-7 rounded-lg bg-zinc-800/80 text-[11px] font-bold text-zinc-500 flex items-center justify-center">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-300 line-clamp-1">{q.question}</p>
                  <Badge variant={q.type === "technical" ? "violet" : q.type === "behavioral" ? "emerald" : "sky"} className="mt-1 text-[10px]">
                    {q.type}
                  </Badge>
                </div>
                {q.score ? (
                  <div className="shrink-0 text-right">
                    <p className={`text-sm font-extrabold tabular-nums ${
                      q.score.score >= 8 ? "text-violet-400" : q.score.score >= 6 ? "text-emerald-400" : q.score.score >= 4 ? "text-amber-400" : "text-rose-400"
                    }`}>{q.score.score}/10</p>
                  </div>
                ) : (
                  <span className="shrink-0 text-[10px] text-zinc-700 bg-zinc-800/60 px-2 py-0.5 rounded-full">skipped</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="fade-in-up-3 flex flex-col sm:flex-row gap-3 pt-2">
          <Button variant="outline" size="lg" onClick={onReset} className="flex-1">
            ← Prep for Another Role
          </Button>
          <Button size="lg" onClick={onReset} className="flex-1">
            New Session →
          </Button>
        </div>
      </div>
    </main>
  );
}
