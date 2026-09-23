import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
type PrimaryLinkProps = { href: string; children: ReactNode; variant?: "gold" | "outline" };
const PrimaryLink = ({ href, children, variant = "gold" }: PrimaryLinkProps) => <a className={`primary-link primary-link--${variant}`} href={href}>{children}<ArrowUpRightIcon aria-hidden="true" size={14} weight="bold" /></a>;
export default PrimaryLink;
