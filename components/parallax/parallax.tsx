"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

const Parallax = ({ children, className = "", speed = 0.06 }: ParallaxProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileViewport = window.matchMedia("(max-width: 760px)");
    let animationFrame = 0;

    const updatePosition = () => {
      animationFrame = 0;
      if (reducedMotion.matches || mobileViewport.matches) {
        element.style.setProperty("--parallax-offset", "0px");
        return;
      }

      const bounds = element.getBoundingClientRect();
      const distanceFromCenter = window.innerHeight / 2 - (bounds.top + bounds.height / 2);
      const offset = Math.max(-56, Math.min(56, distanceFromCenter * speed));
      element.style.setProperty("--parallax-offset", `${offset.toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updatePosition);
    };

    updatePosition();
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
  }, [speed]);

  return <div className={`parallax${className ? ` ${className}` : ""}`} ref={elementRef} style={{ "--parallax-offset": "0px" } as CSSProperties}>{children}</div>;
};

export default Parallax;
