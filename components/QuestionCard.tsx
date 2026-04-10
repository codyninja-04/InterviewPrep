"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { ScoreFeedback } from "@/components/ScoreFeedback";
import { tryParsePartial } from "@/lib/partialJson";
import type { Question, AnswerScore } from "@/lib/types";

type BadgeVariant = "violet" | "emerald" | "sky";

const TYPE_STYLE: Record<Question["type"], { variant: BadgeVariant; label: string }> = {
  technical:   { variant: "violet",  label: "Technical" },
  behavioral:  { variant: "emerald", label: "Behavioral" },
  situational: { variant: "sky",     label: "Situational" },
};

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  onScore: (score: AnswerScore) => void;
  onNext: () => void;
  onRetry?: () => void;
  onSkip?: () => void;
  isLast: boolean;
  timeLimit?: number; // seconds; undefined = no timer
}

export function QuestionCard({ question, index, total, onScore, onNext, onRetry, onSkip, isLast, timeLimit }: QuestionCardProps) {
  const [answer, setAnswer] = useState(question.user_answer ?? "");
  const [scoring, setScoring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scored, setScored] = useState(!!question.score);
  const [hintOpen, setHintOpen] = useState(false);
  const [streamingScore, setStreamingScore] = useState<Partial<AnswerScore> | null>(null);
  const [attempt, setAttempt] = useState(1);
  const [timeLeft, setTimeLeft] = useState(timeLimit ?? 0);
  const [timeUp, setTimeUp] = useState(false);

  // Countdown: starts/restarts whenever scored or scoring state changes.
  // The interval self-terminates when it hits 0.
  useEffect(() => {
    if (!timeLimit || scored || scoring) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          setTimeUp(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timeLimit, scored, scoring]);

  function handleRetry() {
    if (scoring) return;
    setScored(false);
    setStreamingScore(null);
    setError(null);
    setAttempt((n) => n + 1);
    setTimeLeft(timeLimit ?? 0);
    setTimeUp(false);
    onRetry?.();
  }

  const timerPct = timeLimit ? (timeLeft / timeLimit) * 100 : 100;
  const timerColor =
    timerPct > 50 ? "text-emerald-400" :
    timerPct > 25 ? "text-amber-400" :
    "text-rose-400";
  const timerBarColor =
    timerPct > 50 ? "bg-emerald-500" :
    timerPct > 25 ? "bg-amber-500" :
    "bg-rose-500";
  const timerMins = Math.floor(timeLeft / 60);
  const timerSecs = timeLeft % 60;

  const typeMeta = TYPE_STYLE[question.type];
  const hasAnswer = answer.trim().length >= 10;
  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;

  async function handleSubmit() {
    if (!hasAnswer || scoring) return;
    setScoring(true);
    setError(null);
    setStreamingScore(null);

    try {
      const res = await fetch("/api/score-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.question,
          answer,
          type: question.type,
          skill: question.mapped_skill,
        }),
      });

      if (!res.ok || !res.body) {
        // Error responses are still JSON
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Scoring failed.");
      }

      // Reveal the card immediately so partial fields can render as they arrive
      setScored(true);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const partial = tryParsePartial<AnswerScore>(acc);
        if (partial) setStreamingScore(partial);
      }
      acc += decoder.decode();

      const final = JSON.parse(acc) as AnswerScore;
      setStreamingScore(final);
      onScore(final);
    } catch (err) {
      setScored(false);
      setStreamingScore(null);
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setScoring(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-zinc-900 overflow-hidden fade-in-up">
      {/* Card header */}
      <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between gap-4 bg-zinc-950/30">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={typeMeta.variant}>{typeMeta.label}</Badge>
          <Badge variant="zinc">{question.mapped_skill}</Badge>
        </div>
        <span className="text-xs text-zinc-600 tabular-nums font-medium shrink-0">
          {index + 1} <span className="text-zinc-700">/ {total}</span>
        </span>
      </div>

      <div className="p-5 space-y-5">
        {/* Question text */}
        <p className="text-[15px] font-medium text-zinc-100 leading-relaxed">
          {question.question}
        </p>

        {/* Hint accordion */}
        <button
          onClick={() => setHintOpen(!hintOpen)}
          className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors select-none"
        >
          <svg
            className={`size-3.5 transition-transform duration-200 ${hintOpen ? "rotate-90" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          What interviewers look for
        </button>
        {hintOpen && (
          <div className="rounded-lg border border-white/[0.05] bg-zinc-800/40 px-4 py-3 fade-in-up">
            <p className="text-sm text-zinc-400 leading-relaxed">{question.what_they_look_for}</p>
          </div>
        )}

        {/* Answer input */}
        {!scored && (
          <div className="space-y-3">
            {/* Timer bar */}
            {!!timeLimit && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-semibold tabular-nums ${timeUp ? "text-rose-400 animate-pulse" : timerColor}`}>
                    {timeUp ? "Time's up" : `${timerMins}:${String(timerSecs).padStart(2, "0")}`}
                  </span>
                  <span className="text-[10px] text-zinc-700">time remaining</span>
                </div>
                <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-linear ${timerBarColor}`}
                    style={{ width: `${timerPct}%` }}
                  />
                </div>
                {timeUp && (
                  <p className="text-[11px] text-rose-400/80 leading-snug">
                    Submit your answer now — even a partial response is better than nothing.
                  </p>
                )}
              </div>
            )}

            <Textarea
              placeholder="Type your answer — aim for 3–5 sentences with a concrete example…"
              rows={6}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={scoring}
              error={error ?? undefined}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-600 tabular-nums">
                  {wordCount} word{wordCount !== 1 ? "s" : ""}
                  {attempt > 1 && <span className="ml-2 text-violet-400">· attempt {attempt}</span>}
                </span>
                {onSkip && !scoring && (
                  <button
                    type="button"
                    onClick={onSkip}
                    className="text-xs text-zinc-700 hover:text-zinc-400 transition-colors"
                  >
                    {isLast ? "Skip & Finish →" : "Skip →"}
                  </button>
                )}
              </div>
              <Button loading={scoring} disabled={!hasAnswer} onClick={handleSubmit}>
                {scoring ? "Scoring…" : attempt > 1 ? "Re-score Answer" : "Submit Answer"}
              </Button>
            </div>
          </div>
        )}

        {/* Scored state */}
        {scored && (question.score || streamingScore) && (
          <div className="space-y-4">
            {/* Submitted answer */}
            <div className="rounded-xl border border-white/[0.05] bg-zinc-800/40 p-4 space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Your Answer</p>
              <p className="text-sm text-zinc-300 leading-relaxed">{answer}</p>
            </div>

            <ScoreFeedback
              score={(question.score ?? streamingScore) as Partial<AnswerScore>}
              streaming={scoring}
            />

            {/* Attempt history — only shown when there are multiple scored attempts */}
            {(question.attempts?.length ?? 0) > 1 && (
              <div className="rounded-xl border border-white/[0.05] bg-zinc-800/30 px-4 py-3 space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Attempt History</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {question.attempts!.map((a, i) => {
                    const prev = question.attempts![i - 1];
                    const delta = prev ? a.score.score - prev.score.score : null;
                    const scoreColor =
                      a.score.score >= 9 ? "text-violet-400" :
                      a.score.score >= 7 ? "text-emerald-400" :
                      a.score.score >= 5 ? "text-amber-400" :
                      "text-rose-400";
                    return (
                      <div key={i} className="flex items-center gap-2">
                        {i > 0 && (
                          <svg className="size-3 text-zinc-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-bold tabular-nums ${scoreColor}`}>
                            {a.score.score}/10
                          </span>
                          {delta !== null && (
                            <span className={`text-[10px] font-semibold px-1 py-0.5 rounded ${
                              delta > 0 ? "bg-emerald-500/15 text-emerald-400" :
                              delta < 0 ? "bg-rose-500/15 text-rose-400" :
                              "bg-zinc-700/50 text-zinc-500"
                            }`}>
                              {delta > 0 ? `+${delta}` : delta}
                            </span>
                          )}
                          <span className="text-[10px] text-zinc-700">#{i + 1}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-1 gap-3">
              <button
                type="button"
                onClick={handleRetry}
                disabled={scoring}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-violet-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M5.5 9A7 7 0 0118.6 7.4M18.5 15A7 7 0 015.4 16.6" />
                </svg>
                Try a stronger answer
              </button>
              <Button onClick={onNext} disabled={scoring}>
                {isLast ? "See Results →" : "Next Question →"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
