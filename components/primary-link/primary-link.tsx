import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
import TrackedLink from "@/components/analytics/tracked-link";
import type { AnalyticsParams } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type PrimaryLinkProps = {
  children: ReactNode;
  /** Layout-only classes (alignment, width). Visual styles come from `variant` and `size`. */
  className?: string;
  href: string;
  size?: "md" | "sm";
  track?: { event: string; params?: AnalyticsParams };
  variant?: "gold" | "outline";
};

const variants = {
  gold: "bg-gold text-void",
  outline: "border-ivory bg-void text-ivory border",
};

const sizes = {
  md: "px-[1.15rem] py-4 text-[0.65rem]",
  sm: "px-[0.9rem] py-[0.82rem] text-[0.65rem] max-lg:px-[0.7rem] max-lg:py-3 max-lg:text-[0.56rem]",
};

const PrimaryLink = ({
  children,
  className,
  href,
  size = "md",
  track,
  variant = "gold",
}: PrimaryLinkProps) => {
  const classes = cn(
    "inline-flex items-center justify-center gap-4 font-semibold tracking-[0.1em] whitespace-nowrap uppercase transition-transform duration-200 hover:-translate-y-0.5",
    variants[variant],
    sizes[size],
    className,
  );
  const content = (
    <>
      {children}
      <ArrowUpRightIcon aria-hidden="true" size={14} weight="bold" />
    </>
  );

  return track ? (
    <TrackedLink className={classes} event={track.event} eventParams={track.params} href={href}>
      {content}
    </TrackedLink>
  ) : (
    <a className={classes} href={href}>
      {content}
    </a>
  );
};

export default PrimaryLink;
