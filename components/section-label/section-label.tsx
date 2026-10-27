import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionLabelProps = {
  children: ReactNode;
  /** Spacing only; size and colour come from `size`. */
  className?: string;
  id?: string;
  size?: "md" | "sm";
};

const sizes = {
  md: "text-[0.67rem] tracking-[0.12em]",
  sm: "text-[0.62rem] tracking-widest",
};

/** Small gold eyebrow shown above section headlines. */
const SectionLabel = ({ children, className, id, size = "md" }: SectionLabelProps) => (
  <p
    className={cn("m-0 font-semibold text-gold uppercase", sizes[size], className)}
    id={id}
    data-reveal
  >
    {children}
  </p>
);

export default SectionLabel;
