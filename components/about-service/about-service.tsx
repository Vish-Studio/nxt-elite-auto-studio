type AboutServiceProps = { description: string; number: string; title: string };

const AboutService = ({ description, number, title }: AboutServiceProps) => <article className="grid min-h-[calc(520px/3)] grid-cols-[3.5rem_1fr] gap-4 border-b border-[var(--color-dark-rule)] py-6 pl-8 last:border-b-0 max-[760px]:min-h-0 max-[760px]:py-[1.4rem] max-[760px]:pl-4"><span className="text-[0.65rem] font-semibold text-[var(--color-gold)]">{number}</span><div><h3 className="mb-3 text-[clamp(1.25rem,1.8vw,1.65rem)] font-normal tracking-[-0.025em]">{title}</h3><p className="m-0 max-w-72 text-[0.82rem] font-light leading-normal text-[var(--color-ink-muted)]">{description}</p></div></article>;

export default AboutService;
