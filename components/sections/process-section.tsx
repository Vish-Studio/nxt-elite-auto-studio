"use client";

import { type Language, useLanguage } from "@/components/language-provider/language-provider";
import ProcessShowcase from "@/components/process-showcase/process-showcase";
import SectionHeader from "@/components/section-header/section-header";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=85&w=1600`;

// One photo per step, in step order.
const stepImages = [
  unsplash("1727791712196-8d35b2ba2918"),
  unsplash("1608259243654-70c070e0f6ed"),
  unsplash("1694025909289-fb9dd4660e97"),
  unsplash("1608506375591-b90e1f955e4b"),
];

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
  const { steps, ...header } = copy[language];

  return (
    <section className="bg-paper py-(--section-space) text-void" id="process">
      <div className="shell">
        <SectionHeader {...header} />
        <ProcessShowcase
          steps={steps.map(([title, description], index) => ({
            description,
            image: stepImages[index],
            title,
          }))}
        />
      </div>
    </section>
  );
};

export default ProcessSection;
