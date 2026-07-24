import { ArrowRight } from "lucide-react";
import { JapaneseLabel } from "./JapaneseLabel";
import { WaveLines } from "./WaveLines";
import { SakuraPetals } from "./SakuraPetals";
import { Tree } from "./Tree";
import { GradientButton } from "./GradientButton";
import { HeroHeadline } from "./HeroHeadline";

/**
 * Hero — artistic asymmetry: headline left (2-3 lines), a real cherry-blossom
 * tree bleeding off the right edge (parallax on scroll), petals + flat waves
 * behind. Flat colours only.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-24">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <WaveLines className="inset-x-0 top-[48%] h-[46%]" speed={42} />
        <SakuraPetals count={16} />
      </div>

      {/* desktop tree — bleeds off the right, drifts on scroll */}
      <div className="pointer-events-none absolute inset-y-0 right-[-6%] -z-10 hidden w-[60%] items-center lg:flex">
        <div data-parallax="0.1" className="w-full">
          <Tree n={1} priority className="mx-auto h-auto w-full max-w-[820px]" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-xl" data-reveal-stagger>
          <JapaneseLabel>自律型 AI 就職エージェント</JapaneseLabel>
          <HeroHeadline />
          <p lang="ja" className="mt-4 font-jp text-[clamp(1.1rem,2.4vw,1.55rem)] font-medium text-sakura-pink">
            眠っている間に、応募完了。
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-sakura-muted">
            It discovers fresh roles, scores each against your profile, tailors
            your résumé without inventing a fact, applies, recovers from snags,
            and pings you on Telegram only when it truly needs a human.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <GradientButton href="/dashboard">
              View the live pipeline
              <ArrowRight size={16} strokeWidth={2} />
            </GradientButton>
            <GradientButton href="#pipeline" variant="ghost">
              How it works
            </GradientButton>
          </div>
          <div className="mt-14 hidden items-center gap-3 text-sakura-faint sm:flex">
            <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/15 p-1.5">
              <span className="h-2 w-1 animate-bounce rounded-full bg-sakura-pink" />
            </span>
            <span className="font-display text-[0.7rem] uppercase tracking-[0.2em]">Scroll Down</span>
          </div>
        </div>

        {/* mobile tree */}
        <div className="mt-12 flex justify-center lg:hidden">
          <Tree n={1} priority className="h-auto w-full max-w-[400px]" />
        </div>
      </div>
    </section>
  );
}
