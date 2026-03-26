"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { SkillsBreakdown } from "@/components/SkillsBreakdown";
import { useSessionStore } from "@/store/useSessionStore";
import type { ParsedJD } from "@/lib/types";

type Step = "input" | "analysing" | "results" | "generating";

const PLACEHOLDER = `Paste the full job description here…

Example:
We're looking for a Senior Frontend Engineer to join our product team. You'll work on our core web platform using React, TypeScript, and GraphQL. You should have 5+ years of experience building production web apps…`;

export default function PrepPage() {
  const router = useRouter();
  const { setRawJD, setParsedJD: storeSetParsedJD, setQuestions } = useSessionStore();

  const [jdText, setJdText] = useState("");
  const [step, setStep] = useState<Step>("input");
  const [parsedJD, setParsedJD] = useState<ParsedJD | null>(null);
  const [error, setError] = useState<string | null>(null);

  const charCount = jdText.trim().length;
  const isReady = charCount >= 50;

  async function handleAnalyse() {
    if (!isReady) return;
    setStep("analysing");
    setError(null);
    try {
      const res = await fetch("/api/parse-jd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jdText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setParsedJD(data);
      setStep("results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
      setStep("input");
    }
  }

  async function handleGenerateQuestions() {
    if (!parsedJD) return;
    setStep("generating");
    setError(null);
    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: parsedJD.job_title,
          skills: parsedJD.required_skills,
          level: parsedJD.experience_level,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to generate questions.");
      setRawJD(jdText);
      storeSetParsedJD(parsedJD);
      setQuestions(data);
      router.push("/prep/session");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
      setStep("results");
    }
  }

  function handleReset() {
    setStep("input");
    setParsedJD(null);
    setError(null);
  }

  const stepIndex = step === "input" || step === "analysing" ? 0 : 1;

  return (
    <main className="min-h-screen bg-[#09090b] pt-24 pb-24">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[50rem] w-[50rem] rounded-full bg-violet-600/[0.06] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-2xl px-5 sm:px-8">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-1.5 text-[11px] text-zinc-600">
          <a href="/" className="hover:text-zinc-300 transition-colors">Home</a>
          <svg className="size-3 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          <span className="text-zinc-400">Prep Session</span>
        </div>

        {/* Step indicator */}
        <div className="mb-8 flex items-center gap-3">
          {["Paste JD", "Review Skills", "Practice"].map((label, i) => {
            const active = i === stepIndex;
            const done = i < stepIndex;
            return (
              <div key={label} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={`size-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                    done
                      ? "bg-violet-600 text-white shadow-md shadow-violet-900/40"
                      : active
                      ? "bg-violet-600/15 text-violet-300 ring-2 ring-violet-500/30"
                      : "bg-zinc-800/80 text-zinc-600"
                  }`}>
                    {done ? (
                      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : i + 1}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block transition-colors ${active ? "text-zinc-200" : done ? "text-zinc-400" : "text-zinc-600"}`}>
                    {label}
                  </span>
                </div>
                {i < 2 && (
                  <div className={`h-px w-8 sm:w-14 rounded transition-colors duration-300 ${done ? "bg-violet-600" : "bg-zinc-800/60"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Page header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {stepIndex === 0 ? "Paste the Job Description" : "Skills Analysis"}
          </h1>
          <p className="text-sm text-zinc-500 leading-relaxed">
            {stepIndex === 0
              ? "The more complete the JD, the more accurate your question set will be."
              : "Review what our AI extracted from the job description."}
          </p>
        </div>

        {/* ── Input step ───────────────────────────────── */}
        {(step === "input" || step === "analysing") && (
          <div className="space-y-4 fade-in-up">
            <div className="relative rounded-2xl border border-white/[0.07] bg-zinc-900 overflow-hidden">
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

              <div className="p-5 sm:p-6 space-y-4">
                <Textarea
                  label="Job Description"
                  hint="Copy the entire posting — skills, responsibilities, requirements."
                  placeholder={PLACEHOLDER}
                  rows={14}
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  disabled={step === "analysing"}
                  error={error ?? undefined}
                />

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2.5">
                    <div className="h-1 w-24 rounded-full overflow-hidden bg-zinc-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          charCount < 50 ? "bg-zinc-700" : charCount > 12000 ? "bg-amber-500" : "bg-violet-500"
                        }`}
                        style={{ width: `${Math.min(100, (charCount / 15000) * 100)}%` }}
                      />
                    </div>
                    <span className={`text-[11px] tabular-nums font-medium ${
                      charCount < 50 ? "text-zinc-700" : charCount > 12000 ? "text-amber-400" : "text-zinc-500"
                    }`}>
                      {charCount.toLocaleString()} / 15,000
                    </span>
                  </div>

                  <Button size="lg" loading={step === "analysing"} disabled={!isReady} onClick={handleAnalyse}>
                    {step === "analysing" ? "Analysing…" : "Analyse JD"}
                    {step !== "analysing" && (
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {step === "analysing" && (
              <div className="flex items-center gap-3 rounded-xl border border-violet-500/20 bg-violet-500/[0.06] px-4 py-3 fade-in-up">
                <LoadingDots />
                <p className="text-sm text-violet-300">Reading the JD and extracting structured data…</p>
              </div>
            )}
          </div>
        )}

        {/* ── Results step ─────────────────────────────── */}
        {(step === "results" || step === "generating") && parsedJD && (
          <div className="space-y-5 fade-in-up">
            <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3">
              <div className="size-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <svg className="size-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-emerald-300 font-medium">Analysis complete — {parsedJD.required_skills.length} skills extracted</p>
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-500/[0.06] border border-red-500/20 rounded-xl px-4 py-3 flex items-center gap-2">
                <svg className="size-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <SkillsBreakdown data={parsedJD} />

            {step === "generating" && (
              <div className="flex items-center gap-3 rounded-xl border border-violet-500/20 bg-violet-500/[0.06] px-4 py-3 fade-in-up">
                <LoadingDots />
                <p className="text-sm text-violet-300">Generating your tailored question set…</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" size="sm" onClick={handleReset} disabled={step === "generating"}>
                ← Different JD
              </Button>
              <Button size="lg" loading={step === "generating"} onClick={handleGenerateQuestions}>
                {step === "generating" ? "Generating…" : "Generate Questions"}
                {step !== "generating" && (
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function LoadingDots() {
  return (
    <div className="flex items-end gap-0.5 h-4 shrink-0">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1 rounded-full bg-violet-400 bounce-dot"
          style={{ height: "12px", animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}
