"use client";

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
    <section
      className="shell grid grid-cols-[0.8fr_1.2fr] gap-24 py-(--section-space) max-md:flex max-md:flex-col max-md:gap-12"
      id="faq"
    >
      <div>
        <SectionLabel className="mb-7">{t.label}</SectionLabel>
        <SectionTitle
          accent={t.accent}
          className="text-[clamp(3.6rem,6vw,6.7rem)] leading-[0.88] max-md:text-[clamp(3rem,13vw,4.5rem)]"
          title={t.title}
        />
      </div>
      <div className="grid gap-3">
        {t.faqs.map(([question, answer]) => (
          <FaqItem answer={answer} key={question} question={question} />
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
