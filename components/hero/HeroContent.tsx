"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Overline } from "@/components/ui/Overline";
import { MagneticButton } from "@/components/motion/MagneticButton";

const EASE = [0.22, 1, 0.36, 1] as const;
const HEADLINE = ["An", "autonomous", "agent", "that", "applies", "while", "you", "sleep."];

/**
 * HeroContent — overlaid headline (word-by-word reveal), subcopy, CTAs.
 * Sits above the 3D/fallback layer.
 */
export function HeroContent() {
  const reduce = useReducedMotion();

  return (
    <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1100px] flex-col justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <Overline tone="primary">Autonomous AI Recruitment Agent</Overline>
      </motion.div>

      <h1 className="mt-6 max-w-[16ch] font-heading font-semibold text-text-bright text-[length:var(--text-display)] leading-[0.98] tracking-[-0.03em]">
        {HEADLINE.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-baseline">
            <motion.span
              className="inline-block"
              initial={reduce ? { y: 0 } : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.64, ease: EASE, delay: 0.15 + i * 0.05 }}
            >
              {word === "sleep." ? (
                <span className="text-primary">{word}</span>
              ) : (
                word
              )}
              {i < HEADLINE.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        className="mt-8 max-w-[52ch] text-body text-text-secondary"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
      >
        It discovers fresh roles, scores each against your profile, tailors your
        résumé without ever inventing a fact, submits the application, recovers
        from the usual snags, and pings you on Telegram only when it truly needs
        a human. You wake up to applications already sent.
      </motion.p>

      <motion.div
        className="mt-10 flex flex-wrap items-center gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
      >
        <MagneticButton>
          <Button href="/dashboard" size="lg">
            View the live pipeline
            <ArrowRight size={16} strokeWidth={1.5} />
          </Button>
        </MagneticButton>
        <Button href="#pipeline" variant="secondary" size="lg">
          How it works
        </Button>
      </motion.div>
    </div>
  );
}
