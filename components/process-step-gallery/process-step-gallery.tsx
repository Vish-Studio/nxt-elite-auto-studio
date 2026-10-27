"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type ProcessSlide = { description: string; number: string; src: string; title: string };

const SLIDE_DURATION = 6000;

const slides: ProcessSlide[] = [
  {
    number: "01",
    title: "Tell us about your car",
    description: "Share the vehicle, location and result you are looking for.",
    src: "https://images.unsplash.com/photo-1727791712196-8d35b2ba2918?auto=format&fit=crop&q=85&w=2200",
  },
  {
    number: "02",
    title: "Choose a time and place",
    description: "We confirm the right service and arrange a convenient appointment.",
    src: "https://images.unsplash.com/photo-1608259243654-70c070e0f6ed?auto=format&fit=crop&q=85&w=2200",
  },
  {
    number: "03",
    title: "We detail on location",
    description: "Our mobile setup arrives ready with the products and equipment needed.",
    src: "https://images.unsplash.com/photo-1694025909289-fb9dd4660e97?auto=format&fit=crop&q=85&w=2200",
  },
  {
    number: "04",
    title: "Enjoy the finish",
    description: "We complete a final inspection before handing your refreshed vehicle back.",
    src: "https://images.unsplash.com/photo-1608506375591-b90e1f955e4b?auto=format&fit=crop&q=85&w=2200",
  },
];

const ProcessStepGallery = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const active = slides[activeSlide];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      SLIDE_DURATION,
    );
    return () => window.clearTimeout(timer);
  }, [activeSlide]);

  return (
    <section aria-label="Four-step detailing process gallery">
      <div className="relative min-h-140 overflow-hidden text-ivory max-md:min-h-105">
        {slides.map((slide, index) => (
          <div
            aria-hidden={index !== activeSlide}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              index === activeSlide ? "opacity-100" : "opacity-0",
            )}
            key={slide.number}
          >
            <Image
              alt={slide.title}
              className="object-cover"
              fill
              preload={index === 0}
              sizes="(max-width: 760px) calc(100vw - 40px), 1240px"
              src={slide.src}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-void/90 to-void/8 to-68%" />
        <div className="absolute bottom-[1.6rem] left-[1.6rem] z-2 max-w-116">
          <span className="text-[0.65rem] font-semibold tracking-widest text-gold">
            {active.number} / {String(slides.length).padStart(2, "0")}
          </span>
          <h3 className="my-3 text-[clamp(1.8rem,3vw,3rem)] leading-[1.05] font-normal tracking-[-0.03em]">
            {active.title}
          </h3>
          <p className="m-0 text-[0.88rem] leading-[1.55] font-light text-fog">
            {active.description}
          </p>
        </div>
      </div>

      <div
        aria-label="Choose a process step"
        className="mt-4 grid grid-cols-4 gap-2 max-md:grid-cols-2"
        role="tablist"
      >
        {slides.map((slide, index) => (
          <button
            aria-label={`Show step ${slide.number}: ${slide.title}`}
            aria-selected={index === activeSlide}
            className={cn(
              "relative isolate flex cursor-pointer flex-col gap-[0.45rem] overflow-hidden border border-rule bg-ivory p-4 text-left text-[0.72rem]",
              "hover:not-aria-selected:bg-void",
              // Progress fill that sweeps across the active tab while its slide is showing.
              "before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-void before:content-['']",
              "aria-selected:before:animate-step-timer motion-reduce:aria-selected:before:scale-x-100 motion-reduce:aria-selected:before:animate-none",
            )}
            key={slide.number}
            onClick={() => setActiveSlide(index)}
            role="tab"
            type="button"
          >
            <span className="relative text-[0.62rem] font-semibold tracking-[0.08em] text-gold">
              {slide.number}
            </span>
            <b className="relative font-normal text-ivory mix-blend-difference">{slide.title}</b>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ProcessStepGallery;
