import Link from "next/link";
import { Github, Twitter, Linkedin, Send } from "lucide-react";

const COLS: { title: string; links: [string, string][] }[] = [
  {
    title: "Product",
    links: [
      ["Overview", "/"],
      ["Pipeline", "#pipeline"],
      ["Two tracks", "#tracks"],
      ["Dashboard", "/dashboard"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["How it works", "#narrative"],
      ["Live stats", "#stats"],
      ["GitHub", "https://github.com/yousefalimansour/recruiter-agent"],
    ],
  },
];

const SOCIALS: { icon: typeof Github; href: string; label: string }[] = [
  { icon: Github, href: "https://github.com/yousefalimansour/recruiter-agent", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Send, href: "#", label: "Telegram" },
];

export function SakuraFooter() {
  return (
    <footer className="relative border-t border-white/5 bg-sakura-bg2">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true">
              <defs>
                <linearGradient id="sakura-foot-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ff5c9d" />
                  <stop offset="1" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <rect x="8" y="8" width="24" height="24" rx="3" transform="rotate(45 20 20)" fill="none" stroke="url(#sakura-foot-g)" strokeWidth="2" />
            </svg>
            <span className="leading-tight">
              <span className="block font-display font-semibold text-sakura-cream">Recruiter Agent</span>
              <span lang="ja" className="block font-jp text-[0.6rem] tracking-[0.22em] text-sakura-faint">
                採用エージェント
              </span>
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-sakura-muted">
            An autonomous agent that discovers, tailors, and applies — while you
            sleep. Built with purpose, never fabricating a fact.
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.title} className="flex flex-col gap-4">
            <h3 className="font-display text-sm font-semibold text-sakura-cream">{col.title}</h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-sakura-muted transition-colors hover:text-sakura-pink"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-sm font-semibold text-sakura-cream">Connect</h3>
          <div className="flex gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-sakura-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-sakura-pink/50 hover:text-sakura-pink"
              >
                <Icon size={17} strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-sakura-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© 2026 Recruiter Agent. Crafted with purpose. Designed for the future.</span>
          <span className="flex gap-6">
            <Link href="#" className="hover:text-sakura-muted">Privacy Policy</Link>
            <Link href="#" className="hover:text-sakura-muted">Terms of Service</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
