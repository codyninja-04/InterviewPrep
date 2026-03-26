import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md";
  color?: "violet" | "emerald" | "amber" | "rose";
}

const colorMap = {
  violet:  "from-violet-600 to-violet-400",
  emerald: "from-emerald-600 to-emerald-400",
  amber:   "from-amber-600 to-amber-400",
  rose:    "from-rose-600 to-rose-400",
};

export function ProgressBar({
  value,
  className,
  showLabel = false,
  size = "md",
  color = "violet",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("flex-1 rounded-full bg-zinc-800/80 overflow-hidden", size === "sm" ? "h-1" : "h-1.5")}>
        <div
          className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out", colorMap[color])}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-zinc-500 tabular-nums w-8 text-right font-medium">
          {clamped}%
        </span>
      )}
    </div>
  );
}
