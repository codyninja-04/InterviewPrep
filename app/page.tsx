import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default function LandingPage() {
  return (
    <main className="grain relative min-h-screen overflow-hidden bg-[#0a0a0c]">

      {/* ── Background ─────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0c]" />
        <div className="absolute top-[-26rem] left-1/2 h-[64rem] w-[64rem] -translate-x-1/2 rounded-full bg-violet-700/[0.06] blur-[140px]" />
      </div>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative mx-auto flex min-h-[92vh] max-w-5xl flex-col items-center justify-center px-5 pt-32 pb-20 text-center sm:px-8">

        {/* Eyebrow */}
        <div className="fade-in-up mb-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-zinc-400">
            <span className="size-1.5 rounded-full bg-violet-400" />
            Interview practice, tailored to the role
          </span>
        </div>

        {/* Headline */}
        <h1 className="fade-in-up-1 mx-auto max-w-3xl font-display text-[clamp(2.6rem,7vw,4.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-zinc-50">
          Practice the interview
          <br />
          <span className="display-italic text-zinc-300">before it happens.</span>
        </h1>

        <p className="fade-in-up-2 mx-auto mt-7 max-w-xl text-[clamp(1rem,2.2vw,1.15rem)] leading-relaxed text-zinc-400">
          Paste a job description and PrepSync builds a focused mock interview
          around it. You get questions written for that role, clear scoring, and
          feedback you can actually act on.
        </p>

        {/* CTAs */}
        <div className="fade-in-up-3 mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/prep">
            <button className="group inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-violet-500">
              Start practicing
              <svg className="size-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </Link>
          <a href="#how-it-works">
            <button className="inline-flex items-center gap-2 rounded-lg border border-white/[0.1] bg-transparent px-6 py-3 text-[15px] font-medium text-zinc-300 transition-colors duration-200 hover:border-white/[0.2] hover:text-white">
              See how it works
            </button>
          </a>
        </div>

        <p className="fade-in-up-4 mt-5 text-xs text-zinc-600">
          Free to use. No account required.
        </p>

        {/* Hero visual */}
        <div className="fade-in-up-5 relative mx-auto mt-16 w-full max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/90 shadow-2xl shadow-black/50 backdrop-blur-xl">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-zinc-950/60 px-4 py-3.5">
              <span className="size-3 rounded-full bg-zinc-700" />
              <span className="size-3 rounded-full bg-zinc-700" />
              <span className="size-3 rounded-full bg-zinc-700" />
              <div className="mx-auto flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-zinc-800/60 px-3 py-1">
                <svg className="size-3 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
                <span className="font-mono text-[11px] text-zinc-500">prepsync.app/prep</span>
              </div>
            </div>

            <div className="space-y-5 p-6 text-left">
              {/* Role header */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-600">Analysed role</p>
                  <div className="flex items-center gap-2">
                    <p className="font-display text-lg font-semibold text-zinc-100">Senior Frontend Engineer</p>
                    <Badge variant="violet">Senior</Badge>
                  </div>
                  <p className="text-xs text-zinc-500">Stripe · San Francisco, CA</p>
                </div>
                <div className="text-right">
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-zinc-600">Readiness</p>
                  <p className="font-display text-3xl font-semibold tabular-nums text-emerald-400">82%</p>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "GraphQL", "Node.js", "System Design"].map((s) => (
                  <span key={s} className="rounded-md border border-white/[0.06] bg-zinc-800/70 px-2.5 py-1 text-xs font-medium text-zinc-400">
                    {s}
                  </span>
                ))}
              </div>

              {/* Question card */}
              <div className="space-y-3 rounded-xl border border-white/[0.07] bg-zinc-800/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="violet">Technical</Badge>
                    <Badge variant="zinc">System Design</Badge>
                  </div>
                  <span className="font-mono text-[11px] tabular-nums text-zinc-600">3 / 8</span>
                </div>
                <p className="text-sm font-medium leading-relaxed text-zinc-200">
                  How would you architect a real-time collaborative feature using React and WebSockets at scale?
                </p>
                <div className="rounded-lg border border-white/[0.05] bg-zinc-900/60 p-3">
                  <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500">
                    I would use a WebSocket server with Redis pub/sub for horizontal scaling, implementing optimistic UI updates on the client...
                  </p>
                </div>
              </div>

              {/* Score row */}
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full w-[85%] rounded-full bg-violet-500" />
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm font-bold tabular-nums text-emerald-400">8.5</span>
                  <span className="text-xs text-zinc-600">/10 · Strong answer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0c] to-transparent" />
        </div>
      </section>

      {/* ── Social proof marquee ────────────────────────── */}
      <section className="overflow-hidden pb-28">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-zinc-700">
          Practice for roles at companies like
        </p>
        <div className="relative flex overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-r from-[#0a0a0c] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-l from-[#0a0a0c] to-transparent" />
          <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
            {[...COMPANIES, ...COMPANIES].map((company, i) => (
              <span key={i} className="cursor-default text-sm font-medium tracking-wide text-zinc-600 transition-colors hover:text-zinc-400">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────── */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-5 pb-28 sm:px-8">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300/70">How it works</p>
          <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-medium leading-tight tracking-tight text-zinc-50">
            From a job post to a scored rehearsal, in three steps.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={i} className="group relative">
              {i < STEPS.length - 1 && (
                <div className="absolute top-12 left-[calc(100%+8px)] right-0 z-10 hidden h-px w-4 bg-gradient-to-r from-white/15 to-transparent sm:block" />
              )}
              <div className="tilt-card h-full rounded-2xl border border-white/[0.07] bg-zinc-900/70 p-6 hover:border-white/[0.14]">
                <div className="mb-5 flex items-start justify-between">
                  <div className="inline-flex size-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/20">
                    {step.icon}
                  </div>
                  <span className="font-display text-2xl font-medium leading-none text-zinc-700">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mb-2 text-[15px] font-semibold text-zinc-100">{step.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sample report ───────────────────────────────── */}
      <section id="sample" className="mx-auto max-w-5xl px-5 pb-28 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300/70">The feedback</p>
            <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-medium leading-tight tracking-tight text-zinc-50">
              Feedback that tells you what to fix.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-zinc-400">
              Every answer comes back with a score, the parts that worked, the
              parts that did not, and a stronger version to learn from. Specific,
              not vague.
            </p>
            <ul className="mt-7 space-y-3">
              {SAMPLE_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-zinc-300">
                  <svg className="mt-0.5 size-4 shrink-0 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Mock feedback card */}
          <div className="relative space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-900/80 p-6 shadow-xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-zinc-600">Question 4 · Behavioral</p>
                <p className="mt-1 text-sm font-medium text-zinc-200">Tell me about a project that failed.</p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-semibold tabular-nums text-zinc-100">7.0</p>
                <p className="text-[10px] uppercase tracking-widest text-zinc-600">/10</p>
              </div>
            </div>

            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-emerald-400/90">
                <span className="size-1.5 rounded-full bg-emerald-400" /> What worked
              </p>
              <p className="text-xs leading-relaxed text-zinc-400">
                You owned the mistake without blaming the team and showed real reflection on the root cause.
              </p>
            </div>

            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-400/90">
                <span className="size-1.5 rounded-full bg-amber-400" /> What to improve
              </p>
              <p className="text-xs leading-relaxed text-zinc-400">
                Add one concrete number and close on what you changed in how you work since.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">A stronger version</p>
              <p className="font-display text-sm italic leading-relaxed text-zinc-300">
                &ldquo;We shipped late and lost 12% of trial signups that month. I had under-scoped QA. Now I write a risk list before every launch.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features grid ────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 pb-28 sm:px-8">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300/70">What is inside</p>
          <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-medium leading-tight tracking-tight text-zinc-50">
            Everything you need to walk in ready.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Large feature */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-900/70 p-7 transition-colors duration-300 hover:border-white/[0.14] sm:col-span-2">
            <div className="inline-flex size-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/20">
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-1.5 mt-4 text-base font-semibold text-zinc-100">It reads the job for you</h3>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
              PrepSync pulls out the required skills, the nice-to-haves, the
              seniority, and the responsibilities, so the questions match what the
              role actually asks for.
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {["React", "TypeScript", "System Design", "Node.js"].map((s) => (
                <span key={s} className="rounded-md border border-white/[0.05] bg-zinc-800/70 px-2.5 py-1 text-xs font-medium text-zinc-400">{s}</span>
              ))}
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-900/70 p-7 transition-colors duration-300 hover:border-white/[0.14]">
            <div className="inline-flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-1.5 mt-4 text-base font-semibold text-zinc-100">Clear scoring</h3>
            <p className="text-sm leading-relaxed text-zinc-500">Each answer scored 1 to 10, with the strengths, the gaps, and a sharper sample.</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="font-display text-2xl font-semibold tabular-nums text-emerald-400">8.5</span>
              <span className="text-xs text-zinc-600">/10 · Strong answer</span>
            </div>
          </div>

          {FEATURES.map((f, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-900/70 p-6 transition-colors duration-300 hover:border-white/[0.14]">
              <div className="inline-flex size-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300 ring-1 ring-white/[0.06]">
                {f.icon}
              </div>
              <h3 className="mb-1.5 mt-3 text-sm font-semibold text-zinc-200">{f.title}</h3>
              <p className="text-xs leading-relaxed text-zinc-500">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-5 pb-28 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-zinc-900/60">
          <div className="absolute top-[-6rem] left-1/2 h-[18rem] w-[18rem] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[80px]" />
          <div className="relative space-y-7 px-8 py-16 text-center sm:px-16 sm:py-20">
            <h2 className="mx-auto max-w-xl font-display text-[clamp(1.8rem,4vw,2.75rem)] font-medium leading-tight tracking-tight text-zinc-50">
              Prepare properly for the next one.
            </h2>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-zinc-400">
              Paste the job description, answer a few questions, and see exactly
              where you stand before the real conversation.
            </p>

            <div className="flex justify-center">
              <Link href="/prep">
                <button className="group inline-flex items-center gap-2 rounded-lg bg-violet-600 px-7 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-violet-500">
                  Start practicing
                  <svg className="size-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            </div>
            <p className="text-xs text-zinc-600">No sign-up required.</p>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Logo className="size-7" />
            <span className="font-display text-base font-semibold text-zinc-300">
              Prep<span className="text-violet-300">Sync</span>
            </span>
          </div>
          <p className="text-xs text-zinc-700">© {new Date().getFullYear()} PrepSync</p>
        </div>
      </footer>
    </main>
  );
}

// ── Brand mark ──────────────────────────────────────────────────────────────────
function Logo({ className = "size-7" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 ${className}`}>
      <svg className="size-1/2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
        <path d="M4 12h2M9 7v10M14 4v16M19 9v6M22 11h-1" />
      </svg>
    </span>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const COMPANIES = ["Google", "Meta", "Apple", "Amazon", "Microsoft", "Netflix", "Stripe", "Airbnb", "Uber", "OpenAI", "Notion", "Figma", "Vercel", "Linear"];

const SAMPLE_POINTS = [
  "A clear score so you know where you stand",
  "The specific points that worked",
  "Exact fixes, not vague advice",
  "A stronger sample answer to learn from",
];

const STEPS = [
  {
    icon: <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    title: "Paste the job description",
    description: "Drop in the full post from any job board. PrepSync reads the skills, seniority, and responsibilities in seconds.",
  },
  {
    icon: <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "Answer real questions",
    description: "Eight questions built for the role, across technical, behavioral, and situational, mapped to the skills it asks for.",
  },
  {
    icon: <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    title: "Review your score",
    description: "A score, the strengths worth keeping, the gaps to close, and a stronger sample answer for every reply.",
  },
];

const FEATURES = [
  {
    icon: <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    title: "Three question types",
    description: "Technical, behavioral with STAR, and situational. The full range of a real interview.",
  },
  {
    icon: <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    title: "Readiness score",
    description: "An overall score and a per-question breakdown after each session, so you know where to focus.",
  },
  {
    icon: <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    title: "Nothing in your way",
    description: "No account, no card, no setup. Start a session and it is ready in seconds.",
  },
];
