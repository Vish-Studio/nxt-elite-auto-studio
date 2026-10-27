import { cn } from "@/lib/cn";

type SectionTitleProps = {
  accent: string;
  /** Put the accent on its own line (default) or keep it inline with the title. */
  accentOnNewLine?: boolean;
  accentClassName?: string;
  className?: string;
  id?: string;
  title: string;
};

/**
 * Section headline with a lighter-weight accent, e.g. "Clear pricing. / At your door."
 * Size and line height are passed in `className`, since they differ per section.
 */
const SectionTitle = ({
  accent,
  accentOnNewLine = true,
  accentClassName,
  className,
  id,
  title,
}: SectionTitleProps) => (
  <h2 className={cn("m-0 font-normal tracking-[-0.04em]", className)} id={id}>
    {title}
    {accentOnNewLine ? <br /> : " "}
    <span className={cn("font-light", accentClassName)}>{accent}</span>
  </h2>
);

export default SectionTitle;
