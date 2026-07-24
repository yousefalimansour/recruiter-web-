import type { DashboardOverview, RecentItem } from "@/lib/types";

/**
 * Realistic sample data used when agent-core is unreachable.
 * Backend / Python / Django roles across Greenhouse / Lever / Ashby.
 * Numbers are internally consistent (funnel narrows, reply_rate = replied/sent).
 */
export const mockOverview: DashboardOverview = {
  daily: {
    jobs_found: 214,
    qualified: 63,
    applied: 41,
    need_manual_review: 7,
    rejected: 151,
    top_blockers: [
      "Requires active US security clearance",
      "On-site only (no remote option)",
      "8+ yrs experience floor",
      "Custom assessment before apply",
    ],
  },
  funnel: {
    discovered: 214,
    qualified: 63,
    applied: 48,
    submitted: 41,
    replied: 9,
  },
  outreach: {
    queued: 18,
    sent: 126,
    replied: 14,
    bounced: 5,
  },
  reply_rate: 0.111,
  generated_at: "2026-07-24T06:40:00Z",
};

export const mockRecent: RecentItem[] = [
  {
    company: "Ramp",
    role: "Senior Backend Engineer (Python)",
    ats: "Greenhouse",
    status: "submitted",
    match_score: 92,
    time: "2026-07-24T06:12:00Z",
  },
  {
    company: "Vercel",
    role: "Software Engineer, Platform",
    ats: "Ashby",
    status: "submitted",
    match_score: 88,
    time: "2026-07-24T05:47:00Z",
  },
  {
    company: "Retool",
    role: "Backend Engineer — Django",
    ats: "Lever",
    status: "needs_human",
    match_score: 79,
    time: "2026-07-24T05:31:00Z",
  },
  {
    company: "Notion",
    role: "Senior Software Engineer, Data",
    ats: "Greenhouse",
    status: "submitted",
    match_score: 85,
    time: "2026-07-24T04:58:00Z",
  },
  {
    company: "Linear",
    role: "Full-Stack Engineer",
    ats: "Ashby",
    status: "pending",
    match_score: 81,
    time: "2026-07-24T04:22:00Z",
  },
  {
    company: "Plaid",
    role: "Backend Engineer, Payments",
    ats: "Greenhouse",
    status: "submitted",
    match_score: 90,
    time: "2026-07-24T03:55:00Z",
  },
  {
    company: "Airbyte",
    role: "Python Engineer, Connectors",
    ats: "Lever",
    status: "failed",
    match_score: 74,
    time: "2026-07-24T03:19:00Z",
  },
  {
    company: "Sentry",
    role: "Software Engineer, Backend",
    ats: "Greenhouse",
    status: "submitted",
    match_score: 83,
    time: "2026-07-24T02:44:00Z",
  },
  {
    company: "Deel",
    role: "Senior Django Engineer",
    ats: "Ashby",
    status: "skipped",
    match_score: null,
    time: "2026-07-24T02:10:00Z",
  },
  {
    company: "Mercury",
    role: "Backend Engineer (Python/Go)",
    ats: "Lever",
    status: "submitted",
    match_score: 87,
    time: "2026-07-24T01:38:00Z",
  },
];
