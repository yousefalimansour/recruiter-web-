"use client";

import { useEffect, useState } from "react";
import { getOverview } from "@/lib/api";
import type { DashboardOverview } from "@/lib/types";
import { CountUp } from "@/components/motion/CountUp";
import { JapaneseLabel } from "./JapaneseLabel";
import { GlassCard } from "./GlassCard";

/**
 * StatsBand — live numbers from /api/overview in flat glass tiles (flat pink
 * figures, no gradient). Falls back to demo data with a note when offline.
 */
export function StatsBand() {
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

  const stats: { label: string; value: number; suffix?: string; decimals?: number; glow: "pink" | "purple" | "blue" }[] = [
    { label: "Jobs found / day", value: data?.daily.jobs_found ?? 0, glow: "pink" },
    { label: "Applications sent", value: data?.daily.applied ?? 0, glow: "purple" },
    { label: "Outreach reply rate", value: data ? Math.round(data.reply_rate * 1000) / 10 : 0, suffix: "%", decimals: 1, glow: "blue" },
  ];

  return (
    <section id="stats" className="relative overflow-hidden py-28 md:py-36">
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3" data-reveal>
          <JapaneseLabel>ライブ・パイプライン</JapaneseLabel>
          <span className="font-display text-[0.7rem] uppercase tracking-[0.2em] text-sakura-faint">
            {isMock ? "demo data · backend offline" : "live"}
          </span>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3" data-reveal-stagger>
          {stats.map((s) => (
            <GlassCard key={s.label} glow={s.glow} className="p-8">
              <p className="font-display text-5xl font-bold leading-none tabular-nums text-sakura-pink">
                {data ? (
                  <CountUp to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} grouped />
                ) : (
                  "—"
                )}
              </p>
              <p className="mt-4 font-display text-xs uppercase tracking-[0.18em] text-sakura-muted">
                {s.label}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
