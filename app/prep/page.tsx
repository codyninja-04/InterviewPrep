"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { SkillsBreakdown } from "@/components/SkillsBreakdown";
import { useSessionStore } from "@/store/useSessionStore";
import type { ParsedJD } from "@/lib/types";

type Step = "input" | "analysing" | "results" | "generating";

const PLACEHOLDER = `Paste the full job description here…

Example:
We're looking for a Senior Frontend Engineer to join our product team. You'll be working on our core web platform using React, TypeScript, and GraphQL...`;

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

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

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

      // Persist everything in the Zustand store before navigating
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

  return (
    <main className="min-h-screen bg-zinc-950 pt-20 pb-16">
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40rem] w-full max-w-3xl rounded-full bg-violet-600/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Page header */}
        <div className="mb-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-violet-600/20 text-violet-400">
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-violet-400">
              Step 1 of 3
            </span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">
            Paste the Job Description
          </h1>
          <p className="text-sm text-zinc-400 max-w-lg">
            Our AI will extract the required skills, experience level, and responsibilities — then generate a tailored question set just for this role.
          </p>
        </div>

        {/* ── Input step ─────────────────────────────────────────── */}
        {(step === "input" || step === "analysing") && (
          <Card className="p-6 space-y-4">
            <Textarea
              label="Job Description"
              hint="Copy the entire posting — the more context, the better the questions."
              placeholder={PLACEHOLDER}
              rows={14}
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              disabled={step === "analysing"}
              error={error ?? undefined}
            />

            {/* Footer row */}
            <div className="flex items-center justify-between">
              <span
                className={`text-xs tabular-nums transition-colors ${
                  charCount < 50
                    ? "text-zinc-600"
                    : charCount > 12_000
                    ? "text-amber-400"
                    : "text-zinc-500"
                }`}
              >
                {charCount.toLocaleString()} / 15,000 chars
              </span>

              <Button
                size="lg"
                loading={step === "analysing"}
                disabled={!isReady}
                onClick={handleAnalyse}
              >
                {step === "analysing" ? "Analysing…" : "Analyse JD"}
                {step !== "analysing" && (
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </Button>
            </div>
          </Card>
        )}

        {/* ── Analysing / Generating indicators ──────────────────── */}
        {(step === "analysing" || step === "generating") && (
          <div className="mt-6 flex flex-col items-center gap-3 text-zinc-400 text-sm">
            <AnalysingIndicator />
            <p>
              {step === "analysing"
                ? "Reading the JD and extracting structured data…"
                : "Generating your tailored question set…"}
            </p>
          </div>
        )}

        {/* ── Results step ───────────────────────────────────────── */}
        {(step === "results" || step === "generating") && parsedJD && (
          <div className="space-y-6">
            {/* Success header */}
            <div className="flex items-center gap-2">
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <p className="text-sm text-emerald-400 font-medium">Analysis complete</p>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <SkillsBreakdown data={parsedJD} />

            {/* CTA row */}
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={handleReset} disabled={step === "generating"}>
                ← Try a different JD
              </Button>
              <Button size="lg" loading={step === "generating"} onClick={handleGenerateQuestions}>
                {step === "generating" ? "Generating…" : "Generate Questions"}
                {step !== "generating" && (
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

// ── Sub-components ────────────────────────────────────────────────────────────

function AnalysingIndicator() {
  return (
    <div className="flex items-end gap-1 h-6">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-1 rounded-full bg-violet-500 animate-bounce"
          style={{
            height: `${12 + i * 4}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: "0.8s",
          }}
        />
      ))}
    </div>
  );
}
