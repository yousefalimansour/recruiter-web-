import { Bot, Mail, RefreshCw, ArrowRight } from "lucide-react";
import { JapaneseLabel } from "./JapaneseLabel";
import { GlassCard } from "./GlassCard";
import { TracksReveal } from "./TracksReveal";

type Glow = "pink" | "purple" | "blue" | "orange";

const CARDS: {
  icon: typeof Bot;
  title: string;
  tag: string;
  color: string;
  glow: Glow;
  desc: string;
}[] = [
  { icon: Bot, title: "Autonomous Apply", tag: "Track A", color: "#b23a4e", glow: "pink", desc: "The full pipeline running on portals that accept it — public ATS APIs first, deterministic form playbooks, and dry-run mode until you trust each site." },
  { icon: Mail, title: "Cold-Email Outreach", tag: "Track B", color: "#94243f", glow: "blue", desc: "A throttled, personalized campaign to a curated recruiter list — validated contacts, honest messages from your real experience, replies routed to Telegram." },
  { icon: RefreshCw, title: "Recovers & Learns", tag: "Always on", color: "#c85a6b", glow: "orange", desc: "Auto-fixes common failures, answers screening questions from memory, and grows more autonomous with every single application it sends." },
];

function CardIcon({ Icon }: { Icon: typeof Bot }) {
  return (
    <span className="grid h-14 w-14 place-items-center rounded-xl border border-[rgba(102,0,51,0.4)] bg-[rgba(102,0,51,0.12)] text-sakura-pink shadow-[0_0_30px_-14px_rgba(102,0,51,0.7)]">
      <Icon size={22} strokeWidth={1.7} />
    </span>
  );
}

/**
 * Services — the two tracks + recovery/learning as floating glass cards with
 * flat icons and hover physics.
 */
export function Services() {
  return (
    <section id="tracks" className="relative overflow-hidden py-32 md:py-44">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center" data-reveal>
          <JapaneseLabel>What it does</JapaneseLabel>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-sakura-cream">
            Two tracks, one engine
          </h2>
          <p className="text-sakura-muted">
            Ship results in week one with outreach while the autonomous portal
            agent hardens behind it — both share the same brain.
          </p>
        </div>

        <div
          className="mx-auto mt-10 h-[300px] w-full max-w-3xl sm:h-[340px]"
          data-reveal
        >
          <TracksReveal />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3" data-reveal-stagger>
          {CARDS.map((c) => (
            <GlassCard key={c.title} glow={c.glow} className="group flex h-full flex-col gap-5 p-8">
              <CardIcon Icon={c.icon} />
              <div className="flex flex-col gap-2">
                <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-sakura-pink">
                  {c.tag}
                </span>
                <h3 className="font-display text-xl font-semibold text-sakura-cream">{c.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-sakura-muted">{c.desc}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-display text-sm text-sakura-pink transition-transform duration-300 group-hover:translate-x-1">
                Learn more <ArrowRight size={14} strokeWidth={2} />
              </span>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
