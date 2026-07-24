interface DividerProps {
  className?: string;
  /** default 1px border rule; "marker" = 1px burgundy section rule */
  variant?: "default" | "marker";
  orientation?: "horizontal" | "vertical";
}

/**
 * Divider — 1px solid rule. `marker` uses a burgundy-700 section rule.
 * Flat only, no gradient.
 */
export function Divider({
  className = "",
  variant = "default",
  orientation = "horizontal",
}: DividerProps) {
  const color =
    variant === "marker" ? "bg-burgundy-700" : "bg-border";
  const shape =
    orientation === "vertical" ? "w-px self-stretch" : "h-px w-full";
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={[shape, color, className].filter(Boolean).join(" ")}
    />
  );
}
