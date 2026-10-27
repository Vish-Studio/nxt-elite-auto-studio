import type { Language } from "@/components/language-provider/language-provider";

/**
 * Formats whole-euro prices. Done by hand rather than with Intl.NumberFormat so the
 * server and browser always produce identical strings (no hydration mismatch).
 */
export const formatPrice = (amount: number, language: Language) =>
  language === "fr" ? `${amount} €` : `€${amount}`;
