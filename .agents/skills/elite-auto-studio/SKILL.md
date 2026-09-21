---
name: elite-auto-studio
description: Build and evolve the Elite Auto Studio marketing site with its dark luxury palette and reusable Next.js components.
---

# Elite Auto Studio

Use the supplied Elite Auto Studio logo as the visual source of truth. Keep the interface black-led with white typography; reserve the champagne-gold token exclusively for primary calls to action. Prefer a calm, premium editorial rhythm over dense dashboard-like UI.

Before adding markup, inspect `components/` and reuse the closest existing component. Create a component only when there is no suitable one, place it at `components/[component-name]/[component-file].tsx`, and define it as a named arrow component with a default export. Extract repeated or independently meaningful UI (such as navigation, cards, controls, and footer content) from a page into those components.

Treat `app/globals.css` as the design-token source. Reuse its colors, spacing rhythm, typography, borders, and interaction patterns rather than introducing one-off visual values. Inspect the existing components and tokens before each UI change.

Use English as the website's primary customer-facing language while keeping Belgian service-area context accurate. Keep contact and booking links as clearly replaceable placeholders until the business supplies final details.

Use Unsplash exclusively for new photographic website imagery. Preserve the original Unsplash photo page and creator attribution in the implementation; do not use generated imagery or another stock-photo source for new website photos.
