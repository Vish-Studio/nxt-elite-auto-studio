import { ArrowUpRightIcon, BroomIcon, CarProfileIcon, DropIcon, SparkleIcon, TagIcon } from "@phosphor-icons/react/ssr";
import { useLanguage } from "@/components/language-provider/language-provider";

type ServiceCardProps = { number: string; title: string; description: string };

const serviceIcons = { "Interior Detail": BroomIcon, "Exterior Detail": DropIcon, "Full Detail": CarProfileIcon, "Sale Preparation": TagIcon };

const ServiceCard = ({ number, title, description }: ServiceCardProps) => {
  const { language } = useLanguage();
  const ServiceIcon = serviceIcons[title as keyof typeof serviceIcons] ?? SparkleIcon;

  return <article className="flex min-h-80 flex-col bg-[var(--color-ivory)] p-7 max-[760px]:min-h-[235px] max-[760px]:p-[1.4rem]"><div className="flex items-center justify-between text-[var(--color-gold)]"><p className="m-0 text-[0.67rem] font-semibold">{number}</p><ServiceIcon aria-hidden="true" size={27} weight="light" /></div><h3 className="mt-auto mb-4 text-[1.45rem] font-normal tracking-[-0.025em] max-[760px]:mt-12">{title}</h3><p className="m-0 max-w-64 text-[0.9rem] font-light leading-[1.55] text-[var(--color-ink-muted)]">{description}</p><a className="mt-8 inline-flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.09em]" href="#contact">{language === "fr" ? "Demander ce service" : "Request this service"} <ArrowUpRightIcon aria-hidden="true" className="text-[var(--color-gold)]" size={13} weight="bold" /></a></article>;
};

export default ServiceCard;
