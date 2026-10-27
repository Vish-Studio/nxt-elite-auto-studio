"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { type KeyboardEvent, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider/language-provider";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type WorkImage = { alt: string; position?: string; src: string };
export type WorkItem = { after: WorkImage; before: WorkImage; service: string; title: string };
type WorksCarouselProps = { items: WorkItem[] };

const SWIPE_THRESHOLD = 40;

const labels = {
  en: {
    after: "After",
    before: "Before",
    next: "Next project",
    previous: "Previous project",
    region: "Before and after gallery",
    select: "Choose a project",
  },
  fr: {
    after: "Après",
    before: "Avant",
    next: "Réalisation suivante",
    previous: "Réalisation précédente",
    region: "Galerie avant / après",
    select: "Choisir une réalisation",
  },
};

const sides = ["before", "after"] as const;
const pad = (value: number) => String(value).padStart(2, "0");

const controlButton =
  "border-rule text-ivory hover:border-gold hover:bg-gold hover:text-void inline-flex size-11 cursor-pointer items-center justify-center border bg-transparent transition-colors duration-200";

/**
 * Before/after pairs shown side by side in a fixed-size frame.
 * Changing project cross-fades the images in place; the frame never resizes.
 */
const WorksCarousel = ({ items }: WorksCarouselProps) => {
  const { language } = useLanguage();
  const t = labels[language];
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = items.length;

  if (!total) return null;
  const active = items[activeIndex];

  const goTo = (index: number) => {
    const nextIndex = (index + total) % total;
    setActiveIndex(nextIndex);
    trackEvent("works_navigate", { project: items[nextIndex].title });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") goTo(activeIndex - 1);
    if (event.key === "ArrowRight") goTo(activeIndex + 1);
  };

  return (
    <section
      aria-label={t.region}
      aria-roledescription="carousel"
      className="mt-16 max-md:mt-12"
      onKeyDown={onKeyDown}
    >
      <div
        className="grid touch-pan-y grid-cols-2 gap-3 max-md:gap-1.5"
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const delta = event.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(delta) > SWIPE_THRESHOLD) goTo(activeIndex + (delta < 0 ? 1 : -1));
          touchStartX.current = null;
        }}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX;
        }}
      >
        {sides.map((side) => (
          <figure
            className="relative m-0 aspect-[4/3.4] overflow-hidden bg-surface max-md:aspect-[3/4]"
            key={side}
          >
            {items.map((item, index) => (
              <div
                aria-hidden={index !== activeIndex}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none",
                  index === activeIndex ? "opacity-100" : "opacity-0",
                )}
                key={item.title}
              >
                <Image
                  alt={item[side].alt}
                  className="object-cover"
                  fill
                  sizes="(max-width: 760px) 50vw, 620px"
                  src={item[side].src}
                  style={{ objectPosition: item[side].position ?? "center" }}
                />
              </div>
            ))}
            <figcaption
              className={cn(
                "absolute top-[1.1rem] left-[1.1rem] z-2 px-3 py-2 text-[0.62rem] font-semibold tracking-[0.12em] uppercase max-md:top-2.5 max-md:left-2.5 max-md:px-[0.55rem] max-md:py-[0.4rem] max-md:text-[0.52rem]",
                side === "after" ? "bg-gold text-void" : "bg-void/78 text-ivory",
              )}
            >
              {t[side]}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-[1.6rem] flex items-end justify-between gap-8 max-md:gap-4">
        <div
          aria-live="polite"
          className="animate-fade-up motion-reduce:animate-none"
          key={activeIndex}
        >
          <span className="text-[0.62rem] font-semibold tracking-[0.12em] text-gold uppercase">
            {active.service}
          </span>
          <h3 className="mt-2 mb-0 text-[clamp(1.5rem,2.4vw,2.2rem)] font-normal tracking-[-0.025em]">
            {active.title}
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="mr-3 text-[0.62rem] font-semibold tracking-widest text-gold max-md:hidden">
            {pad(activeIndex + 1)} / {pad(total)}
          </span>
          <button
            aria-label={t.previous}
            className={controlButton}
            onClick={() => goTo(activeIndex - 1)}
            type="button"
          >
            <CaretLeftIcon aria-hidden="true" size={16} weight="bold" />
          </button>
          <button
            aria-label={t.next}
            className={controlButton}
            onClick={() => goTo(activeIndex + 1)}
            type="button"
          >
            <CaretRightIcon aria-hidden="true" size={16} weight="bold" />
          </button>
        </div>
      </div>

      <div
        aria-label={t.select}
        className="mt-[1.6rem] grid auto-cols-fr grid-flow-col gap-6 border-t border-rule max-md:hidden"
        role="tablist"
      >
        {items.map((item, index) => (
          <button
            aria-label={item.title}
            aria-selected={index === activeIndex}
            className="-mt-px flex cursor-pointer gap-[0.6rem] border-0 border-t-2 border-transparent bg-transparent pt-4 text-left text-[0.72rem] text-fog transition-colors duration-300 hover:text-ivory aria-selected:border-gold aria-selected:text-ivory"
            key={item.title}
            onClick={() => goTo(index)}
            role="tab"
            type="button"
          >
            {item.service}
          </button>
        ))}
      </div>
    </section>
  );
};

export default WorksCarousel;
