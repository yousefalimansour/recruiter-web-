"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
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
      return ["done", "done", "current", "todo", "todo"];
    case "failed":
      return ["done", "done", "done", "failed", "todo"];
    case "skipped":
      return ["done", "todo", "todo", "todo", "todo"];
    default:
      return ["todo", "todo", "todo", "todo", "todo"];
  }
}

const STAGE_NOTE: Record<StageState, string> = {
  done: "Complete",
  current: "In progress",
  failed: "Failed",
  todo: "Pending",
};

const SUMMARY_TAIL: Record<ApplicationStatus, string> = {
  submitted: "Submitted successfully — now awaiting a recruiter reply.",
  needs_human: "Paused for human review before the final submit.",
  pending: "Currently tailoring and preparing the application.",
  failed: "The submission failed and was queued for automatic recovery.",
  skipped: "Skipped — it didn't clear the match-score threshold.",
};

function absTime(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "—";
  return new Date(t).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeAgo(iso: string): string {
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

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 bg-card px-6 py-4">
      <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-text-muted">
        {label}
      </span>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

/**
 * JobDetailModal — a small centered dialog with the full detail of one
 * application: metadata, match score, and a vertical pipeline stepper showing
 * exactly where the agent got to. Closes on backdrop click or Escape.
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

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close detail"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${item.role} at ${item.company}`}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-lg border border-border-strong bg-card"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
              <div className="flex flex-col gap-1.5">
                <Overline tone="primary">Application detail</Overline>
                <h3 className="font-heading text-h3 font-semibold text-text-bright">
                  {item.company}
                </h3>
                <p className="text-small text-text-secondary">{item.role}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid size-8 shrink-0 place-items-center rounded-md border border-border text-text-muted transition-colors hover:border-border-strong hover:text-text-bright"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>

            {/* metadata cells */}
            <div className="grid grid-cols-2 gap-px bg-border">
              <Cell label="Status">
                <StatusBadge status={item.status} />
              </Cell>
              <Cell label="ATS">
                <span className="font-mono text-small text-text">{item.ats}</span>
              </Cell>
              <Cell label="Match score">
                {item.match_score === null ? (
                  <span className="font-mono text-small text-text-muted">—</span>
                ) : (
                  <>
                    <span className="font-mono text-small tabular-nums text-accent">
                      {item.match_score}
                      <span className="text-text-muted">/100</span>
                    </span>
                    <span className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-elevated">
                      <span
                        className="block h-full rounded-full bg-primary"
                        style={{ width: `${Math.max(0, Math.min(100, item.match_score))}%` }}
                      />
                    </span>
                  </>
                )}
              </Cell>
              <Cell label="Applied">
                <span className="font-mono text-small text-text">{absTime(item.time)}</span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-muted">
                  {timeAgo(item.time)}
                </span>
              </Cell>
            </div>

            {/* pipeline stepper */}
            <div className="border-t border-border px-6 py-5">
              <Overline className="mb-4 block">Pipeline stage</Overline>
              <ol className="flex flex-col">
                {STAGES.map((stage, i) => {
                  const st: StageState = stageStates(item.status)[i] ?? "todo";
                  const last = i === STAGES.length - 1;
                  const dot =
                    st === "done"
                      ? "bg-primary border-primary"
                      : st === "current"
                        ? "border-primary bg-card"
                        : st === "failed"
                          ? "bg-accent border-accent"
                          : "border-border bg-card";
                  const labelColor =
                    st === "todo"
                      ? "text-text-muted"
                      : st === "failed"
                        ? "text-accent"
                        : "text-text-bright";
                  return (
                    <li key={stage} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className={`mt-1 size-3 rounded-full border-2 ${dot} ${
                            st === "current" ? "animate-pulse" : ""
                          }`}
                        />
                        {!last && (
                          <span className="my-1 w-px flex-1 bg-border" aria-hidden="true" />
                        )}
                      </div>
                      <div className={`pb-5 ${last ? "pb-0" : ""}`}>
                        <span className={`block font-heading text-small font-medium ${labelColor}`}>
                          {stage}
                        </span>
                        <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-muted">
                          {STAGE_NOTE[st]}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* summary */}
            <div className="border-t border-border bg-surface px-6 py-4">
              <p className="text-caption leading-relaxed text-text-secondary">
                The agent applied to the{" "}
                <span className="text-text-bright">{item.role}</span> role at{" "}
                <span className="text-text-bright">{item.company}</span> through{" "}
                {item.ats}. {SUMMARY_TAIL[item.status]}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
