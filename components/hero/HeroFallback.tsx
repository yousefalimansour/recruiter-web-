/**
 * HeroFallback — static burgundy wireframe still shown when prefers-reduced-motion
 * or on low-end devices (no WebGL loop). Flat strokes, no gradient.
 */
export function HeroFallback() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <svg
        width="620"
        height="620"
        viewBox="0 0 620 620"
        fill="none"
        className="max-w-[80vw] opacity-70"
      >
        <g stroke="#94243f" strokeWidth="1" fill="none">
          <polygon points="310,90 500,220 470,450 150,450 120,220" />
          <polygon points="310,90 470,450 150,450" opacity="0.6" />
          <polygon points="120,220 500,220 310,470" opacity="0.5" />
          <circle cx="310" cy="300" r="150" opacity="0.35" />
          <line x1="310" y1="90" x2="310" y2="470" opacity="0.4" />
          <line x1="120" y1="220" x2="500" y2="220" opacity="0.4" />
          <line x1="150" y1="450" x2="500" y2="220" opacity="0.3" />
          <line x1="470" y1="450" x2="120" y2="220" opacity="0.3" />
        </g>
        <g fill="#a6a6ae">
          {[
            [310, 90], [500, 220], [470, 450], [150, 450], [120, 220],
            [310, 300], [220, 300], [400, 300], [310, 180], [310, 420],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.5" />
          ))}
        </g>
      </svg>
    </div>
  );
}
