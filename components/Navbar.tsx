import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="size-7 rounded-lg bg-violet-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-semibold text-zinc-100 tracking-tight">
            Prep<span className="text-violet-400">Sync</span>
          </span>
        </Link>

        {/* Nav actions */}
        <nav className="flex items-center gap-2">
          <Link href="/prep">
            <Button size="sm">Start Prepping</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
