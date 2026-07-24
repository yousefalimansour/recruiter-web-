import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "ghost";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold font-display transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sakura-pink";

// Flat only — solid pink fill with dark legible text, or a glass outline.
const VARIANTS: Record<Variant, string> = {
  primary: "sakura-btn hover:-translate-y-0.5",
  ghost:
    "sakura-glass text-sakura-cream hover:-translate-y-0.5 hover:border-white/25 hover:text-white",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };
type AsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

export type GradientButtonProps = AsButton | AsLink;

/**
 * Primary/ghost button. Name kept for import stability; styling is flat (no
 * gradient) per the design direction.
 */
export function GradientButton(props: GradientButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const cls = [BASE, VARIANTS[variant], className].join(" ");

  if (props.href !== undefined) {
    const { children: _c, variant: _v, className: _cl, href, ...rest } = props;
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a href={href} className={cls} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { children: _c, variant: _v, className: _cl, href: _h, ...rest } = props;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
