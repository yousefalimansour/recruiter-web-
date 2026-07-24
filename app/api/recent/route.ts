import { NextResponse } from "next/server";
import { mockRecent } from "@/lib/mock";
import { getRecentFromDb } from "@/lib/neon";
import type { RecentResponse } from "@/lib/types";

/**
 * GET /api/recent?limit=10 — recent pipeline activity.
 *
 * Same resolution order as /api/overview: Neon direct, then agent-core, then
 * mock. See lib/neon.ts for why reading Postgres straight from the Vercel
 * runtime lets the dashboard run live with no backend deployed.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(
    Math.max(Number(searchParams.get("limit")) || 10, 1),
    100
  );

  // 1) Neon direct.
  try {
    const items = await getRecentFromDb(limit);
    if (items) {
      return NextResponse.json({ items } satisfies RecentResponse, {
        headers: { "x-data-source": "live" },
      });
    }
  } catch (err) {
    console.error("[recent] Neon read failed:", err);
  }

  // 2) agent-core proxy.
  const base = process.env.AGENT_CORE_URL;
  if (base) {
    try {
      const res = await fetch(
        `${base.replace(/\/$/, "")}/dashboard/recent?limit=${limit}`,
        { cache: "no-store", signal: AbortSignal.timeout(4000) }
      );
      if (res.ok) {
        const data = (await res.json()) as RecentResponse;
        return NextResponse.json(data, {
          headers: { "x-data-source": "live" },
        });
      }
    } catch {
      // fall through to mock
    }
  }

  // 3) Demo data.
  const fallback: RecentResponse = { items: mockRecent.slice(0, limit) };
  return NextResponse.json(fallback, {
    headers: { "x-data-source": "mock" },
  });
}
