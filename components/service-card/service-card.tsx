type ServiceCardProps = { number: string; title: string; description: string };

const ServiceCard = ({ number, title, description }: ServiceCardProps) => <article className="service-card"><p className="service-index">{number}</p><h3>{title}</h3><p>{description}</p><a href="#contact">Request this service <span>↗</span></a></article>;

export default ServiceCard;
