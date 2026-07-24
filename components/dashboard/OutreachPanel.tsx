import { Card } from "@/components/ui/Card";
import { Overline } from "@/components/ui/Overline";
import { CountUp } from "@/components/motion/CountUp";
import { MiniBarChart } from "@/components/dashboard/MiniBarChart";
import type { DashboardOverview } from "@/lib/types";

/**
 * OutreachPanel — Track B (cold-email) stats: queued / sent / replied / bounced,
 * plus a flat burgundy bar chart. Flat only.
 */
export function OutreachPanel({
  outreach,
}: {
  outreach: DashboardOverview["outreach"];
}) {
  const tiles: { label: string; value: number }[] = [
    { label: "Queued", value: outreach.queued },
    { label: "Sent", value: outreach.sent },
    { label: "Replied", value: outreach.replied },
    { label: "Bounced", value: outreach.bounced },
  ];

  return (
    <Card padding="lg" className="flex h-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <Overline>Track B · cold-email outreach</Overline>
      </div>

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="bg-card p-4">
            <p className="font-heading text-[1.75rem] font-semibold leading-none text-text-bright tabular-nums">
              <CountUp to={t.value} grouped />
            </p>
            <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-text-muted">
              {t.label}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-6">
        <MiniBarChart
          data={[
            { label: "Sent", value: outreach.sent },
            { label: "Replied", value: outreach.replied },
            { label: "Bounced", value: outreach.bounced },
          ]}
        />
      </div>
    </Card>
  );
}
