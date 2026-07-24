"use client";

import type { ElementType, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface StaggerGroupProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** seconds between each child (default 60ms per DESIGN.md) */
  stagger?: number;
}

/**
 * StaggerGroup — container that reveals its <StaggerItem> children in sequence
 * on scroll into view. Reduced-motion safe.
 */
export function StaggerGroup({
  children,
  as = "div",
  className = "",
  stagger = 0.06,
}: StaggerGroupProps) {
  const MotionTag = motion(as as ElementType);
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
}

/**
 * StaggerItem — a single child of StaggerGroup. Fade-up + clip reveal.
 */
export function StaggerItem({
  children,
  as = "div",
  className = "",
  y = 16,
}: StaggerItemProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion(as as ElementType);

  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y, clipPath: "inset(0 0 100% 0)" },
        visible: {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          transition: { duration: 0.64, ease: EASE },
        },
      };

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
