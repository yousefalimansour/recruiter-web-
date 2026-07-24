"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * useReveal — reliable "in view" detection for scroll reveals.
 * Reveals when: already (near) in view on mount, on intersection, if
 * IntersectionObserver is unavailable, or after a safety timeout — so content
 * can never get stuck hidden (the failure mode of framer's whileInView here).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  amount = 0.15
): { ref: RefObject<T | null>; shown: boolean } {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setShown(true);
      return;
    }
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            fired = true;
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: amount }
    );
    io.observe(el);
    const t = window.setTimeout(() => {
      if (!fired) setShown(true);
    }, 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [amount]);

  return { ref, shown };
}
