import type { CSSProperties } from "react";

/**
 * Tree — a keyed (transparent) cherry-blossom image from /public/sakura.
 * Purely decorative (alt=""). Plain <img> since the assets are already
 * optimized WebP; `priority` eager-loads the hero tree.
 */
export function Tree({
  n,
  className = "",
  priority = false,
  style,
}: {
  /** which tree (1..5) */
  n: 1 | 2 | 3 | 4 | 5;
  className?: string;
  priority?: boolean;
  style?: CSSProperties;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/sakura/tree${n}.webp`}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      className={className}
      style={style}
    />
  );
}
