"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  { src: "https://images.unsplash.com/photo-1746593934498-b335e4e04845?auto=format&fit=crop&q=85&w=2400", alt: "Black car inside a modern detailing studio", credit: "Srinivasa Yadav", page: "https://unsplash.com/photos/black-car-in-a-modern-car-wash-p8wO38qEIhk" },
  { src: "https://images.unsplash.com/photo-1769641156607-16833781bc16?auto=format&fit=crop&q=85&w=2400", alt: "Detailer washing a car covered in foam", credit: "Avenir Visuals", page: "https://unsplash.com/photos/person-washing-a-car-covered-in-foam-52VoFM9fPV8" },
  { src: "https://images.unsplash.com/photo-1761312834150-4beefff097a7?auto=format&fit=crop&q=85&w=2400", alt: "Black car covered in foam during a detail", credit: "Willian Cittadin", page: "https://unsplash.com/photos/black-car-covered-in-soap-suds-during-wash-bCQSrcYghJI" },
];

const HeroBackgroundCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileViewport = window.matchMedia("(max-width: 760px)");
    let animationFrame = 0;

    const updateParallax = () => {
      animationFrame = 0;
      const offset = reducedMotion.matches || mobileViewport.matches ? 0 : Math.min(window.scrollY * 0.16, 110);
      carousel.style.setProperty("--hero-parallax", `${offset.toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);
    mobileViewport.addEventListener("change", requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      mobileViewport.removeEventListener("change", requestUpdate);
    };
  }, []);

  return <div className="hero-carousel" aria-label="Elite Auto Studio detailing gallery" ref={carouselRef}>{slides.map((slide, index) => <div aria-hidden={index !== activeSlide} className={`hero-carousel__slide${index === activeSlide ? " is-active" : ""}`} key={slide.src}><Image alt={slide.alt} fill priority={index === 0} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 900px) calc(100vw - 80px), 55vw" src={slide.src} /></div>)}<div className="hero-carousel__overlay" /><div className="hero-carousel__controls">{slides.map((slide, index) => <button aria-label={`Show image ${index + 1}`} aria-pressed={index === activeSlide} key={slide.src} onClick={() => setActiveSlide(index)} type="button" />)}</div><a className="hero-carousel__credit" href={slides[activeSlide].page} rel="noreferrer" target="_blank">Photo: {slides[activeSlide].credit} / Unsplash</a></div>;
};

export default HeroBackgroundCarousel;
