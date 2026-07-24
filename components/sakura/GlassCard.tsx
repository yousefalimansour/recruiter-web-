import type { CSSProperties, ReactNode } from "react";

type Glow = "pink" | "purple" | "blue" | "orange";

const GLOW: Record<Glow, string> = {
  pink: "rgba(178,58,78,0.4)",
  purple: "rgba(148,36,63,0.4)",
  blue: "rgba(110,110,122,0.3)",
  orange: "rgba(200,90,107,0.35)",
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
