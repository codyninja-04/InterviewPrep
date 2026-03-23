import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "violet" | "emerald" | "amber" | "sky" | "zinc" | "rose";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  violet: "bg-violet-500/15 text-violet-300 ring-violet-500/25",
  emerald: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25",
  amber: "bg-amber-500/15 text-amber-300 ring-amber-500/25",
  sky: "bg-sky-500/15 text-sky-300 ring-sky-500/25",
  zinc: "bg-zinc-500/15 text-zinc-300 ring-zinc-500/25",
  rose: "bg-rose-500/15 text-rose-300 ring-rose-500/25",
};

export function Badge({
  variant = "violet",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
