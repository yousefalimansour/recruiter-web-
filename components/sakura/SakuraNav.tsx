"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { GradientButton } from "./GradientButton";

const LINKS: { href: string; label: string; active?: boolean }[] = [
  { href: "/", label: "Home", active: true },
  { href: "#pipeline", label: "Pipeline" },
  { href: "#tracks", label: "Tracks" },
  { href: "#stats", label: "Live" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="sakura-logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff5c9d" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="24" height="24" rx="3" transform="rotate(45 20 20)" fill="none" stroke="url(#sakura-logo-g)" strokeWidth="2" />
        <rect x="14" y="14" width="12" height="12" rx="2" transform="rotate(45 20 20)" fill="none" stroke="url(#sakura-logo-g)" strokeWidth="1.2" opacity="0.55" />
      </svg>
      <span className="leading-tight">
        <span className="block font-display text-[0.95rem] font-semibold text-sakura-cream">
          Recruiter Agent
        </span>
        <span lang="ja" className="block font-jp text-[0.6rem] tracking-[0.22em] text-sakura-faint">
          採用エージェント
        </span>
      </span>
    </Link>
  );
}

export function SakuraNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "sakura-glass border-b border-white/5" : "border-b border-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={[
                  "group relative font-display text-sm transition-colors",
                  l.active ? "text-sakura-cream" : "text-sakura-muted hover:text-sakura-cream",
                ].join(" ")}
              >
                {l.label}
                <span
                  className={[
                    "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-gradient-to-r from-sakura-pink to-sakura-purple transition-transform duration-300",
                    l.active
                      ? "scale-x-100 shadow-[0_0_8px_#ff5c9d]"
                      : "scale-x-0 group-hover:scale-x-100",
                  ].join(" ")}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <GradientButton href="/dashboard" className="px-6 py-2.5 text-[0.8rem]">
            Open Dashboard
          </GradientButton>
        </div>

        <button
          type="button"
          className="text-sakura-cream md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open ? (
        <div className="sakura-glass border-t border-white/5 md:hidden">
          <ul className="flex flex-col gap-1 px-5 py-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-display text-sm text-sakura-muted hover:text-sakura-cream"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <GradientButton href="/dashboard" className="w-full" onClick={() => setOpen(false)}>
                Open Dashboard
              </GradientButton>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
