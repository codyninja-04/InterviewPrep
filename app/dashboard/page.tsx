"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { StatCard } from "@/components/StatCard";
import { BarChart } from "@/components/BarChart";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { User } from "@supabase/supabase-js";
import type { PrepSessionRow } from "@/lib/supabase/types";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<PrepSessionRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (!user) { setLoading(false); return; }

      const res = await fetch("/api/sessions");
      if (res.ok) {
        const list = await res.json();
        // Fetch full data for each session for detailed stats
        const fullSessions = await Promise.all(
          list.map(async (s: { id: string }) => {
            const r = await fetch(`/api/sessions/${s.id}`);
            return r.ok ? r.json() : null;
          })
        );
        setSessions(fullSessions.filter(Boolean));
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#09090b] pt-20 pb-24 flex items-center justify-center">
        <div className="flex gap-1">
          <span className="size-2 rounded-full bg-violet-400 animate-bounce [animation-delay:0ms]" />
          <span className="size-2 rounded-full bg-violet-400 animate-bounce [animation-delay:150ms]" />
          <span className="size-2 rounded-full bg-violet-400 animate-bounce [animation-delay:300ms]" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#09090b] pt-20 pb-24">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="bg-grid absolute inset-0 opacity-60" />
        </div>
        <div className="mx-auto max-w-2xl px-5 sm:px-8 pt-20">
          <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/70 backdrop-blur-md p-10 text-center space-y-4">
            <div className="size-14 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto">
              <svg className="size-7 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <p className="text-zinc-400 text-sm">Sign in to view your progress dashboard</p>
            <Button onClick={() => router.push("/")}>Go to Home</Button>
          </div>
        </div>
      </main>
    );
  }

  if (sessions.length === 0) {
    return (
      <main className="min-h-screen bg-[#09090b] pt-20 pb-24">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="bg-grid absolute inset-0 opacity-60" />
        </div>
        <div className="mx-auto max-w-2xl px-5 sm:px-8 space-y-6">
          <div className="pt-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400 mb-1">Analytics</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">Progress Dashboard</h1>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/70 backdrop-blur-md p-10 text-center space-y-4">
            <p className="text-zinc-400 text-sm">Complete your first session to see your progress!</p>
            <Link href="/prep"><Button>Start Prepping</Button></Link>
          </div>
        </div>
      </main>
    );
  }

  // Compute stats
  const totalSessions = sessions.length;
  const allQuestions = sessions.flatMap((s) => s.questions);
  const scoredQuestions = allQuestions.filter((q) => q.score);
  const totalAnswered = scoredQuestions.length;

  const overallAvg = totalAnswered
    ? Math.round((scoredQuestions.reduce((sum, q) => sum + (q.score?.score ?? 0), 0) / totalAnswered) * 10) / 10
    : 0;

  const bestSession = sessions.reduce((best, s) =>
    (s.avg_score ?? 0) > (best.avg_score ?? 0) ? s : best
  , sessions[0]);

  // Scores by type
  const typeStats = (["technical", "behavioral", "situational"] as const).map((type) => {
    const qs = scoredQuestions.filter((q) => q.type === type);
    const avg = qs.length ? Math.round((qs.reduce((s, q) => s + (q.score?.score ?? 0), 0) / qs.length) * 10) / 10 : 0;
    return { type, avg, count: qs.length };
  });

  // Skill performance (top 8)
  const skillMap = new Map<string, { total: number; count: number }>();
  scoredQuestions.forEach((q) => {
    const skill = q.mapped_skill;
    const existing = skillMap.get(skill) ?? { total: 0, count: 0 };
    skillMap.set(skill, { total: existing.total + (q.score?.score ?? 0), count: existing.count + 1 });
  });
  const skillStats = Array.from(skillMap.entries())
    .map(([skill, { total, count }]) => ({ skill, avg: Math.round((total / count) * 10) / 10 }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 8);

  // Score over time (last 15 sessions, chronological)
  const recentSessions = sessions
    .slice()
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .slice(-15);

  const chartData = recentSessions.map((s) => {
    const score = s.avg_score ?? 0;
    const color = score >= 8 ? "#8b5cf6" : score >= 6 ? "#10b981" : score >= 4 ? "#f59e0b" : "#f43f5e";
    const date = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(s.created_at));
    return { label: date, value: score, color };
  });

  // Improvement trend
  const first3 = sessions.slice(-3);
  const last3 = sessions.slice(0, 3);
  const first3Avg = first3.length ? first3.reduce((s, ses) => s + (ses.avg_score ?? 0), 0) / first3.length : 0;
  const last3Avg = last3.length ? last3.reduce((s, ses) => s + (ses.avg_score ?? 0), 0) / last3.length : 0;
  const improvement = totalSessions >= 3 ? last3Avg - first3Avg : null;

  const typeColors: Record<string, string> = {
    technical: "text-violet-400",
    behavioral: "text-emerald-400",
    situational: "text-sky-400",
  };

  return (
    <main className="min-h-screen bg-[#09090b] pt-20 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full bg-violet-600/6 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-2xl px-5 sm:px-8 space-y-6">
        <div className="pt-4 fade-in-up">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400 mb-1">Analytics</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">Progress Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">Track your interview readiness over time</p>
        </div>

        {/* Summary cards */}
        <div className="fade-in-up-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Sessions" value={totalSessions} color="text-zinc-100" />
          <StatCard label="Avg Score" value={`${overallAvg}/10`} color={overallAvg >= 7 ? "text-emerald-400" : overallAvg >= 5 ? "text-amber-400" : "text-rose-400"} />
          <StatCard label="Best Score" value={bestSession.avg_score?.toFixed(1) ?? "–"} subtitle={bestSession.job_title} color="text-violet-400" />
          <StatCard label="Answered" value={totalAnswered} subtitle={`across ${totalSessions} sessions`} color="text-zinc-100" />
        </div>

        {/* Improvement trend */}
        {improvement !== null && (
          <div className="fade-in-up-1">
            <Card className="p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600 mb-2">Trend</p>
              <p className="text-sm text-zinc-300">
                {improvement > 0.3
                  ? <span>Your recent scores improved by <span className="font-bold text-emerald-400">+{improvement.toFixed(1)}</span> points vs your first sessions. Keep it up!</span>
                  : improvement < -0.3
                  ? <span>Your recent scores dropped by <span className="font-bold text-amber-400">{improvement.toFixed(1)}</span> points. Try reviewing your weaker areas.</span>
                  : <span className="text-zinc-400">Your scores are holding steady. Keep practising to improve!</span>
                }
              </p>
            </Card>
          </div>
        )}

        {/* Score over time */}
        {chartData.length >= 2 && (
          <div className="fade-in-up-2">
            <Card className="p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600 mb-4">Score Over Time</p>
              <BarChart data={chartData} maxValue={10} />
            </Card>
          </div>
        )}

        {/* Scores by type */}
        <div className="fade-in-up-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600 px-1 mb-2">By Question Type</p>
          <div className="grid grid-cols-3 gap-3">
            {typeStats.map(({ type, avg, count }) => (
              <Card key={type} className="p-4 text-center">
                <p className={`text-xl font-extrabold tabular-nums ${typeColors[type]}`}>{avg || "–"}{avg ? "/10" : ""}</p>
                <p className="text-[10px] text-zinc-600 mt-1 capitalize">{type}</p>
                <p className="text-[9px] text-zinc-700 mt-0.5">{count} questions</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Skill performance */}
        {skillStats.length > 0 && (
          <div className="fade-in-up-3">
            <Card className="p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600 mb-4">Skill Performance</p>
              <div className="space-y-3">
                {skillStats.map(({ skill, avg }) => (
                  <div key={skill} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-300 truncate">{skill}</span>
                      <span className={`text-xs font-bold tabular-nums ${
                        avg >= 8 ? "text-violet-400" : avg >= 6 ? "text-emerald-400" : avg >= 4 ? "text-amber-400" : "text-rose-400"
                      }`}>{avg}/10</span>
                    </div>
                    <ProgressBar
                      value={(avg / 10) * 100}
                      size="sm"
                      color={avg >= 8 ? "violet" : avg >= 6 ? "emerald" : avg >= 4 ? "amber" : "rose"}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Action */}
        <div className="fade-in-up-3 flex gap-3 pt-2">
          <Link href="/history" className="flex-1">
            <Button variant="outline" size="lg" className="w-full">View History</Button>
          </Link>
          <Link href="/prep" className="flex-1">
            <Button size="lg" className="w-full">New Session</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
