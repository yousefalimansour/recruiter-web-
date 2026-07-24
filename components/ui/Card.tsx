import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** card (default #1A1A1D) | surface (#141416) | elevated (#222226) */
  surface?: "card" | "surface" | "elevated";
  /** apply hover border-strong shift (for interactive cards) */
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const SURFACES: Record<NonNullable<CardProps["surface"]>, string> = {
  surface: "bg-surface border-border",
  card: "bg-card border-border",
  elevated: "bg-elevated border-border-strong",
};

const PADDING: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

/**
 * Card — flat surface, 1px border, rounded-lg, no shadow.
 * Depth comes from surface color step + border, never gradient/shadow.
 */
export function Card({
  children,
  surface = "card",
  interactive = false,
  padding = "md",
  className = "",
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        "rounded-lg border",
        SURFACES[surface],
        PADDING[padding],
        interactive
          ? "transition-colors duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-border-strong"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
