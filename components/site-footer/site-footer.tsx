"use client";

import { ArrowUpIcon, ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
import TrackedLink from "@/components/analytics/tracked-link";
import BrandMark from "@/components/brand-mark/brand-mark";
import CookieSettingsButton from "@/components/cookie-consent/cookie-settings-button";
import { type Language, useLanguage } from "@/components/language-provider/language-provider";
import PrimaryLink from "@/components/primary-link/primary-link";
import SocialLink from "@/components/social-link/social-link";

const EMAIL = "hello@eliteautostudio.be";
const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61594065960502&mibextid=wwXIfr&rdid=LLFcLvVMOPmumYIc&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17cquzXp8Z%2F%3Fmibextid%3DwwXIfr#";
const TIKTOK_URL = "https://www.tiktok.com/@lite.auto.studio?_r=1&_t=ZG-99QrpqTcBZQ";

const copy = {
  en: {
    headline: ["Professional care.", "Delivered to you."],
    cta: "Request a booking",
    intro:
      "Premium mobile car detailing for private vehicles and businesses across Brussels and Brabant.",
    explore: "Explore",
    links: [
      ["About", "#about"],
      ["Services", "#services"],
      ["Price packages", "#pricing"],
      ["Our works", "#works"],
      ["Process", "#process"],
      ["FAQ", "#faq"],
      ["Testimonials", "#testimonials"],
    ],
    services: ["Interior detailing", "Exterior detailing", "Full detailing", "Sale preparation"],
    contact: ["Brussels, Belgium", "By appointment"],
    rights: "All rights reserved.",
    motto: "Quality · Precision · Finish",
    backToTop: "Back to top",
    websiteBy: "Website by",
  },
  fr: {
    headline: ["Un soin professionnel.", "Livré chez vous."],
    cta: "Demander une réservation",
    intro:
      "Detailing auto mobile premium pour particuliers et entreprises à Bruxelles et dans le Brabant.",
    explore: "Explorer",
    links: [
      ["À propos", "#about"],
      ["Services", "#services"],
      ["Forfaits", "#pricing"],
      ["Réalisations", "#works"],
      ["Processus", "#process"],
      ["FAQ", "#faq"],
      ["Témoignages", "#testimonials"],
    ],
    services: [
      "Detailing intérieur",
      "Detailing extérieur",
      "Detailing complet",
      "Préparation à la vente",
    ],
    contact: ["Bruxelles, Belgique", "Sur rendez-vous"],
    rights: "Tous droits réservés.",
    motto: "Qualité · Précision · Finition",
    backToTop: "Retour en haut",
    websiteBy: "Site web par",
  },
} satisfies Record<Language, unknown>;

const columnText = "text-fog text-[0.74rem]";
const columnLink = `${columnText} hover:text-ivory`;

const FooterColumn = ({ children, title }: { children: ReactNode; title: string }) => (
  <div className="flex min-w-0 flex-col gap-3 pr-8 pl-4 [overflow-wrap:anywhere] max-md:min-h-45 max-md:bg-surface max-md:p-[1.3rem]">
    <h3 className="mb-[0.8rem] text-[0.62rem] tracking-widest uppercase">{title}</h3>
    {children}
  </div>
);

const SiteFooter = () => {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <footer className="pt-(--section-space)">
      <div className="shell">
        <div className="flex items-end justify-between pb-16 max-md:flex-col max-md:items-start max-md:gap-10">
          <div>
            <span className="inline-flex items-center gap-[0.7rem] text-[0.7rem] tracking-widest uppercase">
              <BrandMark className="h-8 w-[42px] object-cover" />
              <b>Elite Auto Studio</b>
            </span>
            <h2 className="mt-8 mb-0 text-[clamp(2.7rem,4.5vw,5rem)] leading-[0.88] font-normal tracking-[-0.04em]">
              {t.headline[0]}
              <br />
              {t.headline[1]}
            </h2>
          </div>
          <PrimaryLink
            href={`mailto:${EMAIL}`}
            track={{ event: "booking_click", params: { location: "footer" } }}
          >
            {t.cta}
          </PrimaryLink>
        </div>

        <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] gap-8 border-t border-rule py-10 max-md:grid-cols-2 max-md:gap-3">
          <div className="flex min-w-0 flex-col gap-3 pr-8 max-md:col-span-full max-md:bg-surface max-md:p-[1.3rem]">
            <p className="m-0 max-w-76 text-[0.88rem] leading-[1.55] font-light text-fog">
              {t.intro}
            </p>
            <div className="mt-[1.2rem] flex flex-wrap gap-[0.65rem]">
              <SocialLink href={FACEBOOK_URL} label="Facebook" />
              <SocialLink href={TIKTOK_URL} label="TikTok" />
            </div>
          </div>
          <FooterColumn title={t.explore}>
            {t.links.map(([label, href]) => (
              <a className={columnLink} href={href} key={href}>
                {label}
              </a>
            ))}
          </FooterColumn>
          <FooterColumn title="Services">
            {t.services.map((service) => (
              <span className={columnText} key={service}>
                {service}
              </span>
            ))}
          </FooterColumn>
          <FooterColumn title="Contact">
            <TrackedLink className={columnLink} event="email_click" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </TrackedLink>
            {t.contact.map((line) => (
              <span className={columnText} key={line}>
                {line}
              </span>
            ))}
          </FooterColumn>
        </div>

        <div className="flex justify-between py-6 text-[0.59rem] tracking-[0.08em] uppercase max-md:flex-col max-md:gap-[0.8rem]">
          <span>
            © 2026 Elite Auto Studio. {t.rights} | <CookieSettingsButton />
          </span>
          <span>{t.motto}</span>
          <a className="inline-flex items-center gap-[0.4rem] text-gold" href="#home">
            {t.backToTop} <ArrowUpIcon aria-hidden="true" size={12} weight="bold" />
          </a>
        </div>

        <div className="flex items-center justify-center gap-[0.6rem] border-t border-rule pt-[1.4rem] pb-8 text-[0.68rem] tracking-[0.12em] uppercase">
          <span className="text-fog">{t.websiteBy}</span>
          <a
            className="inline-flex items-center gap-[0.35rem] border-b border-gold pb-[0.2rem] font-semibold text-ivory transition-colors duration-200 hover:text-gold [&_svg]:text-gold"
            href="https://www.vish.studio"
            rel="noopener noreferrer"
            target="_blank"
          >
            Vish Studio <ArrowUpRightIcon aria-hidden="true" size={13} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
