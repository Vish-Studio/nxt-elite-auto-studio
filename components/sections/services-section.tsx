"use client";

import { type Language, useLanguage } from "@/components/language-provider/language-provider";
import MobileCarousel from "@/components/mobile-carousel/mobile-carousel";
import SectionHeader from "@/components/section-header/section-header";
import ServiceCard from "@/components/service-card/service-card";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?fit=crop&fm=webp&q=80&w=1000`;

// Same order as the price packages: Essentiel, Premium, Prestige.
const serviceImages = [
  { src: unsplash("1605437241278-c1806d14a4d9"), unoptimized: true },
  { src: unsplash("1708805282683-50a060eba80f") },
  { src: unsplash("1761312834150-4beefff097a7") },
];

const copy = {
  en: {
    header: {
      label: "Our services",
      title: "Everything your car",
      accent: "needs.",
      description:
        "Three core services, all carried out where your car is parked, plus specialist treatments for the details.",
    },
    services: [
      {
        title: "Interior cleaning",
        description: "Seats, carpets, trim and interior glass, vacuumed and cleaned by hand.",
        alt: "Leather seats and dashboard of a cleaned car interior",
        link: "See the Essentiel package",
      },
      {
        title: "Exterior cleaning",
        description: "A careful hand wash for paintwork, wheels, tyres and glass.",
        alt: "Gloved hand brushing a car tyre",
        link: "See the Premium package",
      },
      {
        title: "Full cleaning",
        description: "Interior and exterior in one visit, finished with a final inspection.",
        alt: "Black car covered in wash foam",
        link: "See the Prestige package",
      },
    ],
    treatments: {
      title: "Specialist treatments",
      note: "Add these to a package during the same appointment. Each package below lists the treatments it can include, with prices.",
      items: [
        [
          "Headlight renovation",
          "Restores cloudy, yellowed lenses so your lights shine clearly again.",
        ],
        ["Windshield polish", "Removes film and light marks for a clearer view of the road."],
        ["Under-hood cleaning", "Lifts dust and grime from the engine bay."],
        ["Odour extraction", "Treats lingering smells in the cabin at the source."],
        ["Pet hair removal", "Lifts embedded hair from seats, carpets and the boot."],
      ],
    },
  },
  fr: {
    header: {
      label: "Nos services",
      title: "Tout ce dont votre voiture",
      accent: "a besoin.",
      description:
        "Trois services principaux, réalisés là où votre voiture est garée, et des traitements spécifiques pour les détails.",
    },
    services: [
      {
        title: "Nettoyage intérieur",
        description:
          "Sièges, tapis, garnitures et vitres intérieures, aspirés et nettoyés à la main.",
        alt: "Sièges en cuir et tableau de bord d'un habitacle nettoyé",
        link: "Voir le forfait Essentiel",
      },
      {
        title: "Nettoyage extérieur",
        description:
          "Un lavage soigné à la main pour la carrosserie, les jantes, les pneus et les vitres.",
        alt: "Main gantée brossant un pneu",
        link: "Voir le forfait Premium",
      },
      {
        title: "Nettoyage complet",
        description:
          "L'intérieur et l'extérieur en une seule intervention, avec un contrôle final.",
        alt: "Voiture noire couverte de mousse de lavage",
        link: "Voir le forfait Prestige",
      },
    ],
    treatments: {
      title: "Traitements spécifiques",
      note: "Ajoutez-les à un forfait lors du même rendez-vous. Chaque forfait ci-dessous indique les traitements disponibles et leurs prix.",
      items: [
        ["Rénovation des phares", "Redonne de la clarté aux optiques ternies et jaunies."],
        [
          "Polissage du pare-brise",
          "Élimine le voile et les marques légères pour une meilleure visibilité.",
        ],
        ["Nettoyage sous le capot", "Retire la poussière et la saleté du compartiment moteur."],
        ["Élimination des odeurs", "Traite à la source les odeurs persistantes dans l'habitacle."],
        ["Poils d'animaux", "Retire les poils incrustés des sièges, des tapis et du coffre."],
      ],
    },
  },
} satisfies Record<Language, unknown>;

const ServicesSection = () => {
  const { language } = useLanguage();
  const { header, services, treatments } = copy[language];

  return (
    <section className="bg-paper py-(--section-space) text-void" id="services">
      <div className="shell">
        <SectionHeader {...header} accentOnNewLine={false} />

        <MobileCarousel ariaLabel={header.label} className="mt-16 max-md:mt-12" tone="light">
          {services.map((service, index) => (
            <ServiceCard
              description={service.description}
              image={{ ...serviceImages[index], alt: service.alt }}
              key={serviceImages[index].src}
              linkLabel={service.link}
              title={service.title}
            />
          ))}
        </MobileCarousel>

        <div className="mt-24 grid grid-cols-[0.8fr_1.2fr] gap-16 max-md:mt-16 max-md:grid-cols-1 max-md:gap-6">
          <div>
            <h3
              className="m-0 text-[clamp(1.6rem,2.4vw,2.2rem)] font-normal tracking-[-0.03em]"
              data-reveal
            >
              {treatments.title}
            </h3>
            <p
              className="mt-4 mb-0 max-w-80 text-[0.92rem] leading-[1.6] font-light text-ink-muted"
              data-reveal
            >
              {treatments.note}
            </p>
          </div>
          <dl className="m-0 divide-y divide-dark-rule border-y border-dark-rule">
            {treatments.items.map(([name, description], index) => (
              <div
                className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-6 py-5 max-md:grid-cols-1 max-md:gap-1"
                data-reveal
                key={index}
              >
                <dt className="font-display text-[1.15rem] tracking-[-0.02em]">{name}</dt>
                <dd className="m-0 text-[0.88rem] leading-[1.55] font-light text-ink-muted">
                  {description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
