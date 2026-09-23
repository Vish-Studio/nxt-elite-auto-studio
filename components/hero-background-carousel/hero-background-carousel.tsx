"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = { alt: string; credit: string; page: string; src: string; unoptimized?: boolean };

const slides: Slide[] = [
  { src: "https://images.unsplash.com/photo-1708805282706-f44730b7e527?fit=crop&fm=webp&q=80&w=1600", alt: "Professional detailer polishing a black vehicle", credit: "Zac Nielson", page: "https://unsplash.com/photos/CsZjHjFN3N8" },
  { src: "https://images.unsplash.com/photo-1633014041037-f5446fb4ce99?fit=crop&fm=webp&q=80&w=1600", alt: "Premium vehicle covered in foam during an exterior wash", credit: "mintosko", page: "https://unsplash.com/photos/V4b2j7f1dfc" },
  { src: "https://images.unsplash.com/photo-1708805282695-ef186db20192?fit=crop&fm=webp&q=80&w=1600", alt: "Paint correction being performed on a black car", credit: "Zac Nielson", page: "https://unsplash.com/photos/a-man-is-working-on-a-car-radio-M5lsL2E4ot0" },
  { src: "https://images.unsplash.com/photo-1708805282683-50a060eba80f?fit=crop&fm=webp&q=80&w=1600", alt: "Detailer carefully cleaning a vehicle wheel", credit: "Zac Nielson", page: "https://unsplash.com/photos/person-cleaning-car-tire-with-brush-8k_T1EwTySs" },
  { src: "https://images.unsplash.com/photo-1605437241278-c1806d14a4d9?fit=crop&fm=webp&q=80&w=1600", alt: "Clean premium black leather car interior", credit: "Ján Vlačuha", page: "https://unsplash.com/photos/U4IaoKF5aj4", unoptimized: true },
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

  return <div className="hero-carousel" aria-label="Elite Auto Studio detailing gallery" ref={carouselRef}>{slides.map((slide, index) => <div aria-hidden={index !== activeSlide} className={`hero-carousel__slide${index === activeSlide ? " is-active" : ""}`} key={slide.src}><Image alt={slide.alt} fill preload={index === 0} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1320px) calc(100vw - 80px), 1240px" src={slide.src} unoptimized={slide.unoptimized} /></div>)}<div className="hero-carousel__overlay" /><div className="hero-carousel__controls">{slides.map((slide, index) => <button aria-label={`Show image ${index + 1}`} aria-pressed={index === activeSlide} key={slide.src} onClick={() => setActiveSlide(index)} type="button" />)}</div><a className="hero-carousel__credit" href={slides[activeSlide].page} rel="noreferrer" target="_blank">Photo: {slides[activeSlide].credit} / Unsplash</a></div>;
};

export default HeroBackgroundCarousel;
