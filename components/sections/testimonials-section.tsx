"use client";

import { type Language, useLanguage } from "@/components/language-provider/language-provider";
import SectionHeader from "@/components/section-header/section-header";
import TestimonialCarousel from "@/components/testimonial-carousel/testimonial-carousel";

const copy = {
  en: {
    header: {
      label: "Testimonials",
      title: "Trusted for the",
      accent: "details.",
      description:
        "Feedback from owners and businesses who choose mobile care at their home or workplace.",
    },
    testimonials: [
      {
        quote:
          "The car felt completely refreshed, and I did not have to leave home for the appointment.",
        source: "Private client",
        location: "Brussels",
      },
      {
        quote: "Clear communication, careful work and a finish that exceeded expectations.",
        source: "Private client",
        location: "Flemish Brabant",
      },
      {
        quote: "A convenient service for our company vehicles with consistent attention to detail.",
        source: "Business client",
        location: "Walloon Brabant",
      },
    ],
  },
  fr: {
    header: {
      label: "Témoignages",
      title: "La confiance dans",
      accent: "les détails.",
      description:
        "Les retours de particuliers et d'entreprises qui choisissent notre soin mobile, à domicile ou au travail.",
    },
    testimonials: [
      {
        quote:
          "La voiture était complètement rafraîchie, sans que j'aie besoin de quitter mon domicile.",
        source: "Client particulier",
        location: "Bruxelles",
      },
      {
        quote: "Communication claire, travail soigné et résultat au-delà de mes attentes.",
        source: "Client particulier",
        location: "Brabant flamand",
      },
      {
        quote: "Un service pratique pour nos véhicules d'entreprise.",
        source: "Client professionnel",
        location: "Brabant wallon",
      },
    ],
  },
} satisfies Record<Language, unknown>;

const TestimonialsSection = () => {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="bg-paper py-(--section-space) text-void" id="testimonials">
      <div className="shell">
        <SectionHeader {...t.header} />
        <TestimonialCarousel testimonials={t.testimonials} />
      </div>
    </section>
  );
};

export default TestimonialsSection;
