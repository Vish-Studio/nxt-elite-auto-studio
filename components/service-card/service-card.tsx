import { ArrowDownIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";

type ServiceCardProps = {
  description: string;
  image: { alt: string; src: string; unoptimized?: boolean };
  /** Label for the link down to the matching price package. */
  linkLabel: string;
  title: string;
};

/** A core service: photo, name, one-line scope and a link to its package. */
const ServiceCard = ({ description, image, linkLabel, title }: ServiceCardProps) => (
  <article className="flex h-full flex-col">
    <div className="relative aspect-[4/5] overflow-hidden bg-surface max-md:aspect-[4/3]">
      <Image
        alt={image.alt}
        className="object-cover"
        fill
        sizes="(max-width: 760px) calc(100vw - 40px), 400px"
        src={image.src}
        unoptimized={image.unoptimized}
      />
    </div>
    <h3 className="mt-6 mb-3 text-[clamp(1.4rem,2vw,1.9rem)] font-normal tracking-[-0.025em]">
      {title}
    </h3>
    <p className="m-0 max-w-80 text-[0.92rem] leading-[1.6] font-light text-ink-muted">
      {description}
    </p>
    <a
      className="mt-auto inline-flex items-center gap-1.5 self-start border-b border-gold pt-5 pb-0.5 text-[0.8rem] font-medium"
      href="#pricing"
    >
      {linkLabel}
      <ArrowDownIcon aria-hidden="true" className="text-gold" size={13} weight="bold" />
    </a>
  </article>
);

export default ServiceCard;
