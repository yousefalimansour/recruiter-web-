import { NextResponse } from "next/server";
import { mockOverview } from "@/lib/mock";
import type { DashboardOverview } from "@/lib/types";

/**
 * GET /api/overview — proxies agent-core `/dashboard/overview` (server-side, so
 * AGENT_CORE_URL is never exposed to the browser). On any failure/timeout/missing
 * env we return realistic mock data with `x-data-source: mock` so the dashboard
 * always renders. Success sets `x-data-source: live`.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const base = process.env.AGENT_CORE_URL;
  if (base) {
    try {
      const res = await fetch(`${base.replace(/\/$/, "")}/dashboard/overview`, {
        cache: "no-store",
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const data = (await res.json()) as DashboardOverview;
        return NextResponse.json(data, { headers: { "x-data-source": "live" } });
      }
    } catch {
      // fall through to mock
    }
  }
  return NextResponse.json(mockOverview, {
    headers: { "x-data-source": "mock" },
  });
}
