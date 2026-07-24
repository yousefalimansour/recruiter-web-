import { Bot, Mail, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Overline } from "@/components/ui/Overline";
import { Reveal } from "@/components/motion/Reveal";

const TRACKS = [
  {
    tag: "Track A",
    icon: Bot,
    title: "Autonomous Apply",
    lede: "The full pipeline — discover, score, tailor, submit — running on portals that accept it.",
    points: [
      "Public ATS APIs first (Greenhouse, Lever, Ashby) — reliable, no scraping",
      "Deterministic form playbooks + AI fallback for unknown sites",
      "Dry-run mode: fill + screenshot, submit only once you trust an ATS",
      "Escalates OTP, CAPTCHA, and assessments to you on Telegram",
    ],
  },
  {
    tag: "Track B",
    icon: Mail,
    title: "Cold-Email Outreach",
    lede: "A throttled, personalized email campaign to a curated recruiter list — the fast, low-risk win.",
    points: [
      "Validates and cleans the contact list before a single send",
      "Personalizes every message from your real experience only",
      "Warm-up throttling with SPF/DKIM/DMARC — protects your domain",
      "Routes replies and bounces straight back to Telegram",
    ],
  },
];

/**
 * TwoTracks — the two delivery tracks as bordered, flat cards.
 */
export function TwoTracks() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <Reveal>
          <SectionHeading
            overline="Two tracks"
            title="Ship results in week one, scale autonomy after"
            description="Cold-email outreach delivers immediately while the autonomous portal agent hardens behind it. Both share one engine."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {TRACKS.map((track, i) => {
            const Icon = track.icon;
            return (
              <Reveal key={track.tag} delay={i * 0.08}>
                <Card interactive padding="lg" className="flex h-full flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <Overline tone="primary">{track.tag}</Overline>
                    <Icon size={24} strokeWidth={1.5} className="text-text-muted" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-heading text-h2 font-semibold text-text-bright">
                      {track.title}
                    </h3>
                    <p className="text-body text-text-secondary">{track.lede}</p>
                  </div>
                  <ul className="mt-2 flex flex-col gap-3 border-t border-border pt-6">
                    {track.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-small text-text-secondary">
                        <Check size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
