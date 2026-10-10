"use client";

import { useLanguage } from "@/components/language-provider/language-provider";
import { setConsent } from "@/lib/cookie-consent";

const CookieSettingsButton = () => {
  const { language } = useLanguage();
  return <button className="cursor-pointer border-0 bg-transparent p-0 text-[rgba(245,245,240,0.55)] [font:inherit] [letter-spacing:inherit] [text-transform:inherit] hover:text-[var(--color-ivory)] hover:underline hover:underline-offset-[3px]" onClick={() => setConsent("unset")} type="button">{language === "fr" ? "Paramètres des cookies" : "Cookie settings"}</button>;
};
export default CookieSettingsButton;
