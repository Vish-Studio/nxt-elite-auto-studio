import type { ReactNode } from "react";

type AboutServiceProps = { description: string; icon: ReactNode; title: string };

const AboutService = ({ description, icon, title }: AboutServiceProps) => <article className="flex flex-col items-center px-6 py-10 text-center max-[760px]:px-2 max-[760px]:py-8"><span className="mb-6 grid size-14 place-items-center rounded-full border border-[var(--color-gold)] text-[var(--color-gold)]">{icon}</span><h3 className="mb-3 text-[clamp(1.25rem,1.8vw,1.6rem)] font-normal tracking-[-0.025em]">{title}</h3><p className="m-0 max-w-72 text-[0.86rem] font-light leading-[1.65] text-[var(--color-ink-muted)]">{description}</p></article>;

export default AboutService;
