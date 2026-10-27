"use client";

import { ArrowDownIcon } from "@phosphor-icons/react/ssr";
import HeroBackgroundCarousel from "@/components/hero-background-carousel/hero-background-carousel";
import MaskLine from "@/components/mask-line/mask-line";
import PrimaryLink from "@/components/primary-link/primary-link";
import { useLanguage } from "@/components/language-provider/language-provider";

const Hero = () => {
  const { language } = useLanguage();
  const copy =
    language === "fr"
      ? {
          aria: "Le detailing livre chez vous",
          primary: "Detailing",
          secondary: "A votre",
          accent: "porte.",
          lede: "Un lavage auto et un detailing soigne pour le vehicule que vous utilisez au quotidien.",
          cta: "Reserver un creneau",
          explore: "Decouvrir les services",
          lead: "Pense pour la finition.",
          leadBody:
            "Un perimetre clair, un travail soigne et un vehicule dont on prend reellement soin.",
          wash: "Lavage auto",
          washBody: "Soin exterieur sur",
          detail: "Detailing",
          detailBody: "Interieur et exterieur",
          lights: "Phares",
          lightsBody: "Nettoyes et polis",
        }
      : {
          aria: "Detailing delivered to your door",
          primary: "Detailing",
          secondary: "To your",
          accent: "door.",
          lede: "A considered car wash and detailing experience for the vehicle you drive every day.",
          cta: "Dispatch a team",
          explore: "Explore services",
          lead: "Made for the finish.",
          leadBody: "Clear scope, careful work and a vehicle that feels properly looked after.",
          wash: "Car wash",
          washBody: "Safe exterior care",
          detail: "Detailing",
          detailBody: "Inside and out",
          lights: "Headlights",
          lightsBody: "Cleaned and polished",
        };
  return (
    <section className="overflow-hidden bg-void" id="home">
      <div className="relative min-h-[max(720px,100svh)] overflow-hidden max-md:min-h-[760px]">
        <HeroBackgroundCarousel />
        <div className="relative z-4 shell flex min-h-[max(720px,100svh)] flex-col justify-between pt-[calc(var(--topbar-height)+4rem)] pb-[2.4rem] max-md:min-h-[760px] max-md:pt-[calc(var(--topbar-height)+3rem)] max-md:pb-8">
          <div className="relative max-w-[53rem]">
            <h1
              aria-label={copy.aria}
              className="mt-[2.8rem] flex flex-col text-[clamp(5.2rem,10vw,10rem)] leading-[0.78] font-normal tracking-[-0.04em] uppercase max-lg:text-[clamp(5.3rem,12vw,7.2rem)] max-md:mt-8 max-md:text-[clamp(4.6rem,21vw,6.2rem)]"
            >
              <MaskLine>{copy.primary}</MaskLine>
              <MaskLine className="ml-[clamp(2.5rem,15vw,15rem)] max-md:ml-6">
                <span className="font-light">
                  {copy.secondary} <span className="text-gold">{copy.accent}</span>
                </span>
              </MaskLine>
            </h1>
            <p
              className="mt-[2.2rem] max-w-[29rem] text-[clamp(0.9rem,1.15vw,1.1rem)] leading-[1.55] font-light text-fog max-md:mt-[1.7rem] max-md:max-w-[21rem]"
              data-reveal
            >
              {copy.lede}
            </p>
            <div className="mt-[2.2rem] flex flex-wrap items-center gap-[1.6rem]" data-reveal>
              <PrimaryLink
                href="#contact"
                track={{ event: "booking_click", params: { location: "hero" } }}
              >
                {copy.cta}
              </PrimaryLink>
              <a
                className="inline-flex items-center gap-[0.45rem] text-[0.66rem] font-semibold tracking-[0.1em] uppercase"
                href="#services"
              >
                {copy.explore}{" "}
                <ArrowDownIcon aria-hidden="true" className="text-gold" size={13} weight="bold" />
              </a>
            </div>
          </div>
          <div
            className="grid grid-cols-[minmax(15rem,0.85fr)_1.15fr] items-end gap-10 border-t border-rule pt-[1.45rem] max-md:flex max-md:flex-col max-md:items-start max-md:gap-6"
            data-reveal
          >
            <p className="m-0 flex flex-col gap-[0.45rem]">
              <strong className="text-[0.76rem] tracking-[0.1em] uppercase">{copy.lead}</strong>
              <span className="text-[0.78rem] font-light text-fog max-md:leading-[1.45]">
                {copy.leadBody}
              </span>
            </p>
            <div className="grid grid-cols-3 gap-6 max-md:w-full max-md:gap-[0.7rem]">
              {[
                [copy.wash, copy.washBody],
                [copy.detail, copy.detailBody],
                [copy.lights, copy.lightsBody],
              ].map(([title, description]) => (
                <p className="m-0 flex flex-col gap-[0.35rem]" key={title}>
                  <strong className="text-[clamp(1.05rem,1.6vw,1.45rem)] font-normal tracking-[-0.02em] uppercase max-md:text-[0.88rem]">
                    {title}
                  </strong>
                  <span className="text-[0.65rem] leading-[1.4] font-light text-fog max-md:text-[0.58rem]">
                    {description}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
