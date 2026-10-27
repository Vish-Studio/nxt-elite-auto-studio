import type Lenis from "lenis";

let instance: Lenis | null = null;

export const registerSmoothScroll = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getSmoothScroll = () => instance;

/** Freeze or release page scrolling (e.g. while the mobile menu is open). */
export const setScrollLocked = (isLocked: boolean) => {
  if (isLocked) instance?.stop();
  else instance?.start();
  document.body.style.overflow = isLocked ? "hidden" : "";
};
