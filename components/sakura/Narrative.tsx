import { JapaneseLabel } from "./JapaneseLabel";
import { WaveLines } from "./WaveLines";
import { SakuraScene } from "./SakuraScene";
import { GradientButton } from "./GradientButton";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Narrative — the "Inspired by Nature" circular composition. A glowing porthole
 * (the coded scene, masked to a circle) beside the story of the 7-agent
 * orchestration.
 */
export function Narrative() {
  return (
    <section id="narrative" className="relative overflow-hidden bg-sakura-bg2 py-28">
      <WaveLines className="inset-x-0 top-1/4 h-1/2 opacity-30" speed={62} />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <JapaneseLabel>エージェントの頭脳</JapaneseLabel>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold leading-[1.12] text-sakura-cream">
            Seven specialized agents,
            <br />
            one orchestrator
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-sakura-muted">
            n8n schedules the work and holds the Telegram approvals; each agent
            does one job well — discovery, analysis, résumé tailoring, cover
            letters, browser apply, recovery, and learning — then hands off to the
            next. It never fabricates a fact, and escalates only when a human is
            genuinely required.
          </p>
          <div className="mt-8">
            <GradientButton href="/dashboard" variant="ghost">
              Open the dashboard
            </GradientButton>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-square w-full max-w-[440px]">
            <div className="sakura-ring absolute inset-0 rounded-full" />
            <div className="absolute inset-[7px] overflow-hidden rounded-full">
              <SakuraScene className="h-full w-full scale-[1.15]" />
            </div>
            {/* orbiting accent */}
            <span
              className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
              style={{ animation: "sakura-spin-slow 24s linear infinite" }}
              aria-hidden="true"
            >
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-sakura-pink shadow-[0_0_16px_#ff5c9d]" />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
