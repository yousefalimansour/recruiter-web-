import { ArrowRight } from "lucide-react";
import { JapaneseLabel } from "./JapaneseLabel";
import { WaveLines } from "./WaveLines";
import { Orbs } from "./Orbs";
import { SakuraPetals } from "./SakuraPetals";
import { SakuraScene } from "./SakuraScene";
import { GradientButton } from "./GradientButton";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Hero — the immersive entry into the Japanese digital world. Layered depth:
 * radial glows + drifting wave lines + petals + orbs behind a bilingual
 * headline and the coded sakura scene.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-20 pb-16">
      {/* atmospheric background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute -right-[10%] top-[6%] h-[46rem] w-[46rem] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,140,66,0.28), rgba(255,91,110,0.12) 45%, transparent 70%)" }}
        />
        <div
          className="absolute -left-[12%] bottom-[2%] h-[40rem] w-[40rem] rounded-full opacity-45 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.26), rgba(67,97,238,0.1) 45%, transparent 70%)" }}
        />
        <Orbs />
        <WaveLines className="inset-x-0 top-[40%] h-[52%] opacity-90" speed={40} />
        <SakuraPetals count={14} />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-6">
        {/* left — content */}
        <div className="relative z-10 order-2 max-w-xl lg:order-1">
          <Reveal>
            <JapaneseLabel>自律型 AI 就職エージェント</JapaneseLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.03] text-sakura-cream">
              An autonomous agent that applies{" "}
              <span className="sakura-gradient-text">while you sleep.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p lang="ja" className="sakura-gradient-text mt-3 font-jp text-[clamp(1.25rem,3vw,2rem)] font-medium">
              眠っている間に、応募完了。
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-sakura-muted">
              It discovers fresh roles, scores each against your profile, tailors
              your résumé without inventing a fact, applies, recovers from the
              usual snags, and pings you on Telegram only when it truly needs a
              human. You wake up to applications already sent.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap gap-4">
              <GradientButton href="/dashboard">
                View the live pipeline
                <ArrowRight size={16} strokeWidth={2} />
              </GradientButton>
              <GradientButton href="#pipeline" variant="ghost">
                How it works
              </GradientButton>
            </div>
          </Reveal>
          <div className="mt-14 hidden items-center gap-3 text-sakura-faint sm:flex">
            <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/15 p-1.5">
              <span className="h-2 w-1 animate-bounce rounded-full bg-sakura-pink" />
            </span>
            <span className="font-display text-[0.7rem] uppercase tracking-[0.2em]">Scroll Down</span>
          </div>
        </div>

        {/* right — scene */}
        <div className="relative z-10 order-1 lg:order-2">
          <SakuraScene className="mx-auto aspect-square w-full max-w-[520px]" />
        </div>
      </div>
    </section>
  );
}
