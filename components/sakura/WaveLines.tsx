"use client";

import { useMemo } from "react";

/**
 * WaveLines — flowing topographic ribbons. Thin FLAT single-colour strokes (no
 * gradients), drifting slowly and looping seamlessly via 3 identical tiles.
 * Atmospheric only — behind content.
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
  { color: "#a83a63", midY: 188, amp: 46, phase: 0.0, w: 1.5, o: 0.5 },
  { color: "#660033", midY: 205, amp: 62, phase: 0.7, w: 1.2, o: 0.45 },
  { color: "#4d0026", midY: 222, amp: 40, phase: 1.5, w: 1.0, o: 0.4 },
  { color: "#8a8a92", midY: 172, amp: 34, phase: 2.2, w: 0.9, o: 0.4 },
  { color: "#c46b93", midY: 238, amp: 52, phase: 3.0, w: 1.1, o: 0.35 },
];

export function WaveLines({ className = "", speed = 34 }: { className?: string; speed?: number }) {
  const paths = useMemo(
    () => LINES.map((l) => ({ ...l, d: wavePath(l.midY, l.amp, 240, l.phase) })),
    []
  );

  const Tile = () => (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="none"
      className="h-full w-1/3 shrink-0"
      style={{ filter: "drop-shadow(0 0 3px rgba(102,0,51,0.3))" }}
      aria-hidden="true"
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke={p.color}
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
