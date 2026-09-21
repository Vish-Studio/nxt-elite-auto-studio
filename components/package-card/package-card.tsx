import PrimaryLink from "@/components/primary-link/primary-link";

type PackageCardProps = { label: string; title: string; description: string; features: string[] };

const PackageCard = ({ label, title, description, features }: PackageCardProps) => <article className="package-card"><p>{label}</p><h3>{title}</h3><p>{description}</p><ul>{features.map((feature) => <li key={feature}>{feature}</li>)}</ul><PrimaryLink href="#contact">Request this package</PrimaryLink></article>;

export default PackageCard;
