"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useReveal } from "./use-reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** delay in seconds */
  delay?: number;
  /** vertical offset in px (default 16 per DESIGN.md) */
  y?: number;
}

/**
 * Reveal — fade-up + clip reveal when scrolled into view (once). Reduced-motion
 * → renders final state. Uses a static motion.div + useReveal for reliability.
 */
export function Reveal({ children, className = "", delay = 0, y = 16 }: RevealProps) {
  const reduce = useReducedMotion();
  const { ref, shown } = useReveal();

  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y, clipPath: "inset(0 0 100% 0)" },
        visible: {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          transition: { duration: 0.64, ease: EASE, delay },
        },
      };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={shown ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
