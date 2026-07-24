import Link from "next/link";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Recruiter Agent";
const YEAR = new Date().getFullYear();

/**
 * Footer — flat bar, 1px top border, mono chrome. No gradient.
 */
export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-bg">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-mono text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-bright">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-[2px] bg-primary"
            />
            {SITE_NAME}
          </div>
          <p className="max-w-sm text-caption text-text-muted">
            An autonomous agent that discovers, scores, tailors, and applies to
            jobs — then reports back.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href="/"
            className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-text"
          >
            Overview
          </Link>
          <Link
            href="/dashboard"
            className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-text"
          >
            Dashboard
          </Link>
          <span className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-text-muted">
            © {YEAR}
          </span>
        </nav>
      </div>
    </footer>
  );
}
