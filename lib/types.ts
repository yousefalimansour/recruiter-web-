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
  /**
   * Detail fields for the job drawer. All optional so the mock data and the
   * agent-core proxy (which return the compact shape) stay valid.
   */
  location?: string | null;
  remote?: boolean | null;
  country?: string | null;
  seniority?: string | null;
  url?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string | null;
  tech_stack?: string[] | null;
  posted_at?: string | null;
  /** Why the agent scored it the way it did (from ai_decisions). */
  reasons?: string[] | null;
  required_skills?: string[] | null;
  missing_skills?: string[] | null;
}

export interface RecentResponse {
  items: RecentItem[];
}

/** Wrapper the fetchers return so the UI knows if it's live or mock data. */
export interface DataResult<T> {
  data: T;
  isMock: boolean;
}
