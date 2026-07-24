"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Overline } from "@/components/ui/Overline";
import { Reveal } from "@/components/motion/Reveal";

const AGENTS = [
  { name: "Job Discovery", role: "Pulls new postings from ATS + remote boards, dedupes." },
  { name: "Analysis & Scoring", role: "Extracts requirements, scores match, decides." },
  { name: "Résumé Tailor", role: "Reorders & rephrases — validation gate blocks fabrication." },
  { name: "Cover Letter", role: "Writes a short, specific letter when one is required." },
  { name: "Browser Apply", role: "Fills the form, uploads, answers, submits." },
  { name: "Recovery", role: "Auto-fixes common failures; escalates real blockers." },
  { name: "Learning", role: "Stores every Q&A so the next apply is more autonomous." },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * AgentChain — the seven agents as a vertical timeline with a burgundy rule that
 * draws in on scroll (scaleY). Flat, engineered.
 */
export function AgentChain() {
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <Reveal>
        <SectionHeading
          overline="Under the hood"
          title="Seven specialized agents, one orchestrator"
          description="n8n schedules the work and holds the Telegram approvals; each agent does one job well and hands off to the next."
        />
      </Reveal>

      <div className="relative mt-16 pl-8 sm:pl-10">
        {/* the drawing burgundy timeline rule */}
        <motion.span
          aria-hidden="true"
          className="absolute left-[7px] top-2 w-px origin-top bg-burgundy-700 sm:left-[9px]"
          style={{ height: "calc(100% - 1rem)" }}
          initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1, ease: EASE }}
        />
        <ol className="flex flex-col gap-8">
          {AGENTS.map((agent, i) => (
            <motion.li
              key={agent.name}
              className="relative"
              initial={reduce ? { opacity: 1 } : { opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
            >
              {/* node marker */}
              <span
                aria-hidden="true"
                className="absolute -left-8 top-1 h-3.5 w-3.5 rounded-[3px] border border-border-strong bg-primary sm:-left-10"
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <Overline>{`Agent ${i + 1}`}</Overline>
                  <h3 className="font-heading text-h3 font-semibold text-text-bright">
                    {agent.name}
                  </h3>
                </div>
                <p className="text-small text-text-secondary">{agent.role}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
