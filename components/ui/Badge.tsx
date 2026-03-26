import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "violet" | "emerald" | "amber" | "sky" | "zinc" | "rose";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  violet: "bg-violet-500/10 text-violet-300 ring-violet-500/20",
  emerald: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20",
  amber:   "bg-amber-500/10  text-amber-300  ring-amber-500/20",
  sky:     "bg-sky-500/10    text-sky-300    ring-sky-500/20",
  zinc:    "bg-zinc-500/10   text-zinc-400   ring-zinc-500/20",
  rose:    "bg-rose-500/10   text-rose-300   ring-rose-500/20",
};

export function Badge({ variant = "violet", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ring-1 ring-inset",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
