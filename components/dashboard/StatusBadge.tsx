import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  MinusCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { ApplicationStatus } from "@/lib/types";

/**
 * StatusBadge — application status encoded by SHADE + mono label + icon only.
 * No new hues (no green/red/blue): burgundy = submitted, gray = pending,
 * bright wine = needs_human, muted dashed = failed/skipped.
 */
const MAP: Record<
  ApplicationStatus,
  { label: string; variant: "neutral" | "primary" | "attention" | "muted"; Icon: typeof CheckCircle2 }
> = {
  submitted: { label: "Submitted", variant: "primary", Icon: CheckCircle2 },
  pending: { label: "Pending", variant: "neutral", Icon: Clock },
  needs_human: { label: "Needs review", variant: "attention", Icon: AlertTriangle },
  failed: { label: "Failed", variant: "muted", Icon: XCircle },
  skipped: { label: "Skipped", variant: "muted", Icon: MinusCircle },
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  const { label, variant, Icon } = MAP[status];
  return (
    <Badge variant={variant} icon={<Icon size={12} strokeWidth={1.75} />}>
      {label}
    </Badge>
  );
}
