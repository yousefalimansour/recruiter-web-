"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SakuraScroll — one GSAP ScrollTrigger engine for the whole landing page,
 * driven by data attributes so the markup stays clean:
 *   data-reveal            fade + rise once on enter
 *   data-reveal-stagger    stagger its direct children on enter
 *   data-parallax="0.2"    translate on scroll (tree images drift)
 *   data-scale             scrub scale 0.86 -> 1 as it enters
 *   data-pin (on a section) pin its [data-pin-target] while the section scrolls
 *
 * GSAP `from` tweens mean content is fully visible without JS and only enhanced
 * with motion — it can never get stuck hidden. Disabled for reduced-motion.
 */
export function SakuraScroll() {
  useEffect(() => {
    // `?static` renders everything in its natural (revealed) state — used for
    // visual QA/screenshots and as a graceful no-JS-motion fallback.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      new URLSearchParams(window.location.search).has("static")
    )
      return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 44,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
        gsap.from(Array.from(group.children), {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: group, start: "top 82%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.15");
        gsap.to(el, {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-scale]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.86 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 92%", end: "top 42%", scrub: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-pin]").forEach((section) => {
        const target = section.querySelector<HTMLElement>("[data-pin-target]");
        if (!target || window.innerWidth < 1024) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: target,
          pinSpacing: false,
        });
      });
    });

    // Fonts/images can shift layout; recompute once settled.
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return null;
}
