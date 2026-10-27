"use client";

import { type Language, useLanguage } from "@/components/language-provider/language-provider";
import SectionHeader from "@/components/section-header/section-header";
import WorksCarousel, { type WorkItem } from "@/components/works-carousel/works-carousel";
import { publicAsset } from "@/lib/public-asset";

const work = (path: string) => publicAsset(`/works/${path}`);

const images = {
  boot: { before: work("back-views/back-before.jpeg"), after: work("back-views/back-after.jpeg") },
  engine: {
    before: work("front-views/front-before.jpeg"),
    after: work("front-views/front-after.jpeg"),
  },
  headlightUnit: {
    before: work("headlights/headlight-1-before.jpeg"),
    after: work("headlights/headlight-1-after.jpeg"),
  },
  headlightLens: {
    before: work("headlights/headlight-before.jpeg"),
    after: work("headlights/headlight-after.jpeg"),
  },
};

const works: Record<Language, WorkItem[]> = {
  en: [
    {
      service: "Interior cleaning",
      title: "Boot deep clean",
      before: { alt: "Muddy car boot before cleaning", src: images.boot.before },
      after: { alt: "The same boot after a deep clean", src: images.boot.after },
    },
    {
      service: "Under-hood cleaning",
      title: "Engine bay refresh",
      before: { alt: "Dusty engine bay before cleaning", src: images.engine.before },
      after: { alt: "The same engine bay after cleaning", src: images.engine.after },
    },
    {
      service: "Headlight renovation",
      title: "Cloudy headlight restored",
      before: { alt: "Cloudy, yellowed headlight unit", src: images.headlightUnit.before },
      after: {
        alt: "The same headlight unit, clear after renovation",
        src: images.headlightUnit.after,
      },
    },
    {
      service: "Headlight renovation",
      title: "Oxidised lens brought back",
      before: { alt: "Oxidised headlight lens on the car", src: images.headlightLens.before },
      after: {
        alt: "The same headlight lens, clear after renovation",
        src: images.headlightLens.after,
      },
    },
  ],
  fr: [
    {
      service: "Nettoyage intérieur",
      title: "Coffre remis à neuf",
      before: { alt: "Coffre boueux avant le nettoyage", src: images.boot.before },
      after: { alt: "Le même coffre après un nettoyage en profondeur", src: images.boot.after },
    },
    {
      service: "Nettoyage sous le capot",
      title: "Compartiment moteur rafraîchi",
      before: {
        alt: "Compartiment moteur poussiéreux avant le nettoyage",
        src: images.engine.before,
      },
      after: { alt: "Le même compartiment moteur après le nettoyage", src: images.engine.after },
    },
    {
      service: "Rénovation des phares",
      title: "Phare terni restauré",
      before: { alt: "Phare terni et jauni", src: images.headlightUnit.before },
      after: { alt: "Le même phare, clair après rénovation", src: images.headlightUnit.after },
    },
    {
      service: "Rénovation des phares",
      title: "Optique oxydée ravivée",
      before: { alt: "Optique de phare oxydée sur le véhicule", src: images.headlightLens.before },
      after: { alt: "La même optique, claire après rénovation", src: images.headlightLens.after },
    },
  ],
};

const copy = {
  en: {
    label: "Our works",
    title: "Real cars.",
    accent: "Real results.",
    description:
      "Before and after photos from our recent jobs. Step through to see each transformation.",
  },
  fr: {
    label: "Nos réalisations",
    title: "De vraies voitures.",
    accent: "De vrais résultats.",
    description:
      "Photos avant / après de nos récentes interventions. Faites défiler pour voir chaque transformation.",
  },
} satisfies Record<Language, unknown>;

const WorksSection = () => {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="py-(--section-space)" id="works">
      <div className="shell">
        <SectionHeader {...t} tone="dark" />
        <div>
          <WorksCarousel items={works[language]} />
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
