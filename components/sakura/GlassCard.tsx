import type { CSSProperties, ReactNode } from "react";

type Glow = "pink" | "purple" | "blue" | "orange";

const GLOW: Record<Glow, string> = {
  pink: "rgba(255,92,157,0.38)",
  purple: "rgba(139,92,246,0.36)",
  blue: "rgba(67,97,238,0.34)",
  orange: "rgba(255,140,66,0.34)",
};

/**
 * GlassCard — dark translucent glassmorphism panel that floats. Thin hairline
 * border, soft colored glow that intensifies on hover, gentle lift. No generic
 * white cards, no heavy shadows.
 */
export function GlassCard({
  children,
  className = "",
  glow = "pink",
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  glow?: Glow;
  interactive?: boolean;
}) {
  const style = { ["--glow" as string]: GLOW[glow] } as CSSProperties;
  return (
    <div
      style={style}
      className={[
        "sakura-glass relative rounded-2xl",
        "shadow-[0_10px_40px_-24px_var(--glow)]",
        interactive
          ? "transition duration-500 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_28px_70px_-24px_var(--glow)]"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
