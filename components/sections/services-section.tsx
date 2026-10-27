"use client";

import {
  BroomIcon,
  CarProfileIcon,
  DropIcon,
  SparkleIcon,
  TagIcon,
} from "@phosphor-icons/react/ssr";
import { type Language, useLanguage } from "@/components/language-provider/language-provider";
import MediaCard from "@/components/media-card/media-card";
import Reveal from "@/components/reveal/reveal";
import SectionHeader from "@/components/section-header/section-header";
import ServiceCard from "@/components/service-card/service-card";

// Icons follow the service order, so they stay correct in every language.
const serviceIcons = [DropIcon, BroomIcon, CarProfileIcon, SparkleIcon, TagIcon];

const mediaImages = [
  {
    src: "https://images.unsplash.com/photo-1605437241278-c1806d14a4d9?fit=crop&fm=webp&q=80&w=1200",
    unoptimized: true,
    variant: "large" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1708805282683-50a060eba80f?fit=crop&fm=webp&q=80&w=1200",
    variant: "small" as const,
  },
];

const copy = {
  en: {
    label: "Our services",
    title: "Everything your car",
    accent: "needs.",
    description:
      "From regular upkeep to complete transformation, every service is adapted to the condition of your vehicle.",
    services: [
      [
        "Car Wash",
        "A safe exterior wash that refreshes paintwork, glass, wheels and finishing details.",
      ],
      [
        "Interior Detail",
        "A deep reset for seats, carpets, trim and the surfaces you use every day.",
      ],
      [
        "Full Detail",
        "A complete interior-and-exterior treatment for a vehicle that needs a proper reset.",
      ],
      ["Headlight Polish", "Cleaning and polishing for clearer headlight lenses."],
      [
        "Sale Preparation",
        "Presentation-led care that helps your vehicle make the right first impression.",
      ],
    ],
    media: [
      ["Interior care", "A cabin reset"],
      ["Wheel detail", "Care through every detail"],
    ],
  },
  fr: {
    label: "Nos services",
    title: "Tout ce dont votre voiture",
    accent: "a besoin.",
    description:
      "De l'entretien régulier à la remise à neuf complète, chaque service est adapté à l'état de votre véhicule.",
    services: [
      [
        "Lavage auto",
        "Un lavage extérieur sûr pour la carrosserie, les vitres, les roues et les finitions.",
      ],
      [
        "Detailing intérieur",
        "Un nettoyage profond des sièges, tapis, garnitures et surfaces du quotidien.",
      ],
      [
        "Detailing complet",
        "Un traitement intérieur et extérieur complet pour donner un vrai coup de neuf.",
      ],
      ["Polissage des phares", "Nettoyage et polissage pour des optiques plus nets."],
      [
        "Préparation à la vente",
        "Un soin axé sur la présentation pour une meilleure première impression.",
      ],
    ],
    media: [
      ["Soin intérieur", "Un habitacle remis à neuf"],
      ["Détail des roues", "Une attention aux détails"],
    ],
  },
} satisfies Record<Language, unknown>;

const ServicesSection = () => {
  const { language } = useLanguage();
  const { services, media, ...header } = copy[language];

  return (
    <section className="bg-paper py-(--section-space) text-void" id="services">
      <div className="shell">
        <SectionHeader {...header} accentOnNewLine={false} />
        <Reveal className="mt-16 grid grid-cols-5 gap-4 max-lg:grid-cols-2 max-md:mt-12 max-md:grid-cols-1">
          {services.map(([title, description], index) => (
            <ServiceCard
              description={description}
              icon={serviceIcons[index]}
              key={title}
              number={String(index + 1).padStart(2, "0")}
              title={title}
            />
          ))}
        </Reveal>
        <Reveal className="mt-4 grid grid-cols-[1.35fr_0.65fr] gap-4 max-md:grid-cols-1">
          {mediaImages.map((image, index) => (
            <MediaCard {...image} key={image.src} label={media[index][0]} title={media[index][1]} />
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default ServicesSection;
