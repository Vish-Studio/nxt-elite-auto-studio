import MaskLine from "@/components/mask-line/mask-line";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  accent: string;
  /** Put the accent on its own line (default) or keep it inline with the title. */
  accentOnNewLine?: boolean;
  accentClassName?: string;
  /** Spacing only; type size comes from `size`. */
  className?: string;
  id?: string;
  /** 1 = statement sections, 2 = standard section headings, 3 = headings inside panels. */
  size?: 1 | 2 | 3;
  title: string;
};

const sizes = { 1: "text-display-1", 2: "text-display-2", 3: "text-display-3" };

/** Section headline with a lighter-weight accent, e.g. "Clear pricing. / At your door." */
const SectionTitle = ({
  accent,
  accentOnNewLine = true,
  accentClassName,
  className,
  id,
  size = 2,
  title,
}: SectionTitleProps) => {
  const accentText = <span className={cn("font-light", accentClassName)}>{accent}</span>;

  return (
    <h2 className={cn("m-0 flex flex-col font-normal", sizes[size], className)} id={id}>
      {accentOnNewLine ? (
        <>
          <MaskLine>{title}</MaskLine>
          <MaskLine>{accentText}</MaskLine>
        </>
      ) : (
        <MaskLine>
          {title} {accentText}
        </MaskLine>
      )}
    </h2>
  );
};

export default SectionTitle;
