/**
 * Shared API types — mirror the agent-core backend contract EXACTLY
 * (see FRONTEND-CONTRACT.md §Backend connection).
 */

export type ApplicationStatus =
  | "submitted"
  | "needs_human"
  | "failed"
  | "pending"
  | "skipped";

export interface DashboardOverview {
  daily: {
    jobs_found: number;
    qualified: number;
    applied: number;
    need_manual_review: number;
    rejected: number;
    top_blockers: string[];
  };
  funnel: {
    discovered: number;
    qualified: number;
    applied: number;
    submitted: number;
    replied: number;
  };
  outreach: {
    queued: number;
    sent: number;
    replied: number;
    bounced: number;
  };
  reply_rate: number;
  generated_at: string;
}

export interface RecentItem {
  company: string;
  role: string;
  ats: string;
  status: ApplicationStatus;
  match_score: number | null;
  time: string;
}

export interface RecentResponse {
  items: RecentItem[];
}

/** Wrapper the fetchers return so the UI knows if it's live or mock data. */
export interface DataResult<T> {
  data: T;
  isMock: boolean;
}
