"use client";

import { useSyncExternalStore } from "react";
import { useLanguage } from "@/components/language-provider/language-provider";
import { getConsent, getServerConsent, setConsent, subscribeToConsent } from "@/lib/cookie-consent";

const CookieBanner = () => {
  const consent = useSyncExternalStore(subscribeToConsent, getConsent, getServerConsent);
  const { language } = useLanguage();
  const fr = language === "fr";
  if (consent !== "unset") return null;
  return (
    <section
      aria-labelledby="cookie-banner-title"
      className="fixed bottom-5 left-1/2 z-[3000] flex w-[calc(100vw-2.5rem)] max-w-[880px] -translate-x-1/2 flex-col items-stretch justify-between gap-5 border border-rule bg-surface px-[1.6rem] py-[1.4rem] md:flex-row md:items-center md:gap-8"
      role="dialog"
    >
      <div>
        <p className="section-label mb-[0.6rem]" id="cookie-banner-title">
          Cookies
        </p>
        <p className="m-0 text-[0.85rem] leading-[1.6] text-fog">
          {fr
            ? "Nous utilisons des cookies d'analyse pour comprendre comment les visiteurs utilisent notre site et l'améliorer. Vous pouvez accepter ou refuser à tout moment."
            : "We use analytics cookies to understand how visitors use our site and improve it. You can accept or decline at any time."}
        </p>
      </div>
      <div className="flex shrink-0 gap-3">
        <button
          className="inline-flex flex-1 cursor-pointer items-center justify-center border border-ivory bg-void px-[1.15rem] py-4 text-[0.65rem] font-semibold tracking-[0.1em] whitespace-nowrap text-ivory uppercase transition-transform duration-200 hover:-translate-y-0.5 md:flex-none"
          onClick={() => setConsent("denied")}
          type="button"
        >
          {fr ? "Refuser" : "Decline"}
        </button>
        <button
          className="inline-flex flex-1 cursor-pointer items-center justify-center bg-gold px-[1.15rem] py-4 text-[0.65rem] font-semibold tracking-[0.1em] whitespace-nowrap text-void uppercase transition-transform duration-200 hover:-translate-y-0.5 md:flex-none"
          onClick={() => setConsent("granted")}
          type="button"
        >
          {fr ? "Accepter" : "Accept"}
        </button>
      </div>
    </section>
  );
};
export default CookieBanner;
