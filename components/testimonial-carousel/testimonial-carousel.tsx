"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import TestimonialCard from "@/components/testimonial-card/testimonial-card";

type Testimonial = { quote: string; source: string; location: string };
type TestimonialCarouselProps = { testimonials: Testimonial[] };

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;
  const goTo = (index: number) => setActiveIndex((index + total) % total);

  useEffect(() => {
    if (total < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % total), 8000);
    return () => window.clearInterval(timer);
  }, [total]);

  if (!total) return null;

  return <div aria-label="Client testimonials" className="testimonial-carousel" role="region">
    <div aria-live="polite" className="testimonial-carousel__viewport">
      {testimonials.map((testimonial, index) => <div aria-hidden={index !== activeIndex} className={`testimonial-carousel__slide${index === activeIndex ? " is-active" : ""}`} id={`testimonial-${index + 1}`} key={`${testimonial.source}-${testimonial.location}`}><TestimonialCard {...testimonial} /></div>)}
    </div>
    <div className="testimonial-carousel__footer">
      <div aria-label="Choose a testimonial" className="testimonial-carousel__pagination" role="tablist">{testimonials.map((testimonial, index) => <button aria-controls={`testimonial-${index + 1}`} aria-label={`Show testimonial ${index + 1}`} aria-selected={index === activeIndex} key={`${testimonial.source}-${testimonial.location}`} onClick={() => goTo(index)} role="tab" type="button" />)}</div>
      <div className="testimonial-carousel__controls"><button aria-label="Previous testimonial" onClick={() => goTo(activeIndex - 1)} type="button"><CaretLeftIcon aria-hidden="true" size={16} weight="bold" /></button><button aria-label="Next testimonial" onClick={() => goTo(activeIndex + 1)} type="button"><CaretRightIcon aria-hidden="true" size={16} weight="bold" /></button></div>
    </div>
  </div>;
};

export default TestimonialCarousel;
