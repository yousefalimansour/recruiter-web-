import type { CSSProperties } from "react";

/**
 * SakuraScene — a coded atmospheric composition (NOT a copied image): a glowing
 * sunset behind silhouettes of mountains, a pagoda, and a blossoming cherry tree
 * mirrored on water. Pure SVG + CSS so it's light and animates on the GPU.
 */
export function SakuraScene({ className = "" }: { className?: string }) {
  const sunStyle: CSSProperties = {
    position: "absolute",
    left: "48%",
    top: "40%",
    width: "72%",
    aspectRatio: "1 / 1",
    transform: "translate(-50%, -50%)",
    borderRadius: "9999px",
    background:
      "radial-gradient(circle, #ffb24a 0%, #ff6a4d 28%, rgba(255,91,110,0.4) 52%, transparent 70%)",
    filter: "blur(4px)",
    animation: "sakura-glow-pulse 7s ease-in-out infinite",
  };

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div style={sunStyle} />
      <svg viewBox="0 0 560 560" className="relative h-full w-full">
        <defs>
          <radialGradient id="ss-blossom" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffd6e6" />
            <stop offset="0.5" stopColor="#ff5c9d" />
            <stop offset="1" stopColor="#ff5c9d" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ss-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b1026" />
            <stop offset="1" stopColor="#0a0710" />
          </linearGradient>
          <linearGradient id="ss-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff8c42" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ff5c9d" stopOpacity="0.9" />
          </linearGradient>
          <filter id="ss-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* far mountains */}
        <path
          d="M0,430 L90,352 L160,396 L240,300 L322,376 L410,314 L500,382 L560,346 L560,560 L0,560 Z"
          fill="#160f22"
        />
        {/* pagoda silhouette */}
        <g fill="#0e0a18">
          <rect x="246" y="262" width="8" height="26" />
          <circle cx="250" cy="260" r="5" />
          {/* roofs (top → bottom) */}
          <path d="M216,288 Q250,300 284,288 L276,282 Q250,290 224,282 Z" />
          <rect x="239" y="288" width="22" height="14" />
          <path d="M208,322 Q250,335 292,322 L282,315 Q250,324 218,315 Z" />
          <rect x="236" y="322" width="28" height="16" />
          <path d="M198,360 Q250,374 302,360 L290,352 Q250,362 210,352 Z" />
          <rect x="233" y="360" width="34" height="18" />
          <path d="M188,402 Q250,418 312,402 L298,393 Q250,404 202,393 Z" />
          <rect x="230" y="402" width="40" height="24" />
        </g>

        {/* cherry tree — dark branches */}
        <g stroke="#0c0813" strokeLinecap="round" fill="none">
          <path d="M476,432 C471,362 456,322 432,292" strokeWidth="11" />
          <path d="M450,332 C431,302 406,286 380,276" strokeWidth="6" />
          <path d="M452,312 C471,282 501,262 522,252" strokeWidth="6" />
          <path d="M440,302 C420,276 400,240 406,206" strokeWidth="5" />
          <path d="M460,286 C481,256 501,232 502,202" strokeWidth="5" />
          <path d="M486,300 C512,286 534,268 544,250" strokeWidth="5" />
        </g>
        {/* blossom canopy */}
        <g filter="url(#ss-soft)">
          <circle cx="402" cy="232" r="36" fill="url(#ss-blossom)" />
          <circle cx="462" cy="206" r="42" fill="url(#ss-blossom)" />
          <circle cx="512" cy="238" r="32" fill="url(#ss-blossom)" />
          <circle cx="432" cy="272" r="30" fill="url(#ss-blossom)" />
          <circle cx="502" cy="276" r="28" fill="url(#ss-blossom)" />
          <circle cx="540" cy="252" r="22" fill="url(#ss-blossom)" />
        </g>
        {/* blossom sparkle dots */}
        <g fill="#ffd6e6" opacity="0.9">
          <circle cx="410" cy="224" r="2.2" />
          <circle cx="470" cy="212" r="2.6" />
          <circle cx="512" cy="242" r="2" />
          <circle cx="436" cy="268" r="2" />
          <circle cx="498" cy="270" r="2.2" />
        </g>

        {/* water + reflections */}
        <rect x="0" y="426" width="560" height="134" fill="url(#ss-water)" />
        <ellipse cx="262" cy="446" rx="86" ry="10" fill="#ff7a4d" opacity="0.22" filter="url(#ss-soft)" />
        <g stroke="#ff5c9d" strokeWidth="1" opacity="0.25">
          <line x1="150" y1="470" x2="360" y2="470" />
          <line x1="190" y1="486" x2="330" y2="486" />
        </g>

        {/* torii hint on the water (right) */}
        <g stroke="url(#ss-rim)" strokeWidth="3" opacity="0.55" fill="none">
          <path d="M118,452 L118,432 M150,452 L150,432 M108,430 L160,430 M112,436 L156,436" />
        </g>
      </svg>
    </div>
  );
}
