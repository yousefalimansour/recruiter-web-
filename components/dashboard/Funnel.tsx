"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Overline } from "@/components/ui/Overline";
import type { DashboardOverview } from "@/lib/types";

/**
 * Funnel — flat horizontal burgundy bars, discovered → replied. Bars deepen→
 * brighten by stage. Width is proportional to the top of the funnel. NO gradient
 * fills — each bar is a single flat burgundy shade.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

const SHADES = [
  "bg-burgundy-800",
  "bg-burgundy-700",
  "bg-burgundy-600",
  "bg-burgundy-500",
  "bg-burgundy-400",
];

export function Funnel({ funnel }: { funnel: DashboardOverview["funnel"] }) {
  const reduce = useReducedMotion();
  const stages: { label: string; value: number }[] = [
    { label: "Discovered", value: funnel.discovered },
    { label: "Qualified", value: funnel.qualified },
    { label: "Applied", value: funnel.applied },
    { label: "Submitted", value: funnel.submitted },
    { label: "Replied", value: funnel.replied },
  ];
  const top = Math.max(funnel.discovered, 1);

  return (
    <Card padding="lg" className="flex flex-col gap-6">
      <Overline>Application funnel · last 24h</Overline>
      <div className="flex flex-col gap-4">
        {stages.map((s, i) => {
          const pct = Math.round((s.value / top) * 100);
          return (
            <div key={s.label} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-text-secondary">
                  {s.label}
                </span>
                <span className="font-mono text-[0.8125rem] text-text-bright tabular-nums">
                  {s.value.toLocaleString("en-US")}
                  <span className="ml-2 text-text-muted">{pct}%</span>
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-sm bg-surface">
                <motion.div
                  className={`h-full rounded-sm ${SHADES[i]}`}
                  initial={reduce ? { width: `${pct}%` } : { width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
