# SAKURA-DESIGN.md — landing-page design system (scoped to `.theme-sakura`)

> "Japanese nature and culture reimagined as a futuristic digital world."
> Dark cinematic, sakura-pink + neon gradients, glassmorphism, flowing waves, drifting petals.
> Applies to the LANDING PAGE ONLY. The dashboard keeps its flat burgundy/gray system.
> Gradients + glows are intentional here (this direction is the opposite of the dashboard's flat rule).

## Palette (tokens live in globals.css `@theme`, prefix `--color-sakura-*`)
- **Base:** `--sakura-bg #0a0710` (midnight purple-black), `--sakura-bg2 #0d0a1a` (section variation)
- **Sakura:** pink `#ff5c9d`, rose `#f56ba3`, magenta `#d6409f`
- **Neon:** purple `#8b5cf6`, violet `#7c3aed`, blue `#4361ee`, cyan `#4cc9f0`
- **Warm:** coral `#ff5b6e`, orange `#ff8c42`
- **Text:** cream `#f5eef4` (never pure white), muted `#b3a9c4`, faint `#7c7391`
- **Lines/glass:** hairline `rgba(255,255,255,.08)`, glass fill `rgba(20,14,30,.45)` + blur
- **Signature gradients:** CTA = `pink→coral→purple` (`#ff5c9d → #ff7a59 → #8b5cf6`); text-accent = `pink→orange→purple`; atmospheric radial glows = orange/pink/purple at low opacity.

## Typography
- **Display/headings:** Poppins (geometric, rounded-premium) → `--font-display`
- **Body:** Inter → `--font-body`
- **Japanese accents:** Noto Sans JP → `--font-jp` (small pink kicker above headings, e.g. `私たちの強み`)
- Big powerful-not-aggressive headings; soft cream body; generous breathing room.

## Atmosphere & motion (all GPU-friendly, all reduced-motion safe)
- **WaveLines** — thin flowing sine-wave gradient strokes drifting slowly behind content (the signature element). Never dominate.
- **SakuraPetals** — sparse petals drifting down with sway + rotate.
- **Orbs** — small pink→orange gradient spheres floating gently.
- **Radial glows** — soft, blurred, blended into the dark.
- Scroll-reveal (fade-up), gentle hover lifts, animated gradient text. Calm, cinematic — never aggressive.

## Components
- **GlassCard** — `rgba(20,14,30,.45)` + `backdrop-blur`, 1px `rgba(255,255,255,.08)` border, rounded-2xl, soft colored glow on hover, floating feel. No generic white cards.
- **GradientButton** — filled pink→coral→purple pill (primary) / glass-outline (ghost). Shifts gradient on hover.
- **JapaneseLabel** — Noto Sans JP, pink, small, tracked — the kicker above section titles.
- **SakuraScene** — hero atmospheric composition built in code (glowing sun/moon radial + stylized SVG sakura tree + pagoda + mountain silhouettes + water reflection). Not a copied image — a coded equivalent.
- **SectionShell** — dark section with subtle bg variation, optional waves/orbs, asymmetric/circular compositions.

## Layout / composition
Asymmetric, layered, deep. Circular/porthole motifs (glowing ring frames). Sections blend via bg variation + shared atmospheric layers. Fully responsive — recompose (not shrink) for mobile; hero stays readable; decorative visuals move/scale intelligently; no overflow.

## Content mapping (preserve the AI Recruitment Agent purpose)
| Reference section | Our content |
|---|---|
| Hero "Sakora Tree" | Agent hero: "An autonomous agent that applies while you sleep" + JP kicker + 2 gradient CTAs (View the live pipeline → /dashboard, How it works) + coded sakura scene |
| "Our Essence" 4 pillars | The 6-stage pipeline (Discover→Score→Tailor→Apply→Recover→Learn) as neon icon features |
| "Inspired by Nature" circular | Narrative "How it works" — the 7 agents / orchestration, with a circular porthole visual |
| "Our Services" glass cards | The two tracks (A: autonomous apply, B: cold-email) + capabilities as glass cards |
| — | Live stats band (fetches /api/overview, mock fallback) |
| CTA "Let's Create…" | "Let the agent run the search while you build" glass CTA |
| Footer | Restyled footer, recruiter-agent links |
