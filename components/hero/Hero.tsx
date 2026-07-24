"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { HeroFallback } from "@/components/hero/HeroFallback";
import { HeroContent } from "@/components/hero/HeroContent";

// WebGL scene is client-only and lazy-loaded so it never blocks SSR/first paint.
const Hero3D = dynamic(() => import("@/components/hero/Hero3D"), { ssr: false });

/**
 * Hero — full-height landing hero. Picks the real-time 3D scene on capable
 * devices, or a static burgundy wireframe when prefers-reduced-motion / low-end.
 * The 3D layer is decorative background; HeroContent sits on top.
 */
export function Hero() {
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const cores = navigator.hardwareConcurrency ?? 8;
    setUse3D(!prefersReduced && cores > 4);
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] w-full overflow-hidden border-b border-border"
    >
      <div className="absolute inset-0 -z-10">
        {use3D ? <Hero3D /> : <HeroFallback />}
      </div>
      {/* flat scrim so headline stays legible over the scene (solid color, no gradient) */}
      <div
        className="absolute inset-0 -z-10 bg-bg/40"
        aria-hidden="true"
      />
      <HeroContent />
    </section>
  );
}
