import { ArrowDownIcon } from "@phosphor-icons/react/ssr";
import HeroBackgroundCarousel from "@/components/hero-background-carousel/hero-background-carousel";
import PrimaryLink from "@/components/primary-link/primary-link";
import Reveal from "@/components/reveal/reveal";
import { useLanguage } from "@/components/language-provider/language-provider";

const Hero = () => {
  const { language } = useLanguage();
  const copy = language === "fr" ? { aria: "Le detailing livre chez vous", primary: "Detailing", secondary: "A votre", accent: "porte.", lede: "Un lavage auto et un detailing soigne pour le vehicule que vous utilisez au quotidien.", cta: "Reserver un creneau", explore: "Decouvrir les services", lead: "Pense pour la finition.", leadBody: "Un perimetre clair, un travail soigne et un vehicule dont on prend reellement soin.", wash: "Lavage auto", washBody: "Soin exterieur sur", detail: "Detailing", detailBody: "Interieur et exterieur", lights: "Phares", lightsBody: "Nettoyes et polis" } : { aria: "Detailing delivered to your door", primary: "Detailing", secondary: "To your", accent: "door.", lede: "A considered car wash and detailing experience for the vehicle you drive every day.", cta: "Dispatch a team", explore: "Explore services", lead: "Made for the finish.", leadBody: "Clear scope, careful work and a vehicle that feels properly looked after.", wash: "Car wash", washBody: "Safe exterior care", detail: "Detailing", detailBody: "Inside and out", lights: "Headlights", lightsBody: "Cleaned and polished" };
  return <section className="overflow-hidden bg-[var(--color-void)]" id="home">
  <div className="relative min-h-[max(720px,100svh)] overflow-hidden max-[760px]:min-h-[760px]">
    <HeroBackgroundCarousel />
    <div className="shell relative z-4 flex min-h-[max(720px,100svh)] flex-col justify-between pt-[calc(var(--topbar-height)+4rem)] pb-[2.4rem] max-[760px]:min-h-[760px] max-[760px]:pt-[calc(var(--topbar-height)+3rem)] max-[760px]:pb-8">
      <Reveal className="relative max-w-[53rem]">
        <h1 aria-label={copy.aria} className="mt-[2.8rem] text-[clamp(5.2rem,10vw,10rem)] font-normal uppercase leading-[0.78] tracking-[-0.075em] max-[1040px]:text-[clamp(5.3rem,12vw,7.2rem)] max-[760px]:mt-8 max-[760px]:text-[clamp(4.6rem,21vw,6.2rem)]"><span className="block">{copy.primary}</span><span className="ml-[clamp(2.5rem,15vw,15rem)] block font-light max-[760px]:ml-6">{copy.secondary} <span className="text-[var(--color-gold)]">{copy.accent}</span></span></h1>
        <p className="mt-[2.2rem] max-w-[29rem] text-[clamp(0.9rem,1.15vw,1.1rem)] font-light leading-[1.55] text-[var(--color-fog)] max-[760px]:mt-[1.7rem] max-[760px]:max-w-[21rem]">{copy.lede}</p>
        <div className="mt-[2.2rem] flex flex-wrap items-center gap-[1.6rem]"><PrimaryLink href="#contact" track={{ event: "booking_click", params: { location: "hero" } }}>{copy.cta}</PrimaryLink><a className="inline-flex items-center gap-[0.45rem] text-[0.66rem] font-bold uppercase tracking-[0.1em]" href="#services">{copy.explore} <ArrowDownIcon aria-hidden="true" className="text-[var(--color-gold)]" size={13} weight="bold" /></a></div>
      </Reveal>
      <div className="grid grid-cols-[minmax(15rem,0.85fr)_1.15fr] items-end gap-10 border-t border-[var(--color-rule)] pt-[1.45rem] max-[760px]:flex max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-6"><p className="m-0 flex flex-col gap-[0.45rem]"><strong className="text-[0.76rem] uppercase tracking-[0.1em]">{copy.lead}</strong><span className="text-[0.78rem] font-light text-[var(--color-fog)] max-[760px]:leading-[1.45]">{copy.leadBody}</span></p><div className="grid grid-cols-3 gap-6 max-[760px]:w-full max-[760px]:gap-[0.7rem]">{[[copy.wash, copy.washBody], [copy.detail, copy.detailBody], [copy.lights, copy.lightsBody]].map(([title, description]) => <p className="m-0 flex flex-col gap-[0.35rem]" key={title}><strong className="text-[clamp(1.05rem,1.6vw,1.45rem)] font-normal uppercase tracking-[-0.03em] max-[760px]:text-[0.88rem]">{title}</strong><span className="text-[0.65rem] font-light leading-[1.4] text-[var(--color-fog)] max-[760px]:text-[0.58rem]">{description}</span></p>)}</div></div>
    </div>
  </div>
</section>;
};

export default Hero;
