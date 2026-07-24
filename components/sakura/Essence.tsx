import { Search, Gauge, FileText, Send, Wrench, Brain } from "lucide-react";
import type { CSSProperties } from "react";
import { JapaneseLabel } from "./JapaneseLabel";
import { WaveLines } from "./WaveLines";
import { Orbs } from "./Orbs";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

const STEPS = [
  { icon: Search, name: "Discover", from: "#ff5c9d", to: "#d6409f", desc: "Pulls fresh roles from public ATS APIs — Greenhouse, Lever, Ashby, RemoteOK — every 15 minutes." },
  { icon: Gauge, name: "Score", from: "#8b5cf6", to: "#4361ee", desc: "Gemini scores each job 0–100 against your profile and decides: apply, review, or reject." },
  { icon: FileText, name: "Tailor", from: "#ff8c42", to: "#ff5c9d", desc: "Reorders and rewrites your résumé for ATS keywords — never inventing a single fact." },
  { icon: Send, name: "Apply", from: "#4361ee", to: "#4cc9f0", desc: "Drives the browser to fill the form, upload the résumé, answer questions, and submit." },
  { icon: Wrench, name: "Recover", from: "#ff5b6e", to: "#ff8c42", desc: "Fixes the usual snags — missing links, wrong format, cover letter required — on its own." },
  { icon: Brain, name: "Learn", from: "#d6409f", to: "#8b5cf6", desc: "Remembers every question answered, so the next application is faster and more autonomous." },
];

function IconBadge({ Icon, from, to }: { Icon: typeof Search; from: string; to: string }) {
  const glowStyle: CSSProperties = { background: `linear-gradient(135deg, ${from}, ${to})` };
  return (
    <span className="sakura-glass relative grid h-16 w-16 place-items-center rounded-2xl">
      <span className="absolute inset-0 rounded-2xl opacity-35 blur-md" style={glowStyle} aria-hidden="true" />
      <Icon className="relative" size={24} strokeWidth={1.6} style={{ color: from }} />
    </span>
  );
}

/**
 * Essence — the six-stage pipeline as neon icon features (maps the reference's
 * "Our Essence" 4-column layout to our loop).
 */
export function Essence() {
  return (
    <section id="pipeline" className="relative overflow-hidden py-28">
      <WaveLines className="inset-x-0 top-0 h-full opacity-40" speed={54} />
      <Orbs />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <JapaneseLabel>私たちの仕組み</JapaneseLabel>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-sakura-cream">
            The essence of the agent
          </h2>
          <p className="text-sakura-muted">
            Six stages, always in motion — one continuous loop that turns a raw
            job posting into a submitted application.
          </p>
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <StaggerItem key={s.name} className="flex flex-col items-center gap-4 text-center">
              <IconBadge Icon={s.icon} from={s.from} to={s.to} />
              <h3 className="font-display text-lg font-semibold text-sakura-cream">{s.name}</h3>
              <p className="max-w-xs text-sm leading-relaxed text-sakura-muted">{s.desc}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
