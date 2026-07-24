import { Bot, Mail, RefreshCw, ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { JapaneseLabel } from "./JapaneseLabel";
import { Orbs } from "./Orbs";
import { GlassCard } from "./GlassCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

type Glow = "pink" | "purple" | "blue" | "orange";

const CARDS: {
  icon: typeof Bot;
  title: string;
  tag: string;
  from: string;
  to: string;
  glow: Glow;
  desc: string;
}[] = [
  { icon: Bot, title: "Autonomous Apply", tag: "Track A", from: "#ff5c9d", to: "#8b5cf6", glow: "pink", desc: "The full pipeline running on portals that accept it — public ATS APIs first, deterministic form playbooks, and dry-run mode until you trust each site." },
  { icon: Mail, title: "Cold-Email Outreach", tag: "Track B", from: "#4361ee", to: "#4cc9f0", glow: "blue", desc: "A throttled, personalized campaign to a curated recruiter list — validated contacts, honest messages from your real experience, replies routed to Telegram." },
  { icon: RefreshCw, title: "Recovers & Learns", tag: "Always on", from: "#ff8c42", to: "#ff5b6e", glow: "orange", desc: "Auto-fixes common failures, answers screening questions from memory, and grows more autonomous with every single application it sends." },
];

function CardIcon({ Icon, from, to }: { Icon: typeof Bot; from: string; to: string }) {
  const glowStyle: CSSProperties = { background: `linear-gradient(135deg, ${from}, ${to})` };
  return (
    <span className="relative grid h-14 w-14 place-items-center rounded-xl border border-white/10">
      <span className="absolute inset-0 rounded-xl opacity-30 blur-md" style={glowStyle} aria-hidden="true" />
      <Icon className="relative" size={22} strokeWidth={1.6} style={{ color: from }} />
    </span>
  );
}

/**
 * Services — the two tracks + the recovery/learning capability as floating glass
 * cards (maps the reference's "Our Services" carousel).
 */
export function Services() {
  return (
    <section id="tracks" className="relative overflow-hidden py-28">
      <Orbs />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <JapaneseLabel>サービス</JapaneseLabel>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-sakura-cream">
            Two tracks, one engine
          </h2>
          <p className="text-sakura-muted">
            Ship results in week one with outreach while the autonomous portal
            agent hardens behind it — both share the same brain.
          </p>
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-3">
          {CARDS.map((c) => (
            <StaggerItem key={c.title}>
              <GlassCard glow={c.glow} className="flex h-full flex-col gap-5 p-8">
                <CardIcon Icon={c.icon} from={c.from} to={c.to} />
                <div className="flex flex-col gap-2">
                  <span className="font-jp text-xs font-medium tracking-[0.14em] text-sakura-pink">
                    {c.tag}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-sakura-cream">
                    {c.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-sakura-muted">{c.desc}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-display text-sm text-sakura-pink">
                  Learn more <ArrowRight size={14} strokeWidth={2} />
                </span>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
