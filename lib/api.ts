import type {
  DashboardOverview,
  RecentItem,
  RecentResponse,
  DataResult,
} from "@/lib/types";
import { mockOverview, mockRecent } from "@/lib/mock";

/**
 * Typed fetchers for the internal Next route handlers (/api/overview, /api/recent).
 * The route handlers proxy agent-core and, on any failure, return mock data with
 * an `x-data-source: mock` header. We read that header to expose `isMock` so the
 * UI can show a "demo data" note.
 *
 * Works from both client and server components: in the browser we use a relative
 * URL; on the server we resolve an absolute origin (Vercel / configured / local).
 */

function resolveBaseUrl(): string {
  // Browser: relative fetch is fine.
  if (typeof window !== "undefined") return "";

  // Server: build an absolute origin.
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? null;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  const port = process.env.PORT ?? "3000";
  return `http://localhost:${port}`;
}

async function fetchJson<T>(
  path: string,
  fallback: T
): Promise<DataResult<T>> {
  const url = `${resolveBaseUrl()}${path}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return { data: fallback, isMock: true };
    }
    const isMock = res.headers.get("x-data-source") === "mock";
    const data = (await res.json()) as T;
    return { data, isMock };
  } catch {
    return { data: fallback, isMock: true };
  }
}

export async function getOverview(): Promise<DataResult<DashboardOverview>> {
  return fetchJson<DashboardOverview>("/api/overview", mockOverview);
}

export async function getRecent(): Promise<DataResult<RecentItem[]>> {
  const result = await fetchJson<RecentResponse>("/api/recent", {
    items: mockRecent,
  });
  return { data: result.data.items ?? mockRecent, isMock: result.isMock };
}
