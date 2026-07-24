import { NextResponse } from "next/server";
import { mockOverview } from "@/lib/mock";
import { getOverviewFromDb } from "@/lib/neon";
import type { DashboardOverview } from "@/lib/types";

/**
 * GET /api/overview — the dashboard's aggregate snapshot.
 *
 * Resolution order:
 *   1. DATABASE_URL  → read Neon directly (no backend needs to be deployed)
 *   2. AGENT_CORE_URL → proxy agent-core, if it happens to be running
 *   3. mock data      → so the page always renders
 *
 * Both env vars are server-only; neither reaches the browser. The
 * `x-data-source` header tells the client which path served the request.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  // 1) Neon direct — the primary path.
  try {
    const data = await getOverviewFromDb();
    if (data) {
      return NextResponse.json(data, { headers: { "x-data-source": "live" } });
    }
  } catch (err) {
    console.error("[overview] Neon read failed:", err);
  }

  // 2) agent-core proxy — used when the backend is deployed.
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

  // 3) Demo data.
  return NextResponse.json(mockOverview, {
    headers: { "x-data-source": "mock" },
  });
}
