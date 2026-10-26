"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { type KeyboardEvent, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider/language-provider";
import { trackEvent } from "@/lib/analytics";

type WorkImage = { alt: string; position?: string; src: string };
export type WorkItem = { after: WorkImage; before: WorkImage; service: string; title: string };
type WorksCarouselProps = { items: WorkItem[] };

const WorksCarousel = ({ items }: WorksCarouselProps) => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = items.length;
  const labels = language === "fr" ? { after: "Après", before: "Avant", next: "Réalisation suivante", previous: "Réalisation précédente", region: "Galerie avant / après", select: "Choisir une réalisation" } : { after: "After", before: "Before", next: "Next project", previous: "Previous project", region: "Before and after gallery", select: "Choose a project" };

  const goTo = (index: number) => {
    const nextIndex = (index + total) % total;
    setActiveIndex(nextIndex);
    trackEvent("works_navigate", { project: items[nextIndex].title });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") goTo(activeIndex - 1);
    if (event.key === "ArrowRight") goTo(activeIndex + 1);
  };

  if (!total) return null;
  const active = items[activeIndex];

  return <section aria-label={labels.region} aria-roledescription="carousel" className="works-carousel" onKeyDown={onKeyDown}>
    <div className="works-carousel__stage" onTouchEnd={(event) => { if (touchStartX.current === null) return; const delta = event.changedTouches[0].clientX - touchStartX.current; if (Math.abs(delta) > 40) goTo(activeIndex + (delta < 0 ? 1 : -1)); touchStartX.current = null; }} onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }}>
      {(["before", "after"] as const).map((side) => <figure className={`works-carousel__panel works-carousel__panel--${side}`} key={side}>
        {items.map((item, index) => <div aria-hidden={index !== activeIndex} className={`works-carousel__slide${index === activeIndex ? " is-active" : ""}`} key={item.title}><Image alt={item[side].alt} fill sizes="(max-width: 760px) 50vw, 620px" src={item[side].src} style={{ objectPosition: item[side].position ?? "center" }} /></div>)}
        <figcaption>{labels[side]}</figcaption>
      </figure>)}
    </div>
    <div className="works-carousel__footer">
      <div aria-live="polite" className="works-carousel__caption" key={activeIndex}><span>{active.service}</span><h3>{active.title}</h3></div>
      <div className="works-carousel__controls"><span>{String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><button aria-label={labels.previous} onClick={() => goTo(activeIndex - 1)} type="button"><CaretLeftIcon aria-hidden="true" size={16} weight="bold" /></button><button aria-label={labels.next} onClick={() => goTo(activeIndex + 1)} type="button"><CaretRightIcon aria-hidden="true" size={16} weight="bold" /></button></div>
    </div>
    <div aria-label={labels.select} className="works-carousel__tabs" role="tablist">{items.map((item, index) => <button aria-label={item.title} aria-selected={index === activeIndex} key={item.title} onClick={() => goTo(index)} role="tab" type="button"><span>{String(index + 1).padStart(2, "0")}</span>{item.service}</button>)}</div>
  </section>;
};

export default WorksCarousel;
