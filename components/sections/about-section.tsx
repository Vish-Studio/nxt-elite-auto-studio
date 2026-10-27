"use client";

import { BuildingOfficeIcon, HouseLineIcon, VanIcon } from "@phosphor-icons/react/ssr";
import AboutService from "@/components/about-service/about-service";
import { type Language, useLanguage } from "@/components/language-provider/language-provider";
import PrimaryLink from "@/components/primary-link/primary-link";
import Reveal from "@/components/reveal/reveal";
import SectionLabel from "@/components/section-label/section-label";
import SectionTitle from "@/components/section-title/section-title";

const pillarIcons = [HouseLineIcon, BuildingOfficeIcon, VanIcon];

const copy = {
  en: {
    label: "About Elite",
    title: "We come",
    accent: "to you.",
    intro:
      "Elite Auto Studio is a fully mobile detailing team. There's no garage to drive to and no waiting room: we bring the products, tools and know-how to wherever your car is parked, across Luxembourg, Belgium and France.",
    pillars: [
      [
        "At your home",
        "Driveway, garage or street parking. Full interior and exterior care while you get on with your day.",
      ],
      [
        "At your workplace",
        "We detail the interior in your office car park, so your car is ready when your working day ends.",
      ],
      [
        "Fully equipped",
        "Our team arrives with professional products and equipment, ready to work on location.",
      ],
    ],
    servicesCta: "View our services",
    areaCta: "See where we travel",
  },
  fr: {
    label: "À propos",
    title: "Nous venons",
    accent: "à vous.",
    intro:
      "Elite Auto Studio est une équipe de detailing entièrement mobile. Pas de garage où vous rendre ni de salle d'attente : nous apportons les produits, l'équipement et le savoir-faire là où votre voiture est garée, au Luxembourg, en Belgique et en France.",
    pillars: [
      [
        "À domicile",
        "Allée, garage ou stationnement dans la rue. Un soin intérieur et extérieur complet pendant que vous vaquez à vos occupations.",
      ],
      [
        "Sur votre lieu de travail",
        "Nous nettoyons l'intérieur sur le parking de votre bureau : votre voiture est prête à la fin de votre journée.",
      ],
      [
        "Entièrement équipés",
        "Notre équipe arrive avec des produits et un équipement professionnels, prête à intervenir sur place.",
      ],
    ],
    servicesCta: "Voir nos services",
    areaCta: "Voir nos zones d'intervention",
  },
} satisfies Record<Language, unknown>;

const AboutSection = () => {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="bg-paper py-(--section-space) text-void" id="about">
      <div className="shell">
        <Reveal className="mx-auto flex max-w-208 flex-col items-center text-center">
          <SectionLabel className="mb-7">{t.label}</SectionLabel>
          <SectionTitle
            accent={t.accent}
            accentClassName="text-gold"
            accentOnNewLine={false}
            className="text-[clamp(3.4rem,6.4vw,7rem)] leading-[0.9] max-md:text-[clamp(2.6rem,12vw,3.4rem)]"
            title={t.title}
          />
          <p className="mt-8 mb-0 max-w-160 text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.7] font-light text-ink-muted">
            {t.intro}
          </p>
        </Reveal>

        <Reveal
          className="mt-18 grid grid-cols-3 divide-x divide-dark-rule border-y border-dark-rule max-md:mt-12 max-md:grid-cols-1 max-md:divide-x-0 max-md:divide-y"
          delay={120}
        >
          {t.pillars.map(([title, description], index) => {
            const Icon = pillarIcons[index];
            return (
              <AboutService
                description={description}
                icon={<Icon size={24} />}
                key={title}
                title={title}
              />
            );
          })}
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap justify-center gap-3 max-md:flex-col" delay={180}>
          <PrimaryLink href="#services">{t.servicesCta}</PrimaryLink>
          <PrimaryLink href="#service-area" variant="outline">
            {t.areaCta}
          </PrimaryLink>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;
