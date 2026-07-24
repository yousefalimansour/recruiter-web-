import type { ReactNode } from "react";

/**
 * EyebrowLabel — the small uppercase burgundy kicker above section titles.
 * (Kept this filename/export for import stability; content is English now.)
 */
export function JapaneseLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-display text-xs font-semibold uppercase tracking-[0.22em] text-sakura-pink ${className}`}
    >
      {children}
    </span>
  );
}
