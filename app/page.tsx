import { Hero } from "@/components/hero/Hero";
import { Pipeline } from "@/components/landing/Pipeline";
import { TwoTracks } from "@/components/landing/TwoTracks";
import { AgentChain } from "@/components/landing/AgentChain";
import { LiveStats } from "@/components/landing/LiveStats";
import { CTA } from "@/components/landing/CTA";

/**
 * Landing page (/) — immersive, editorial, burgundy/gray flat.
 * Hero → Pipeline → TwoTracks → AgentChain → LiveStats → CTA.
 */
export default function LandingPage() {
  return (
    <>
      <Hero />
      <Pipeline />
      <TwoTracks />
      <AgentChain />
      <LiveStats />
      <CTA />
    </>
  );
}
