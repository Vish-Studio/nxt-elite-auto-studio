import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MaskLineProps = { children: ReactNode; className?: string };

/**
 * One line of a headline. The outer span clips, the inner span slides up into view when the
 * page reveals it (see `PageMotion`). The padding/negative margin pair gives ascenders and
 * descenders room so tight line heights don't get cropped by the mask. Parent headings must be
 * `flex flex-col` so the negative margins of neighbouring lines add up instead of collapsing.
 */
const MaskLine = ({ children, className }: MaskLineProps) => (
  <span className={cn("-my-[0.12em] block overflow-hidden py-[0.12em]", className)}>
    <span className="block" data-heading-line>
      {children}
    </span>
  </span>
);

export default MaskLine;
