---
name: elite-design-system
description: Design system and UI conventions for the Elite Auto Studio website (Next.js 16 + Tailwind v4). Use before adding or changing any section, component, copy or style in this repo, so new work matches the existing tokens, type scale, components and bilingual copy.
---

# Elite Auto Studio design system

Elite Auto Studio is a **mobile** car detailing team serving Luxembourg, southern Belgium (Arlon region) and the French border towns around Longwy. The site's job is to show that the team comes to you, what each service covers, what it costs, and to get a booking request. The look is a quiet black / ivory / gold palette with square corners and large DM Sans headlines.

Follow this file for every UI change. If something here conflicts with a direct instruction from the user, the user wins; update this file afterwards if the change is meant to stick.

## Stack rules

- Styles are **Tailwind utility classes in the component that renders the markup**. Do not add `.css` files or global class names. `app/globals.css` holds only theme tokens, base element styles, the `shell` utility and keyframes.
- Combine conditional classes with `cn()` from `lib/cn.ts`. There is no class-merging library, so never pass two classes that set the same property (e.g. `mb-7` from a component plus `mb-5` from the caller). Components take a `size`/`variant`/`tone` prop for visual options and a `className` for layout only (margins, alignment, width).
- Run `npm run format` (Prettier + Tailwind class sorting), `npm run typecheck` and `npm run build` before finishing.
- `node_modules/next/dist/docs/` is the source of truth for Next.js APIs (this is Next 16; see `AGENTS.md`).

## Tokens (`app/globals.css` → `@theme`)

| Token                | Value               | Use                                                           |
| -------------------- | ------------------- | ------------------------------------------------------------- |
| `void`               | `#050505`           | Page background, dark sections, text on gold                  |
| `surface`            | `#0d0d0d`           | Raised dark panels (cards, FAQ items, contact band)           |
| `ivory`              | `#f5f5f0`           | Text on dark; light card fill on white sections               |
| `paper`              | `#ffffff`           | Light section background                                      |
| `gold`               | `#cdb973`           | The one accent: labels, primary buttons, active states, icons |
| `gold-soft`          | gold at 13%         | Tinted chips and hover fills                                  |
| `fog`                | `#c4c4be`           | Secondary text on dark                                        |
| `ink-muted`          | `#5e5e58`           | Secondary text on light                                       |
| `rule` / `dark-rule` | ivory / void at 18% | Hairlines on dark / light                                     |
| `map`                | `#2b2b2b`           | Map backgrounds                                               |

Use opacity modifiers (`bg-void/80`) rather than new rgba values. Gold is an accent: one emphasis per block, never large fills except the primary button.

**Breakpoints** are overridden: `md` = 761px, `lg` = 1041px. Write mobile overrides as `max-md:` and tablet as `max-lg:`; never `max-[760px]:`.

**Layout variables**: `--shell` (content width, use the `shell` utility), `--section-space` (vertical section padding, `py-(--section-space)`), `--topbar-height`. They change at the `md` breakpoint automatically.

Corners are square everywhere. The only round shapes are the icon rings in the about pillars and the map legend swatch.

## Typography

- **DM Sans** (`font-display`): every `h1`–`h3` (set globally) and large display text.
- **Poppins** (`font-sans`, default): all body and UI text. Weights in use: 300 (body), 400, 500, 600 (labels and buttons).
- **Display scale** (tokens include line height and tracking):
  - `text-display-1` — statement sections: About, Contact.
  - `text-display-2` — every standard section heading.
  - `text-display-3` — headings inside a panel: map brief, footer.
  - Use `<SectionTitle size={1|2|3}>`; don't write new `clamp()` sizes for section headings.
- Section headings are a title plus a lighter accent (`font-light`), usually on a new line. The accent turns gold only on white sections where it is the single emphasis (About, map).
- Body copy: 0.88–0.96rem, `leading-[1.55]`–`[1.7]`, `font-light`, max ~22–40rem wide. Keep lines under ~80 characters.

## Components to reuse

| Need                                             | Use                                                                                                           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Eyebrow above a heading                          | `SectionLabel` (`size="sm"` inside panels)                                                                    |
| Heading with accent                              | `SectionTitle`                                                                                                |
| Label + heading left, description right          | `SectionHeader` (`tone="dark"` on dark sections)                                                              |
| Primary call to action                           | `PrimaryLink` (`variant="gold" \| "outline"`, `size="sm"` in the header); pass `track` for analytics          |
| Cards that swipe on mobile, 3-up grid on desktop | `MobileCarousel` (`tone` must match the section)                                                              |
| Language-aware copy                              | `useLanguage()`; colocate `copy = { en, fr } satisfies Record<Language, unknown>` in the section file         |
| Prices                                           | `formatPrice(amount, language)` — never `Intl`, it can differ between server and browser                      |
| Images                                           | `next/image` with `fill` + `object-cover` inside a sized, `relative overflow-hidden` box; always pass `sizes` |
| Tracked links/buttons                            | `TrackedLink` or `PrimaryLink track={…}`; events go through `trackEvent` (consent-gated)                      |

Sections live in `components/sections/*-section.tsx`; `app/page.tsx` only lists them and stays a server component. Any component using hooks or event handlers needs `"use client"`.

## Section recipe

```tsx
<section className="bg-paper py-(--section-space) text-void" id="anchor">
  <div className="shell">
    <SectionHeader label="…" title="…" accent="…" description="…" />
    {/* content: mt-16 (max-md:mt-12) below the header */}
  </div>
</section>
```

- Alternate light (`bg-paper text-void`) and dark (`bg-void` / image + dark overlay) sections. Current order: hero (dark) · about (light) · works (dark) · map (split) · services (light) · pricing (dark image) · process (light) · FAQ (dark image) · testimonials (light) · contact (surface) · footer (dark).
- Dark image backgrounds: `next/image` `fill` at `-z-20`, gradient overlay `bg-linear-to-r from-void/95 via-void/85 to-void/60` at `-z-10`, section `relative isolate overflow-hidden`.
- Header nav links target section ids: `#about`, `#services`, `#pricing`, `#faq`, `#testimonials`; the header turns solid after `#home`.

## Design rules

- **Lead with the mobile service.** Coming to the customer's home or workplace is the main selling point; repeat it where it helps a decision (about, pricing badge, process).
- **Structure must carry meaning.** Numbered markers (01, 02…) only for real sequences (the process steps) or position counters ("02 / 04"). Don't number lists of services, links or projects.
- **Motion is earned.** The hero entrance is the single scroll-independent animation. Everything else moves only in response to the visitor (carousels, tabs, FAQ, menu) or to show progress (process timer). Don't wrap sections in fade-in-on-scroll. Always add `motion-reduce:` fallbacks.
- **One accent per block.** Gold marks the active or most important thing; don't stack gold labels, gold text and gold borders in the same small area.
- **Same job, same component.** Before building something new, check the table above.
- **Real content first.** Prefer the client's own photos in `public/works/` over stock. Service names, packages and add-ons must match the pricing data in `pricing-section.tsx`.

## Copy voice

- Plain, specific, sentence case. Say what the service does, not how good it is. Active verbs on buttons ("Request a booking", "Check your address"); a link says where it goes ("See the Premium package").
- Every string exists in English **and** French. Add both at the same time.
- Business facts (service area, prices, add-ons) have one source each: `lib/service-areas.ts`, `components/sections/pricing-section.tsx`. Don't restate prices elsewhere.

## Before you finish

1. `npm run format && npm run typecheck && npm run build`.
2. Check the page at 1440px and 390px, in English and French, with no horizontal scroll.
3. Check the browser console for hydration warnings (the language is read through `useSyncExternalStore`; anything else that reads `window`/`localStorage` must do the same or run in an effect).
4. Update this file when you add a token, a shared component or a new rule.
