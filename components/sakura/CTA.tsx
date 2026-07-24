import { ArrowRight } from "lucide-react";
import { JapaneseLabel } from "./JapaneseLabel";
import { SakuraPetals } from "./SakuraPetals";
import { GlassCard } from "./GlassCard";
import { GradientButton } from "./GradientButton";
import { Tree } from "./Tree";

/**
 * CTA — closing "let's create" moment in a glass panel with corner cherry trees
 * (flat, faint) and drifting petals.
 */
export function CTA() {
  return (
    <section className="relative overflow-hidden px-5 py-32 sm:px-8 md:py-40">
      <div className="mx-auto max-w-6xl" data-reveal>
        <GlassCard interactive={false} glow="pink" className="relative overflow-hidden px-6 py-20 text-center sm:px-16">
          <SakuraPetals count={8} />
          <Tree n={2} className="pointer-events-none absolute -left-16 -top-16 w-56 opacity-20" />
          <Tree n={4} className="pointer-events-none absolute -bottom-24 -right-16 w-64 opacity-20" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <JapaneseLabel>Get started</JapaneseLabel>
            <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] text-sakura-cream">
              Let the agent run the search{" "}
              <span className="sakura-accent">while you build.</span>
            </h2>
            <p className="max-w-xl text-sakura-muted">
              Deploy it once, connect Telegram, and wake up to applications
              already submitted — reviewing only what genuinely needs you.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              <GradientButton href="/dashboard">
                Open the dashboard
                <ArrowRight size={16} strokeWidth={2} />
              </GradientButton>
              <GradientButton href="https://github.com/yousefalimansour/recruiter-agent" variant="ghost">
                View the source
              </GradientButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
