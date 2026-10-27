"use client";

import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import dynamic from "next/dynamic";
import { useState } from "react";
import { type Language, useLanguage } from "@/components/language-provider/language-provider";
import PrimaryLink from "@/components/primary-link/primary-link";
import SectionLabel from "@/components/section-label/section-label";
import SectionTitle from "@/components/section-title/section-title";
import { trackEvent } from "@/lib/analytics";
import { type CountryCode, serviceCountries, totalLocalities } from "@/lib/service-areas";

const ServiceAreaMapClient = dynamic(
  () => import("@/components/service-area-map-client/service-area-map-client"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex min-h-180 items-center justify-center text-[0.68rem] tracking-widest uppercase max-md:min-h-120">
        Loading service map…
      </div>
    ),
  },
);

const copy = {
  en: {
    eyebrow: "Where we travel",
    title: ["Three countries,", "one standard."],
    intro:
      "We come to you across Luxembourg, the Arlon region of Belgium and the French border towns around Longwy.",
    all: "All",
    localities: "localities",
    tabs: "Choose a country",
    legend: ["Locality we serve", "Coverage area"],
    hint: "Select a country to focus",
    note: "Not listed? Send your address with your booking request and we'll confirm availability.",
    cta: "Check your address",
    mapLabel: "Interactive service coverage map of Luxembourg, Belgium and France",
  },
  fr: {
    eyebrow: "Zones d'intervention",
    title: ["Trois pays,", "une même exigence."],
    intro:
      "Nous intervenons au Luxembourg, dans la région d'Arlon en Belgique et dans les communes frontalières autour de Longwy.",
    all: "Tout",
    localities: "localités",
    tabs: "Choisir un pays",
    legend: ["Localité desservie", "Zone couverte"],
    hint: "Sélectionnez un pays pour zoomer",
    note: "Votre commune n'est pas listée ? Indiquez votre adresse lors de la réservation et nous confirmerons la disponibilité.",
    cta: "Vérifier votre adresse",
    mapLabel: "Carte interactive des zones desservies au Luxembourg, en Belgique et en France",
  },
} satisfies Record<Language, unknown>;

const tabClass =
  "text-ink-muted hover:text-void aria-selected:border-gold aria-selected:text-void -mb-px inline-flex shrink-0 cursor-pointer gap-[0.4rem] border-0 border-b-2 border-transparent bg-transparent py-3 text-[0.62rem] font-semibold tracking-widest uppercase transition-colors duration-200";

const ServiceAreaMap = () => {
  const { language } = useLanguage();
  const t = copy[language];
  const [active, setActive] = useState<CountryCode | null>(null);
  const activeCountry = serviceCountries.find(({ code }) => code === active);

  const select = (code: CountryCode | null) => {
    setActive(code);
    if (code) trackEvent("service_area_country", { country: code });
  };

  return (
    <section
      aria-labelledby="coverage-title"
      className="max-md:pt-(--section-space)"
      id="service-area"
    >
      <div className="grid min-h-180 w-full grid-cols-[minmax(0,1.45fr)_minmax(22rem,0.75fr)] max-md:flex max-md:flex-col">
        <div
          aria-label={t.mapLabel}
          className="relative isolate min-h-180 overflow-hidden bg-map max-md:min-h-120"
        >
          <ServiceAreaMapClient active={active} onSelect={select} />
          <div className="absolute inset-x-5 bottom-5 z-500 flex items-center gap-6 bg-void/86 px-4 py-[0.85rem] text-[0.6rem] tracking-[0.07em] uppercase max-md:inset-x-4 max-md:flex-wrap max-md:gap-x-[1.1rem] max-md:gap-y-[0.55rem]">
            <span className="flex items-center gap-[0.55rem] text-fog">
              <i className="size-[7px] bg-gold shadow-[0_0_0_3px_var(--color-gold-soft)]" />
              {t.legend[0]}
            </span>
            <span className="flex items-center gap-[0.55rem] text-fog">
              <b className="size-3 rounded-full border border-dashed border-gold bg-gold-soft" />
              {t.legend[1]}
            </span>
            <strong className="ml-auto font-normal max-md:ml-0 max-md:w-full max-md:leading-normal">
              {t.hint}
            </strong>
          </div>
        </div>

        <aside className="flex flex-col bg-paper p-[clamp(2rem,4vw,4.25rem)] text-void max-md:px-[1.3rem] max-md:py-8">
          <SectionLabel className="mb-5" size="sm">
            {t.eyebrow}
          </SectionLabel>
          <SectionTitle
            accent={t.title[1]}
            accentClassName="text-gold"
            size={3}
            id="coverage-title"
            title={t.title[0]}
          />
          <p className="mt-6 mb-0 max-w-88 text-[0.82rem] leading-[1.6] text-ink-muted">
            {t.intro}
          </p>

          <div
            aria-label={t.tabs}
            className="mt-8 flex [scrollbar-width:none] gap-[1.4rem] overflow-x-auto border-b border-dark-rule [&::-webkit-scrollbar]:hidden"
            role="tablist"
          >
            <button
              aria-controls="coverage-panel"
              aria-selected={!active}
              className={tabClass}
              onClick={() => select(null)}
              role="tab"
              type="button"
            >
              {t.all}
              <small className="text-[0.55rem] text-gold">{totalLocalities}</small>
            </button>
            {serviceCountries.map(({ code, localities, name }) => (
              <button
                aria-controls="coverage-panel"
                aria-selected={active === code}
                className={tabClass}
                key={code}
                onClick={() => select(code)}
                role="tab"
                type="button"
              >
                {name[language]}
                <small className="text-[0.55rem] text-gold">{localities.length}</small>
              </button>
            ))}
          </div>

          <div className="mt-[1.1rem] min-h-54 max-md:min-h-0" id="coverage-panel" role="tabpanel">
            {activeCountry ? (
              <ul className="m-0 grid list-none grid-cols-2 gap-x-5 gap-y-[0.6rem] p-0">
                {activeCountry.localities.map(({ name }) => (
                  <li
                    className="flex items-center gap-[0.6rem] text-[0.78rem] before:size-1.5 before:shrink-0 before:bg-gold before:content-['']"
                    key={name}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="m-0 list-none divide-y divide-dark-rule p-0">
                {serviceCountries.map(({ code, localities, name }) => (
                  <li key={code}>
                    <button
                      className="group grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 border-0 bg-transparent py-[0.95rem] text-left text-inherit"
                      onClick={() => select(code)}
                      type="button"
                    >
                      <span>
                        <b className="block text-[1.15rem] font-normal tracking-[-0.02em] transition-colors duration-200 group-hover:text-gold">
                          {name[language]}
                        </b>
                        <small className="mt-1 block truncate text-[0.68rem] text-ink-muted">
                          {localities
                            .slice(0, 3)
                            .map(({ name: locality }) => locality)
                            .join(", ")}
                          …
                        </small>
                      </span>
                      <em className="text-[0.56rem] font-semibold tracking-[0.08em] whitespace-nowrap text-gold uppercase not-italic">
                        {localities.length} {t.localities}
                      </em>
                      <ArrowRightIcon
                        aria-hidden="true"
                        className="text-gold transition-transform duration-200 group-hover:translate-x-[3px]"
                        size={14}
                        weight="bold"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="mt-[1.6rem] mb-7 max-w-88 border-t border-dark-rule pt-[1.1rem] text-[0.7rem] leading-[1.6] text-ink-muted">
            {t.note}
          </p>
          <PrimaryLink
            className="mt-auto self-start"
            href="#contact"
            track={{ event: "booking_click", params: { location: "service_area" } }}
          >
            {t.cta}
          </PrimaryLink>
        </aside>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
