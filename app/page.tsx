import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#09090b] overflow-hidden">

      {/* ── Background ─────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />
        <div className="absolute top-[-20rem] left-1/2 -translate-x-1/2 h-[80rem] w-[80rem] rounded-full bg-violet-600/[0.07] blur-[120px]" />
        <div className="absolute top-[30rem] right-[-15rem] h-[50rem] w-[50rem] rounded-full bg-indigo-600/[0.05] blur-[100px]" />
      </div>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-5 pt-32 pb-20 text-center sm:px-8">

        {/* Top badge */}
        <div className="fade-in-up mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/8 px-4 py-1.5 text-xs font-medium text-violet-300 backdrop-blur-sm">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-violet-400" />
            </span>
            AI-powered interview prep · Free forever
          </span>
        </div>

        {/* Headline */}
        <h1 className="fade-in-up-1 mx-auto max-w-4xl text-[clamp(2.8rem,8vw,5.5rem)] font-extrabold tracking-[-0.03em] leading-[1.06]">
          <span className="text-white">Stop guessing.</span>
          <br />
          <span className="gradient-text-animated">Ace your interview.</span>
        </h1>

        <p className="fade-in-up-2 mx-auto mt-7 max-w-lg text-[clamp(1rem,2.5vw,1.125rem)] text-zinc-400 leading-relaxed">
          Paste any job description and get a fully tailored interview session —
          custom questions, AI scoring, and actionable feedback in under 60 seconds.
        </p>

        {/* CTAs */}
        <div className="fade-in-up-3 mt-10 flex flex-col sm:flex-row items-center gap-3">
          <Link href="/prep">
            <button className="group relative inline-flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-violet-900/40 transition-all duration-200 hover:bg-violet-500 hover:-translate-y-0.5 hover:shadow-violet-800/50 pulse-glow">
              Start Prepping Free
              <svg className="size-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </Link>
          <a href="#how-it-works">
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-8 py-3.5 text-[15px] font-medium text-zinc-300 backdrop-blur-sm transition-all duration-200 hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white">
              See how it works
            </button>
          </a>
        </div>

        <p className="fade-in-up-4 mt-5 text-xs text-zinc-600 tracking-wide">
          No credit card · No account required · Takes 60 seconds
        </p>

        {/* Hero visual */}
        <div className="fade-in-up-5 mt-16 w-full max-w-3xl mx-auto">
          <div className="relative">
            {/* Glow behind card */}
            <div className="absolute inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-violet-500/15 to-transparent opacity-50 blur-sm" />

            <div className="relative rounded-2xl border border-white/[0.08] bg-zinc-900/90 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden beam">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3.5 border-b border-white/[0.06] bg-zinc-950/60">
                <span className="size-3 rounded-full bg-rose-500/70" />
                <span className="size-3 rounded-full bg-amber-500/70" />
                <span className="size-3 rounded-full bg-emerald-500/70" />
                <div className="mx-auto flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-zinc-800/60 px-3 py-1">
                  <svg className="size-3 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                  <span className="text-[11px] text-zinc-500 font-mono">prepsync.app/prep</span>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Role header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[11px] text-zinc-600 uppercase tracking-widest font-medium">Analysed Role</p>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-bold text-zinc-100">Senior Frontend Engineer</p>
                      <Badge variant="violet">Senior</Badge>
                    </div>
                    <p className="text-xs text-zinc-500">Stripe · San Francisco, CA</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-zinc-600 uppercase tracking-widest font-medium mb-1">Readiness</p>
                    <p className="text-2xl font-extrabold text-emerald-400 tabular-nums">82%</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "React", color: "bg-violet-500/10 text-violet-300 ring-violet-500/20" },
                    { label: "TypeScript", color: "bg-sky-500/10 text-sky-300 ring-sky-500/20" },
                    { label: "GraphQL", color: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20" },
                    { label: "Node.js", color: "bg-amber-500/10 text-amber-300 ring-amber-500/20" },
                    { label: "System Design", color: "bg-rose-500/10 text-rose-300 ring-rose-500/20" },
                  ].map((s) => (
                    <span key={s.label} className={`px-2.5 py-1 rounded-lg text-xs font-medium ring-1 ring-inset ${s.color}`}>
                      {s.label}
                    </span>
                  ))}
                </div>

                {/* Question card */}
                <div className="rounded-xl border border-white/[0.07] bg-zinc-800/50 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="violet">Technical</Badge>
                      <Badge variant="zinc">System Design</Badge>
                    </div>
                    <span className="text-[11px] text-zinc-600 tabular-nums font-medium">3 / 8</span>
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed font-medium">
                    How would you architect a real-time collaborative feature using React and WebSockets at scale?
                  </p>
                  {/* Fake answer */}
                  <div className="rounded-lg bg-zinc-900/60 border border-white/[0.05] p-3">
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                      I would use a WebSocket server with Redis pub/sub for horizontal scaling, implementing optimistic UI updates on the client...
                    </p>
                  </div>
                </div>

                {/* Score row */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-violet-600 to-violet-400" />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-bold text-emerald-400 tabular-nums">8.5</span>
                    <span className="text-xs text-zinc-600">/10 · Strong answer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom glow */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── Social proof marquee ────────────────────────── */}
      <section className="pb-24 overflow-hidden">
        <p className="text-center text-xs text-zinc-700 uppercase tracking-widest font-semibold mb-8">
          Trusted by candidates at
        </p>
        <div className="relative flex overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />
          <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
            {[...COMPANIES, ...COMPANIES].map((company, i) => (
              <span key={i} className="text-zinc-600 text-sm font-semibold tracking-wide hover:text-zinc-400 transition-colors cursor-default">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────── */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-5 sm:px-8 pb-32">
        <div className="mb-16 text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">How it works</p>
          <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold tracking-tight gradient-text-white">
            Interview-ready in 3 steps
          </h2>
          <p className="text-zinc-500 max-w-sm mx-auto text-sm leading-relaxed">
            From raw job description to a fully scored mock interview in under a minute.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={i} className="group relative">
              {i < STEPS.length - 1 && (
                <div className="hidden sm:block absolute top-12 left-[calc(100%+8px)] right-0 w-4 h-px bg-gradient-to-r from-violet-500/40 to-transparent z-10" />
              )}
              <div className="h-full rounded-2xl border border-white/[0.07] bg-zinc-900 p-6 space-y-5 hover:border-violet-500/25 hover:bg-zinc-900/80 transition-all duration-300 hover:-translate-y-1 cursor-default group-hover:shadow-lg group-hover:shadow-violet-950/30">
                <div className="flex items-start justify-between">
                  <div className="inline-flex size-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 transition-colors duration-300 ring-1 ring-violet-500/20">
                    {step.icon}
                  </div>
                  <span className="text-[11px] font-bold text-zinc-800 tabular-nums tracking-widest">0{i + 1}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-zinc-100 text-[15px]">{step.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bento features grid ──────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 pb-32">
        <div className="mb-16 text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">Features</p>
          <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold tracking-tight gradient-text-white">
            Everything to land the job
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large feature */}
          <div className="sm:col-span-2 rounded-2xl border border-white/[0.07] bg-zinc-900 p-7 space-y-4 hover:border-violet-500/20 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/5 rounded-full blur-3xl group-hover:bg-violet-600/10 transition-all duration-500" />
            <div className="inline-flex size-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20">
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-zinc-100 text-base mb-1.5">Instant JD Analysis</h3>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">AI extracts required skills, preferred skills, experience level, and culture signals from any job posting in seconds. No copy-paste guesswork.</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {["React", "TypeScript", "System Design", "Node.js"].map(s => (
                <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-400 text-xs font-medium border border-white/[0.05]">{s}</span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-zinc-900 p-7 space-y-4 hover:border-emerald-500/20 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-600/5 rounded-full blur-3xl group-hover:bg-emerald-600/10 transition-all duration-500" />
            <div className="inline-flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-zinc-100 text-base mb-1.5">AI Answer Scoring</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Scored 1–10 with specific strengths, improvements, and a stronger sample answer.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-emerald-400 tabular-nums">8.5</span>
              <span className="text-xs text-zinc-600">/10 · Strong answer</span>
            </div>
          </div>

          {FEATURES.map((f, i) => (
            <div key={i} className={`rounded-2xl border border-white/[0.07] bg-zinc-900 p-6 space-y-3 hover:border-white/[0.12] transition-all duration-300 group relative overflow-hidden`}>
              <div className={`inline-flex size-9 items-center justify-center rounded-xl ${f.iconBg} ring-1 ${f.iconRing}`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-zinc-200 text-sm">{f.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-5 sm:px-8 pb-32">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/60 via-zinc-950 to-zinc-950" />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
          <div className="absolute top-[-4rem] left-1/2 -translate-x-1/2 h-[20rem] w-[20rem] rounded-full bg-violet-600/15 blur-[60px]" />

          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400 ring-1 ring-violet-500/30 mx-auto">
                <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold text-white tracking-tight">
                Your next offer starts here.
              </h2>
              <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
                Join thousands of candidates who prep smarter, answer better, and walk into interviews confident.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/prep">
                <button className="group inline-flex items-center gap-2 rounded-xl bg-violet-600 px-10 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-violet-900/40 transition-all duration-200 hover:bg-violet-500 hover:-translate-y-0.5 hover:shadow-violet-800/50">
                  Get Started — It&apos;s Free
                  <svg className="size-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            </div>
            <p className="text-xs text-zinc-700">No sign-up required. Start in 10 seconds.</p>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] py-10 px-5 sm:px-8">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-md shadow-violet-900/40">
              <svg className="size-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-zinc-400">
              Prep<span className="text-violet-400">Sync</span>
            </span>
          </div>
          <p className="text-xs text-zinc-700">© {new Date().getFullYear()} PrepSync. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const COMPANIES = ["Google", "Meta", "Apple", "Amazon", "Microsoft", "Netflix", "Stripe", "Airbnb", "Uber", "OpenAI", "Notion", "Figma", "Vercel", "Linear"];

const STEPS = [
  {
    icon: <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    title: "Paste the Job Description",
    description: "Copy the full JD from any job board. Our AI extracts skills, seniority level, and responsibilities instantly.",
  },
  {
    icon: <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "Practice Tailored Questions",
    description: "Get 8 role-specific questions — technical, behavioral, and situational — mapped to the exact skills the job requires.",
  },
  {
    icon: <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    title: "Get Scored & Improve",
    description: "Receive an instant AI score, specific strengths, improvement areas, and a stronger sample answer for every response.",
  },
];

const FEATURES = [
  {
    icon: <svg className="size-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    iconBg: "bg-sky-500/10", iconRing: "ring-sky-500/20",
    title: "3 Question Types",
    description: "Technical, behavioral (STAR), and situational — the full spectrum of a real interview.",
  },
  {
    icon: <svg className="size-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    iconBg: "bg-amber-500/10", iconRing: "ring-amber-500/20",
    title: "Readiness Score",
    description: "Overall score + per-question breakdown after every session so you know exactly where to improve.",
  },
  {
    icon: <svg className="size-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    iconBg: "bg-rose-500/10", iconRing: "ring-rose-500/20",
    title: "No Account Needed",
    description: "Jump straight in. No sign-up, no credit card — your session is ready in seconds.",
  },
];
