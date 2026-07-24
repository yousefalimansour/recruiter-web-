import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { JapaneseLabel } from "./JapaneseLabel";
import { SakuraPetals } from "./SakuraPetals";
import { GlassCard } from "./GlassCard";
import { GradientButton } from "./GradientButton";
import { Reveal } from "@/components/motion/Reveal";

const glowA: CSSProperties = { background: "radial-gradient(circle, rgba(255,92,157,0.5), transparent 70%)" };
const glowB: CSSProperties = { background: "radial-gradient(circle, rgba(139,92,246,0.5), transparent 70%)" };

/**
 * CTA — the closing "let's create" moment inside a large glass container with
 * drifting petals and corner glows.
 */
export function CTA() {
  return (
    <section className="relative overflow-hidden px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <GlassCard interactive={false} glow="pink" className="relative overflow-hidden px-6 py-20 text-center sm:px-16">
            <SakuraPetals count={8} />
            <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-2xl" style={glowA} aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-40 blur-2xl" style={glowB} aria-hidden="true" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <JapaneseLabel>私たちと一緒に</JapaneseLabel>
              <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] text-sakura-cream">
                Let the agent run the search{" "}
                <span className="sakura-gradient-text">while you build.</span>
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
        </Reveal>
      </div>
    </section>
  );
}
