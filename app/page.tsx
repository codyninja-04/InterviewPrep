import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default function LandingPage() {
  return (
    <main className="grain relative min-h-screen overflow-hidden bg-[#0a0a0c]">

      {/* ── Background ─────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0c]" />
        {/* warm + cool aurora wash */}
        <div className="aurora absolute top-[-24rem] left-1/2 h-[70rem] w-[70rem] -translate-x-1/2 rounded-full bg-violet-600/[0.08] blur-[130px]" />
        <div className="aurora-slow absolute top-[18rem] right-[-18rem] h-[46rem] w-[46rem] rounded-full bg-amber-500/[0.06] blur-[120px]" />
        <div className="aurora absolute bottom-[-20rem] left-[-14rem] h-[44rem] w-[44rem] rounded-full bg-indigo-600/[0.05] blur-[120px]" />
      </div>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-5 pt-32 pb-20 text-center sm:px-8">

        {/* Top badge */}
        <div className="fade-in-up mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/[0.06] px-4 py-1.5 text-xs font-medium text-amber-200/90 backdrop-blur-sm">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-amber-400" />
            </span>
            Made for the night before the interview
          </span>
        </div>

        {/* Headline */}
        <h1 className="fade-in-up-1 mx-auto max-w-4xl font-display text-[clamp(3rem,8.5vw,6rem)] font-medium leading-[1.02] tracking-[-0.02em] text-white">
          Rehearse the{" "}
          <span className="ink-highlight"><span>interview</span></span>
          <br />
          <span className="display-italic gradient-warm-animated">before it happens.</span>
        </h1>

        <p className="fade-in-up-2 mx-auto mt-8 max-w-xl text-[clamp(1rem,2.5vw,1.2rem)] leading-relaxed text-zinc-400">
          Paste the job description. PrepSync turns it into a real mock interview
          with questions written for that exact role, instant AI scoring, and
          feedback that tells you what to fix. No fluff, no sign-up.
        </p>

        {/* CTAs */}
        <div className="fade-in-up-3 mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/prep">
            <button className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-violet-500 to-violet-600 px-8 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-violet-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-violet-700/50 glow-sm">
              Start a mock interview
              <svg className="size-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </Link>
          <a href="#sample">
            <button className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-8 py-3.5 text-[15px] font-medium text-zinc-300 backdrop-blur-sm transition-all duration-200 hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white">
              Peek at a report
            </button>
          </a>
        </div>

        <p className="fade-in-up-4 mt-5 text-xs tracking-wide text-zinc-600">
          Free to use. No account needed. Ready in about a minute.
        </p>

        {/* Hero visual */}
        <div className="fade-in-up-5 relative mx-auto mt-16 w-full max-w-3xl">
          {/* Floating sticky note — personality */}
          <div className="absolute -left-6 top-16 z-20 hidden rotate-[-6deg] lg:block">
            <div className="float w-44 rounded-xl border border-amber-300/20 bg-amber-300/[0.07] p-3.5 backdrop-blur-md shadow-xl shadow-black/40">
              <p className="font-display text-sm italic leading-snug text-amber-100/90">
                &ldquo;Lead with the metric, then the how.&rdquo;
              </p>
              <p className="mt-1.5 text-[10px] uppercase tracking-widest text-amber-200/50">Coach note</p>
            </div>
          </div>

          {/* Floating score chip */}
          <div className="absolute -right-4 top-44 z-20 hidden rotate-[5deg] lg:block">
            <div className="float w-32 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] p-3 text-center backdrop-blur-md shadow-xl shadow-black/40" style={{ animationDelay: "1.2s" }}>
              <p className="font-display text-3xl font-semibold text-emerald-300">8.5</p>
              <p className="text-[10px] uppercase tracking-widest text-emerald-200/50">Strong answer</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-violet-500/15 to-transparent opacity-50 blur-sm" />

            <div className="beam relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/90 shadow-2xl shadow-black/60 backdrop-blur-xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] bg-zinc-950/60 px-4 py-3.5">
                <span className="size-3 rounded-full bg-rose-500/70" />
                <span className="size-3 rounded-full bg-amber-500/70" />
                <span className="size-3 rounded-full bg-emerald-500/70" />
                <div className="mx-auto flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-zinc-800/60 px-3 py-1">
                  <svg className="size-3 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                  <span className="font-mono text-[11px] text-zinc-500">prepsync.app/prep</span>
                </div>
              </div>

              <div className="space-y-5 p-6">
                {/* Role header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1 text-left">
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
                  {[
                    { label: "React", color: "bg-violet-500/10 text-violet-300 ring-violet-500/20" },
                    { label: "TypeScript", color: "bg-sky-500/10 text-sky-300 ring-sky-500/20" },
                    { label: "GraphQL", color: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20" },
                    { label: "Node.js", color: "bg-amber-500/10 text-amber-300 ring-amber-500/20" },
                    { label: "System Design", color: "bg-rose-500/10 text-rose-300 ring-rose-500/20" },
                  ].map((s) => (
                    <span key={s.label} className={`rounded-lg px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${s.color}`}>
                      {s.label}
                    </span>
                  ))}
                </div>

                {/* Question card */}
                <div className="space-y-3 rounded-xl border border-white/[0.07] bg-zinc-800/50 p-4 text-left">
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
                    <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-violet-600 to-violet-400" />
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
        </div>
      </section>

      {/* ── Social proof marquee ────────────────────────── */}
      <section className="overflow-hidden pb-24">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-zinc-700">
          Tuned on real postings from teams like
        </p>
        <div className="relative flex overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-r from-[#0a0a0c] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-l from-[#0a0a0c] to-transparent" />
          <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
            {[...COMPANIES, ...COMPANIES].map((company, i) => (
              <span key={i} className="cursor-default text-sm font-semibold tracking-wide text-zinc-600 transition-colors hover:text-zinc-400">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────── */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-5 pb-32 sm:px-8">
        <div className="mb-16 max-w-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-400/80">How it works</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-tight tracking-tight text-white">
            Three steps from a job post to a{" "}
            <span className="display-italic gradient-warm">scored rehearsal.</span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={i} className="group relative">
              {i < STEPS.length - 1 && (
                <div className="absolute top-12 left-[calc(100%+8px)] right-0 z-10 hidden h-px w-4 bg-gradient-to-r from-violet-500/40 to-transparent sm:block" />
              )}
              <div className="tilt-card h-full rounded-2xl border border-white/[0.07] bg-zinc-900/80 p-6 hover:border-amber-400/25 hover:shadow-lg hover:shadow-amber-950/20">
                <div className="mb-5 flex items-start justify-between">
                  <div className="inline-flex size-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/20 transition-colors duration-300 group-hover:bg-amber-400/10 group-hover:text-amber-300 group-hover:ring-amber-400/20">
                    {step.icon}
                  </div>
                  <span className="font-display text-3xl font-semibold leading-none text-zinc-800 transition-colors group-hover:text-zinc-700">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mb-2 text-[15px] font-bold text-zinc-100">{step.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sample report ───────────────────────────────── */}
      <section id="sample" className="mx-auto max-w-5xl px-5 pb-32 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-400/80">The feedback</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-tight tracking-tight text-white">
              A report you&apos;ll{" "}
              <span className="display-italic gradient-warm">actually read.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-zinc-400">
              Every answer comes back with a score, the parts that landed, the
              parts that did not, and a stronger version you can borrow from. It
              reads like notes from a friend who has sat on the other side of the
              table.
            </p>
            <ul className="mt-7 space-y-3">
              {SAMPLE_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-zinc-300">
                  <svg className="mt-0.5 size-4 shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Mock feedback card */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-amber-500/10 via-transparent to-violet-500/10 blur-xl" />
            <div className="relative space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-900/90 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-zinc-600">Question 4 · Behavioral</p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">Tell me about a project that failed.</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-semibold tabular-nums text-amber-300">7.0</p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-600">/10</p>
                </div>
              </div>

              <div>
                <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400" /> What landed
                </p>
                <p className="text-xs leading-relaxed text-zinc-400">
                  You owned the mistake without blaming the team and showed real reflection on the root cause.
                </p>
              </div>

              <div>
                <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-400">
                  <span className="size-1.5 rounded-full bg-amber-400" /> Make it stronger
                </p>
                <p className="text-xs leading-relaxed text-zinc-400">
                  Add one concrete number and end on what you changed in how you work since.
                </p>
              </div>

              <div className="rounded-xl border border-violet-500/15 bg-violet-500/[0.05] p-3.5">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-violet-300">A stronger take</p>
                <p className="font-display text-sm italic leading-relaxed text-zinc-300">
                  &ldquo;We shipped late and lost 12% of trial signups that month. I had under-scoped QA. Now I write a risk list before every launch.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bento features grid ──────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 pb-32 sm:px-8">
        <div className="mb-16 max-w-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-400/80">What is inside</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-tight tracking-tight text-white">
            Everything you need to walk in{" "}
            <span className="display-italic gradient-warm">ready.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Large feature */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-900/80 p-7 transition-all duration-300 hover:border-violet-500/20 sm:col-span-2">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-600/5 blur-3xl transition-all duration-500 group-hover:bg-violet-600/10" />
            <div className="inline-flex size-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/20">
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-1.5 mt-4 text-base font-bold text-zinc-100">It reads the job for you</h3>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
              AI pulls out required skills, preferred skills, seniority, and the
              culture signals hiding between the lines. No guesswork about what
              they actually want.
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {["React", "TypeScript", "System Design", "Node.js"].map((s) => (
                <span key={s} className="rounded-lg border border-white/[0.05] bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-400">{s}</span>
              ))}
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-900/80 p-7 transition-all duration-300 hover:border-emerald-500/20">
            <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-emerald-600/5 blur-3xl transition-all duration-500 group-hover:bg-emerald-600/10" />
            <div className="inline-flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-1.5 mt-4 text-base font-bold text-zinc-100">Honest AI scoring</h3>
            <p className="text-sm leading-relaxed text-zinc-500">Scored 1 to 10 with the strengths, the gaps, and a sharper sample answer.</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="font-display text-2xl font-semibold tabular-nums text-emerald-400">8.5</span>
              <span className="text-xs text-zinc-600">/10 · Strong answer</span>
            </div>
          </div>

          {FEATURES.map((f, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-900/80 p-6 transition-all duration-300 hover:border-white/[0.12]">
              <div className={`inline-flex size-9 items-center justify-center rounded-xl ${f.iconBg} ring-1 ${f.iconRing}`}>
                {f.icon}
              </div>
              <h3 className="mb-1.5 mt-3 text-sm font-bold text-zinc-200">{f.title}</h3>
              <p className="text-xs leading-relaxed text-zinc-500">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-5 pb-32 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/60 via-zinc-950 to-zinc-950" />
          <div className="bg-grid absolute inset-0 opacity-30" />
          <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
          <div className="absolute top-[-4rem] left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[60px]" />

          <div className="relative space-y-8 px-8 py-16 text-center sm:px-16 sm:py-20">
            <h2 className="mx-auto max-w-xl font-display text-[clamp(1.9rem,4.5vw,3rem)] font-medium leading-tight tracking-tight text-white">
              The interview is coming.{" "}
              <span className="display-italic gradient-warm">Be the one who rehearsed.</span>
            </h2>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-zinc-400">
              Open a job post, paste it in, and have your first scored answer back
              before your coffee gets cold.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/prep">
                <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-violet-500 to-violet-600 px-10 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-violet-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-violet-700/50 glow-sm">
                  Start prepping, it&apos;s free
                  <svg className="size-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            </div>
            <p className="text-xs text-zinc-700">No sign-up. Start in about ten seconds.</p>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Logo className="size-7" />
            <span className="font-display text-base font-semibold text-zinc-300">
              Prep<span className="text-amber-300">Sync</span>
            </span>
          </div>
          <p className="text-xs text-zinc-700">© {new Date().getFullYear()} PrepSync. Go get the offer.</p>
        </div>
      </footer>
    </main>
  );
}

// ── Brand mark ──────────────────────────────────────────────────────────────────
function Logo({ className = "size-7" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-amber-400 via-violet-500 to-violet-700 shadow-md shadow-violet-900/40 ${className}`}>
      {/* a small rehearsal waveform */}
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
  "Specific wins to keep doing on the day",
  "Exact fixes, not vague advice",
  "A stronger sample answer to learn from",
];

const STEPS = [
  {
    icon: <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    title: "Paste the job description",
    description: "Drop in the full post from any job board. The AI reads the skills, seniority, and responsibilities in seconds.",
  },
  {
    icon: <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "Answer real questions",
    description: "Eight questions built for that role, across technical, behavioral, and situational, mapped to the skills they want.",
  },
  {
    icon: <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    title: "Get scored and improve",
    description: "An instant score, the strengths worth keeping, the gaps to close, and a stronger sample answer for every reply.",
  },
];

const FEATURES = [
  {
    icon: <svg className="size-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    iconBg: "bg-sky-500/10", iconRing: "ring-sky-500/20",
    title: "Three question types",
    description: "Technical, behavioral with STAR, and situational. The full spread of a real interview.",
  },
  {
    icon: <svg className="size-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    iconBg: "bg-amber-500/10", iconRing: "ring-amber-500/20",
    title: "Readiness score",
    description: "An overall score plus a per question breakdown after every session, so you know where to put the work.",
  },
  {
    icon: <svg className="size-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    iconBg: "bg-rose-500/10", iconRing: "ring-rose-500/20",
    title: "Nothing in your way",
    description: "No account, no card, no setup. Jump straight in and your session is ready in seconds.",
  },
];
