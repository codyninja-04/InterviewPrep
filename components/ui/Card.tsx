import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function Card({ className, glow = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm",
        glow && "shadow-lg shadow-violet-900/10 border-violet-900/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
