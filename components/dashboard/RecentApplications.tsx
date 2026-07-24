import { Card } from "@/components/ui/Card";
import { Overline } from "@/components/ui/Overline";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import type { RecentItem } from "@/lib/types";

/** Relative "time ago" from an ISO timestamp (mono chrome in the table). */
function timeAgo(iso: string): string {
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "—";
  const secs = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

/**
 * RecentApplications — the latest applications as a dense, flat table.
 * 1px row dividers, mono metadata, StatusBadge (shade + label + icon).
 */
export function RecentApplications({ items }: { items: RecentItem[] }) {
  return (
    <Card padding="none" className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <Overline>Recent applications</Overline>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-muted">
          {items.length} shown
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              {["Company", "Role", "ATS", "Status", "Match", "Time"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-text-muted"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr
                key={`${item.company}-${i}`}
                className="border-b border-border transition-colors duration-[120ms] last:border-b-0 hover:bg-elevated"
              >
                <td className="px-6 py-4 font-heading text-small font-medium text-text-bright">
                  {item.company}
                </td>
                <td className="px-6 py-4 text-small text-text-secondary">
                  {item.role}
                </td>
                <td className="px-6 py-4 font-mono text-[0.8125rem] text-text-muted">
                  {item.ats}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-6 py-4 font-mono text-[0.8125rem] tabular-nums">
                  {item.match_score === null ? (
                    <span className="text-text-muted">—</span>
                  ) : (
                    <span className="text-accent">{item.match_score}</span>
                  )}
                </td>
                <td className="px-6 py-4 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-text-muted">
                  {timeAgo(item.time)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
