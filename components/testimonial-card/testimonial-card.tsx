import { QuotesIcon } from "@phosphor-icons/react/ssr";

type TestimonialCardProps = { quote: string; source: string; location: string };

const TestimonialCard = ({ quote, source, location }: TestimonialCardProps) => (
  <figure className="m-0 flex min-h-[480px] flex-col bg-void p-[clamp(1.8rem,5vw,4rem)] text-ivory max-md:min-h-[430px]">
    <QuotesIcon aria-hidden="true" className="text-gold" size={24} weight="fill" />
    <blockquote className="my-auto mb-12 max-w-[58rem] text-[clamp(1.9rem,4vw,4.4rem)] leading-[0.98] font-normal tracking-[-0.035em] max-md:mb-8">
      {quote}
    </blockquote>
    <figcaption className="flex items-center gap-[1.1rem] border-t border-rule pt-4 max-md:flex-col max-md:items-start max-md:gap-2">
      <strong className="text-[0.67rem] tracking-[0.1em] uppercase">{source}</strong>
      <span className="text-[0.72rem] text-fog before:mr-[1.1rem] before:text-gold before:content-['•'] max-md:before:mr-2">
        {location}
      </span>
    </figcaption>
  </figure>
);

export default TestimonialCard;
