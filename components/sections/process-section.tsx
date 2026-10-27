"use client";

import { type Language, useLanguage } from "@/components/language-provider/language-provider";
import ProcessStep from "@/components/process-step/process-step";
import ProcessStepGallery from "@/components/process-step-gallery/process-step-gallery";
import SectionLabel from "@/components/section-label/section-label";
import SectionTitle from "@/components/section-title/section-title";

const copy = {
  en: {
    label: "How it works",
    title: "Four simple",
    accent: "steps.",
    description: "Clear communication, careful work and no unnecessary waiting rooms.",
    steps: [
      ["Tell us about your car", "Share the vehicle, location and result you are looking for."],
      [
        "Choose a time and place",
        "We confirm the right service and arrange a convenient appointment.",
      ],
      [
        "We detail on location",
        "Our mobile setup arrives ready with the products and equipment needed.",
      ],
      [
        "Enjoy the finish",
        "We complete a final inspection before handing your refreshed vehicle back.",
      ],
    ],
  },
  fr: {
    label: "Comment ça marche",
    title: "Quatre étapes",
    accent: "simples.",
    description:
      "Une communication claire, un travail soigné et aucun temps perdu en salle d'attente.",
    steps: [
      [
        "Parlez-nous de votre véhicule",
        "Indiquez le véhicule, le lieu et le résultat que vous recherchez.",
      ],
      [
        "Choisissez un créneau et un lieu",
        "Nous confirmons le bon service et organisons un rendez-vous pratique.",
      ],
      [
        "Nous intervenons sur place",
        "Notre équipe mobile arrive avec les produits et l'équipement nécessaires.",
      ],
      [
        "Profitez du résultat",
        "Nous réalisons un contrôle final avant de vous restituer votre véhicule.",
      ],
    ],
  },
} satisfies Record<Language, unknown>;

const ProcessSection = () => {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="bg-paper py-(--section-space) text-void" id="process">
      <div className="shell grid grid-cols-[0.8fr_1.2fr] gap-28 max-md:flex max-md:flex-col max-md:gap-8">
        <div className="sticky top-[calc(var(--topbar-height)+3rem)] self-start max-md:static">
          <SectionLabel className="mb-7">{t.label}</SectionLabel>
          <SectionTitle
            accent={t.accent}
            className="mb-7 text-[clamp(3rem,4vw,4.8rem)] leading-[0.94] max-md:text-[clamp(3rem,13vw,4.5rem)]"
            title={t.title}
          />
          <p className="max-w-76 text-[0.96rem] leading-[1.55] font-light text-ink-muted">
            {t.description}
          </p>
        </div>
        <div className="grid gap-3">
          {t.steps.map(([title, description], index) => (
            <ProcessStep
              description={description}
              key={title}
              number={String(index + 1).padStart(2, "0")}
              title={title}
            />
          ))}
        </div>
      </div>
      <ProcessStepGallery />
    </section>
  );
};

export default ProcessSection;
