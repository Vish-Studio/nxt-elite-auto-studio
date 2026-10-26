"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProcessSlide = { description: string; number: string; src: string; title: string; unoptimized?: boolean };

const slides: ProcessSlide[] = [
  { number: "01", title: "Tell us about your car", description: "Share the vehicle, location and result you are looking for.", src: "https://images.unsplash.com/photo-1727791712196-8d35b2ba2918?auto=format&fit=crop&q=85&w=2200" },
  { number: "02", title: "Choose a time and place", description: "We confirm the right service and arrange a convenient appointment.", src: "https://images.unsplash.com/photo-1608259243654-70c070e0f6ed?auto=format&fit=crop&q=85&w=2200" },
  { number: "03", title: "We detail on location", description: "Our mobile setup arrives ready with the products and equipment needed.", src: "https://images.unsplash.com/photo-1694025909289-fb9dd4660e97?auto=format&fit=crop&q=85&w=2200" },
  { number: "04", title: "Enjoy the finish", description: "We complete a final inspection before handing your refreshed vehicle back.", src: "https://images.unsplash.com/photo-1608506375591-b90e1f955e4b?auto=format&fit=crop&q=85&w=2200" },
];

const ProcessStepGallery = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => setActiveSlide((current) => (current + 1) % slides.length), 6000);
    return () => window.clearTimeout(timer);
  }, [activeSlide]);

  const active = slides[activeSlide];

  return <section aria-label="Four-step detailing process gallery" className="process-gallery"><div className="process-gallery__viewport">{slides.map((slide, index) => <div aria-hidden={index !== activeSlide} className={`process-gallery__slide${index === activeSlide ? " is-active" : ""}`} key={slide.number}><Image alt={slide.title} fill preload={index === 0} sizes="(max-width: 760px) calc(100vw - 40px), 1240px" src={slide.src} unoptimized={slide.unoptimized} /></div>)}<div className="process-gallery__shade" /><div className="process-gallery__content"><span>{active.number} / 04</span><h3>{active.title}</h3><p>{active.description}</p></div></div><div aria-label="Choose a process step" className="process-gallery__controls" role="tablist">{slides.map((slide, index) => <button aria-label={`Show step ${slide.number}: ${slide.title}`} aria-selected={index === activeSlide} key={slide.number} onClick={() => setActiveSlide(index)} role="tab" type="button"><span>{slide.number}</span><b>{slide.title}</b></button>)}</div></section>;
};

export default ProcessStepGallery;
