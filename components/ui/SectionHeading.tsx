import type { ReactNode } from "react";
import { Overline } from "@/components/ui/Overline";

interface SectionHeadingProps {
  /** mono overline kicker above the title */
  overline?: string;
  title: ReactNode;
  /** supporting lede paragraph */
  description?: ReactNode;
  /** heading level for semantics + size */
  level?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

const LEVEL_CLASS: Record<NonNullable<SectionHeadingProps["level"]>, string> = {
  h1: "text-[length:var(--text-h1)] leading-[1.03] tracking-[-0.02em]",
  h2: "text-[length:var(--text-h2)] leading-[1.08] tracking-[-0.015em]",
  h3: "text-[length:var(--text-h3)] leading-[1.2] tracking-[-0.01em]",
};

/**
 * SectionHeading — mono overline + display heading + optional lede.
 * Reusable across landing sections and dashboard clusters.
 */
export function SectionHeading({
  overline,
  title,
  description,
  level = "h2",
  align = "left",
  className = "",
  children,
}: SectionHeadingProps) {
  const Tag = level;
  return (
    <div
      className={[
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {overline ? <Overline tone="primary">{overline}</Overline> : null}
      <Tag
        className={[
          "font-heading font-semibold text-text-bright",
          LEVEL_CLASS[level],
        ].join(" ")}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={[
            "text-body text-text-secondary",
            align === "center" ? "max-w-2xl" : "max-w-xl",
          ].join(" ")}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
