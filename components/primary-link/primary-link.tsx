import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
import TrackedLink from "@/components/analytics/tracked-link";
import type { AnalyticsParams } from "@/lib/analytics";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/lib/button-styles";

type PrimaryLinkProps = {
  children: ReactNode;
  /** Layout-only classes (alignment, width). Visual styles come from `variant` and `size`. */
  className?: string;
  href: string;
  /** Fade in with the rest of the section (see PageMotion). */
  reveal?: boolean;
  size?: ButtonSize;
  track?: { event: string; params?: AnalyticsParams };
  variant?: ButtonVariant;
};

const PrimaryLink = ({
  children,
  className,
  href,
  reveal = false,
  size = "md",
  track,
  variant = "gold",
}: PrimaryLinkProps) => {
  const classes = buttonClasses({ className, size, variant });
  const content = (
    <>
      {children}
      <ArrowUpRightIcon aria-hidden="true" size={14} weight="bold" />
    </>
  );

  return track ? (
    <TrackedLink
      className={classes}
      data-reveal={reveal || undefined}
      event={track.event}
      eventParams={track.params}
      href={href}
    >
      {content}
    </TrackedLink>
  ) : (
    <a className={classes} data-reveal={reveal || undefined} href={href}>
      {content}
    </a>
  );
};

export default PrimaryLink;
