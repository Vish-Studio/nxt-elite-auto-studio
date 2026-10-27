"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type ParallaxBackgroundProps = {
  /** CSS gradient layered over the photo to keep text readable, e.g. `bg-void/60`. */
  overlayClassName?: string;
  src: string;
};

/** How far (in % of its own height) the photo travels while the section crosses the screen. */
const TRAVEL = 12;

/**
 * Full-bleed photo for a section that drifts slower than the page, like the hero.
 * Put it first inside a `relative isolate overflow-hidden` section. The photo is oversized so
 * it never runs out of image while it moves. On small screens and with reduced motion it stays
 * still, matching the hero.
 */
const ParallaxBackground = ({ overlayClassName, src }: ParallaxBackgroundProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const photo = photoRef.current;
    if (!frame || !photo) return;

    const motion = gsap.matchMedia();
    motion.add("(min-width: 761px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        photo,
        { yPercent: -TRAVEL / 2 },
        {
          ease: "none",
          invalidateOnRefresh: true,
          scrollTrigger: {
            end: "bottom top",
            scrub: true,
            start: "top bottom",
            trigger: frame.parentElement,
          },
          yPercent: TRAVEL / 2,
        },
      );
    });

    return () => motion.revert();
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden" ref={frameRef}>
      <div className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform" ref={photoRef}>
        <Image alt="" className="object-cover" fill sizes="100vw" src={src} />
      </div>
      <div className={`absolute inset-0 ${overlayClassName ?? ""}`} />
    </div>
  );
};

export default ParallaxBackground;
