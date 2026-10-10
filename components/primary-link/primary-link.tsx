import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
import TrackedLink from "@/components/analytics/tracked-link";
import type { AnalyticsParams } from "@/lib/analytics";
type PrimaryLinkProps = { href: string; children: ReactNode; variant?: "gold" | "outline"; track?: { event: string; params?: AnalyticsParams } };
const PrimaryLink = ({ href, children, variant = "gold", track }: PrimaryLinkProps) => {
  const className = `inline-flex items-center justify-center gap-4 whitespace-nowrap px-[1.15rem] py-4 text-[0.65rem] font-bold uppercase tracking-[0.1em] transition-transform duration-200 hover:-translate-y-0.5 ${variant === "outline" ? "border border-[var(--color-ivory)] bg-[var(--color-void)] text-[var(--color-ivory)]" : "bg-[var(--color-gold)] text-[var(--color-void)]"}`;
  const icon = <ArrowUpRightIcon aria-hidden="true" size={14} weight="bold" />;
  return track ? <TrackedLink className={className} event={track.event} eventParams={track.params} href={href}>{children}{icon}</TrackedLink> : <a className={className} href={href}>{children}{icon}</a>;
};
export default PrimaryLink;
