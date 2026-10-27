"use client";

import type { Icon } from "@phosphor-icons/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { useLanguage } from "@/components/language-provider/language-provider";

type ServiceCardProps = { description: string; icon: Icon; number: string; title: string };

const ServiceCard = ({ description, icon: ServiceIcon, number, title }: ServiceCardProps) => {
  const { language } = useLanguage();

  return (
    <article className="flex min-h-80 flex-col bg-ivory p-7 max-md:min-h-[235px] max-md:p-[1.4rem]">
      <div className="flex items-center justify-between text-gold">
        <p className="m-0 text-[0.67rem] font-semibold">{number}</p>
        <ServiceIcon aria-hidden="true" size={27} weight="light" />
      </div>
      <h3 className="mt-auto mb-4 text-[1.45rem] font-normal tracking-[-0.025em] max-md:mt-12">
        {title}
      </h3>
      <p className="m-0 max-w-64 text-[0.9rem] leading-[1.55] font-light text-ink-muted">
        {description}
      </p>
      <a
        className="mt-8 inline-flex items-center gap-1.5 text-[0.62rem] font-semibold tracking-[0.09em] uppercase"
        href="#contact"
      >
        {language === "fr" ? "Demander ce service" : "Request this service"}{" "}
        <ArrowUpRightIcon aria-hidden="true" className="text-gold" size={13} weight="bold" />
      </a>
    </article>
  );
};

export default ServiceCard;
