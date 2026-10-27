"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
};

const hiddenOffset = {
  up: "translate-y-8",
  // Horizontal entrances fall back to vertical on mobile to avoid horizontal overflow.
  left: "-translate-x-8 max-md:translate-x-0 max-md:translate-y-8",
  right: "translate-x-8 max-md:translate-x-0 max-md:translate-y-8",
};

const Reveal = ({ children, className, delay = 0, direction = "up" }: RevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.unobserve(entry.target);
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "transition duration-750 ease-motion motion-reduce:translate-none motion-reduce:opacity-100 motion-reduce:transition-none",
        isVisible ? "translate-none opacity-100" : cn("opacity-0", hiddenOffset[direction]),
        className,
      )}
      ref={elementRef}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
