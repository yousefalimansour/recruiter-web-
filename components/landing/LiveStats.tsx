"use client";

import { useEffect, useState } from "react";
import { getOverview } from "@/lib/api";
import type { DashboardOverview } from "@/lib/types";
import { Overline } from "@/components/ui/Overline";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

/**
 * LiveStats — a flat strip of live numbers pulled from the backend via /api/overview.
 * Falls back to demo data (with a small note) when agent-core is offline.
 */
export function LiveStats() {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    let alive = true;
    getOverview().then((res) => {
      if (!alive) return;
      setData(res.data);
      setIsMock(res.isMock);
    });
    return () => {
      alive = false;
    };
  }, []);

  const stats = [
    { label: "Jobs found / day", value: data?.daily.jobs_found ?? 0, suffix: "" },
    { label: "Applications sent", value: data?.daily.applied ?? 0, suffix: "" },
    {
      label: "Outreach reply rate",
      value: data ? Math.round(data.reply_rate * 1000) / 10 : 0,
      suffix: "%",
      decimals: 1,
    },
  ];

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-center justify-between gap-4">
            <Overline tone="primary">Live from the pipeline</Overline>
            {isMock ? (
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-muted">
                demo data · backend offline
              </span>
            ) : (
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-muted">
                live
              </span>
            )}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-8">
              <p className="font-heading text-[3rem] font-semibold leading-none tracking-[-0.02em] text-text-bright tabular-nums">
                {data ? (
                  <CountUp
                    to={s.value}
                    decimals={s.decimals ?? 0}
                    suffix={s.suffix}
                    grouped
                  />
                ) : (
                  <span className="text-text-muted">—</span>
                )}
              </p>
              <p className="mt-4 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
