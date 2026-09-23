import { QuotesIcon } from "@phosphor-icons/react/ssr";

type TestimonialCardProps = { quote: string; source: string; location: string };

const TestimonialCard = ({ quote, source, location }: TestimonialCardProps) => <figure className="testimonial-card"><QuotesIcon aria-hidden="true" size={24} weight="fill" /><blockquote>{quote}</blockquote><figcaption><strong>{source}</strong><span>{location}</span></figcaption></figure>;

export default TestimonialCard;
