"use client";

import { useEffect, useRef } from "react";
import { trackEvent, type AnalyticsParams } from "@/lib/analytics";

export const useTrackInView = <T extends Element>(event: string, params: AnalyticsParams, threshold = 0.6) => {
  const ref = useRef<T>(null);
  const paramsRef = useRef(params);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      trackEvent(event, paramsRef.current);
      observer.disconnect();
    }, { threshold });
    observer.observe(element);
    return () => observer.disconnect();
  }, [event, threshold]);
  return ref;
};
