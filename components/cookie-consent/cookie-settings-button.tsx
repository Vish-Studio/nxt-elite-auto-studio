"use client";

import { useLanguage } from "@/components/language-provider/language-provider";
import { setConsent } from "@/lib/cookie-consent";

const CookieSettingsButton = () => {
  const { language } = useLanguage();
  return (
    <button
      className="cursor-pointer border-0 bg-transparent p-0 [letter-spacing:inherit] text-ivory/55 [text-transform:inherit] [font:inherit] hover:text-ivory hover:underline hover:underline-offset-[3px]"
      onClick={() => setConsent("unset")}
      type="button"
    >
      {language === "fr" ? "Paramètres des cookies" : "Cookie settings"}
    </button>
  );
};
export default CookieSettingsButton;
