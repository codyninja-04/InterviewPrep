import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 overflow-hidden">
      {/* ── Ambient background ──────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-8rem] left-1/2 -translate-x-1/2 h-[50rem] w-full max-w-4xl rounded-full bg-violet-700/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-violet-800/5 blur-3xl" />
      </div>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <h1 className="mx-auto max-w-3xl text-5xl font-extrabold tracking-tight text-zinc-100 sm:text-6xl lg:text-7xl leading-[1.1]">
          Prep smarter.{" "}
          <span className="bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
            Interview better.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400 leading-relaxed">
          Paste any job description. PrepSync extracts the required skills,
          generates tailored interview questions, and scores your practice
          answers — all in under 60 seconds.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/prep">
            <Button size="lg" className="gap-2 text-base px-8">
              Start Prepping Free
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="ghost" size="lg" className="text-base">
              See how it works
            </Button>
          </a>
        </div>

        <p className="mt-8 text-xs text-zinc-600">
          No account required &middot; No credit card &middot; Completely free
        </p>
      </section>

      {/* ── How it works ────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="mx-auto max-w-5xl px-4 pb-32 sm:px-6"
      >
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-violet-400 mb-2">
            How it works
          </p>
          <h2 className="text-3xl font-bold text-zinc-100 tracking-tight">
            Three steps to interview-ready
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <Card
              key={i}
              className="p-6 space-y-4 hover:border-zinc-700 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400">
                  {step.icon}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="font-semibold text-zinc-100">{step.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 pb-32 sm:px-6 text-center">
        <Card glow className="p-12 space-y-6">
          <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">
            Ready to ace your next interview?
          </h2>
          <p className="text-zinc-400">
            Paste a JD and get a custom question set in under 30 seconds.
          </p>
          <Link href="/prep">
            <Button size="lg" className="text-base px-8">
              Get Started &rarr;
            </Button>
          </Link>
        </Card>
      </section>
    </main>
  );
}

// ── Static data ───────────────────────────────────────────────────────────────

const STEPS = [
  {
    icon: (
      <svg
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    title: "Paste the Job Description",
    description:
      "Copy the full JD from any job board. Our AI extracts skills, experience level, and key responsibilities.",
  },
  {
    icon: (
      <svg
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Practice Interview Questions",
    description:
      "Get 10 tailored questions — technical, behavioral, and situational — mapped to the exact skills the role requires.",
  },
  {
    icon: (
      <svg
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Get Scored & Improve",
    description:
      "Answer each question, then get an AI score, specific strengths and improvements, and a sample stronger answer.",
  },
];
