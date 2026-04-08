"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PrintableReport } from "@/components/PrintableReport";
import { createClient } from "@/lib/supabase/client";
import type { ParsedJD, Question } from "@/lib/types";

interface ResultsViewProps {
  parsedJD: ParsedJD;
  questions: Question[];
  avgScore: number | null;
  rawJD?: string;
  mode: "live" | "history";
  onReset?: () => void;
  onBack?: () => void;
}

export function ResultsView({ parsedJD, questions, avgScore, rawJD, mode, onReset, onBack }: ResultsViewProps) {
  const readiness = avgScore === null ? 0 : Math.round((avgScore / 10) * 100);
  const answered = questions.filter(q => q.score).length;
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "signed-out">("idle");
  const savedRef = useRef(false);

  // Auto-save for live sessions
  useEffect(() => {
    if (mode !== "live" || savedRef.current) return;
    savedRef.current = true;

    async function save() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setSaveStatus("signed-out");
        return;
      }

      setSaveStatus("saving");
      try {
        const res = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rawJD: rawJD ?? "", parsedJD, questions }),
        });
        if (res.ok) setSaveStatus("saved");
        else setSaveStatus("idle");
      } catch {
        setSaveStatus("idle");
      }
    }

    save();
  }, [mode, parsedJD, questions, rawJD]);

  const tier =
    readiness >= 80 ? { label: "Interview Ready 🎉", color: "text-violet-300", ringColor: "stroke-violet-500", bg: "from-violet-950/40", border: "border-violet-500/20", badge: "violet" as const } :
    readiness >= 60 ? { label: "Almost There",      color: "text-emerald-300", ringColor: "stroke-emerald-500", bg: "from-emerald-950/40", border: "border-emerald-500/20", badge: "emerald" as const } :
    readiness >= 40 ? { label: "Keep Practising",   color: "text-amber-300",   ringColor: "stroke-amber-500",   bg: "from-amber-950/40",   border: "border-amber-500/20",   badge: "amber" as const } :
                      { label: "Needs Work",         color: "text-rose-300",    ringColor: "stroke-rose-500",    bg: "from-rose-950/40",    border: "border-rose-500/20",    badge: "rose" as const };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (readiness / 100) * circumference;

  return (
    <main className="min-h-screen bg-[#09090b] pt-20 pb-24 no-print">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[50rem] w-[50rem] rounded-full bg-violet-600/8 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-2xl px-5 sm:px-8 space-y-5">

        {/* Completion header */}
        <div className="text-center space-y-1 pt-4 fade-in-up">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">
            {mode === "live" ? "Session Complete" : "Session Review"}
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">{parsedJD.job_title}</h1>
          {parsedJD.company && <p className="text-sm text-zinc-500">{parsedJD.company}</p>}
          {mode === "live" && saveStatus === "saved" && (
            <p className="text-[11px] text-emerald-500 mt-1">Session saved to your account</p>
          )}
          {mode === "live" && saveStatus === "signed-out" && (
            <p className="text-[11px] text-zinc-600 mt-1">Sign in to save your sessions</p>
          )}
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
          {mode === "live" ? (
            <>
              <Button variant="outline" size="lg" onClick={onReset} className="flex-1">
                ← Prep for Another Role
              </Button>
              <Button size="lg" onClick={onReset} className="flex-1">
                New Session →
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="lg" onClick={onBack} className="flex-1">
                ← Back to History
              </Button>
              <Button size="lg" onClick={onReset} className="flex-1">
                New Session →
              </Button>
            </>
          )}
        </div>

        {/* Export PDF — disabled until at least one answer has been scored */}
        <div className="fade-in-up-3 pt-1">
          <button
            type="button"
            onClick={() => window.print()}
            disabled={answered === 0}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-zinc-900 hover:bg-zinc-800/80 px-4 py-3 text-sm font-medium text-zinc-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
            </svg>
            Export as PDF
          </button>
        </div>
      </div>

      <PrintableReport parsedJD={parsedJD} questions={questions} avgScore={avgScore} />
    </main>
  );
}
