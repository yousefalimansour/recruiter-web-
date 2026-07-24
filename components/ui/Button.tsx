import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 font-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em] rounded-md transition-colors duration-[120ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none";

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3",
  md: "h-10 px-5",
  lg: "h-12 px-7 text-[0.875rem]",
};

const VARIANTS: Record<Variant, string> = {
  // flat burgundy → flat accent on hover, no shadow, no gradient
  primary:
    "bg-primary text-text-bright hover:bg-accent active:bg-primary-pressed border border-transparent",
  // transparent + 1px border → border-strong + brighter text
  secondary:
    "bg-transparent text-text border border-border hover:border-border-strong hover:text-text-bright",
  // text only → burgundy underline on hover
  ghost:
    "bg-transparent text-text px-0 h-auto tracking-[0.12em] hover:text-text-bright underline decoration-transparent underline-offset-4 hover:decoration-accent",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function classes(variant: Variant, size: Size, extra: string): string {
  const sizing = variant === "ghost" ? "" : SIZES[size];
  return [BASE, sizing, VARIANTS[variant], extra].filter(Boolean).join(" ");
}

/**
 * Button — flat burgundy primary / bordered secondary / underline ghost.
 * Hover = flat color swap (never a gradient). Renders as <a> when `href` is set.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
  } = props;
  const cls = classes(variant, size, className);

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, href, ...rest } =
      props;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } =
    props;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
