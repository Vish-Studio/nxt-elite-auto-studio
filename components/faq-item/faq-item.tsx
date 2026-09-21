type FaqItemProps = { question: string; answer: string };

const FaqItem = ({ question, answer }: FaqItemProps) => <details className="faq-item"><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>;

export default FaqItem;
