import type { ReactNode } from "react";

type AboutServiceProps = { description: string; icon: ReactNode; title: string };

const AboutService = ({ description, icon, title }: AboutServiceProps) => (
  <article
    className="flex flex-col items-center px-6 py-10 text-center max-md:px-2 max-md:py-8"
    data-reveal
  >
    <span className="mb-6 grid size-14 place-items-center rounded-full border border-gold text-gold">
      {icon}
    </span>
    <h3 className="mb-3 text-[clamp(1.25rem,1.8vw,1.6rem)] font-normal tracking-[-0.025em]">
      {title}
    </h3>
    <p className="m-0 max-w-72 text-[0.86rem] leading-[1.65] font-light text-ink-muted">
      {description}
    </p>
  </article>
);

export default AboutService;
