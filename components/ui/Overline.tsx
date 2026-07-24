import { createElement, type ElementType, type ReactNode } from "react";

interface OverlineProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** muted (default) | primary burgundy | bright */
  tone?: "muted" | "primary" | "bright";
}

const TONE: Record<NonNullable<OverlineProps["tone"]>, string> = {
  muted: "text-text-muted",
  primary: "text-accent",
  bright: "text-text-bright",
};

/**
 * Overline — mono, uppercase, wide-tracked label. The core "engineered chrome".
 * Uses createElement so the polymorphic `as` prop stays type-safe under React 19.
 */
export function Overline({
  children,
  as = "span",
  className = "",
  tone = "muted",
}: OverlineProps) {
  const cls = [
    "font-mono text-[0.75rem] font-medium uppercase leading-none tracking-[0.18em]",
    TONE[tone],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement(as, { className: cls }, children);
}
