import { ArrowUpRightIcon, BroomIcon, CarProfileIcon, DropIcon, SparkleIcon, TagIcon } from "@phosphor-icons/react/ssr";

type ServiceCardProps = { number: string; title: string; description: string };

const serviceIcons = { "Interior Detail": BroomIcon, "Exterior Detail": DropIcon, "Full Detail": CarProfileIcon, "Sale Preparation": TagIcon };

const ServiceCard = ({ number, title, description }: ServiceCardProps) => {
  const ServiceIcon = serviceIcons[title as keyof typeof serviceIcons] ?? SparkleIcon;

  return <article className="service-card"><div className="service-card__top"><p className="service-index">{number}</p><ServiceIcon aria-hidden="true" size={27} weight="light" /></div><h3>{title}</h3><p>{description}</p><a href="#contact">Request this service <ArrowUpRightIcon aria-hidden="true" size={13} weight="bold" /></a></article>;
};

export default ServiceCard;
