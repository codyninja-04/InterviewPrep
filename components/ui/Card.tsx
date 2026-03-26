import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  glass?: boolean;
}

export function Card({ className, glow = false, glass = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.07] bg-zinc-900",
        glass && "bg-zinc-900/60 backdrop-blur-xl",
        glow && "border-violet-500/20 shadow-xl shadow-violet-950/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
