"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { registerSmoothScroll } from "@/lib/smooth-scroll";

const MOBILE_QUERY = "(max-width: 760px)";
const REVEALABLE = "[data-reveal], [data-heading-line]";

/**
 * Calls `onEnter` with batches of elements as they scroll into view (or are already above the
 * viewport, e.g. after a reload at a scrolled position). IntersectionObserver reads live
 * geometry, so a late layout shift can never leave an element stuck in view without a trigger.
 */
const revealWhenVisible = (
  targets: Element[],
  onEnter: (batch: Element[]) => void,
  { batchDelay = 100, rootMargin = "0px 0px -8% 0px" } = {},
) => {
  let queue: Element[] = [];
  let timer: number | undefined;

  const flush = () => {
    timer = undefined;
    const batch = queue.sort((a, b) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );
    queue = [];
    onEnter(batch);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
        observer.unobserve(entry.target);
        queue.push(entry.target);
      });
      if (queue.length && timer === undefined) timer = window.setTimeout(flush, batchDelay);
    },
    { rootMargin, threshold: 0 },
  );

  targets.forEach((target) => observer.observe(target));

  return () => {
    observer.disconnect();
    window.clearTimeout(timer);
  };
};

/**
 * Page-wide motion, mounted once in the root layout:
 *  - Lenis smooths wheel scrolling and drives in-page anchor jumps (touch keeps native scrolling).
 *  - Headline lines (`[data-heading-line]`, see MaskLine) slide up out of their mask first.
 *  - Then everything marked `[data-reveal]` fades up, staggered, once it scrolls into view.
 *    (Triggered by IntersectionObserver, which can't go stale after layout shifts; GSAP animates.)
 *
 * Nothing runs for visitors who prefer reduced motion; the CSS in globals.css only hides
 * these elements when scripting is enabled and motion is allowed, so content never stays hidden.
 */
const PageMotion = () => {
  useEffect(() => {
    const motion = gsap.matchMedia();

    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const isMobile = window.matchMedia(MOBILE_QUERY).matches;

      // ---- Smooth scrolling ----
      const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      registerSmoothScroll(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const onAnchorClick = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const hash = (event.target as Element)
          .closest<HTMLAnchorElement>('a[href^="#"]')
          ?.getAttribute("href");
        if (!hash || hash === "#") return;

        let target: HTMLElement | null = null;
        try {
          target = document.querySelector<HTMLElement>(hash);
        } catch {
          return;
        }
        if (!target) return;

        event.preventDefault();
        // Lenis honours the page's `scroll-padding-top`, which already clears the fixed header.
        lenis.scrollTo(target, { duration: 1.4, force: true });
        window.history.pushState(null, "", hash);
      };
      document.addEventListener("click", onAnchorClick);

      // ---- Reveals ----
      const distance = isMobile ? 20 : 32;
      const headingTween = { duration: isMobile ? 0.95 : 1.15, ease: "power4.out", stagger: 0.12 };
      const contentTween = { duration: isMobile ? 0.75 : 0.9, ease: "power3.out", stagger: 0.09 };
      // Content follows its section's headline by this long.
      const contentLag = 0.42;

      const masks = gsap.utils
        .toArray<HTMLElement>("main [data-heading-line]")
        .map((line) => line.parentElement as HTMLElement);
      const items = gsap.utils.toArray<HTMLElement>("main [data-reveal]");
      // A reveal group (e.g. a swipeable carousel) is triggered as a whole, because its items can
      // sit off-screen sideways and would otherwise never count as "in view".
      const groups = gsap.utils.toArray<HTMLElement>("main [data-reveal-group]");
      const triggers = [...items.filter((item) => !item.closest("[data-reveal-group]")), ...groups];
      const sectionOf = (element: Element) => element.closest("section, footer");

      gsap.set(
        masks.map((mask) => mask.firstElementChild),
        { autoAlpha: 1, yPercent: 110 },
      );
      gsap.set(items, { y: distance });

      const revealedMasks = new Set<Element>();
      const revealedSections = new Map<Element, number>();

      // Observe the stable outer mask, not the inner line that is translated out of view.
      const stopHeadings = revealWhenVisible(masks, (batch) => {
        const now = performance.now();
        batch.forEach((mask) => {
          revealedMasks.add(mask);
          const section = sectionOf(mask);
          if (section) revealedSections.set(section, now);
        });
        gsap.to(
          batch.map((mask) => mask.firstElementChild),
          { ...headingTween, yPercent: 0 },
        );
      });

      const stopItems = revealWhenVisible(triggers, (batch) => {
        const now = performance.now();
        // Wait for the section's headline if it is still to come or only just started.
        const followsHeadline = batch.some((item) => {
          const section = sectionOf(item);
          if (!section) return false;
          const hasPendingHeading = [...section.querySelectorAll("[data-heading-line]")].some(
            (line) => !revealedMasks.has(line.parentElement as Element),
          );
          const revealedAt = revealedSections.get(section);
          return hasPendingHeading || (revealedAt !== undefined && now - revealedAt < 1300);
        });

        const targets = batch.flatMap((element) =>
          element.hasAttribute("data-reveal-group")
            ? [...element.querySelectorAll("[data-reveal]")]
            : [element],
        );

        gsap.to(targets, {
          ...contentTween,
          autoAlpha: 1,
          clearProps: "transform",
          delay: followsHeadline ? contentLag : 0,
          y: 0,
        });
      });

      // Anything React mounts later (e.g. a list re-created when the language changes) has no
      // trigger of its own, and the CSS would keep it hidden. Show it straight away.
      const known = new WeakSet<Element>([...items, ...masks.map((m) => m.firstElementChild!)]);
      const revealLate = new MutationObserver((mutations) => {
        const late: Element[] = [];
        mutations.forEach((mutation) =>
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof Element)) return;
            const found = [
              ...(node.matches(REVEALABLE) ? [node] : []),
              ...node.querySelectorAll(REVEALABLE),
            ];
            found.forEach((element) => {
              if (known.has(element)) return;
              known.add(element);
              late.push(element);
            });
          }),
        );
        if (late.length) gsap.set(late, { autoAlpha: 1 });
      });
      const main = document.querySelector("main");
      if (main) revealLate.observe(main, { childList: true, subtree: true });

      return () => {
        stopHeadings();
        stopItems();
        revealLate.disconnect();
        document.removeEventListener("click", onAnchorClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
        registerSmoothScroll(null);
      };
    });

    return () => motion.revert();
  }, []);

  return null;
};

export default PageMotion;
