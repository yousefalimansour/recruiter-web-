# DESIGN.md — Burgundy/Gray Flat system (copy tokens verbatim)

Derived from [`design-dna.json`](design-dna.json). **Every builder follows this exactly.**

## ⛔ THE HARD RULE: NO GRADIENTS. ANYWHERE.
No `linear-gradient`, `radial-gradient`, `conic-gradient`, gradient text (`background-clip:text` + gradient), gradient borders, mesh gradients, or WebGL bloom/glow. **All fills are flat solid colors.** Depth comes ONLY from flat surface color steps + 1px solid borders. A reviewer will `grep -ri "gradient"` and fail the build if any appear (outside this file / comments). The single permitted texture is one static ~3% monochrome grain overlay.

## Palette (burgundy + gray only)
```css
:root {
  /* burgundy */
  --burgundy-900:#3A0B18; --burgundy-800:#4E1020; --burgundy-700:#6A1528;
  --burgundy-600:#7E1B33; --burgundy-500:#94243F; /* PRIMARY */ --burgundy-400:#B23A4E; /* accent/hover */
  --burgundy-300:#C85A6B; --burgundy-200:#E0929E;

  /* neutral / gray */
  --bg:#0D0D0F; --surface:#141416; --card:#1A1A1D; --elevated:#222226;
  --border:#2C2C31; --border-strong:#3A3A40;
  --text-muted:#7E7E86; --text-secondary:#A6A6AE; --text:#DCDCE0; --text-bright:#F4F4F6;

  /* aliases */
  --primary:var(--burgundy-500); --primary-pressed:var(--burgundy-700); --accent:var(--burgundy-400);

  /* type */
  --font-heading:"Space Grotesk",sans-serif; --font-body:"Inter",sans-serif; --font-mono:"JetBrains Mono",monospace;

  /* shape */
  --radius-sm:4px; --radius-md:8px; --radius-lg:12px; --radius-pill:999px;

  /* motion */
  --ease:cubic-bezier(0.22,1,0.36,1); --dur-micro:120ms; --dur-normal:320ms; --dur-macro:640ms;
}
```
Tailwind v4: map these into `@theme` in `globals.css` (e.g. `--color-primary`, `--color-bg`, `--color-card`, `--color-border`, `--font-heading`, `--radius-lg`, etc.) so utilities like `bg-primary text-text-bright border-border rounded-lg font-heading` work.

## Type scale (see design-dna.json `type_scale`)
- Display `clamp(3rem,7vw,6.5rem)` / 600 / lh .98 / -0.03em (Space Grotesk)
- H1 `clamp(2.25rem,4.5vw,3.75rem)` / 600 · H2 `clamp(1.75rem,3vw,2.5rem)` / 600 · H3 1.375rem/600
- Body 1.0625rem/1.6 (Inter) · Small .9375rem · Caption .8125rem
- **Overline**: JetBrains Mono, .75rem, weight 500, `letter-spacing:.18em`, UPPERCASE — use for section labels, data labels, metric units, nav wordmark, all "engineered chrome".

Fonts via `next/font/google`: Space_Grotesk, Inter, JetBrains_Mono → CSS vars on `<html>`.

## Surfaces & elevation (flat)
`bg #0D0D0F` → `surface #141416` → `card #1A1A1D` → `elevated #222226`, each stepped by flat color + a 1px `--border` (or `--border-strong` at higher levels). **No box-shadows.** (One optional exception: a single hard, non-blurred 1px offset "border shadow" is allowed; soft shadows are not.)

## Components
- **Button primary**: `bg-primary` flat, `text-bright`, `rounded-md`, no shadow; hover → `bg-accent` (flat swap). Active → `bg-primary-pressed`. Focus ring = 1px `--accent`.
- **Button secondary**: transparent, `1px border`, `text`, hover → `border-strong` + `text-bright`.
- **Button ghost**: text only; hover → burgundy underline.
- **Card**: `bg-card`, `1px border`, `rounded-lg`, no shadow; hover → `border-strong`.
- **Input**: `bg-surface`, `1px border`, focus → `1px accent` (no glow).
- **Badge/Chip**: mono caption, `1px border`, burgundy fill only for the "active/primary" state.
- **Nav**: fixed thin bar, `bg-bg` + 1px bottom border, mono wordmark left, links right.
- **Divider**: 1px `--border`; section marker = 1px `--burgundy-700` rule.
- Icons: `lucide-react`, 1.5px stroke, 16/20/24.

## Motion (framer-motion)
- Easing `var(--ease)`; durations micro 120 / normal 320 / macro 640.
- Section entrance: fade-up 16px + clip reveal, stagger children ~60ms, trigger once on scroll (IntersectionObserver / `whileInView`, `viewport={{once:true, amount:0.2}}`).
- Numbers count up on enter. Respect `prefers-reduced-motion` (skip transforms, show final state).
- Hero headline: reveal by word (stagger 40ms). Primary CTA: subtle magnetic pull.

## 3D hero (three.js / @react-three/fiber) — flat, no glow
- Central burgundy **wireframe** icosahedron (`MeshBasicMaterial wireframe #94243F`) over a **connected-node** field (gray points `#A6A6AE` + thin burgundy line links). Flat-shaded, NO bloom/gradient.
- **Scroll drives** a camera dolly + gentle rotation (scrubbed). Light pointer parallax. No orbit controls.
- **Fallback**: `prefers-reduced-motion` OR `navigator.hardwareConcurrency <= 4` → render a static burgundy wireframe still (SVG/CSS), no WebGL loop. Always `ResizeObserver`/r3f resize; cleanup on unmount; `requestAnimationFrame` only (r3f handles this).

## Dashboard specifics
- Flat **burgundy-monochrome** charts on gray: funnel = flat burgundy bars (darker→brighter by stage), sparklines = 1px burgundy stroke drawn in on enter. NO gradient fills under lines.
- Status encoded by **shade + mono label + icon**, never by adding new hues (no green/red/blue). "Active/good" = burgundy; "neutral" = gray; "needs-human/attention" = bright wine `--accent` + icon; "failed" = muted gray + dashed border.
- Stat cards: `bg-card`, 1px border, big Space Grotesk number, mono unit/label overline.
- Dense grid, precise 4px rhythm, mono metadata in tables.

## Accessibility
WCAG AA: body text ≥ 4.5:1 (use `--text`/`--text-bright` on `--bg`/`--card`), large text ≥ 3:1. Burgundy CTA uses `--text-bright` label. Respect reduced-motion everywhere.
