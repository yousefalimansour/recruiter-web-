import { Search, Gauge, FileText, Send, Wrench, Brain } from "lucide-react";
import { JapaneseLabel } from "./JapaneseLabel";
import { WaveLines } from "./WaveLines";

const STEPS = [
  { icon: Search, name: "Discover", color: "#b23a4e", desc: "Pulls fresh roles from public ATS APIs — Greenhouse, Lever, Ashby, RemoteOK — every 15 minutes." },
  { icon: Gauge, name: "Score", color: "#94243f", desc: "Gemini scores each job 0–100 against your profile and decides: apply, review, or reject." },
  { icon: FileText, name: "Tailor", color: "#c85a6b", desc: "Reorders and rewrites your résumé for ATS keywords — never inventing a single fact." },
  { icon: Send, name: "Apply", color: "#b23a4e", desc: "Drives the browser to fill the form, upload the résumé, answer questions, and submit." },
  { icon: Wrench, name: "Recover", color: "#94243f", desc: "Fixes the usual snags — missing links, wrong format, cover letter required — on its own." },
  { icon: Brain, name: "Learn", color: "#c85a6b", desc: "Remembers every question answered, so the next application is faster and more autonomous." },
];

function IconBadge({ Icon }: { Icon: typeof Search }) {
  return (
    <span className="grid h-16 w-16 place-items-center rounded-2xl border border-[rgba(102,0,51,0.4)] bg-[rgba(102,0,51,0.12)] text-sakura-pink shadow-[0_0_34px_-14px_rgba(102,0,51,0.7)]">
      <Icon size={24} strokeWidth={1.7} />
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
          <JapaneseLabel>How it works</JapaneseLabel>
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
              <IconBadge Icon={s.icon} />
              <h3 className="font-display text-lg font-semibold text-sakura-cream">{s.name}</h3>
              <p className="max-w-xs text-sm leading-relaxed text-sakura-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
