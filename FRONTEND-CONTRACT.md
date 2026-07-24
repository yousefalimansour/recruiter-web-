# FRONTEND-CONTRACT.md — recruiter-web build spec

Single source of truth for structure, stack, and the backend connection. Pair with [`DESIGN.md`](DESIGN.md) (visual rules) + [`design-dna.json`](design-dna.json). Project root: `pleass-hire-me/recruiter-web/`.

## Stack (fixed)
- **Next.js 15** (App Router) + **React 18/19** + **TypeScript** (strict).
- **Tailwind CSS v4** (`@import "tailwindcss"` + `@theme` tokens in `globals.css`).
- **framer-motion** (motion), **three** + **@react-three/fiber** + **@react-three/drei** (hero), **lucide-react** (icons).
- Fonts via `next/font/google`: Space_Grotesk, Inter, JetBrains_Mono.
- Node 20+. Package manager: npm.
- Deploy target: **Vercel**. Backend (`agent-core`) runs elsewhere (Render); frontend reaches it via a **server-side** env `AGENT_CORE_URL` through Next route handlers (never expose it to the browser; avoids CORS).

## Repo layout
```
recruiter-web/
├── package.json  tsconfig.json  next.config.mjs  postcss.config.mjs  .gitignore  .env.example  README.md
├── design-dna.json  DESIGN.md  FRONTEND-CONTRACT.md   (already exist)
├── public/                      # grain.svg noise, favicon
├── app/
│   ├── layout.tsx               # fonts, <html> vars, Nav, Footer, grain overlay
│   ├── globals.css              # Tailwind v4 + @theme tokens from DESIGN.md + base styles
│   ├── page.tsx                 # LANDING (/)
│   ├── dashboard/page.tsx       # DASHBOARD (/dashboard)
│   └── api/
│       ├── overview/route.ts    # GET → proxies agent-core /dashboard/overview (mock fallback)
│       └── recent/route.ts      # GET → proxies agent-core /dashboard/recent  (mock fallback)
├── components/
│   ├── ui/                      # Button, Card, Stat, Badge, SectionHeading, Overline, Divider
│   ├── nav.tsx  footer.tsx  grain.tsx
│   ├── motion/                  # Reveal, StaggerGroup, CountUp, MagneticButton (framer-motion)
│   ├── hero/                    # Hero3D (r3f), HeroFallback, hero-content.tsx
│   ├── landing/                 # sections: Pipeline, TwoTracks, AgentChain, LiveStats, CTA
│   └── dashboard/               # Funnel, DailyReport, RecentApplications, OutreachPanel, MiniBarChart, Sparkline, StatusBadge
├── lib/
│   ├── api.ts                   # typed fetchers (getOverview/getRecent) hitting /api/* 
│   ├── types.ts                 # DashboardOverview, RecentItem, etc. (mirror backend §Backend)
│   └── mock.ts                  # realistic sample data (used when backend down)
```

## Routes / content
- **`/` landing** (immersive, editorial): Nav → **Hero** (3D flat wireframe + node field, scroll-scrubbed camera, headline "An autonomous agent that applies to jobs while you sleep", primary CTA "View the live pipeline" → /dashboard, secondary "How it works") → **Pipeline** (discover→score→tailor→apply→recover→learn as a horizontal flat stepper) → **TwoTracks** (Track A autonomous apply / Track B cold-email, two bordered cards) → **AgentChain** (the 7 agents as a connected diagram, SVG connectors draw-in on scroll) → **LiveStats** (pulls `/api/overview`, shows jobs found / applied / reply rate with count-up; mock fallback) → **CTA** → Footer. Motion: `Reveal`/`StaggerGroup` on every section, reduced-motion safe.
- **`/dashboard`** (precise instrument): header with mono timestamp → **DailyReport** stat cards (Jobs Found / Qualified / Applied / Needs Review / Rejected) → **Funnel** (flat burgundy bars discovered→qualified→applied→submitted→replied) → **OutreachPanel** (Track B: sent/replied/bounced) → **RecentApplications** table (company, role, ATS, status badge, match score, time). All data from `lib/api.ts`; render mock when backend unreachable, with a subtle "demo data" mono note.

## Backend connection (contract with agent-core)
Next route handlers call `${AGENT_CORE_URL}` server-side. Two endpoints to be added to agent-core (see below). Types must match:
```ts
// lib/types.ts
export interface DashboardOverview {
  daily: { jobs_found:number; qualified:number; applied:number; need_manual_review:number; rejected:number; top_blockers:string[] };
  funnel: { discovered:number; qualified:number; applied:number; submitted:number; replied:number };
  outreach: { queued:number; sent:number; replied:number; bounced:number };
  reply_rate:number; generated_at:string;
}
export interface RecentItem {
  company:string; role:string; ats:string;
  status:"submitted"|"needs_human"|"failed"|"pending"|"skipped";
  match_score:number|null; time:string;
}
```
Route handler behavior: `fetch(`${process.env.AGENT_CORE_URL}/dashboard/overview`, {cache:'no-store'})`; on any error/timeout → return `lib/mock.ts` data with header `x-data-source: mock`. `lib/api.ts` reads that header so the UI can show the "demo data" note.

## Env (`.env.example`)
```
AGENT_CORE_URL=http://localhost:8000      # server-side only (no NEXT_PUBLIC_)
NEXT_PUBLIC_SITE_NAME=Recruiter Agent
```

## Backend endpoints to ADD to agent-core (Python, by the backend builder)
In `agent-core/app/routers/reports.py` (or a new `dashboard.py` router), add:
- `GET /dashboard/overview` → `DashboardOverview` shape above. Aggregate from Postgres: `daily` = counts over last 24h (reuse existing /report/daily logic); `funnel` = counts of jobs/applications by status; `outreach` = counts from `outreach_contacts`/`outreach_sends`; `reply_rate` = replied/sent. Must not crash on empty DB (return zeros).
- `GET /dashboard/recent?limit=10` → `{ items: RecentItem[] }` from latest applications joined to jobs/companies.
- Enable **CORS** in `agent-core/app/main.py` (`CORSMiddleware`, allow the Vercel origin via an env `FRONTEND_ORIGIN`, default `*` for dev) — even though the frontend proxies server-side, CORS lets a local dashboard hit it directly if needed.
- Keep responses valid + zero-safe; add a couple of pytest cases mirroring the shapes (mock the DB).

## Quality bar
- `npm run build` (or at least `tsc --noEmit`) clean. No `any` leaks in public types.
- **Zero gradients** (DESIGN.md rule) — reviewer greps for `gradient`.
- Every color/spacing/radius traces to DESIGN.md tokens. Reduced-motion respected. WebGL has the static fallback.
- Renders fully with backend DOWN (mock data). No secrets committed (`.gitignore` covers `.env*`, `.next/`, `node_modules/`).
