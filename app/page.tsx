import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 overflow-hidden">
      {/* ── Background ──────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dot-grid opacity-40" />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-10rem] left-1/2 -translate-x-1/2 h-[60rem] w-[60rem] rounded-full bg-violet-600/10 blur-[100px]" />
        <div className="absolute bottom-[-5rem] right-[-5rem] h-[40rem] w-[40rem] rounded-full bg-violet-900/8 blur-[80px]" />
      </div>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-5 py-32 text-center sm:px-8">

        {/* Announcement pill */}
        <div className="fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-1.5 text-xs font-medium text-violet-300 backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-violet-400 animate-pulse" />
          Powered by Gemini 2.0 Flash
          <span className="text-violet-500">·</span>
          Free to use
        </div>

        {/* Headline */}
        <h1 className="fade-in-up-1 mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-zinc-100 sm:text-6xl lg:text-7xl xl:text-[80px] leading-[1.08]">
          Land your dream job
          <br />
          <span className="gradient-text">interview-ready.</span>
        </h1>

        <p className="fade-in-up-2 mx-auto mt-6 max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed">
          Paste any job description. PrepSync extracts required skills, generates
          tailored interview questions, and scores your answers — in under 60 seconds.
        </p>

        {/* CTAs */}
        <div className="fade-in-up-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/prep">
            <Button size="lg" className="w-full sm:w-auto text-[15px] px-8 py-3 rounded-xl pulse-glow">
              Start Prepping Free
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-[15px] px-8 py-3 rounded-xl">
              See how it works
            </Button>
          </a>
        </div>

        <p className="fade-in-up-4 mt-6 text-xs text-zinc-600 tracking-wide">
          No account required · No credit card · 100% free
        </p>

        {/* Mock UI preview card */}
        <div className="fade-in-up-4 mt-16 sm:mt-20 w-full max-w-2xl mx-auto">
          <div className="relative rounded-2xl border border-white/[0.07] bg-zinc-900/80 backdrop-blur-sm shadow-2xl shadow-black/50 overflow-hidden">
            {/* Fake window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-zinc-950/50">
              <span className="size-3 rounded-full bg-zinc-700" />
              <span className="size-3 rounded-full bg-zinc-700" />
              <span className="size-3 rounded-full bg-zinc-700" />
              <span className="ml-3 text-xs text-zinc-600 font-mono">prepsync.ai/prep</span>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="violet">Senior Frontend Engineer</Badge>
                <Badge variant="emerald">Mid-Senior</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "GraphQL", "Node.js", "System Design"].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-400 text-xs font-medium border border-white/[0.05]">
                    {s}
                  </span>
                ))}
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-zinc-800/50 p-4 space-y-2">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Question 3 / 10</p>
                <p className="text-sm text-zinc-200 leading-relaxed">
                  How would you architect a real-time collaborative feature using React and WebSockets?
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Badge variant="violet">Technical</Badge>
                  <Badge variant="zinc">System Design</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="text-emerald-400 font-semibold">8.5/10</span>
                  <span>· Strong answer</span>
                </div>
                <span className="text-xs text-zinc-600">3 of 10 answered</span>
              </div>
            </div>
          </div>
          {/* Soft bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ── Stats strip ─────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-5 sm:px-8 pb-20">
        <div className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.03]">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 bg-zinc-950 px-4 py-6 sm:py-8">
              <p className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tabular-nums">{stat.value}</p>
              <p className="text-xs sm:text-sm text-zinc-500 text-center">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────── */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-5 sm:px-8 pb-32">
        <div className="mb-14 text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold gradient-text-white tracking-tight">
            Three steps to interview-ready
          </h2>
          <p className="text-zinc-500 max-w-md mx-auto text-sm">
            From raw job description to a fully scored mock interview in under a minute.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={i} className="group relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden sm:block absolute top-10 left-full w-4 h-px bg-gradient-to-r from-violet-500/30 to-transparent z-10" />
              )}
              <Card className="p-6 space-y-4 hover:border-violet-500/20 hover:bg-zinc-900/80 transition-all duration-300 hover:-translate-y-1 cursor-default h-full">
                <div className="flex items-start justify-between">
                  <div className="inline-flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 transition-colors duration-300">
                    {step.icon}
                  </div>
                  <span className="text-[11px] font-bold text-zinc-700 tabular-nums">
                    0{i + 1}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-zinc-100 text-[15px]">{step.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{step.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 pb-32">
        <div className="mb-14 text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">Features</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold gradient-text-white tracking-tight">
            Everything you need to prep
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Card key={i} className="p-5 space-y-3 hover:border-white/10 transition-colors duration-200">
              <div className={`inline-flex size-9 items-center justify-center rounded-xl ${f.iconBg}`}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-zinc-200 text-sm">{f.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{f.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-5 sm:px-8 pb-32 text-center">
        <div className="relative rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-950/30 to-zinc-950/80 p-10 sm:p-16 overflow-hidden glow-violet">
          <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
          <div className="relative space-y-6">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400 mx-auto">
              <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
                Ready to ace your next interview?
              </h2>
              <p className="text-zinc-400 text-sm max-w-sm mx-auto">
                Paste a JD and get a custom question set with AI scoring in under 30 seconds.
              </p>
            </div>
            <Link href="/prep">
              <Button size="lg" className="text-[15px] px-10 py-3">
                Get Started Free →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] py-8 px-5 sm:px-8">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-lg bg-violet-600 flex items-center justify-center">
              <svg className="size-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-zinc-400">
              Prep<span className="text-violet-400">Sync</span>
            </span>
          </div>
          <p className="text-xs text-zinc-700">
            © {new Date().getFullYear()} PrepSync. Built with AI.
          </p>
        </div>
      </footer>
    </main>
  );
}

// ── Static data ────────────────────────────────────────────────────────────────

const STATS = [
  { value: "10", label: "Tailored questions" },
  { value: "< 60s", label: "Time to first session" },
  { value: "3x", label: "Question types covered" },
];

const STEPS = [
  {
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Paste the Job Description",
    description: "Copy the full JD from any job board. Our AI extracts skills, seniority level, and key responsibilities instantly.",
  },
  {
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Practice Tailored Questions",
    description: "Get 10 role-specific questions — technical, behavioral, and situational — mapped to the exact skills the job requires.",
  },
  {
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Get Scored & Improve",
    description: "Submit your answers and receive an instant AI score, specific strengths, improvement areas, and a stronger sample answer.",
  },
];

const FEATURES = [
  {
    icon: <svg className="size-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    iconBg: "bg-violet-500/10",
    title: "Instant JD Analysis",
    description: "AI extracts required skills, preferred skills, and culture signals from any job posting in seconds.",
  },
  {
    icon: <svg className="size-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    iconBg: "bg-emerald-500/10",
    title: "AI Answer Scoring",
    description: "Every answer is scored 1–10 with specific feedback on strengths, what to improve, and a stronger sample response.",
  },
  {
    icon: <svg className="size-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    iconBg: "bg-sky-500/10",
    title: "3 Question Types",
    description: "Technical, behavioral (STAR format), and situational questions — the full spectrum of a real interview.",
  },
  {
    icon: <svg className="size-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    iconBg: "bg-amber-500/10",
    title: "Readiness Score",
    description: "See your overall interview readiness score and per-question breakdown after completing a session.",
  },
  {
    icon: <svg className="size-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    iconBg: "bg-rose-500/10",
    title: "No Account Needed",
    description: "Jump straight in. No sign-up, no credit card, no friction — your session is saved locally.",
  },
  {
    icon: <svg className="size-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    iconBg: "bg-violet-500/10",
    title: "Role-Specific",
    description: "Questions are generated specifically for your target role — not generic interview questions from a database.",
  },
];
