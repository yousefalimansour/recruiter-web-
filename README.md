# recruiter-web

Front end for the **Recruiter Agent** — an autonomous job-application agent. A dark, premium, editorial landing page plus a precise instrument-panel dashboard. Built to the visual system in [`DESIGN.md`](DESIGN.md) and the structure in [`FRONTEND-CONTRACT.md`](FRONTEND-CONTRACT.md).

**Hard rule:** zero gradients anywhere. Burgundy + gray, flat fills only. Depth comes from flat surface color steps + 1px solid borders.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** — tokens declared in `app/globals.css` via `@theme`
- **framer-motion** (motion), **three / @react-three/fiber / @react-three/drei** (3D hero), **lucide-react** (icons)
- Fonts via `next/font/google`: Space Grotesk (headings), Inter (body), JetBrains Mono (mono/overline chrome)

## Run locally

```bash
npm install
cp .env.example .env.local   # optional; defaults work with mock data
npm run dev                  # http://localhost:3000
```

Scripts:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Next lint |
| `npm run typecheck` | `tsc --noEmit` (strict) |

The site renders fully **with the backend down** — route handlers fall back to `lib/mock.ts` and tag the response `x-data-source: mock`, which surfaces a subtle "demo data" note in the UI.

## Design tokens

Every color, radius, font, and duration is declared once in `app/globals.css` under `@theme` and traced back to [`design-dna.json`](design-dna.json). Use the generated Tailwind utilities:

```
bg-bg bg-surface bg-card bg-elevated
text-text text-text-bright text-text-secondary text-text-muted
bg-primary hover:bg-accent  border-border border-border-strong
font-heading font-body font-mono  rounded-lg
```

Shared building blocks live in `components/ui/` (`Button`, `Card`, `Stat`, `Badge`, `SectionHeading`, `Overline`, `Divider`) and `components/motion/` (`Reveal`, `StaggerGroup` / `StaggerItem`, `CountUp`, `MagneticButton`). All are typed and flat, and all motion respects `prefers-reduced-motion`.

## Backend wiring (agent-core)

The frontend never talks to the backend from the browser. Next route handlers proxy it **server-side**, so the backend URL stays secret and there's no CORS surface:

```
app/api/overview/route.ts  ->  GET ${AGENT_CORE_URL}/dashboard/overview
app/api/recent/route.ts    ->  GET ${AGENT_CORE_URL}/dashboard/recent?limit=10
```

On any error/timeout the handler returns `lib/mock.ts` data with header `x-data-source: mock`. `lib/api.ts` (`getOverview()` / `getRecent()`) reads that header and returns `{ data, isMock }`.

Env (`.env.example`):

```
AGENT_CORE_URL=http://localhost:8000     # server-side only — never NEXT_PUBLIC_
NEXT_PUBLIC_SITE_NAME=Recruiter Agent
```

The two endpoints (`/dashboard/overview`, `/dashboard/recent`) must match the shapes in `lib/types.ts` and be zero-safe on an empty DB. See [`FRONTEND-CONTRACT.md`](FRONTEND-CONTRACT.md) §Backend for the aggregation spec.

## Deploy to Vercel

1. Push the repo; import the project into Vercel (root = `recruiter-web/`).
2. Framework preset: **Next.js** (auto-detected). No build overrides needed.
3. Set environment variables in the Vercel dashboard:
   - `AGENT_CORE_URL` → your deployed agent-core origin (e.g. `https://agent-core.onrender.com`)
   - `NEXT_PUBLIC_SITE_NAME` → `Recruiter Agent`
4. Deploy. With `AGENT_CORE_URL` unset or unreachable, the site still renders on mock data.

## Quality bar

- `npm run typecheck` clean; no `any` in public types.
- **Zero gradients** — reviewers grep for `gradient`.
- Reduced-motion respected everywhere; the WebGL hero has a static fallback.
- No secrets committed (`.gitignore` covers `.env*`, `.next/`, `node_modules/`).
