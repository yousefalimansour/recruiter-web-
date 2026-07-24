/**
 * Grain — a single static ~3% monochrome noise overlay for premium paper feel.
 * This is grain/texture (feTurbulence), NOT a gradient. Fixed, non-interactive.
 */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] mix-blend-normal"
      style={{
        backgroundImage: "url(/grain.svg)",
        backgroundRepeat: "repeat",
        backgroundSize: "160px 160px",
      }}
    />
  );
}
