"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ResultsView } from "@/components/ResultsView";
import { Button } from "@/components/ui/Button";
import type { PrepSessionRow } from "@/lib/supabase/types";

export default function SessionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [session, setSession] = useState<PrepSessionRow | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/sessions/${id}`);
      if (res.ok) {
        setSession(await res.json());
      } else {
        setError(true);
      }
      setLoading(false);
    }
    load();
  }, [id]);

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

  if (error || !session) {
    return (
      <main className="min-h-screen bg-[#09090b] pt-20 pb-24">
        <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center space-y-4 pt-20">
          <p className="text-zinc-400">Session not found</p>
          <Button onClick={() => router.push("/history")}>Back to History</Button>
        </div>
      </main>
    );
  }

  const scored = session.questions.filter((q) => q.score);
  const avgScore = scored.length
    ? Math.round((scored.reduce((s, q) => s + (q.score?.score ?? 0), 0) / scored.length) * 10) / 10
    : null;

  return (
    <ResultsView
      parsedJD={session.parsed_jd}
      questions={session.questions}
      avgScore={avgScore}
      mode="history"
      onBack={() => router.push("/history")}
      onReset={() => router.push("/prep")}
    />
  );
}
