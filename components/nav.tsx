"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggleButton } from "@/components/theme/theme-toggle";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Recruiter Agent";

const LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Overview" },
  { href: "/dashboard", label: "Dashboard" },
];

/**
 * Nav — thin fixed top bar, mono wordmark left, links right.
 * Flat bg + 1px bottom border. No shadow, no gradient.
 */
export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/95">
      <nav className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-text-bright transition-colors hover:text-accent"
        >
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-[2px] bg-primary"
          />
          {SITE_NAME}
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ul className="flex items-center gap-1 sm:gap-2">
            {LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "block rounded-md px-3 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.18em] transition-colors",
                      active
                        ? "text-text-bright"
                        : "text-text-muted hover:text-text",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggleButton />
        </div>
      </nav>
    </header>
  );
}
