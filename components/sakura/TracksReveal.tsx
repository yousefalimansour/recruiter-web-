"use client";

import { useEffect, useState } from "react";
import HoverImageReveal from "@/components/originkit/hover-image-reveal";

/**
 * TracksReveal — the interactive centrepiece of the "Two tracks, one engine"
 * section. Big track names stacked vertically; hovering one reveals a sakura
 * card that trails the cursor while the other rows dim. Font scales with the
 * viewport so the labels never clip on mobile.
 */
export function TracksReveal() {
  const [fs, setFs] = useState(56);

  useEffect(() => {
    const upd = () => {
      const w = window.innerWidth;
      setFs(w < 380 ? 30 : w < 480 ? 36 : w < 640 ? 42 : w < 1024 ? 50 : 58);
    };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  return (
    <HoverImageReveal
      align="center"
      backgroundColor="transparent"
      textColor="var(--sk-text)"
      dimColor="var(--sk-faint)"
      imageWidth={280}
      imageHeight={340}
      rounded={18}
      rowGap={14}
      offsetX={210}
      items={{
        itemCount: 3,
        item1: { text: "Auto-Apply", image: { src: "/sakura/card1.webp" } },
        item2: { text: "Cold Outreach", image: { src: "/sakura/card2.webp" } },
        item3: { text: "Self-Healing", image: { src: "/sakura/card4.webp" } },
      }}
      font={{
        fontFamily: "var(--font-poppins), Poppins, sans-serif",
        fontWeight: 700,
        fontSize: fs,
        lineHeight: "1em",
        letterSpacing: "-0.02em",
        textAlign: "center",
      }}
    />
  );
}
