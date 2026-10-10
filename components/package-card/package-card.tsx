import { CheckIcon } from "@phosphor-icons/react/ssr";
import PrimaryLink from "@/components/primary-link/primary-link";
import { useLanguage } from "@/components/language-provider/language-provider";
import { useTrackInView } from "@/lib/use-track-in-view";

type PackageCardProps = { label: string; title: string; description: string; features: string[] };

const PackageCard = ({ label, title, description, features }: PackageCardProps) => {
  const { language } = useLanguage();
  const ref = useTrackInView<HTMLElement>("package_view", { package: title });
  return <article ref={ref} className="flex min-h-[510px] flex-col bg-[var(--color-surface)] p-7 max-[1040px]:min-h-[480px] max-[760px]:min-h-[450px]"><p className="m-0 text-[0.64rem] font-bold uppercase tracking-[0.1em] text-[var(--color-gold)]">{label}</p><h3 className="mt-16 mb-4 text-[2.2rem] font-normal tracking-[-0.05em]">{title}</h3><p className="m-0 text-[0.92rem] font-light leading-[1.55] text-[var(--color-fog)]">{description}</p><ul className="my-8 grid list-none gap-[0.85rem] p-0">{features.map((feature) => <li className="flex items-center gap-[0.6rem] text-[0.78rem] text-[var(--color-fog)]" key={feature}><CheckIcon aria-hidden="true" className="shrink-0 text-[var(--color-gold)]" size={14} weight="bold" />{feature}</li>)}</ul><div className="mt-auto self-start"><PrimaryLink href="#contact" track={{ event: "booking_click", params: { location: "package", package: title } }}>{language === "fr" ? "Demander ce forfait" : "Request this package"}</PrimaryLink></div></article>;
};

export default PackageCard;
