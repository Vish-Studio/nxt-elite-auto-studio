"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/ssr";
import { Children, type ReactNode, useRef, useState } from "react";

type MobileCarouselProps = { ariaLabel: string; children: ReactNode; className?: string };

const MobileCarousel = ({ ariaLabel, children, className = "" }: MobileCarouselProps) => {
  const slides = Children.toArray(children);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = slides.length;

  const goTo = (index: number) => {
    const nextIndex = (index + total) % total;
    const slide = viewportRef.current?.children[nextIndex] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveIndex(nextIndex);
  };

  if (!total) return null;

  return (
    <div aria-label={ariaLabel} className={`relative mt-10 ${className}`.trim()} role="region">
      <div
        className="grid gap-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:[scrollbar-width:none] max-md:overflow-x-auto max-md:overscroll-x-contain max-md:scroll-smooth max-md:pr-8 max-md:pb-[0.35rem] md:grid-cols-3 max-md:[&::-webkit-scrollbar]:hidden"
        onScroll={(event) => {
          const { clientWidth, scrollLeft, scrollWidth } = event.currentTarget;
          if (scrollWidth > clientWidth)
            setActiveIndex(Math.round((scrollLeft / (scrollWidth - clientWidth)) * (total - 1)));
        }}
        ref={viewportRef}
      >
        {slides.map((slide, index) => (
          <div
            className="max-md:min-w-0 max-md:flex-[0_0_calc(100%_-_2.3rem)] max-md:snap-start max-md:[&>*]:h-full"
            key={index}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="mt-4 hidden items-center justify-between max-md:flex">
        <span className="text-[0.6rem] font-semibold tracking-[0.1em] text-gold">
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <button
            aria-label="Previous item"
            className="inline-flex size-9 items-center justify-center border border-rule"
            onClick={() => goTo(activeIndex - 1)}
            type="button"
          >
            <CaretLeftIcon aria-hidden="true" size={15} weight="bold" />
          </button>
          <button
            aria-label="Next item"
            className="inline-flex size-9 items-center justify-center border border-rule"
            onClick={() => goTo(activeIndex + 1)}
            type="button"
          >
            <CaretRightIcon aria-hidden="true" size={15} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileCarousel;
