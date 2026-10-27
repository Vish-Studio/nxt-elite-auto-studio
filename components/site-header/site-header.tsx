"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react/ssr";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import BrandMark from "@/components/brand-mark/brand-mark";
import { type Language, useLanguage } from "@/components/language-provider/language-provider";
import LanguageSelector, {
  type LanguageOption,
} from "@/components/language-selector/language-selector";
import PrimaryLink from "@/components/primary-link/primary-link";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { setScrollLocked } from "@/lib/smooth-scroll";

const MobileNavigationMap = dynamic(
  () => import("@/components/mobile-navigation-map/mobile-navigation-map"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-26 items-center justify-center bg-map text-[0.55rem] tracking-widest text-fog uppercase">
        Loading service area…
      </div>
    ),
  },
);

const navigationLinks: Record<Language, Array<[label: string, href: string]>> = {
  en: [
    ["About", "#about"],
    ["Services", "#services"],
    ["Pricing", "#pricing"],
    ["FAQs", "#faq"],
    ["Testimonials", "#testimonials"],
  ],
  fr: [
    ["À propos", "#about"],
    ["Services", "#services"],
    ["Tarifs", "#pricing"],
    ["FAQ", "#faq"],
    ["Témoignages", "#testimonials"],
  ],
};

const languages: LanguageOption[] = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
];

const iconButton =
  "text-ivory hidden cursor-pointer items-center justify-center border-0 bg-transparent p-1 max-lg:inline-flex";

const SiteHeader = () => {
  const [isSolid, setIsSolid] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const links = navigationLinks[language];
  const bookLabel = language === "fr" ? "Réserver" : "Book now";
  const changeLanguage = (code: string) => setLanguage(code === "fr" ? "fr" : "en");

  // Stay transparent while the header overlaps the hero, then turn solid.
  useEffect(() => {
    const updateHeader = () => {
      const hero = document.getElementById("home");
      const headerHeight = document.querySelector("header")?.clientHeight ?? 0;
      setIsSolid(hero ? hero.getBoundingClientRect().bottom <= headerHeight : window.scrollY > 24);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    setScrollLocked(true);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      setScrollLocked(false);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-2000 transition-colors duration-300 motion-reduce:transition-none",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-linear-to-b before:from-void/55 before:to-transparent before:transition-opacity before:duration-300",
        isSolid && "bg-void before:opacity-0",
      )}
    >
      <div className="shell grid h-(--topbar-height) grid-cols-[minmax(150px,1fr)_auto_minmax(120px,1fr)] items-center max-lg:grid-cols-[1fr_auto]">
        <div className="flex items-center gap-[0.7rem]">
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label="Open navigation"
            className={iconButton}
            onClick={() => setIsMenuOpen(true)}
            type="button"
          >
            <ListIcon aria-hidden="true" size={22} />
          </button>
          <a
            className="inline-flex items-center gap-[0.65rem] text-[0.67rem] font-semibold tracking-widest uppercase max-md:text-[0.58rem]"
            href="#home"
          >
            <BrandMark className="size-[29px] object-cover" priority variant="icon" />
            <span>Elite Auto Studio</span>
          </a>
        </div>

        <nav
          aria-label="Primary navigation"
          className="flex gap-[clamp(0.75rem,1.35vw,1.5rem)] max-lg:hidden"
        >
          {links.map(([label, href]) => (
            <a
              className="text-[0.59rem] tracking-[0.08em] whitespace-nowrap uppercase underline-offset-[0.4rem] hover:underline"
              href={href}
              key={href}
              onClick={() => trackEvent("nav_click", { section: href.slice(1), menu: "desktop" })}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-[0.65rem] justify-self-end">
          <div className="max-lg:hidden">
            <LanguageSelector onChange={changeLanguage} options={languages} value={language} />
          </div>
          <PrimaryLink
            href="#contact"
            size="sm"
            track={{ event: "booking_click", params: { location: "header" } }}
          >
            {bookLabel}
          </PrimaryLink>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-1 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 w-full animate-backdrop-in cursor-pointer border-0 bg-void/68 p-0 motion-reduce:animate-none"
            onClick={() => setIsMenuOpen(false)}
            type="button"
          />
          <aside
            aria-label="Mobile navigation"
            aria-modal="true"
            className="absolute inset-y-0 left-0 flex min-h-svh w-[min(86vw,23rem)] animate-panel-in flex-col overflow-y-auto bg-surface p-5 text-ivory motion-reduce:animate-none"
            data-lenis-prevent
            id="mobile-navigation"
            role="dialog"
          >
            <div className="flex items-center justify-between border-b border-rule pb-5 text-[0.6rem] font-semibold tracking-widest uppercase">
              <span>Navigation</span>
              <button
                aria-label="Close navigation"
                className={iconButton}
                onClick={() => setIsMenuOpen(false)}
                type="button"
              >
                <XIcon aria-hidden="true" size={20} />
              </button>
            </div>

            <nav className="mt-[0.85rem] flex flex-col">
              {links.map(([label, href]) => (
                <a
                  className="flex items-baseline py-[0.45rem] text-[1.08rem] tracking-[-0.025em]"
                  href={href}
                  key={href}
                  onClick={() => {
                    trackEvent("nav_click", { section: href.slice(1), menu: "mobile" });
                    setIsMenuOpen(false);
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="mt-[0.85rem] grid gap-[0.7rem] border-t border-rule pt-3">
              <div className="flex items-center justify-between">
                <span className="text-[0.56rem] font-semibold tracking-widest text-gold">
                  {language === "fr" ? "Zone de service" : "Service area"}
                </span>
                <strong className="text-[0.58rem] font-normal tracking-[0.06em] text-fog uppercase">
                  {language === "fr"
                    ? "Luxembourg · Belgique · France"
                    : "Luxembourg · Belgium · France"}
                </strong>
              </div>
              <MobileNavigationMap />
            </div>

            <div className="relative mt-4 grid gap-[0.7rem]">
              <LanguageSelector
                fullWidth
                menuPlacement="top"
                onChange={changeLanguage}
                options={languages}
                value={language}
              />
              <PrimaryLink
                className="w-full"
                href="#contact"
                track={{ event: "booking_click", params: { location: "mobile_menu" } }}
              >
                {bookLabel}
              </PrimaryLink>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
