type SectionHeadingProps = { eyebrow: string; title: string; copy?: string };
const SectionHeading = ({ eyebrow, title, copy }: SectionHeadingProps) => <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy ? <p className="section-copy">{copy}</p> : null}</div>;
export default SectionHeading;
