"use client";

import { useEffect, useState, type CSSProperties } from "react";

/**
 * SakuraPetals — sparse cherry-blossom petals drifting down with sway + spin.
 * Generated client-side only (avoids hydration mismatch), disabled for
 * prefers-reduced-motion.
 */
interface Petal {
  left: number;
  delay: number;
  dur: number;
  size: number;
  drift: number;
  warm: boolean;
  opacity: number;
}

export function SakuraPetals({ count = 16 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const arr: Petal[] = Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      delay: -Math.random() * 22,
      dur: 15 + Math.random() * 15,
      size: 8 + Math.random() * 10,
      drift: Math.random() * 140 - 30,
      warm: Math.random() > 0.5,
      opacity: 0.5 + Math.random() * 0.4,
    }));
    setPetals(arr);
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => {
        const style: CSSProperties = {
          position: "absolute",
          top: 0,
          left: `${p.left}%`,
          width: p.size,
          height: p.size * 0.72,
          borderRadius: "100% 0 100% 0",
          backgroundColor: p.warm ? "#ff9db0" : "#ff6aa6",
          filter: "blur(0.2px)",
          animation: `sakura-petal-fall ${p.dur}s linear ${p.delay}s infinite`,
          ["--petal-drift" as string]: `${p.drift}px`,
          ["--petal-opacity" as string]: `${p.opacity}`,
        } as CSSProperties;
        return <span key={i} style={style} />;
      })}
    </div>
  );
}
