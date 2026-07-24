"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

/**
 * ThemeToggleButton — light/dark switch with a circular reveal that grows from
 * the click point, powered by the View Transitions API (progressive
 * enhancement: instant swap where it's unsupported or reduced-motion is set).
 */
export function ThemeToggleButton({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === "dark";

  const toggle = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const next = isDark ? "light" : "dark";
      const doc = document as DocWithVT;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!doc.startViewTransition || reduce) {
        setTheme(next);
        return;
      }

      const x = e.clientX;
      const y = e.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = doc.startViewTransition(() => setTheme(next));
      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 560,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    },
    [isDark, setTheme]
  );

  const base =
    "grid size-9 place-items-center rounded-full border border-sakura-line text-sakura-cream transition-colors hover:text-sakura-pink";

  // Render an inert placeholder before mount to avoid a hydration mismatch.
  if (!mounted) {
    return <span aria-hidden="true" className={cn(base, className)} />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(base, className)}
    >
      {isDark ? <Sun size={16} strokeWidth={1.8} /> : <Moon size={16} strokeWidth={1.8} />}
    </button>
  );
}
