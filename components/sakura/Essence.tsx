import { Search, Gauge, FileText, Send, Wrench, Brain } from "lucide-react";
import { JapaneseLabel } from "./JapaneseLabel";
import { WaveLines } from "./WaveLines";

const STEPS = [
  { icon: Search, name: "Discover", color: "#ff5c9d", desc: "Pulls fresh roles from public ATS APIs — Greenhouse, Lever, Ashby, RemoteOK — every 15 minutes." },
  { icon: Gauge, name: "Score", color: "#8b5cf6", desc: "Gemini scores each job 0–100 against your profile and decides: apply, review, or reject." },
  { icon: FileText, name: "Tailor", color: "#ff8c42", desc: "Reorders and rewrites your résumé for ATS keywords — never inventing a single fact." },
  { icon: Send, name: "Apply", color: "#4cc9f0", desc: "Drives the browser to fill the form, upload the résumé, answer questions, and submit." },
  { icon: Wrench, name: "Recover", color: "#ff5b6e", desc: "Fixes the usual snags — missing links, wrong format, cover letter required — on its own." },
  { icon: Brain, name: "Learn", color: "#d6409f", desc: "Remembers every question answered, so the next application is faster and more autonomous." },
];

function IconBadge({ Icon, color }: { Icon: typeof Search; color: string }) {
  return (
    <span className="sakura-glass grid h-16 w-16 place-items-center rounded-2xl">
      <Icon size={24} strokeWidth={1.6} style={{ color }} />
    </span>
  );
}

/**
 * Essence — the six-stage pipeline as flat neon icon features (no gradients).
 */
export function Essence() {
  return (
    <section id="pipeline" className="relative overflow-hidden py-32 md:py-44">
      <WaveLines className="inset-x-0 top-0 h-full opacity-25" speed={54} />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center" data-reveal>
          <JapaneseLabel>私たちの仕組み</JapaneseLabel>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-sakura-cream">
            The essence of the agent
          </h2>
          <p className="text-sakura-muted">
            Six stages, always in motion — one continuous loop that turns a raw
            job posting into a submitted application.
          </p>
        </div>

        <div
          className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
          data-reveal-stagger
        >
          {STEPS.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-4 text-center">
              <IconBadge Icon={s.icon} color={s.color} />
              <h3 className="font-display text-lg font-semibold text-sakura-cream">{s.name}</h3>
              <p className="max-w-xs text-sm leading-relaxed text-sakura-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
