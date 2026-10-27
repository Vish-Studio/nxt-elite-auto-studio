"use client";

import Image from "next/image";
import FaqItem from "@/components/faq-item/faq-item";
import { type Language, useLanguage } from "@/components/language-provider/language-provider";
import SectionLabel from "@/components/section-label/section-label";
import SectionTitle from "@/components/section-title/section-title";

const copy = {
  en: {
    label: "Questions, answered",
    title: "Before we",
    accent: "get started.",
    faqs: [
      [
        "Do I need to provide water or electricity?",
        "Tell us what is available when booking. We will confirm the setup required.",
      ],
      ["How long does a detail take?", "Most appointments take between two and five hours."],
      [
        "Where in Belgium do you operate?",
        "We primarily serve Brussels, Flemish Brabant and Walloon Brabant.",
      ],
      ["Can you detail my car at work?", "Yes, with permission and enough safe working space."],
    ],
  },
  fr: {
    label: "Vos questions",
    title: "Avant de",
    accent: "commencer.",
    faqs: [
      [
        "Dois-je fournir de l'eau ou de l'électricité ?",
        "Indiquez-nous ce qui est disponible lors de la réservation.",
      ],
      [
        "Combien de temps dure un detailing ?",
        "La plupart des rendez-vous durent entre deux et cinq heures.",
      ],
      [
        "Où intervenez-vous en Belgique ?",
        "Nous desservons Bruxelles, le Brabant flamand et le Brabant wallon.",
      ],
      [
        "Pouvez-vous intervenir sur mon lieu de travail ?",
        "Oui, avec autorisation et un espace de travail sûr.",
      ],
    ],
  },
} satisfies Record<Language, unknown>;

const FaqSection = () => {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="relative isolate overflow-hidden py-(--section-space)" id="faq">
      <Image
        alt=""
        className="-z-20 object-cover"
        fill
        sizes="100vw"
        src="https://images.unsplash.com/photo-1605164598708-25701594473e?auto=format&fit=crop&q=80&w=2200"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-void/95 via-void/85 to-void/60 max-md:bg-void/80 max-md:bg-none" />
      <div className="shell grid grid-cols-[0.8fr_1.2fr] gap-24 max-md:flex max-md:flex-col max-md:gap-12">
        <div>
          <SectionLabel className="mb-7">{t.label}</SectionLabel>
          <SectionTitle accent={t.accent} size={2} title={t.title} />
        </div>
        <div className="grid content-start gap-3">
          {t.faqs.map(([question, answer], index) => (
            <FaqItem answer={answer} key={index} question={question} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
