import { CheckIcon, PlusIcon } from "@phosphor-icons/react/ssr";
import PrimaryLink from "@/components/primary-link/primary-link";
import { useLanguage } from "@/components/language-provider/language-provider";
import { useTrackInView } from "@/lib/use-track-in-view";

export type PackageAddOn = { title: string; price: string };
type PackageCardProps = { name: string; price: string; title: string; description: string; features: string[]; addOns?: PackageAddOn[] };

const PackageCard = ({ name, price, title, description, features, addOns = [] }: PackageCardProps) => {
  const { language } = useLanguage();
  const ref = useTrackInView<HTMLElement>("package_view", { package: name });
  return <article ref={ref} className="flex h-full flex-col bg-[var(--color-surface)] p-7 max-[760px]:p-6"><div className="flex items-baseline justify-between gap-4"><p className="m-0 text-[0.64rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-gold)]">{name}</p><strong className="text-[1.5rem] font-normal tracking-[-0.025em] text-[var(--color-gold)]">{price}</strong></div><h3 className="mt-10 mb-4 text-[2.2rem] font-normal leading-none tracking-[-0.03em] max-[760px]:text-[1.9rem]">{title}</h3><p className="m-0 text-[0.92rem] font-light leading-[1.55] text-[var(--color-fog)]">{description}</p><ul className="my-8 grid list-none gap-[0.85rem] p-0">{features.map((feature) => <li className="flex items-center gap-[0.6rem] text-[0.78rem] text-[var(--color-fog)]" key={feature}><CheckIcon aria-hidden="true" className="shrink-0 text-[var(--color-gold)]" size={14} weight="bold" />{feature}</li>)}</ul><div className="mt-auto">{addOns.length > 0 && <div className="mb-8 border-t border-[var(--color-rule)] pt-5"><p className="m-0 mb-4 flex items-center gap-2 text-[0.57rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-gold)]"><PlusIcon aria-hidden="true" size={14} weight="bold" />{language === "fr" ? "Options" : "Add-ons"}</p><ul className="m-0 grid list-none gap-[0.7rem] p-0">{addOns.map((addOn) => <li className="flex items-baseline justify-between gap-4 text-[0.78rem] text-[var(--color-fog)]" key={addOn.title}><span>{addOn.title}</span><span className="shrink-0 text-[var(--color-ivory)]">{addOn.price}</span></li>)}</ul></div>}<PrimaryLink href="#contact" track={{ event: "booking_click", params: { location: "package", package: name } }}>{language === "fr" ? "Demander ce forfait" : "Request this package"}</PrimaryLink></div></article>;
};

export default PackageCard;
