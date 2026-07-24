import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  /**
   * neutral — gray bordered (default)
   * primary — burgundy fill (the "active/primary" state)
   * attention — bright wine border + text (needs-human)
   * muted — dashed muted border (failed / inactive)
   */
  variant?: "neutral" | "primary" | "attention" | "muted";
  icon?: ReactNode;
}

const VARIANT: Record<NonNullable<BadgeProps["variant"]>, string> = {
  neutral: "border border-border text-text-secondary",
  primary: "border border-primary bg-primary text-on-primary",
  attention: "border border-accent text-accent",
  muted: "border border-dashed border-border-strong text-text-muted",
};

/**
 * Badge / Chip — mono caption, 1px border. Burgundy fill only for primary state.
 * Status is encoded by shade + label + icon, never by adding new hues.
 */
export function Badge({
  children,
  className = "",
  variant = "neutral",
  icon,
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 font-mono text-[0.75rem] uppercase leading-none tracking-[0.12em]",
        VARIANT[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon}
      {children}
    </span>
  );
}
