"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider/language-provider";
import PrimaryLink from "@/components/primary-link/primary-link";
import { cn } from "@/lib/cn";

export type ProcessStepItem = { description: string; image: string; title: string };
type ProcessShowcaseProps = { steps: ProcessStepItem[] };

// Keep in sync with --animate-step-timer in globals.css, which draws the progress bar.
const STEP_DURATION = 6000;

const labels = {
  en: { cta: "Book your appointment", step: "Step", steps: "Steps of the detailing process" },
  fr: { cta: "Réserver un rendez-vous", step: "Étape", steps: "Étapes du processus de detailing" },
};

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Step list paired with a photo that cross-fades to the active step.
 * Advances automatically; selecting a step restarts the timer from there.
 */
const ProcessShowcase = ({ steps }: ProcessShowcaseProps) => {
  const { language } = useLanguage();
  const t = labels[language];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(
      () => setActiveIndex((current) => (current + 1) % steps.length),
      STEP_DURATION,
    );
    return () => window.clearTimeout(timer);
  }, [activeIndex, steps.length]);

  return (
    <div className="mt-16 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-16 max-lg:grid-cols-1 max-lg:gap-8 max-md:mt-12">
      <div className="flex flex-col">
        <div
          aria-label={t.steps}
          aria-orientation="vertical"
          className="border-t border-dark-rule"
          role="tablist"
        >
          {steps.map((step, index) => (
            <button
              aria-controls="process-panel"
              aria-selected={index === activeIndex}
              className="group relative grid w-full cursor-pointer grid-cols-[3rem_1fr] gap-x-4 border-0 border-b border-dark-rule bg-transparent py-6 text-left max-md:grid-cols-[2.25rem_1fr] max-md:py-5"
              key={step.title}
              onClick={() => setActiveIndex(index)}
              role="tab"
              type="button"
            >
              <span className="pt-2 text-[0.67rem] font-semibold tracking-widest text-gold">
                {pad(index + 1)}
              </span>
              <span>
                <span className="block font-display text-[clamp(1.25rem,1.8vw,1.6rem)] tracking-[-0.025em] text-ink-muted transition-colors duration-300 group-hover:text-void group-aria-selected:text-void">
                  {step.title}
                </span>
                {/* Descriptions collapse to the active step on desktop; all stay open on mobile. */}
                <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-motion group-aria-selected:grid-rows-[1fr] max-lg:grid-rows-[1fr]">
                  <span className="overflow-hidden">
                    <span className="block max-w-[26rem] pt-2 text-[0.9rem] leading-[1.55] font-light text-ink-muted">
                      {step.description}
                    </span>
                  </span>
                </span>
              </span>
              <span
                aria-hidden="true"
                className="absolute -bottom-px left-0 h-0.5 w-full origin-left scale-x-0 bg-gold group-aria-selected:animate-step-timer motion-reduce:group-aria-selected:scale-x-100 motion-reduce:group-aria-selected:animate-none"
                key={index === activeIndex ? `active-${activeIndex}` : undefined}
              />
            </button>
          ))}
        </div>
        <PrimaryLink
          className="mt-10 self-start max-md:mt-8"
          href="#contact"
          track={{ event: "booking_click", params: { location: "process" } }}
        >
          {t.cta}
        </PrimaryLink>
      </div>

      <div
        className="relative min-h-130 overflow-hidden bg-void max-lg:row-start-1 max-lg:aspect-[4/3] max-lg:min-h-0"
        id="process-panel"
        role="tabpanel"
      >
        {steps.map((step, index) => (
          <div
            aria-hidden={index !== activeIndex}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none",
              index === activeIndex ? "opacity-100" : "opacity-0",
            )}
            key={step.image}
          >
            <Image
              alt={step.title}
              className="object-cover"
              fill
              preload={index === 0}
              sizes="(max-width: 1040px) calc(100vw - 40px), 680px"
              src={step.image}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-void/70 via-transparent to-transparent" />
        <span className="absolute top-5 left-5 bg-void/78 px-3 py-2 text-[0.62rem] font-semibold tracking-[0.12em] text-ivory uppercase">
          {t.step} <span className="text-gold">{pad(activeIndex + 1)}</span> / {pad(steps.length)}
        </span>
        <p
          className="absolute right-5 bottom-5 left-5 m-0 animate-fade-up font-display text-[clamp(1.4rem,2.2vw,2rem)] leading-tight tracking-[-0.025em] text-ivory motion-reduce:animate-none max-lg:hidden"
          key={activeIndex}
        >
          {steps[activeIndex].title}
        </p>
      </div>
    </div>
  );
};

export default ProcessShowcase;
