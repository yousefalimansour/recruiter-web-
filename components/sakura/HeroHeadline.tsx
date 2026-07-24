"use client";

import { motion, useReducedMotion } from "framer-motion";

const HEADLINE = "An autonomous agent that applies while you sleep.";
const WORDS = HEADLINE.split(" ");

/**
 * HeroHeadline — the hero H1. Each word rises and sharpens out of a soft blur
 * (a "smoke clearing" feel) using transform + opacity + a short filter blur, so
 * it stays GPU-composited and buttery-smooth — unlike the previous per-character
 * text-shadow effect, which animated ~120px blurs on every glyph and janked.
 */
export function HeroHeadline() {
  const reduce = useReducedMotion();

  return (
    <h1 className="mt-5 font-display text-[clamp(2rem,5.4vw,3.3rem)] font-bold leading-[1.07] tracking-[-0.02em] text-sakura-cream">
      {WORDS.map((word, i) => (
        <motion.span
          key={i}
          className="mr-[0.26em] inline-block will-change-[transform,opacity]"
          initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: 0.12 + i * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}
