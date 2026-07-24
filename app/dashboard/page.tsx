"use client";

import { useEffect, useState } from "react";
import { getOverview, getRecent } from "@/lib/api";
import type { DashboardOverview, RecentItem } from "@/lib/types";
import { Overline } from "@/components/ui/Overline";
import { Reveal } from "@/components/motion/Reveal";
import { DailyReport } from "@/components/dashboard/DailyReport";
import { Funnel } from "@/components/dashboard/Funnel";
import { OutreachPanel } from "@/components/dashboard/OutreachPanel";
import { RecentApplications } from "@/components/dashboard/RecentApplications";

/**
 * Dashboard (/dashboard) — the precise data instrument. Fetches live data from
 * the backend via /api/*, falls back to demo data (with a note) when offline.
 */
export default function DashboardPage() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [recent, setRecent] = useState<RecentItem[] | null>(null);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all([getOverview(), getRecent()]).then(([ov, rc]) => {
      if (!alive) return;
      setOverview(ov.data);
      setRecent(rc.data);
      setIsMock(ov.isMock || rc.isMock);
    });
    return () => {
      alive = false;
    };
  }, []);

  const loading = overview === null || recent === null;
  const stamp = overview
    ? new Date(overview.generated_at).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div className="flex flex-col gap-2">
          <Overline tone="primary">Pipeline dashboard</Overline>
          <h1 className="font-heading text-h2 font-semibold text-text-bright">
            Agent activity
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {isMock ? (
            <span className="inline-flex items-center gap-2 rounded-sm border border-dashed border-border-strong px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-muted">
              demo data · backend offline
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-sm border border-primary bg-primary px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-on-primary">
              live
            </span>
          )}
          <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-text-muted">
            {stamp}
          </span>
        </div>
      </div>

      {loading ? (
        <DashboardSkeleton />
      ) : (
        <div className="mt-8 flex flex-col gap-8">
          <Reveal>
            <DailyReport daily={overview.daily} />
          </Reveal>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Reveal>
              <Funnel funnel={overview.funnel} />
            </Reveal>
            <Reveal delay={0.06}>
              <OutreachPanel outreach={overview.outreach} />
            </Reveal>
          </div>

          <Reveal>
            <RecentApplications items={recent} />
          </Reveal>
        </div>
      )}
    </div>
  );
}

/** Flat mono skeleton while data loads. */
function DashboardSkeleton() {
  return (
    <div className="mt-8 flex flex-col gap-8" aria-hidden="true">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-[116px] animate-pulse rounded-lg border border-border bg-card"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="h-[320px] animate-pulse rounded-lg border border-border bg-card" />
        <div className="h-[320px] animate-pulse rounded-lg border border-border bg-card" />
      </div>
      <div className="h-[360px] animate-pulse rounded-lg border border-border bg-card" />
    </div>
  );
}
