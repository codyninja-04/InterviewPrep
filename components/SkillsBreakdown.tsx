"use client";

import { Badge } from "@/components/ui/Badge";
import type { ParsedJD } from "@/lib/types";

interface SkillsBreakdownProps {
  data: ParsedJD;
}

export function SkillsBreakdown({ data }: SkillsBreakdownProps) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-100">{data.job_title}</h2>
          {data.company && <p className="text-xs text-zinc-500 mt-0.5">{data.company}</p>}
        </div>
        <Badge variant="violet" className="capitalize shrink-0">
          {data.experience_level}
        </Badge>
      </div>

      <div className="divide-y divide-white/[0.04]">
        {/* Required Skills */}
        {data.required_skills.length > 0 && (
          <Section label="Required Skills" icon="⚡">
            <div className="flex flex-wrap gap-2">
              {data.required_skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 text-xs font-medium ring-1 ring-emerald-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Preferred Skills */}
        {data.preferred_skills.length > 0 && (
          <Section label="Preferred Skills" icon="✦">
            <div className="flex flex-wrap gap-2">
              {data.preferred_skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg bg-sky-500/10 text-sky-300 text-xs font-medium ring-1 ring-sky-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Key Responsibilities */}
        {data.key_responsibilities.length > 0 && (
          <Section label="Key Responsibilities" icon="→">
            <ul className="space-y-2">
              {data.key_responsibilities.map((resp, i) => (
                <li key={i} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                  <span className="mt-1.5 shrink-0 size-1 rounded-full bg-violet-500" />
                  {resp}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Culture Signals */}
        {data.culture_signals.length > 0 && (
          <Section label="Culture Signals" icon="◎">
            <div className="flex flex-wrap gap-2">
              {data.culture_signals.map((signal) => (
                <span
                  key={signal}
                  className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 text-xs font-medium ring-1 ring-amber-500/20"
                >
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

function Section({ label, icon, children }: { label: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="px-5 py-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-zinc-600">{icon}</span>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
          {label}
        </p>
      </div>
      {children}
    </div>
  );
}
