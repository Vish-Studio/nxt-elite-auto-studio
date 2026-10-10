import { PlusIcon } from "@phosphor-icons/react/ssr";
import { trackEvent } from "@/lib/analytics";

type FaqItemProps = { question: string; answer: string };

const FaqItem = ({ question, answer }: FaqItemProps) => <details className="bg-[var(--color-surface)] open:[&_svg]:rotate-45" onToggle={(event) => { if (event.currentTarget.open) trackEvent("faq_open", { question }); }}><summary className="flex cursor-pointer list-none items-center justify-between p-5 text-base [&::-webkit-details-marker]:hidden [&_svg]:shrink-0 [&_svg]:text-[var(--color-gold)] [&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-out"><span>{question}</span><PlusIcon aria-hidden="true" size={17} weight="bold" /></summary><p className="m-0 max-w-[34rem] px-5 pt-0 pr-12 pb-5 text-[0.92rem] font-light leading-[1.6] text-[var(--color-fog)]">{answer}</p></details>;

export default FaqItem;
