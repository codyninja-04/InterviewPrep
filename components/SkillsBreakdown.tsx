"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { ParsedJD } from "@/lib/types";

interface SkillsBreakdownProps {
  data: ParsedJD;
}

export function SkillsBreakdown({ data }: SkillsBreakdownProps) {
  return (
    <Card glow className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-zinc-100">{data.job_title}</h2>
          <Badge variant="violet" className="capitalize">
            {data.experience_level}
          </Badge>
        </div>
        {data.company && (
          <p className="text-sm text-zinc-400">{data.company}</p>
        )}
      </div>

      {/* Required Skills */}
      {data.required_skills.length > 0 && (
        <Section label="Required Skills">
          <div className="flex flex-wrap gap-2">
            {data.required_skills.map((skill) => (
              <Badge key={skill} variant="emerald">
                {skill}
              </Badge>
            ))}
          </div>
        </Section>
      )}

      {/* Preferred Skills */}
      {data.preferred_skills.length > 0 && (
        <Section label="Preferred Skills">
          <div className="flex flex-wrap gap-2">
            {data.preferred_skills.map((skill) => (
              <Badge key={skill} variant="sky">
                {skill}
              </Badge>
            ))}
          </div>
        </Section>
      )}

      {/* Key Responsibilities */}
      {data.key_responsibilities.length > 0 && (
        <Section label="Key Responsibilities">
          <ul className="space-y-1.5">
            {data.key_responsibilities.map((resp, i) => (
              <li key={i} className="flex gap-2 text-sm text-zinc-300">
                <span className="mt-0.5 shrink-0 size-1.5 rounded-full bg-violet-500" />
                {resp}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Culture Signals */}
      {data.culture_signals.length > 0 && (
        <Section label="Culture Signals">
          <div className="flex flex-wrap gap-2">
            {data.culture_signals.map((signal) => (
              <Badge key={signal} variant="amber">
                {signal}
              </Badge>
            ))}
          </div>
        </Section>
      )}
    </Card>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      {children}
    </div>
  );
}
