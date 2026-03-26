"use client";

import { Badge } from "@/components/ui/Badge";
import type { ParsedJD } from "@/lib/types";

interface SkillsBreakdownProps {
  data: ParsedJD;
}

export function SkillsBreakdown({ data }: SkillsBreakdownProps) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-zinc-900 overflow-hidden">
      {/* Accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      {/* Header */}
      <div className="px-5 sm:px-6 py-4 border-b border-white/[0.05] flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-zinc-100 truncate">{data.job_title}</h2>
          {data.company && <p className="text-xs text-zinc-500 mt-0.5">{data.company}</p>}
        </div>
        <Badge variant="violet" className="capitalize shrink-0 text-[11px] px-3 py-1">
          {data.experience_level}
        </Badge>
      </div>

      <div className="divide-y divide-white/[0.04]">
        {data.required_skills.length > 0 && (
          <Section label="Required Skills" icon={<IconBolt />} color="emerald">
            <div className="flex flex-wrap gap-2">
              {data.required_skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-lg bg-emerald-500/8 text-emerald-300 text-xs font-medium ring-1 ring-emerald-500/20 hover:bg-emerald-500/15 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        {data.preferred_skills.length > 0 && (
          <Section label="Nice to Have" icon={<IconStar />} color="sky">
            <div className="flex flex-wrap gap-2">
              {data.preferred_skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-lg bg-sky-500/8 text-sky-300 text-xs font-medium ring-1 ring-sky-500/20 hover:bg-sky-500/15 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        {data.key_responsibilities.length > 0 && (
          <Section label="Key Responsibilities" icon={<IconList />} color="violet">
            <ul className="space-y-2.5">
              {data.key_responsibilities.map((resp, i) => (
                <li key={i} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                  <span className="mt-[7px] shrink-0 size-1.5 rounded-full bg-violet-500/80" />
                  {resp}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {data.culture_signals.length > 0 && (
          <Section label="Culture Signals" icon={<IconHeart />} color="amber">
            <div className="flex flex-wrap gap-2">
              {data.culture_signals.map((signal) => (
                <span key={signal} className="px-3 py-1.5 rounded-lg bg-amber-500/8 text-amber-300 text-xs font-medium ring-1 ring-amber-500/20 hover:bg-amber-500/15 transition-colors cursor-default">
                  {signal}
                </span>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ label, icon, color, children }: {
  label: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}) {
  const colorMap: Record<string, string> = {
    emerald: "text-emerald-400 bg-emerald-500/10",
    sky: "text-sky-400 bg-sky-500/10",
    violet: "text-violet-400 bg-violet-500/10",
    amber: "text-amber-400 bg-amber-500/10",
  };
  const c = colorMap[color] ?? colorMap.violet;

  return (
    <div className="px-5 sm:px-6 py-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className={`size-5 rounded-md flex items-center justify-center ${c}`}>
          {icon}
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500">{label}</p>
      </div>
      {children}
    </div>
  );
}

function IconBolt() {
  return <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
}
function IconStar() {
  return <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;
}
function IconList() {
  return <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>;
}
function IconHeart() {
  return <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
}
