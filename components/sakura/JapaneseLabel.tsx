import type { ReactNode } from "react";

/**
 * JapaneseLabel — the small pink Noto-Sans-JP kicker that sits above section
 * titles (e.g. 私たちの強み). Intentional, elegant — not decoration.
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
      lang="ja"
      className={`font-jp text-sm font-medium tracking-[0.14em] text-sakura-pink ${className}`}
    >
      {children}
    </span>
  );
}
