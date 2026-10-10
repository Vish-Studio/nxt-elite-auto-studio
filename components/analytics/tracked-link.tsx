"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent, type AnalyticsParams } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { event: string; eventParams?: AnalyticsParams };

const TrackedLink = ({ event, eventParams, onClick, ...props }: TrackedLinkProps) => <a {...props} onClick={(clickEvent) => { trackEvent(event, eventParams); onClick?.(clickEvent); }} />;
export default TrackedLink;
