"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** max pull distance in px (default 8) */
  strength?: number;
}

/**
 * MagneticButton — subtle magnetic pull toward the cursor, for the primary CTA only.
 * Wraps its children (e.g. a <Button/>). Reduced-motion → static, no pull.
 */
export function MagneticButton({
  children,
  className = "",
  strength = 8,
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const clamp = (v: number, max: number) =>
      Math.max(-max, Math.min(max, v));
    x.set(clamp(relX * 0.4, strength));
    y.set(clamp(relY * 0.4, strength));
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  if (reduce) {
    return <div className={["inline-block", className].join(" ")}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={["inline-block", className].join(" ")}
    >
      {children}
    </motion.div>
  );
}
