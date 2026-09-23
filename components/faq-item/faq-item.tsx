import { PlusIcon } from "@phosphor-icons/react/ssr";

type FaqItemProps = { question: string; answer: string };

const FaqItem = ({ question, answer }: FaqItemProps) => <details className="faq-item"><summary>{question}<PlusIcon aria-hidden="true" size={17} weight="bold" /></summary><p>{answer}</p></details>;

export default FaqItem;
