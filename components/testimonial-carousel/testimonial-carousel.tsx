"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import TestimonialCard from "@/components/testimonial-card/testimonial-card";

type Testimonial = { quote: string; source: string; location: string };
type TestimonialCarouselProps = { testimonials: Testimonial[] };

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;
  const goTo = (index: number, direction: "previous" | "next" | "pagination") => { trackEvent("testimonial_nav", { direction }); setActiveIndex((index + total) % total); };

  useEffect(() => {
    if (total < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % total), 8000);
    return () => window.clearInterval(timer);
  }, [total]);

  if (!total) return null;

  return <div aria-label="Client testimonials" className="mt-16" role="region">
    <div aria-live="polite" className="relative min-h-[480px]">
      {testimonials.map((testimonial, index) => <div aria-hidden={index !== activeIndex} className={`inset-0 transition-opacity duration-[350ms] ${index === activeIndex ? "relative opacity-100 pointer-events-auto" : "absolute opacity-0 pointer-events-none"}`} id={`testimonial-${index + 1}`} key={`${testimonial.source}-${testimonial.location}`}><span className="absolute top-[clamp(1.5rem,4vw,3rem)] right-[clamp(1.5rem,4vw,3rem)] z-10 text-[0.62rem] font-bold tracking-[0.1em] text-[var(--color-gold)]">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><TestimonialCard {...testimonial} /></div>)}
    </div>
    <div className="mt-4 flex items-center justify-between border-t border-[var(--color-dark-rule)] pt-4">
      <div aria-label="Choose a testimonial" className="flex gap-2" role="tablist">{testimonials.map((testimonial, index) => <button aria-controls={`testimonial-${index + 1}`} aria-label={`Show testimonial ${index + 1}`} aria-selected={index === activeIndex} className="h-[3px] w-10 border border-[var(--color-void)] bg-transparent opacity-30 aria-selected:border-[var(--color-gold)] aria-selected:bg-[var(--color-gold)] aria-selected:opacity-100" key={`${testimonial.source}-${testimonial.location}`} onClick={() => goTo(index, "pagination")} role="tab" type="button" />)}</div>
      <div className="flex gap-2"><button aria-label="Previous testimonial" className="grid size-10 place-items-center border border-[var(--color-void)] transition-colors hover:bg-[var(--color-void)] hover:text-[var(--color-ivory)]" onClick={() => goTo(activeIndex - 1, "previous")} type="button"><CaretLeftIcon aria-hidden="true" size={16} weight="bold" /></button><button aria-label="Next testimonial" className="grid size-10 place-items-center border border-[var(--color-void)] transition-colors hover:bg-[var(--color-void)] hover:text-[var(--color-ivory)]" onClick={() => goTo(activeIndex + 1, "next")} type="button"><CaretRightIcon aria-hidden="true" size={16} weight="bold" /></button></div>
    </div>
  </div>;
};

export default TestimonialCarousel;
