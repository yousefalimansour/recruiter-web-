"use client";

import type { ElementType, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** stagger delay in seconds when used standalone */
  delay?: number;
  /** vertical offset in px (default 16 per DESIGN.md) */
  y?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Reveal — fade-up 16px + clip reveal, once on scroll into view.
 * Reduced-motion → renders final state, no transform.
 */
export function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  y = 16,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion(as as ElementType);

  const variants: Variants = reduce
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
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
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </MotionTag>
  );
}
