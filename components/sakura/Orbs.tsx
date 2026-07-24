import type { CSSProperties } from "react";

/**
 * Orbs — small floating gradient spheres scattered through the scene
 * (pink→orange / pink→purple), gently bobbing. Fixed positions so there is no
 * SSR/hydration mismatch. Decorative only.
 */
interface Orb {
  top: string;
  left: string;
  size: number;
  c1: string;
  c2: string;
  dur: number;
  delay: number;
}

const ORBS: Orb[] = [
  { top: "14%", left: "82%", size: 66, c1: "#ff8c42", c2: "#ff5c9d", dur: 9, delay: 0 },
  { top: "38%", left: "6%", size: 44, c1: "#ff5c9d", c2: "#8b5cf6", dur: 11, delay: 1.5 },
  { top: "68%", left: "88%", size: 52, c1: "#8b5cf6", c2: "#ff5b6e", dur: 10, delay: 0.8 },
  { top: "82%", left: "10%", size: 38, c1: "#ff5b6e", c2: "#ff8c42", dur: 12, delay: 2.2 },
  { top: "6%", left: "46%", size: 28, c1: "#4cc9f0", c2: "#8b5cf6", dur: 8, delay: 1 },
];

export function Orbs({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {ORBS.map((o, i) => {
        const style: CSSProperties = {
          position: "absolute",
          top: o.top,
          left: o.left,
          width: o.size,
          height: o.size,
          borderRadius: "9999px",
          background: `linear-gradient(140deg, ${o.c1}, ${o.c2})`,
          boxShadow: `0 0 42px -6px ${o.c1}`,
          opacity: 0.82,
          animation: `sakura-float ${o.dur}s ease-in-out ${o.delay}s infinite`,
        };
        return <span key={i} style={style} />;
      })}
    </div>
  );
}
