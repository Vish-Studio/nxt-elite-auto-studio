import { QuotesIcon } from "@phosphor-icons/react/ssr";

type TestimonialCardProps = { quote: string; source: string; location: string };

const TestimonialCard = ({ quote, source, location }: TestimonialCardProps) => (
  <figure className="m-0 flex min-h-[480px] flex-col bg-[var(--color-void)] p-[clamp(1.8rem,5vw,4rem)] text-[var(--color-ivory)] max-[760px]:min-h-[430px]">
    <QuotesIcon
      aria-hidden="true"
      className="text-[var(--color-gold)]"
      size={24}
      weight="fill"
    />
    <blockquote className="my-auto mb-12 max-w-[58rem] text-[clamp(1.9rem,4vw,4.4rem)] font-normal leading-[0.98] tracking-[-0.035em] max-[760px]:mb-8">
      {quote}
    </blockquote>
    <figcaption className="flex items-center gap-[1.1rem] border-t border-[var(--color-rule)] pt-4 max-[760px]:items-start max-[760px]:flex-col max-[760px]:gap-2">
      <strong className="text-[0.67rem] uppercase tracking-[0.1em]">
        {source}
      </strong>
      <span className="text-[0.72rem] text-[var(--color-fog)] before:mr-[1.1rem] before:text-[var(--color-gold)] before:content-['•'] max-[760px]:before:mr-2">
        {location}
      </span>
    </figcaption>
  </figure>
);

export default TestimonialCard;
