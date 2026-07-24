"use client";

import { useEffect, useState } from "react";
import SmokyText from "@/components/originkit/smokytext";

/**
 * HeroHeadline — the hero H1 rendered with OriginKit's Smoky Text (chars smoke
 * in on load). Responsive font size; colour follows the theme via --sk-text.
 */
export function HeroHeadline() {
  const [size, setSize] = useState(58);

  useEffect(() => {
    const upd = () => {
      const w = window.innerWidth;
      setSize(w < 400 ? 29 : w < 480 ? 33 : w < 640 ? 38 : w < 768 ? 42 : w < 1024 ? 46 : 52);
    };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  return (
    <h1 className="mt-5 h-[200px] w-full sm:h-[230px] lg:h-[250px]">
      <SmokyText
        text={"An autonomous agent that applies while you sleep."}
        color="var(--sk-text)"
        intensity={12}
        position="bottomLeft"
        animationMode="multiLine"
        appearTrigger="default"
        font={{
          fontFamily: "var(--font-poppins), Poppins, sans-serif",
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1.06,
          letterSpacing: "-0.01em",
          textAlign: "left",
        }}
      />
    </h1>
  );
}
