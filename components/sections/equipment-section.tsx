"use client";

import type { Icon } from "@phosphor-icons/react";
import {
  DropIcon,
  FlaskIcon,
  SparkleIcon,
  ThermometerHotIcon,
  TowelIcon,
  WindIcon,
} from "@phosphor-icons/react/ssr";
import { type Language, useLanguage } from "@/components/language-provider/language-provider";
import SectionHeader from "@/components/section-header/section-header";

// Same order as `copy.items` below.
const icons: Icon[] = [DropIcon, ThermometerHotIcon, WindIcon, SparkleIcon, TowelIcon, FlaskIcon];

const copy = {
  en: {
    header: {
      label: "Tools and equipment",
      title: "Professional kit,",
      accent: "brought to you.",
      description:
        "Everything the job needs arrives with the team, so the result is the same wherever your car is parked.",
    },
    usedFor: "Used for",
    items: [
      [
        "Foam lance and pressure washer",
        "A thick foam pre-wash loosens dirt before any hand contact, to protect the paintwork.",
        "Exterior cleaning",
      ],
      [
        "Steam cleaner",
        "Lifts grime from seats, trim and vents without soaking the fabric.",
        "Interior cleaning",
      ],
      [
        "Wet and dry extractor",
        "Pulls dirt and moisture out of carpets and upholstery.",
        "Interior cleaning",
      ],
      [
        "Dual-action polisher",
        "Brings clarity back to cloudy headlights and removes light marks from glass.",
        "Headlights and windshield",
      ],
      [
        "Microfibre cloths and soft brushes",
        "Separate, clean tools for paint, glass and interior, so nothing gets scratched.",
        "Every service",
      ],
      [
        "Professional cleaners and protectants",
        "Products chosen for each surface, from leather to glass to engine bay.",
        "Every service",
      ],
    ],
  },
  fr: {
    header: {
      label: "Outils et équipement",
      title: "Un équipement professionnel,",
      accent: "apporté chez vous.",
      description:
        "Tout ce qu'il faut arrive avec l'équipe : le résultat est le même, où que votre voiture soit garée.",
    },
    usedFor: "Utilisé pour",
    items: [
      [
        "Lance à mousse et nettoyeur haute pression",
        "Un pré-lavage à la mousse épaisse décolle la saleté avant tout contact, pour protéger la carrosserie.",
        "Nettoyage extérieur",
      ],
      [
        "Nettoyeur vapeur",
        "Décolle la saleté des sièges, des garnitures et des aérations sans détremper le tissu.",
        "Nettoyage intérieur",
      ],
      [
        "Aspirateur eau et poussière",
        "Extrait la saleté et l'humidité des tapis et des sièges.",
        "Nettoyage intérieur",
      ],
      [
        "Polisseuse orbitale",
        "Redonne de la clarté aux phares ternis et retire les marques légères sur les vitres.",
        "Phares et pare-brise",
      ],
      [
        "Chiffons microfibres et brosses douces",
        "Des outils propres et distincts pour la peinture, les vitres et l'habitacle, sans rayures.",
        "Tous les services",
      ],
      [
        "Produits d'entretien et de protection professionnels",
        "Des produits adaptés à chaque surface, du cuir aux vitres en passant par le compartiment moteur.",
        "Tous les services",
      ],
    ],
  },
} satisfies Record<Language, unknown>;

const EquipmentSection = () => {
  const { language } = useLanguage();
  const { header, items, usedFor } = copy[language];

  return (
    <section className="bg-ivory py-(--section-space) text-void" id="equipment">
      <div className="shell">
        <SectionHeader {...header} />
        <ul className="m-0 mt-16 grid list-none grid-cols-3 gap-px bg-dark-rule p-0 max-lg:grid-cols-2 max-md:mt-12 max-md:grid-cols-1">
          {items.map(([name, description, service], index) => {
            const ItemIcon = icons[index];
            return (
              <li className="flex flex-col bg-ivory p-8 max-md:p-6" data-reveal key={index}>
                <ItemIcon aria-hidden="true" className="text-gold" size={30} weight="light" />
                <h3 className="mt-8 mb-3 text-[1.3rem] leading-tight font-normal tracking-[-0.02em] max-md:mt-6">
                  {name}
                </h3>
                <p className="m-0 text-[0.9rem] leading-[1.6] font-light text-ink-muted">
                  {description}
                </p>
                <p className="mt-auto pt-6 text-[0.75rem] font-medium text-void">
                  <span className="font-light text-ink-muted">{usedFor}: </span>
                  {service}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default EquipmentSection;
