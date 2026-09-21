type BenefitCardProps = { number: string; title: string; description: string };

const BenefitCard = ({ number, title, description }: BenefitCardProps) => <article className="benefit-card"><span>{number}</span><h3>{title}</h3><p>{description}</p></article>;

export default BenefitCard;
