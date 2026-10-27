"use client";

import { type Language, useLanguage } from "@/components/language-provider/language-provider";
import PrimaryLink from "@/components/primary-link/primary-link";
import SectionLabel from "@/components/section-label/section-label";
import SectionTitle from "@/components/section-title/section-title";

const copy = {
  en: {
    title: "Ready for a",
    accent: "better finish?",
    description: "Tell us about your vehicle and we'll recommend the right service.",
    cta: "Request a booking",
  },
  fr: {
    title: "Prêt pour une",
    accent: "meilleure finition ?",
    description: "Parlez-nous de votre véhicule : nous vous recommanderons le service adapté.",
    cta: "Demander une réservation",
  },
} satisfies Record<Language, unknown>;

const ContactSection = () => {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="bg-surface py-(--section-space)" id="contact">
      <div className="shell grid grid-cols-[1.15fr_0.85fr] items-end gap-12 max-md:flex max-md:flex-col max-md:items-start">
        <div>
          <SectionLabel>Elite Auto Studio</SectionLabel>
          <SectionTitle accent={t.accent} className="mt-[1.6rem]" size={1} title={t.title} />
        </div>
        <div className="flex flex-col gap-8">
          <p className="m-0 max-w-100 text-base leading-[1.55] font-light text-fog">
            {t.description}
          </p>
          <PrimaryLink
            className="self-start"
            href="mailto:hello@eliteautostudio.be"
            track={{ event: "booking_click", params: { location: "contact_band" } }}
          >
            {t.cta}
          </PrimaryLink>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
