"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type ComparisonImage = { alt: string; credit: string; creditHref: string; src: string };
type BeforeAfterGalleryProps = { before: ComparisonImage; after: ComparisonImage };

const BeforeAfterGallery = ({ before, after }: BeforeAfterGalleryProps) => {
  const [position, setPosition] = useState(50);
  const hasInteracted = useRef(false);

  return <section aria-label="Before and after detailing comparison" className="mt-4">
    <div className="relative h-[clamp(430px,55vw,650px)] overflow-hidden">
      <Image alt={before.alt} className="object-cover" fill sizes="(max-width: 760px) calc(100vw - 40px), 1240px" src={before.src} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}><Image alt={after.alt} className="object-cover" fill sizes="(max-width: 760px) calc(100vw - 40px), 1240px" src={after.src} /></div>
      <div aria-hidden="true" className="absolute top-0 bottom-0 -translate-x-1/2 border-l border-[var(--color-paper)]" style={{ left: `${position}%` }}><i className="absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-gold)] before:border-y-[5px] before:border-r-[5px] before:border-y-transparent before:border-r-[var(--color-void)] before:content-[''] after:border-y-[5px] after:border-l-[5px] after:border-y-transparent after:border-l-[var(--color-void)] after:content-['']" /></div>
      <div aria-hidden="true" className="absolute top-5 left-5 bg-[rgba(5,5,5,0.76)] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.1em]">Before</div><div aria-hidden="true" className="absolute top-5 right-5 bg-[rgba(5,5,5,0.76)] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.1em]">After</div>
      <input aria-label="Drag to compare before and after detailing" className="absolute inset-0 m-0 size-full cursor-ew-resize opacity-0" max="100" min="0" onChange={(event) => { if (!hasInteracted.current) { hasInteracted.current = true; trackEvent("before_after_interact"); } setPosition(Number(event.target.value)); }} type="range" value={position} />
    </div>
    <div className="flex justify-between gap-8 pt-4 max-[760px]:flex-col max-[760px]:gap-[0.8rem]"><p className="m-0 text-[0.78rem] text-[var(--color-fog)]">Slide to compare the transformation.</p><div className="flex flex-wrap justify-end gap-4 max-[760px]:justify-start">{[[before, "Before"], [after, "After"]].map(([image, prefix]) => <a className="inline-flex items-center gap-[0.35rem] text-[0.54rem] uppercase tracking-[0.06em] text-[var(--color-fog)] hover:text-[var(--color-ivory)]" href={(image as ComparisonImage).creditHref} key={prefix as string} rel="noreferrer" target="_blank">{prefix as string}: {(image as ComparisonImage).credit} / Unsplash <ArrowUpRightIcon aria-hidden="true" size={12} weight="bold" /></a>)}</div></div>
  </section>;
};

export default BeforeAfterGallery;
