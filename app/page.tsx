import { Hero } from "@/components/sakura/Hero";
import { Essence } from "@/components/sakura/Essence";
import { Narrative } from "@/components/sakura/Narrative";
import { Services } from "@/components/sakura/Services";
import { StatsBand } from "@/components/sakura/StatsBand";
import { CTA } from "@/components/sakura/CTA";

/**
 * Landing page (/) — "Japanese nature reimagined as a futuristic digital world."
 * Dark cinematic, sakura + neon gradients, flowing waves, drifting petals.
 * The AI Recruitment Agent's purpose/content/functionality is preserved; only
 * the visual world is reimagined. Chrome (nav/footer) is provided by AppShell.
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
    </>
  );
}
