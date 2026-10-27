import { cn } from "@/lib/cn";

export type ButtonVariant = "gold" | "outline";
export type ButtonSize = "md" | "sm";

const variants: Record<ButtonVariant, string> = {
  gold: "bg-gold text-void hover:bg-gold-deep",
  outline: "border border-ivory bg-void text-ivory hover:bg-ivory hover:text-void",
};

const sizes: Record<ButtonSize, string> = {
  md: "px-[1.15rem] py-4 text-[0.65rem]",
  sm: "px-[0.9rem] py-[0.82rem] text-[0.65rem] max-lg:px-[0.7rem] max-lg:py-3 max-lg:text-[0.56rem]",
};

/**
 * The site's one button look. Hover only changes colour (no movement) so it can't fight the
 * scroll-reveal animation, and keyboard focus gets a visible outline.
 */
export const buttonClasses = ({
  className,
  size = "md",
  variant = "gold",
}: {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}) =>
  cn(
    "inline-flex cursor-pointer items-center justify-center gap-4 font-semibold tracking-[0.1em] whitespace-nowrap uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
    variants[variant],
    sizes[size],
    className,
  );
