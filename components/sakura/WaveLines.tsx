"use client";

import { useId, useMemo } from "react";

/**
 * WaveLines — the signature flowing neon topographic ribbons. Thin gradient
 * sine-wave strokes (blue→purple→pink→orange) drifting slowly, seamlessly
 * looped via 3 identical tiles. Atmospheric only — sits behind content.
 */
const VW = 480;
const VH = 400;

function wavePath(midY: number, amp: number, period: number, phase: number, points = 64): string {
  let d = "";
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * VW;
    const y = midY + amp * Math.sin((x / period) * Math.PI * 2 + phase);
    d += i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

const LINES = [
  { g: 1, midY: 188, amp: 46, phase: 0.0, w: 1.5, o: 0.6 },
  { g: 2, midY: 205, amp: 62, phase: 0.7, w: 1.2, o: 0.5 },
  { g: 3, midY: 222, amp: 40, phase: 1.5, w: 1.0, o: 0.45 },
  { g: 1, midY: 172, amp: 34, phase: 2.2, w: 0.9, o: 0.4 },
  { g: 2, midY: 238, amp: 52, phase: 3.0, w: 1.1, o: 0.4 },
];

export function WaveLines({
  className = "",
  speed = 34,
}: {
  className?: string;
  speed?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const paths = useMemo(
    () => LINES.map((l) => ({ ...l, d: wavePath(l.midY, l.amp, 240, l.phase) })),
    []
  );

  const Tile = () => (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="none"
      className="h-full w-1/3 shrink-0"
      style={{ filter: "drop-shadow(0 0 3px rgba(255,110,170,0.35))" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`wg1-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4361ee" />
          <stop offset="0.45" stopColor="#8b5cf6" />
          <stop offset="0.75" stopColor="#ff5c9d" />
          <stop offset="1" stopColor="#ff8c42" />
        </linearGradient>
        <linearGradient id={`wg2-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff5c9d" />
          <stop offset="0.5" stopColor="#d6409f" />
          <stop offset="1" stopColor="#4cc9f0" />
        </linearGradient>
        <linearGradient id={`wg3-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff5b6e" />
          <stop offset="0.5" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#4361ee" />
        </linearGradient>
      </defs>
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke={`url(#wg${p.g}-${uid})`}
          strokeWidth={p.w}
          opacity={p.o}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );

  return (
    <div className={`pointer-events-none absolute overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="flex h-full w-[300%]"
        style={{ animation: `sakura-wave-drift ${speed}s linear infinite` }}
      >
        <Tile />
        <Tile />
        <Tile />
      </div>
    </div>
  );
}
