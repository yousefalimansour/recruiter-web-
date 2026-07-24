"use client";

import { useEffect, useState } from "react";
import { useReducedMotion, animate } from "framer-motion";
import { useReveal } from "./use-reveal";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
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
 * Uses useReveal so it can never get stuck at the start value.
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
  const { ref, shown } = useReveal<HTMLSpanElement>(0.3);
  const [display, setDisplay] = useState<string>(() =>
    format(reduce ? to : from, decimals, grouped)
  );

  useEffect(() => {
    if (!shown) return;
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
  }, [shown, reduce, from, to, duration, decimals, grouped]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
