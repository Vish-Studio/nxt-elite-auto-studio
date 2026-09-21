import type { ReactNode } from "react";
type PrimaryLinkProps = { href: string; children: ReactNode; variant?: "gold" | "outline" };
const PrimaryLink = ({ href, children, variant = "gold" }: PrimaryLinkProps) => <a className={`primary-link primary-link--${variant}`} href={href}>{children}<span aria-hidden="true">↗</span></a>;
export default PrimaryLink;
