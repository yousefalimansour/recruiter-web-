import { Hero } from "@/components/sakura/Hero";
import { Essence } from "@/components/sakura/Essence";
import { Narrative } from "@/components/sakura/Narrative";
import { Services } from "@/components/sakura/Services";
import { StatsBand } from "@/components/sakura/StatsBand";
import { CTA } from "@/components/sakura/CTA";
import { SakuraScroll } from "@/components/sakura/SakuraScroll";

/**
 * Landing page (/) — "Japanese nature reimagined as a futuristic digital world."
 * Flat colours (no gradients), real keyed cherry-blossom trees, and GSAP
 * ScrollTrigger driving parallax / scrubbed reveals / section transitions.
 * The AI Recruitment Agent's purpose + functionality are preserved; chrome
 * (nav/footer) comes from AppShell.
 */
export default function LandingPage() {
  return (
    <>
      <Hero />
      <Essence />
      <Narrative />
      <Services />
      <StatsBand />
      <CTA />
      <SakuraScroll />
    </>
  );
}
