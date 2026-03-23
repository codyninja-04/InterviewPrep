"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { ScoreFeedback } from "@/components/ScoreFeedback";
import type { Question, AnswerScore } from "@/lib/types";

type BadgeVariant = "violet" | "emerald" | "sky";

const TYPE_STYLE: Record<Question["type"], { variant: BadgeVariant; label: string }> = {
  technical: { variant: "violet", label: "Technical" },
  behavioral: { variant: "emerald", label: "Behavioral" },
  situational: { variant: "sky", label: "Situational" },
};

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  onScore: (score: AnswerScore) => void;
  onNext: () => void;
  isLast: boolean;
}

export function QuestionCard({
  question,
  index,
  total,
  onScore,
  onNext,
  isLast,
}: QuestionCardProps) {
  const [answer, setAnswer] = useState(question.user_answer ?? "");
  const [scoring, setScoring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scored, setScored] = useState(!!question.score);

  const typeMeta = TYPE_STYLE[question.type];
  const hasAnswer = answer.trim().length >= 10;

  async function handleSubmit() {
    if (!hasAnswer || scoring) return;
    setScoring(true);
    setError(null);

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

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Scoring failed.");

      onScore(data);
      setScored(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setScoring(false);
    }
  }

  return (
    <Card glow className="p-6 space-y-5">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-600 tabular-nums font-medium">
              {index + 1} / {total}
            </span>
            <Badge variant={typeMeta.variant}>{typeMeta.label}</Badge>
            <Badge variant="zinc">{question.mapped_skill}</Badge>
          </div>
          <p className="text-base font-medium text-zinc-100 leading-relaxed">
            {question.question}
          </p>
        </div>
      </div>

      {/* What they look for */}
      <details className="group">
        <summary className="flex cursor-pointer items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-400 transition-colors select-none list-none">
          <svg
            className="size-3.5 transition-transform group-open:rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          What they look for
        </summary>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed pl-5">
          {question.what_they_look_for}
        </p>
      </details>

      {/* Answer input */}
      {!scored && (
        <div className="space-y-3">
          <Textarea
            placeholder="Type your answer here — aim for 3–5 sentences with a specific example…"
            rows={6}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={scoring}
            error={error ?? undefined}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-600 tabular-nums">
              {answer.trim().length} chars
            </span>
            <Button
              loading={scoring}
              disabled={!hasAnswer}
              onClick={handleSubmit}
            >
              {scoring ? "Scoring…" : "Submit Answer"}
            </Button>
          </div>
        </div>
      )}

      {/* Score feedback */}
      {scored && question.score && (
        <>
          {/* Show the submitted answer collapsed */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 space-y-1">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-600">
              Your Answer
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed">{answer}</p>
          </div>

          <ScoreFeedback score={question.score} />

          <div className="flex justify-end pt-1">
            <Button onClick={onNext}>
              {isLast ? "See Results →" : "Next Question →"}
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}
