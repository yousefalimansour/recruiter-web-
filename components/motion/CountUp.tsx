"use client";

import { useEffect, useRef, useState } from "react";
import {
  useReducedMotion,
  useInView,
  animate,
} from "framer-motion";

interface CountUpProps {
  /** target value to count to */
  to: number;
  /** starting value (default 0) */
  from?: number;
  /** duration in seconds (default 1.2) */
  duration?: number;
  /** decimal places (default 0) */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** format as a locale-grouped integer (e.g. 1,214) */
  grouped?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

function format(value: number, decimals: number, grouped: boolean): string {
  if (grouped) {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return value.toFixed(decimals);
}

/**
 * CountUp — animates a number from `from` to `to` when it enters the viewport.
 * Reduced-motion → shows the final value immediately, no animation.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  grouped = false,
}: CountUpProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState<string>(() =>
    format(reduce ? to : from, decimals, grouped)
  );

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(format(to, decimals, grouped));
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: EASE,
      onUpdate: (latest) => setDisplay(format(latest, decimals, grouped)),
    });
    return () => controls.stop();
  }, [inView, reduce, from, to, duration, decimals, grouped]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
