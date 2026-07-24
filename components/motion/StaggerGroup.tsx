"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useReveal } from "./use-reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * StaggerGroup — container that reveals its <StaggerItem> children in sequence
 * when scrolled into view. Static motion.div + useReveal for reliability.
 */
export function StaggerGroup({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const { ref, shown } = useReveal();
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={shown ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem — a single child of StaggerGroup. Inherits the parent's
 * hidden/visible state (framer variant propagation).
 */
export function StaggerItem({
  children,
  className = "",
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y, clipPath: "inset(0 0 100% 0)" },
        visible: {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          transition: { duration: 0.6, ease: EASE },
        },
      };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
