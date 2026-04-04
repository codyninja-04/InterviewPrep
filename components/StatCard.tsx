import { Card } from "@/components/ui/Card";

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}

export function StatCard({ label, value, subtitle, color = "text-zinc-100" }: StatCardProps) {
  return (
    <Card className="p-4 sm:p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600 mb-1">{label}</p>
      <p className={`text-2xl font-extrabold tabular-nums ${color}`}>{value}</p>
      {subtitle && <p className="text-[11px] text-zinc-500 mt-0.5">{subtitle}</p>}
    </Card>
  );
}
