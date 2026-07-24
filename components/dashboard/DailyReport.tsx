import { Stat } from "@/components/ui/Stat";
import { CountUp } from "@/components/motion/CountUp";
import type { DashboardOverview } from "@/lib/types";

/**
 * DailyReport — the five headline counts from the last 24h. `Applied` is the
 * single emphasized (burgundy) focal metric.
 */
export function DailyReport({ daily }: { daily: DashboardOverview["daily"] }) {
  const cards: { label: string; value: number; emphasis?: boolean }[] = [
    { label: "Jobs found", value: daily.jobs_found },
    { label: "Qualified", value: daily.qualified },
    { label: "Applied", value: daily.applied, emphasis: true },
    { label: "Needs review", value: daily.need_manual_review },
    { label: "Rejected", value: daily.rejected },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {cards.map((c) => (
        <Stat
          key={c.label}
          label={c.label}
          emphasis={c.emphasis}
          value={<CountUp to={c.value} grouped />}
        />
      ))}
    </div>
  );
}
