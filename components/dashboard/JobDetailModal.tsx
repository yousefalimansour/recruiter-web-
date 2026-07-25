"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  MapPin,
  Globe,
  Layers,
  Wallet,
  CalendarClock,
  Building2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Overline } from "@/components/ui/Overline";
import type { ApplicationStatus, RecentItem } from "@/lib/types";

const STAGES = ["Discovered", "Scored", "Tailored", "Applied", "Reply"] as const;
type StageState = "done" | "current" | "failed" | "todo";

/** How far through the pipeline a given status has progressed. */
function stageStates(status: ApplicationStatus): StageState[] {
  switch (status) {
    case "submitted":
      return ["done", "done", "done", "done", "todo"];
    case "needs_human":
      return ["done", "done", "done", "current", "todo"];
    case "pending":
      return ["done", "current", "todo", "todo", "todo"];
    case "failed":
      return ["done", "done", "done", "failed", "todo"];
    case "skipped":
      return ["done", "done", "todo", "todo", "todo"];
    default:
      return ["todo", "todo", "todo", "todo", "todo"];
  }
}

const SUMMARY: Record<ApplicationStatus, string> = {
  submitted: "Submitted successfully — now awaiting a recruiter reply.",
  needs_human: "Paused for human review before the final submit.",
  pending: "In the queue — discovered and awaiting the next pipeline stage.",
  failed: "The submission failed and was queued for automatic recovery.",
  skipped: "Skipped — it didn't clear the match-score threshold.",
};

function absTime(iso?: string | null): string {
  if (!iso) return "—";
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "—";
  return new Date(t).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeAgo(iso?: string | null): string {
  if (!iso) return "";
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "";
  const secs = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function salaryText(item: RecentItem): string | null {
  const { salary_min: lo, salary_max: hi, salary_currency: cur } = item;
  if (!lo && !hi) return null;
  const c = cur || "";
  const fmt = (n: number) => (n >= 1000 ? `${Math.round(n / 1000)}k` : String(n));
  if (lo && hi) return `${c} ${fmt(lo)}–${fmt(hi)}`.trim();
  return `${c} ${fmt((lo || hi) as number)}+`.trim();
}

/** One labelled fact in the meta grid. */
function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 min-w-0">
      <Icon size={14} strokeWidth={1.7} className="mt-0.5 shrink-0 text-text-muted" />
      <div className="flex min-w-0 flex-col">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-text-muted">
          {label}
        </span>
        <span className="truncate text-small text-text" title={value}>
          {value}
        </span>
      </div>
    </div>
  );
}

/**
 * JobDetailModal — full detail for one job/application: who is hiring, where,
 * the agent's match score and its reasoning, plus a compact horizontal pipeline
 * stepper. The panel caps at 90vh and scrolls internally so it never gets cut
 * off on short screens.
 */
export function JobDetailModal({
  item,
  onClose,
}: {
  item: RecentItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  const states = item ? stageStates(item.status) : [];
  const pay = item ? salaryText(item) : null;
  const where =
    item?.location || item?.country || (item?.remote ? "Remote" : null) || "Not specified";

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close detail"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${item.role} at ${item.company}`}
            className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border-strong bg-card shadow-2xl"
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ---------- header ---------- */}
            <div className="flex shrink-0 items-start gap-4 border-b border-border bg-surface px-5 py-5 sm:px-7">
              <span className="hidden size-11 shrink-0 place-items-center rounded-lg border border-border-strong bg-card text-accent sm:grid">
                <Building2 size={19} strokeWidth={1.7} />
              </span>

              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <Overline tone="primary">Hiring company</Overline>
                <h3 className="truncate font-heading text-h3 font-semibold leading-tight text-text-bright">
                  {item.company}
                </h3>
                <p className="text-small leading-snug text-text-secondary">{item.role}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <StatusBadge status={item.status} />
                  {item.remote ? (
                    <span className="rounded-sm border border-border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-secondary">
                      Remote
                    </span>
                  ) : null}
                  {item.seniority && item.seniority !== "unknown" ? (
                    <span className="rounded-sm border border-border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-secondary">
                      {item.seniority}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="grid size-8 place-items-center rounded-md border border-border text-text-muted transition-colors hover:border-border-strong hover:text-text-bright"
                >
                  <X size={16} strokeWidth={1.8} />
                </button>
                {item.match_score !== null && item.match_score !== undefined ? (
                  <div className="flex flex-col items-end">
                    <span className="font-heading text-[1.75rem] font-semibold leading-none tabular-nums text-accent">
                      {item.match_score}
                    </span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-text-muted">
                      match
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            {/* ---------- scrollable body ---------- */}
            <div className="flex-1 overflow-y-auto">
              {/* match bar */}
              {item.match_score !== null && item.match_score !== undefined ? (
                <div className="border-b border-border px-5 py-4 sm:px-7">
                  <div className="mb-2 flex items-center justify-between">
                    <Overline>Match score</Overline>
                    <span className="font-mono text-[0.7rem] tabular-nums text-text-muted">
                      {item.match_score}/100
                    </span>
                  </div>
                  <span className="block h-1.5 w-full overflow-hidden rounded-full bg-elevated">
                    <span
                      className="block h-full rounded-full bg-primary transition-[width] duration-500"
                      style={{ width: `${Math.max(0, Math.min(100, item.match_score))}%` }}
                    />
                  </span>
                </div>
              ) : null}

              {/* facts */}
              <div className="grid grid-cols-2 gap-x-5 gap-y-4 border-b border-border px-5 py-5 sm:grid-cols-3 sm:px-7">
                <Fact icon={MapPin} label="Location" value={where} />
                <Fact icon={Globe} label="Source" value={item.ats} />
                {pay ? <Fact icon={Wallet} label="Salary" value={pay} /> : null}
                {item.posted_at ? (
                  <Fact icon={CalendarClock} label="Posted" value={absTime(item.posted_at)} />
                ) : null}
                <Fact
                  icon={Layers}
                  label="Seen"
                  value={`${absTime(item.time)}${timeAgo(item.time) ? ` · ${timeAgo(item.time)}` : ""}`}
                />
              </div>

              {/* horizontal pipeline stepper */}
              <div className="border-b border-border px-5 py-5 sm:px-7">
                <Overline className="mb-4 block">Pipeline stage</Overline>
                <div className="flex items-start">
                  {STAGES.map((stage, i) => {
                    const st: StageState = states[i] ?? "todo";
                    const last = i === STAGES.length - 1;
                    const dot =
                      st === "done"
                        ? "border-primary bg-primary"
                        : st === "current"
                          ? "border-primary bg-card animate-pulse"
                          : st === "failed"
                            ? "border-accent bg-accent"
                            : "border-border bg-card";
                    const label =
                      st === "todo"
                        ? "text-text-muted"
                        : st === "failed"
                          ? "text-accent"
                          : "text-text-bright";
                    return (
                      <div key={stage} className="flex flex-1 flex-col items-center gap-2">
                        <div className="flex w-full items-center">
                          <span className="h-px flex-1 bg-transparent" />
                          <span className={`size-3 shrink-0 rounded-full border-2 ${dot}`} />
                          <span
                            className={`h-px flex-1 ${last ? "bg-transparent" : st === "done" ? "bg-primary" : "bg-border"}`}
                          />
                        </div>
                        <span
                          className={`text-center font-mono text-[0.6rem] uppercase tracking-[0.1em] ${label}`}
                        >
                          {stage}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* agent reasoning */}
              {item.reasons && item.reasons.length > 0 ? (
                <div className="border-b border-border px-5 py-5 sm:px-7">
                  <Overline className="mb-3 flex items-center gap-1.5">
                    <Sparkles size={12} strokeWidth={1.8} />
                    Why the agent scored it this way
                  </Overline>
                  <ul className="flex flex-col gap-2">
                    {item.reasons.slice(0, 4).map((r, i) => (
                      <li key={i} className="flex gap-2 text-caption leading-relaxed text-text-secondary">
                        <span className="mt-[7px] size-1 shrink-0 rounded-full bg-accent" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* skills */}
              {(item.tech_stack?.length || item.missing_skills?.length) ? (
                <div className="border-b border-border px-5 py-5 sm:px-7">
                  {item.tech_stack?.length ? (
                    <>
                      <Overline className="mb-2.5 block">Tech stack</Overline>
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {item.tech_stack.slice(0, 14).map((t) => (
                          <span
                            key={t}
                            className="rounded-sm border border-border px-2 py-0.5 font-mono text-[0.68rem] text-text-secondary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : null}
                  {item.missing_skills?.length ? (
                    <>
                      <Overline className="mb-2.5 block">Gaps the agent flagged</Overline>
                      <div className="flex flex-wrap gap-1.5">
                        {item.missing_skills.slice(0, 10).map((t) => (
                          <span
                            key={t}
                            className="rounded-sm border border-dashed border-border-strong px-2 py-0.5 font-mono text-[0.68rem] text-text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              ) : null}

              {/* summary */}
              <div className="px-5 py-4 sm:px-7">
                <p className="text-caption leading-relaxed text-text-secondary">
                  {SUMMARY[item.status]}
                </p>
              </div>
            </div>

            {/* ---------- footer ---------- */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border bg-surface px-5 py-3.5 sm:px-7">
              <span className="truncate font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-muted">
                {item.ats}
              </span>
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-primary bg-primary px-3.5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-primary-pressed"
                >
                  Open posting
                  <ExternalLink size={12} strokeWidth={2} />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 rounded-md border border-border px-3.5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-text-bright"
                >
                  Close
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
