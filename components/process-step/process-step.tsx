type ProcessStepProps = { number: string; title: string; description: string };

const ProcessStep = ({ number, title, description }: ProcessStepProps) => <article className="process-step"><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>;

export default ProcessStep;
