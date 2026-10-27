type ProcessStepProps = { number: string; title: string; description: string };

const ProcessStep = ({ number, title, description }: ProcessStepProps) => (
  <article className="grid grid-cols-[44px_1fr] gap-8 bg-ivory p-8">
    <span className="text-[0.67rem] font-semibold text-gold">{number}</span>
    <div>
      <h3 className="mb-[0.7rem] text-[1.4rem] font-normal">{title}</h3>
      <p className="m-0 max-w-[26rem] text-[0.92rem] leading-normal font-light text-ink-muted">
        {description}
      </p>
    </div>
  </article>
);

export default ProcessStep;
