import { NextResponse } from "next/server";
import { mockRecent } from "@/lib/mock";
import type { RecentResponse } from "@/lib/types";

/**
 * GET /api/recent?limit=10 — proxies agent-core `/dashboard/recent`.
 * Mock fallback on any failure, with `x-data-source` header (live|mock).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(
    Math.max(Number(searchParams.get("limit")) || 10, 1),
    100
  );

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

  const fallback: RecentResponse = { items: mockRecent.slice(0, limit) };
  return NextResponse.json(fallback, {
    headers: { "x-data-source": "mock" },
  });
}
