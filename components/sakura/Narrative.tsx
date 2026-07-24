import { JapaneseLabel } from "./JapaneseLabel";
import { WaveLines } from "./WaveLines";
import { GradientButton } from "./GradientButton";

/**
 * Narrative — the story of the 7-agent orchestration beside a real cherry tree
 * framed in a circular porthole (flat ring), with scroll parallax/scale.
 */
export function Narrative() {
  return (
    <section id="narrative" className="relative overflow-hidden bg-sakura-bg2 py-32 md:py-44">
      <WaveLines className="inset-x-0 top-1/4 h-1/2 opacity-20" speed={62} />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div className="order-2 lg:order-1" data-reveal>
          <JapaneseLabel>Under the hood</JapaneseLabel>
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
        </div>

        <div className="order-1 lg:order-2" data-reveal>
          <div data-parallax="0.06" className="relative mx-auto aspect-square w-full max-w-[440px]">
            <div
              aria-hidden="true"
              className="absolute inset-[8px] rounded-full bg-sakura-bg bg-cover bg-[center_28%] bg-no-repeat"
              style={{ backgroundImage: "url(/sakura/tree3.webp)" }}
            />
            <div className="sakura-ring pointer-events-none absolute inset-0 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
