export type ConsentState = "unknown" | "unset" | "granted" | "denied";

const STORAGE_KEY = "eas-cookie-consent";
const CHANGE_EVENT = "eas-cookie-consent-change";

export const subscribeToConsent = (onChange: () => void) => {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
};

export const getConsent = (): ConsentState => {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    return "unset";
  }
};

export const getServerConsent = (): ConsentState => "unknown";

export const setConsent = (state: "granted" | "denied" | "unset") => {
  try {
    if (state === "unset") window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, state);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
};
