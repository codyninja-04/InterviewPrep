"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSignIn() {
    const supabase = createClient();
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (data.url) window.location.href = data.url;
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  }

  const avatarUrl = user?.user_metadata?.avatar_url;
  const displayName = user?.user_metadata?.full_name ?? user?.email ?? "Account";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-zinc-950/90 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative size-8 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-900/40 group-hover:shadow-violet-700/50 transition-shadow duration-300">
            <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="font-bold text-[15px] tracking-tight text-zinc-100">
            Prep<span className="text-violet-400">Sync</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-2">
          {pathname === "/" && (
            <a href="#how-it-works" className="px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-100 transition-colors rounded-lg hover:bg-white/5">
              How it works
            </a>
          )}

          {user ? (
            <div className="flex items-center gap-1 ml-2">
              <Link
                href="/dashboard"
                className={cn(
                  "px-3 py-1.5 text-sm rounded-lg transition-colors",
                  pathname === "/dashboard" ? "text-violet-400 bg-violet-500/10" : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                )}
              >
                Dashboard
              </Link>
              <Link
                href="/history"
                className={cn(
                  "px-3 py-1.5 text-sm rounded-lg transition-colors",
                  pathname === "/history" ? "text-violet-400 bg-violet-500/10" : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                )}
              >
                History
              </Link>
            <div className="relative ml-1">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-zinc-900/80 px-2.5 py-1.5 hover:border-violet-500/30 hover:bg-zinc-800/80 transition-all duration-200 group"
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName} className="size-7 rounded-lg ring-1 ring-white/10 object-cover" />
                ) : (
                  <div className="size-7 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {displayName[0].toUpperCase()}
                  </div>
                )}
                <span className="text-sm text-zinc-300 max-w-[110px] truncate font-medium">{displayName.split(" ")[0]}</span>
                <svg className={`size-3.5 text-zinc-600 group-hover:text-zinc-400 transition-all ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-white/[0.08] bg-zinc-900 shadow-xl shadow-black/40 overflow-hidden">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <p className="text-xs font-semibold text-zinc-200 truncate">{displayName}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{user?.email}</p>
                  </div>
                  <Link
                    href="/prep"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
                  >
                    <svg className="size-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    New Session
                  </Link>
                  <div className="h-px bg-white/[0.06]" />
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={handleSignIn}
                className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-zinc-900 px-4 py-2 text-sm text-zinc-300 hover:border-white/[0.15] hover:text-zinc-100 transition-all duration-200"
              >
                <GoogleIcon />
                Sign in with Google
              </button>
              <Link
                href="/prep"
                className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-violet-900/30 hover:bg-violet-500 transition-all duration-200"
              >
                Start Prepping
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-white/[0.06] bg-zinc-950/95 backdrop-blur-xl px-5 py-4 space-y-1">
          {pathname === "/" && (
            <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-white/5 transition-colors">
              How it works
            </a>
          )}
          <Link href="/prep" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-violet-400 hover:text-violet-300 rounded-lg hover:bg-violet-500/10 transition-colors">
            Start Prepping →
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-white/5 transition-colors">
                Dashboard
              </Link>
              <Link href="/history" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-white/5 transition-colors">
                History
              </Link>
              <button onClick={handleSignOut} className="flex items-center gap-2 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors w-full">
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={handleSignIn} className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-white/5 transition-colors w-full">
              <GoogleIcon />
              Sign in with Google
            </button>
          )}
        </div>
      )}
    </header>
  );
}

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}
