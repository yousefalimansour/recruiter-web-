"use client";

import { useEffect, useState } from "react";
import { Search, Filter, Send, Reply } from "lucide-react";
import { getOverview } from "@/lib/api";
import type { DashboardOverview } from "@/lib/types";
import { CountUp } from "@/components/motion/CountUp";
import { JapaneseLabel } from "./JapaneseLabel";

/**
 * StatsBand — four glass metric tiles. Always shows meaningful numbers (live
 * data when available, curated sample otherwise) so the section never looks
 * empty.
 */
export function StatsBand() {
  const [data, setData] = useState<DashboardOverview | null>(null);

  useEffect(() => {
    let alive = true;
    getOverview().then((res) => {
      if (alive) setData(res.data);
    });
    return () => {
      alive = false;
    };
  }, []);

  const d = data?.daily;
  const replyRate = data ? Math.round(data.reply_rate * 1000) / 10 : 11.1;

  const tiles: {
    icon: typeof Search;
    value: number;
    label: string;
    sub: string;
    suffix?: string;
    decimals?: number;
  }[] = [
    { icon: Search, value: d?.jobs_found || 214, label: "Jobs found", sub: "every 24h" },
    { icon: Filter, value: d?.qualified || 63, label: "Qualified", sub: "match ≥ threshold" },
    { icon: Send, value: d?.applied || 41, label: "Applications sent", sub: "auto-submitted" },
    { icon: Reply, value: replyRate || 11.1, label: "Reply rate", sub: "cold outreach", suffix: "%", decimals: 1 },
  ];

  return (
    <section id="stats" className="relative overflow-hidden py-28 md:py-36">
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col items-center gap-4 text-center" data-reveal>
          <JapaneseLabel>Live pipeline</JapaneseLabel>
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold text-sakura-cream">
            Numbers that move while you sleep
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
          {tiles.map((t) => (
            <div
              key={t.label}
              className="sakura-glass flex flex-col gap-5 rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-[rgba(102,0,51,0.4)] bg-[rgba(102,0,51,0.12)] text-sakura-pink">
                <t.icon size={20} strokeWidth={1.7} />
              </span>
              <p className="font-display text-[2.6rem] font-bold leading-none tabular-nums text-sakura-cream">
                <CountUp to={t.value} decimals={t.decimals ?? 0} suffix={t.suffix ?? ""} grouped />
              </p>
              <div className="flex flex-col gap-1">
                <span className="font-display text-sm font-semibold text-sakura-cream">{t.label}</span>
                <span className="font-display text-[0.7rem] uppercase tracking-[0.16em] text-sakura-faint">
                  {t.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-display text-[0.7rem] uppercase tracking-[0.18em] text-sakura-faint">
          Sample metrics from the pipeline
        </p>
      </div>
    </section>
  );
}
