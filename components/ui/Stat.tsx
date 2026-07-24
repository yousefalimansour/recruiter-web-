import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { Overline } from "@/components/ui/Overline";

interface StatProps {
  /** the metric label (mono overline) */
  label: string;
  /** big value — pass a number, string, or a <CountUp/> node */
  value: ReactNode;
  /** optional unit / suffix shown as mono chrome next to the value */
  unit?: string;
  /** optional supporting caption below */
  hint?: string;
  icon?: ReactNode;
  /** highlight the value in burgundy (single focal metric per cluster) */
  emphasis?: boolean;
  className?: string;
}

/**
 * Stat card — bg-card, 1px border, big Space Grotesk number, mono unit/label.
 * Flat only.
 */
export function Stat({
  label,
  value,
  unit,
  hint,
  icon,
  emphasis = false,
  className = "",
}: StatProps) {
  return (
    <Card padding="md" className={["flex flex-col gap-3", className].join(" ")}>
      <div className="flex items-center justify-between gap-2">
        <Overline>{label}</Overline>
        {icon ? (
          <span className="text-text-muted" aria-hidden="true">
            {icon}
          </span>
        ) : null}
      </div>
      <div className="flex items-baseline gap-2">
        <span
          className={[
            "font-heading text-[2.5rem] font-semibold leading-none tracking-[-0.02em] tabular-nums",
            emphasis ? "text-accent" : "text-text-bright",
          ].join(" ")}
        >
          {value}
        </span>
        {unit ? (
          <span className="font-mono text-[0.8125rem] uppercase tracking-[0.12em] text-text-muted">
            {unit}
          </span>
        ) : null}
      </div>
      {hint ? <p className="text-caption text-text-muted">{hint}</p> : null}
    </Card>
  );
}
