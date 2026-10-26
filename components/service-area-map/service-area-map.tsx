"use client";

import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider/language-provider";
import PrimaryLink from "@/components/primary-link/primary-link";
import { trackEvent } from "@/lib/analytics";
import { type CountryCode, serviceCountries, totalLocalities } from "@/lib/service-areas";

const ServiceAreaMapClient = dynamic(() => import("@/components/service-area-map-client/service-area-map-client"), { ssr: false, loading: () => <div className="coverage-map__loading">Loading service map…</div> });

const copy = {
  en: { eyebrow: "Where we travel", title: ["Three countries,", "one standard."], intro: "We come to you across Luxembourg, the Arlon region of Belgium and the French border towns around Longwy.", all: "All", localities: "localities", tabs: "Choose a country", legend: ["Locality we serve", "Coverage area"], hint: "Select a country to focus", note: "Not listed? Send your address with your booking request and we'll confirm availability.", cta: "Check your address", mapLabel: "Interactive service coverage map of Luxembourg, Belgium and France" },
  fr: { eyebrow: "Zones d'intervention", title: ["Trois pays,", "une même exigence."], intro: "Nous intervenons au Luxembourg, dans la région d'Arlon en Belgique et dans les communes frontalières autour de Longwy.", all: "Tout", localities: "localités", tabs: "Choisir un pays", legend: ["Localité desservie", "Zone couverte"], hint: "Sélectionnez un pays pour zoomer", note: "Votre commune n'est pas listée ? Indiquez votre adresse lors de la réservation et nous confirmerons la disponibilité.", cta: "Vérifier votre adresse", mapLabel: "Carte interactive des zones desservies au Luxembourg, en Belgique et en France" },
};

const ServiceAreaMap = () => {
  const { language } = useLanguage();
  const t = copy[language];
  const [active, setActive] = useState<CountryCode | null>(null);
  const select = (code: CountryCode | null) => { setActive(code); if (code) trackEvent("service_area_country", { country: code }); };
  const activeCountry = serviceCountries.find(({ code }) => code === active);

  return <section aria-labelledby="coverage-title" className="coverage-section pt-0" id="service-area"><div className="coverage-map"><div aria-label={t.mapLabel} className="coverage-map__canvas"><ServiceAreaMapClient active={active} onSelect={select} /><div className="coverage-map__legend"><span><i />{t.legend[0]}</span><span><b />{t.legend[1]}</span><strong>{t.hint}</strong></div></div>
    <aside className="coverage-map__brief"><p>{t.eyebrow}</p><h2 id="coverage-title">{t.title[0]}<br /><span>{t.title[1]}</span></h2><span>{t.intro}</span>
      <div aria-label={t.tabs} className="coverage-tabs" role="tablist"><button aria-controls="coverage-panel" aria-selected={!active} onClick={() => select(null)} role="tab" type="button">{t.all}<small>{totalLocalities}</small></button>{serviceCountries.map(({ code, localities, name }) => <button aria-controls="coverage-panel" aria-selected={active === code} key={code} onClick={() => select(code)} role="tab" type="button">{name[language]}<small>{localities.length}</small></button>)}</div>
      <div className="coverage-panel" id="coverage-panel" role="tabpanel">{activeCountry
        ? <ul className="coverage-localities">{activeCountry.localities.map(({ name }) => <li key={name}>{name}</li>)}</ul>
        : <ul className="coverage-countries">{serviceCountries.map(({ code, localities, name }) => <li key={code}><button onClick={() => select(code)} type="button"><span><b>{name[language]}</b><small>{localities.slice(0, 3).map(({ name: locality }) => locality).join(", ")}…</small></span><em>{localities.length} {t.localities}</em><ArrowRightIcon aria-hidden="true" size={14} weight="bold" /></button></li>)}</ul>}
      </div>
      <p className="coverage-map__areas">{t.note}</p><PrimaryLink href="#contact" track={{ event: "booking_click", params: { location: "service_area" } }}>{t.cta}</PrimaryLink></aside></div></section>;
};

export default ServiceAreaMap;
