"use client";

import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useSyncExternalStore } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { getConsent, getServerConsent, subscribeToConsent } from "@/lib/cookie-consent";

const GoogleAnalytics = () => {
  const consent = useSyncExternalStore(subscribeToConsent, getConsent, getServerConsent);
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = consent !== "granted";
  }, [consent]);
  if (!GA_MEASUREMENT_ID || consent !== "granted") return null;
  return <NextGoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
};
export default GoogleAnalytics;
