"use client";

import { useEffect, useState } from "react";
import { Search, Filter, Send, Reply, TrendingUp } from "lucide-react";
import { getOverview } from "@/lib/api";
import type { DashboardOverview } from "@/lib/types";
import { CountUp } from "@/components/motion/CountUp";
import { JapaneseLabel } from "./JapaneseLabel";

/**
 * StatsBand — one bordered "stat strip" panel with four divided cells. Always
 * shows meaningful numbers (live data when available, curated sample otherwise)
 * so the section never looks empty, and the caption lives in the panel footer
 * so it can never collide with the tiles.
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

  // Show one coherent set of numbers: either everything from the live pipeline
  // or everything from the curated sample. Mixing them (a real 7 next to a
  // fabricated 63) would misrepresent the pipeline.
  const live = data !== null;
  const f = data?.funnel;

  const tiles: {
    icon: typeof Search;
    value: number;
    label: string;
    sub: string;
    trend: string;
    suffix?: string;
    decimals?: number;
  }[] = live
    ? [
        { icon: Search, value: f?.discovered ?? 0, label: "Jobs discovered", sub: "across all sources", trend: "live" },
        { icon: Filter, value: f?.qualified ?? 0, label: "Qualified", sub: "match ≥ threshold", trend: "live" },
        { icon: Send, value: f?.applied ?? 0, label: "Applications sent", sub: "auto-submitted", trend: "live" },
        {
          icon: Reply,
          value: Math.round((data?.reply_rate ?? 0) * 1000) / 10,
          label: "Reply rate",
          sub: "cold outreach",
          trend: "live",
          suffix: "%",
          decimals: 1,
        },
      ]
    : [
        { icon: Search, value: 214, label: "Jobs discovered", sub: "across all sources", trend: "+9%" },
        { icon: Filter, value: 63, label: "Qualified", sub: "match ≥ threshold", trend: "+4%" },
        { icon: Send, value: 41, label: "Applications sent", sub: "auto-submitted", trend: "+6%" },
        { icon: Reply, value: 11.1, label: "Reply rate", sub: "cold outreach", trend: "+1.2pt", suffix: "%", decimals: 1 },
      ];

  return (
    <section id="stats" className="relative px-5 pb-24 pt-14 sm:px-8 md:pb-32 md:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center gap-4 text-center" data-reveal>
          <JapaneseLabel>Live pipeline</JapaneseLabel>
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold text-sakura-cream">
            Numbers that move while you sleep
          </h2>
          <p className="max-w-xl text-sakura-muted">
            A snapshot of the agent&apos;s last 24 hours — from discovery all the
            way through to recruiter replies.
          </p>
        </div>

        <div
          className="sakura-glass overflow-hidden rounded-3xl border border-sakura-line"
          data-reveal
        >
          <div className="grid divide-sakura-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4 [&>*]:border-t [&>*]:border-sakura-line sm:[&>*]:border-t-0 sm:[&>*:nth-child(-n+2)]:border-t-0 sm:[&>*:nth-child(3)]:border-t lg:[&>*]:border-t-0">
            {tiles.map((t) => (
              <div key={t.label} className="group flex flex-col gap-5 p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-[rgba(102,0,51,0.4)] bg-[rgba(102,0,51,0.12)] text-sakura-pink transition-transform duration-500 group-hover:-translate-y-0.5">
                    <t.icon size={20} strokeWidth={1.7} />
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(102,0,51,0.1)] px-2 py-0.5 text-[0.65rem] font-semibold text-sakura-pink">
                    <TrendingUp size={11} strokeWidth={2.2} />
                    {t.trend}
                  </span>
                </div>
                <p className="font-display text-[2.7rem] font-bold leading-none tabular-nums text-sakura-cream">
                  <CountUp to={t.value} decimals={t.decimals ?? 0} suffix={t.suffix ?? ""} grouped />
                </p>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-sm font-semibold text-sakura-cream">{t.label}</span>
                  <span className="font-display text-[0.68rem] uppercase tracking-[0.16em] text-sakura-faint">
                    {t.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2.5 border-t border-sakura-line px-6 py-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sakura-pink opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sakura-pink" />
            </span>
            <span className="font-display text-[0.68rem] uppercase tracking-[0.18em] text-sakura-faint">
              {live ? "Live from the agent pipeline" : "Sample metrics · pipeline offline"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
