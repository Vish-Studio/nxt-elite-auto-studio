"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";

type ComparisonImage = { alt: string; credit: string; creditHref: string; src: string };
type BeforeAfterGalleryProps = { before: ComparisonImage; after: ComparisonImage };

const BeforeAfterGallery = ({ before, after }: BeforeAfterGalleryProps) => {
  const [position, setPosition] = useState(50);

  return <section aria-label="Before and after detailing comparison" className="before-after-gallery">
    <div className="before-after-gallery__canvas">
      <Image alt={before.alt} fill sizes="(max-width: 760px) calc(100vw - 40px), 1240px" src={before.src} />
      <div className="before-after-gallery__after" style={{ clipPath: `inset(0 0 0 ${position}%)` }}><Image alt={after.alt} fill sizes="(max-width: 760px) calc(100vw - 40px), 1240px" src={after.src} /></div>
      <div aria-hidden="true" className="before-after-gallery__divider" style={{ left: `${position}%` }}><i /></div>
      <div aria-hidden="true" className="before-after-gallery__label before-after-gallery__label--before">Before</div><div aria-hidden="true" className="before-after-gallery__label before-after-gallery__label--after">After</div>
      <input aria-label="Drag to compare before and after detailing" className="before-after-gallery__slider" max="100" min="0" onChange={(event) => setPosition(Number(event.target.value))} type="range" value={position} />
    </div>
    <div className="before-after-gallery__footer"><p>Slide to compare the transformation.</p><div><a href={before.creditHref} rel="noreferrer" target="_blank">Before: {before.credit} / Unsplash <ArrowUpRightIcon aria-hidden="true" size={12} weight="bold" /></a><a href={after.creditHref} rel="noreferrer" target="_blank">After: {after.credit} / Unsplash <ArrowUpRightIcon aria-hidden="true" size={12} weight="bold" /></a></div></div>
  </section>;
};

export default BeforeAfterGallery;
