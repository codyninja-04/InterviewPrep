"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import type { User } from "@supabase/supabase-js";

interface SessionSummary {
  id: string;
  job_title: string;
  company: string | null;
  avg_score: number | null;
  created_at: string;
  question_count: number;
  answered_count: number;
}

export default function HistoryPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (!user) { setLoading(false); return; }

      const res = await fetch("/api/sessions");
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this session? This cannot be undone.")) return;
    setDeleting(id);
    const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" });
    if (res.ok) setSessions((prev) => prev.filter((s) => s.id !== id));
    setDeleting(null);
  }

  function scoreColor(score: number | null) {
    if (score === null) return "text-zinc-600";
    if (score >= 8) return "text-violet-400";
    if (score >= 6) return "text-emerald-400";
    if (score >= 4) return "text-amber-400";
    return "text-rose-400";
  }

  function formatDate(iso: string) {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(iso));
  }

  return (
    <main className="min-h-screen bg-[#09090b] pt-20 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full bg-violet-600/6 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-2xl px-5 sm:px-8 space-y-6">
        <div className="pt-4 fade-in-up">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400 mb-1">Your Sessions</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">Session History</h1>
          <p className="text-sm text-zinc-500 mt-1">Review your past interview prep sessions</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex gap-1">
              <span className="size-2 rounded-full bg-violet-400 animate-bounce [animation-delay:0ms]" />
              <span className="size-2 rounded-full bg-violet-400 animate-bounce [animation-delay:150ms]" />
              <span className="size-2 rounded-full bg-violet-400 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        ) : !user ? (
          <div className="fade-in-up-1 rounded-2xl border border-white/[0.07] bg-zinc-900/70 backdrop-blur-md p-10 text-center space-y-4">
            <div className="size-14 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto">
              <svg className="size-7 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-zinc-400 text-sm">Sign in to view your session history</p>
            <Button onClick={() => router.push("/")}>Go to Home</Button>
          </div>
        ) : sessions.length === 0 ? (
          <div className="fade-in-up-1 rounded-2xl border border-white/[0.07] bg-zinc-900/70 backdrop-blur-md p-10 text-center space-y-4">
            <div className="size-14 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto">
              <svg className="size-7 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="text-zinc-400 text-sm">No sessions yet. Start your first prep session!</p>
            <Link href="/prep">
              <Button>Start Prepping</Button>
            </Link>
          </div>
        ) : (
          <div className="fade-in-up-1 rounded-2xl border border-white/[0.06] bg-zinc-900 divide-y divide-white/[0.04] overflow-hidden">
            {sessions.map((s) => (
              <div key={s.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.02] transition-colors group">
                <Link href={`/history/${s.id}`} className="flex-1 min-w-0 flex items-center gap-3">
                  {/* Score circle */}
                  <div className={`shrink-0 size-10 rounded-xl bg-zinc-800/80 border border-white/[0.05] flex items-center justify-center`}>
                    <span className={`text-sm font-extrabold tabular-nums ${scoreColor(s.avg_score)}`}>
                      {s.avg_score !== null ? s.avg_score.toFixed(1) : "–"}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-200 truncate">{s.job_title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {s.company && <span className="text-[11px] text-zinc-500 truncate">{s.company}</span>}
                      {s.company && <span className="text-zinc-800">·</span>}
                      <span className="text-[11px] text-zinc-600">{formatDate(s.created_at)}</span>
                      <span className="text-zinc-800">·</span>
                      <span className="text-[11px] text-zinc-600">{s.answered_count}/{s.question_count} answered</span>
                    </div>
                  </div>
                </Link>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(s.id)}
                  disabled={deleting === s.id}
                  className="shrink-0 p-2 rounded-lg text-zinc-700 hover:text-rose-400 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete session"
                >
                  {deleting === s.id ? (
                    <span className="size-4 block border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin" />
                  ) : (
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
