import { neon } from "@neondatabase/serverless";
import type { DashboardOverview, RecentItem, ApplicationStatus } from "@/lib/types";

/**
 * Direct Neon reads for the dashboard.
 *
 * The agent writes everything it does to Postgres, and Neon is reachable over
 * HTTPS from Vercel's server runtime — so the dashboard can read the real
 * pipeline without agent-core being deployed anywhere. That keeps hosting free:
 * no always-on backend is required just to render the numbers.
 *
 * These queries mirror agent-core's /dashboard/* handlers exactly so both paths
 * produce an identical wire shape (see agent-core/app/routers/dashboard.py).
 *
 * DATABASE_URL is server-only — it must never be exposed as NEXT_PUBLIC_*.
 */

function client() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

const num = (v: unknown): number => (v === null || v === undefined ? 0 : Number(v));

/** Aggregate snapshot: daily digest + funnel + outreach counters. */
export async function getOverviewFromDb(): Promise<DashboardOverview | null> {
  const sql = client();
  if (!sql) return null;

  // One round trip for every counter the dashboard needs.
  const [row] = (await sql`
    SELECT
      (SELECT count(*) FROM jobs WHERE discovered_at >= date_trunc('day', now())) AS d_found,
      (SELECT count(*) FROM jobs WHERE discovered_at >= date_trunc('day', now())
         AND status IN ('qualified','ready_to_apply'))                            AS d_qualified,
      (SELECT count(*) FROM jobs WHERE discovered_at >= date_trunc('day', now())
         AND status = 'rejected')                                                 AS d_rejected,
      (SELECT count(*) FROM applications WHERE submitted_at >= date_trunc('day', now())
         AND status = 'submitted')                                                AS d_applied,
      (SELECT count(*) FROM applications WHERE updated_at >= date_trunc('day', now())
         AND status = 'needs_human')                                              AS d_review_apps,
      (SELECT count(*) FROM jobs WHERE discovered_at >= date_trunc('day', now())
         AND status = 'needs_review')                                             AS d_review_jobs,
      (SELECT count(*) FROM jobs)                                                 AS f_discovered,
      (SELECT count(*) FROM jobs WHERE status IN ('qualified','ready_to_apply'))  AS f_qualified,
      (SELECT count(*) FROM applications)                                         AS f_applied,
      (SELECT count(*) FROM applications WHERE status = 'submitted')              AS f_submitted,
      (SELECT count(*) FROM applications WHERE status = 'replied')                AS f_replied,
      (SELECT count(*) FROM outreach_contacts WHERE status IN ('new','queued'))   AS o_queued,
      (SELECT count(*) FROM outreach_sends WHERE sent_at IS NOT NULL)             AS o_sent,
      (SELECT count(*) FROM outreach_sends WHERE replied_at IS NOT NULL)          AS o_replied,
      (SELECT count(*) FROM outreach_sends WHERE bounced IS TRUE)                 AS o_bounced
  `) as Record<string, unknown>[];

  if (!row) return null;

  const blockers = (await sql`
    SELECT human_reason FROM applications
    WHERE updated_at >= date_trunc('day', now())
      AND human_reason IS NOT NULL
      AND human_reason <> 'dry_run_review'
    GROUP BY human_reason
    ORDER BY count(*) DESC
    LIMIT 5
  `) as { human_reason: string }[];

  const sent = num(row.o_sent);
  const replied = num(row.o_replied);

  return {
    daily: {
      jobs_found: num(row.d_found),
      qualified: num(row.d_qualified),
      applied: num(row.d_applied),
      need_manual_review: num(row.d_review_apps) + num(row.d_review_jobs),
      rejected: num(row.d_rejected),
      top_blockers: blockers.map((b) => b.human_reason),
    },
    funnel: {
      discovered: num(row.f_discovered),
      qualified: num(row.f_qualified),
      applied: num(row.f_applied),
      submitted: num(row.f_submitted),
      replied: num(row.f_replied),
    },
    outreach: {
      queued: num(row.o_queued),
      sent,
      replied,
      bounced: num(row.o_bounced),
    },
    reply_rate: sent ? Math.round((replied / sent) * 10000) / 10000 : 0,
    generated_at: new Date().toISOString(),
  };
}

/**
 * Recent activity for the table.
 *
 * Real applications take priority. Before the agent has applied to anything,
 * we surface the most recently *discovered* jobs instead — they are genuinely
 * pending application, so they map to the "pending" status rather than being
 * invented. This keeps the table informative from the first discovery run.
 */
export async function getRecentFromDb(limit: number): Promise<RecentItem[] | null> {
  const sql = client();
  if (!sql) return null;

  const apps = (await sql`
    SELECT
      COALESCE(c.name, j.company_name, 'Unknown')          AS company,
      j.title                                              AS role,
      a.ats_type                                           AS ats,
      a.status                                             AS status,
      j.match_score                                        AS match_score,
      COALESCE(a.submitted_at, a.updated_at, a.created_at) AS time,
      j.location, j.remote, j.country, j.seniority, j.url,
      j.salary_min, j.salary_max, j.salary_currency, j.tech_stack, j.posted_at,
      (SELECT d.reasons FROM ai_decisions d
        WHERE d.job_id = j.id ORDER BY d.created_at DESC LIMIT 1) AS reasons
    FROM applications a
    JOIN jobs j ON j.id = a.job_id
    LEFT JOIN companies c ON c.id = j.company_id
    ORDER BY COALESCE(a.submitted_at, a.updated_at, a.created_at) DESC
    LIMIT ${limit}
  `) as Record<string, unknown>[];

  if (apps.length > 0) return apps.map(toItem);

  const jobs = (await sql`
    SELECT
      COALESCE(
        c.name,
        j.company_name,
        initcap(split_part(regexp_replace(j.url, '^https?://(www\\.)?', ''), '.', 1)),
        'Unknown'
      )              AS company,
      j.title        AS role,
      j.source       AS ats,
      j.status       AS status,
      j.match_score  AS match_score,
      j.discovered_at AS time,
      j.location, j.remote, j.country, j.seniority, j.url,
      j.salary_min, j.salary_max, j.salary_currency, j.tech_stack, j.posted_at,
      (SELECT d.reasons FROM ai_decisions d
        WHERE d.job_id = j.id ORDER BY d.created_at DESC LIMIT 1) AS reasons
    FROM jobs j
    LEFT JOIN companies c ON c.id = j.company_id
    ORDER BY j.priority_rank DESC, j.discovered_at DESC
    LIMIT ${limit}
  `) as Record<string, unknown>[];

  return jobs.map(toItem);
}

/** Map a DB row to the wire shape, normalising status into ApplicationStatus. */
function toItem(r: Record<string, unknown>): RecentItem {
  const rationale = parseReasons(r.reasons);
  return {
    company: String(r.company ?? "Unknown"),
    role: String(r.role ?? "Untitled role"),
    ats: String(r.ats ?? "—"),
    status: normalizeStatus(String(r.status ?? "")),
    match_score: r.match_score === null || r.match_score === undefined ? null : Number(r.match_score),
    time: toIso(r.time) ?? new Date().toISOString(),
    location: (r.location as string) ?? null,
    remote: r.remote === null || r.remote === undefined ? null : Boolean(r.remote),
    country: (r.country as string) ?? null,
    seniority: (r.seniority as string) ?? null,
    url: (r.url as string) ?? null,
    salary_min: r.salary_min === null || r.salary_min === undefined ? null : Number(r.salary_min),
    salary_max: r.salary_max === null || r.salary_max === undefined ? null : Number(r.salary_max),
    salary_currency: (r.salary_currency as string) ?? null,
    tech_stack: Array.isArray(r.tech_stack) ? (r.tech_stack as string[]) : null,
    posted_at: toIso(r.posted_at),
    reasons: rationale.reasons,
    required_skills: rationale.required,
    missing_skills: rationale.missing,
  };
}

function toIso(v: unknown): string | null {
  if (!v) return null;
  if (v instanceof Date) return v.toISOString();
  return String(v);
}

/**
 * `ai_decisions.reasons` is JSONB written by the scorer. It may be a plain list
 * of reason strings or an object also carrying the skill hints, so accept both.
 */
function parseReasons(raw: unknown): {
  reasons: string[] | null;
  required: string[] | null;
  missing: string[] | null;
} {
  const empty = { reasons: null, required: null, missing: null };
  if (!raw) return empty;

  let value: unknown = raw;
  if (typeof raw === "string") {
    try {
      value = JSON.parse(raw);
    } catch {
      return { reasons: [raw], required: null, missing: null };
    }
  }

  if (Array.isArray(value)) return { reasons: value.map(String), required: null, missing: null };

  if (typeof value === "object") {
    const o = value as Record<string, unknown>;
    const list = (k: string) => (Array.isArray(o[k]) ? (o[k] as unknown[]).map(String) : null);
    return { reasons: list("reasons"), required: list("required_skills"), missing: list("missing_skills") };
  }
  return empty;
}

/** Job/application statuses -> the five the UI renders. */
function normalizeStatus(raw: string): ApplicationStatus {
  switch (raw) {
    case "submitted":
    case "needs_human":
    case "failed":
    case "pending":
    case "skipped":
      return raw;
    case "rejected":
      return "skipped";
    case "needs_review":
      return "needs_human";
    // discovered / qualified / ready_to_apply / in_progress -> awaiting action
    default:
      return "pending";
  }
}
