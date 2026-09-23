import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";

type ServiceCardProps = { number: string; title: string; description: string };

const ServiceCard = ({ number, title, description }: ServiceCardProps) => <article className="service-card"><p className="service-index">{number}</p><h3>{title}</h3><p>{description}</p><a href="#contact">Request this service <ArrowUpRightIcon aria-hidden="true" size={13} weight="bold" /></a></article>;

export default ServiceCard;
