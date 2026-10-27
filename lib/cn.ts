/** Joins truthy class names, so conditional Tailwind classes stay readable. */
export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");
