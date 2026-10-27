"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

type Slide = { alt: string; src: string; unoptimized?: boolean };

const slides: Slide[] = [
  {
    src: "https://images.unsplash.com/photo-1608506375591-b90e1f955e4b?auto=format&fit=crop&q=88&w=2200",
    alt: "Person spraying soapy foam onto a black sports car in a garage",
  },
  {
    src: "https://images.unsplash.com/photo-1605164598708-25701594473e?auto=format&fit=crop&q=88&w=2200",
    alt: "Car covered in snow inside a garage",
  },
  {
    src: "https://images.unsplash.com/photo-1608259243654-70c070e0f6ed?auto=format&fit=crop&q=88&w=2200",
    alt: "Driver seated inside a car",
  },
  {
    src: "https://images.unsplash.com/photo-1652898072061-785998d820cb?auto=format&fit=crop&q=88&w=2200",
    alt: "Car being washed in a garage",
  },
  {
    src: "https://images.unsplash.com/photo-1694025909289-fb9dd4660e97?auto=format&fit=crop&q=88&w=2200",
    alt: "Man washing a luxury car with a hose",
  },
  {
    src: "https://images.unsplash.com/photo-1727791712196-8d35b2ba2918?auto=format&fit=crop&q=88&w=2200",
    alt: "Car dashboard with a phone and radio",
  },
];

const HeroBackgroundCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, []);

  // Drift the photos slowly as the hero scrolls away. Scrubbed to the (smoothed) scroll position.
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const motion = gsap.matchMedia();
    motion.add("(min-width: 761px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        carousel,
        { "--hero-parallax": "0px" },
        {
          "--hero-parallax": "110px",
          ease: "none",
          scrollTrigger: { end: "+=690", scrub: true, start: 0, trigger: document.documentElement },
        },
      );
    });

    return () => motion.revert();
  }, []);

  return (
    <div
      aria-label="Elite Auto Studio detailing gallery"
      className="absolute inset-0 h-full"
      ref={carouselRef}
    >
      {slides.map((slide, index) => (
        <div
          aria-hidden={index !== activeSlide}
          className={`absolute inset-0 transition-opacity duration-[1.2s] ease-out motion-reduce:transition-none ${index === activeSlide ? "opacity-100" : "opacity-0"}`}
          key={slide.src}
        >
          <Image
            alt={slide.alt}
            className="translate-y-[var(--hero-parallax,0)] scale-[1.08] object-cover will-change-transform motion-reduce:transform-none"
            fill
            preload={index === 0}
            sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1320px) calc(100vw - 80px), 1240px"
            src={slide.src}
            unoptimized={slide.unoptimized}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.78)_0%,rgba(5,5,5,0.48)_42%,rgba(5,5,5,0.14)_78%),linear-gradient(0deg,rgba(5,5,5,0.7)_0%,transparent_42%)]" />
      <div className="absolute bottom-[8.5rem] left-[max(1.3rem,calc((100vw-var(--shell))/2))] z-3 flex gap-2 max-md:bottom-[10.8rem] max-md:left-[1.3rem]">
        {slides.map((slide, index) => (
          <button
            aria-label={`Show image ${index + 1}`}
            aria-pressed={index === activeSlide}
            className="size-2 cursor-pointer border border-ivory bg-transparent p-0 opacity-45 transition-[opacity,background] duration-200 aria-pressed:border-gold aria-pressed:bg-gold aria-pressed:opacity-100"
            key={slide.src}
            onClick={() => setActiveSlide(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBackgroundCarousel;
