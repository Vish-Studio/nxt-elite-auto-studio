import Reveal from "@/components/reveal/reveal";
import SectionLabel from "@/components/section-label/section-label";
import SectionTitle from "@/components/section-title/section-title";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  accent: string;
  accentOnNewLine?: boolean;
  description?: string;
  label: string;
  title: string;
  /** Colour scheme of the section the header sits in. */
  tone?: "light" | "dark";
};

/** Label and headline on the left, short description on the right. */
const SectionHeader = ({
  accent,
  accentOnNewLine,
  description,
  label,
  title,
  tone = "light",
}: SectionHeaderProps) => (
  <Reveal className="flex items-end justify-between max-md:flex-col max-md:items-start max-md:gap-8">
    <div>
      <SectionLabel className="mb-7">{label}</SectionLabel>
      <SectionTitle
        accent={accent}
        accentOnNewLine={accentOnNewLine}
        className="text-[clamp(2.8rem,5vw,5.5rem)] leading-[0.88] max-md:text-[clamp(3rem,13vw,4.5rem)]"
        title={title}
      />
    </div>
    {description && (
      <p
        className={cn(
          "m-0 max-w-[22rem] text-[0.96rem] leading-[1.55] font-light",
          tone === "dark" ? "text-fog" : "text-ink-muted",
        )}
      >
        {description}
      </p>
    )}
  </Reveal>
);

export default SectionHeader;
