import { sendGAEvent } from "@next/third-parties/google";
import { getConsent } from "@/lib/cookie-consent";

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export type AnalyticsParams = Record<string, string | number | boolean>;

export const trackEvent = (name: string, params: AnalyticsParams = {}) => {
  if (!GA_MEASUREMENT_ID || getConsent() !== "granted") return;
  sendGAEvent("event", name, params);
};
