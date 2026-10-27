"use client";

import { type Language, useLanguage } from "@/components/language-provider/language-provider";
import MobileCarousel from "@/components/mobile-carousel/mobile-carousel";
import PackageCard from "@/components/package-card/package-card";
import ParallaxBackground from "@/components/parallax-background/parallax-background";
import SectionHeader from "@/components/section-header/section-header";
import { formatPrice } from "@/lib/format-price";

type Localized = Record<Language, string>;
type Package = {
  addOns: Array<{ price: number; title: Localized }>;
  description: Localized;
  features: Record<Language, string[]>;
  name: string;
  price: number;
  title: Localized;
};

// Prices live in one place so every language always shows the same amounts.
const packages: Package[] = [
  {
    name: "Essentiel",
    price: 100,
    title: { en: "Interior cleaning", fr: "Nettoyage intérieur" },
    description: {
      en: "A thorough reset for the cabin.",
      fr: "Un nettoyage complet de l'habitacle.",
    },
    features: {
      en: [
        "Vacuum and surface clean",
        "Seats, carpets and trim",
        "Interior windows and finishing touches",
      ],
      fr: [
        "Aspiration et surfaces",
        "Sièges, tapis et garnitures",
        "Vitres intérieures et finition",
      ],
    },
    addOns: [
      { price: 8, title: { en: "Pet hair", fr: "Poils d'animaux" } },
      { price: 10, title: { en: "Excessive leftovers", fr: "Restes excessifs" } },
      { price: 15, title: { en: "Excessive mud", fr: "Boue excessive" } },
      { price: 65, title: { en: "Bad odour extraction", fr: "Élimination des mauvaises odeurs" } },
    ],
  },
  {
    name: "Premium",
    price: 100,
    title: { en: "Exterior cleaning", fr: "Nettoyage extérieur" },
    description: {
      en: "A complete hand-finished exterior clean.",
      fr: "Un soin extérieur complet à la main.",
    },
    features: {
      en: ["Hand wash", "Wheels and tyres", "Exterior glass and finishing touches"],
      fr: ["Lavage à la main", "Jantes et pneus", "Vitres et finitions extérieures"],
    },
    addOns: [
      {
        price: 90,
        title: { en: "Headlight renovation (pair)", fr: "Rénovation des phares (paire)" },
      },
      { price: 100, title: { en: "Windshield polish", fr: "Polissage du pare-brise" } },
      { price: 25, title: { en: "Under-hood cleaning", fr: "Nettoyage sous le capot" } },
      { price: 20, title: { en: "Rat treatment", fr: "Traitement anti-rongeurs" } },
    ],
  },
  {
    name: "Prestige",
    price: 130,
    title: { en: "Full cleaning", fr: "Nettoyage complet" },
    description: {
      en: "A complete inside-and-out appointment.",
      fr: "Un rendez-vous intérieur et extérieur complet.",
    },
    features: {
      en: [
        "Essentiel interior clean included",
        "Premium exterior clean included",
        "Final inspection",
      ],
      fr: [
        "Nettoyage intérieur Essentiel inclus",
        "Nettoyage extérieur Premium inclus",
        "Contrôle final",
      ],
    },
    addOns: [],
  },
];

const copy = {
  en: {
    label: "Price packages",
    title: "Clear pricing.",
    accent: "At your door.",
    description:
      "Every package is carried out at your home or workplace. No drop-off, no waiting around.",
  },
  fr: {
    label: "Forfaits",
    title: "Des prix clairs.",
    accent: "Chez vous.",
    description:
      "Chaque forfait est réalisé chez vous ou sur votre lieu de travail : aucun déplacement, aucune attente.",
  },
} satisfies Record<Language, unknown>;

const PricingSection = () => {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="relative isolate overflow-hidden py-(--section-space)" id="pricing">
      <ParallaxBackground
        overlayClassName="bg-linear-to-r from-void/75 via-void/55 to-void/40 max-md:bg-void/60 max-md:bg-none"
        src="https://images.unsplash.com/photo-1608506375591-b90e1f955e4b?auto=format&fit=crop&q=88&w=2200"
      />
      <div className="shell">
        <SectionHeader {...t} tone="dark" />
        <MobileCarousel ariaLabel={t.label}>
          {packages.map((pkg) => (
            <PackageCard
              addOns={pkg.addOns.map((addOn) => ({
                price: formatPrice(addOn.price, language),
                title: addOn.title[language],
              }))}
              description={pkg.description[language]}
              features={pkg.features[language]}
              key={pkg.name}
              name={pkg.name}
              price={formatPrice(pkg.price, language)}
              title={pkg.title[language]}
            />
          ))}
        </MobileCarousel>
      </div>
    </section>
  );
};

export default PricingSection;
