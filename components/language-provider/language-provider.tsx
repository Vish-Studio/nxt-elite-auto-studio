"use client";

import { createContext, type ReactNode, useContext, useEffect, useSyncExternalStore } from "react";

export type Language = "en" | "fr";
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void };

const STORAGE_KEY = "elite-auto-studio-language";
const DEFAULT_LANGUAGE: Language = "en";

const LanguageContext = createContext<LanguageContextValue | null>(null);
const listeners = new Set<() => void>();
// Fallback for when storage is unavailable (private mode, blocked site data).
let memoryLanguage: Language | null = null;

const isLanguage = (value: unknown): value is Language => value === "en" || value === "fr";

const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
};

const getSnapshot = (): Language => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguage(saved)) return saved;
  } catch {
    // Fall through to the in-memory choice.
  }
  return memoryLanguage ?? DEFAULT_LANGUAGE;
};

// The server never knows the visitor's preference, so it always renders the default.
// React renders this value during hydration too, then switches to the saved one.
const getServerSnapshot = (): Language => DEFAULT_LANGUAGE;

const setLanguage = (language: Language) => {
  memoryLanguage = language;
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Ignore: the choice still applies for this visit via memoryLanguage.
  }
  listeners.forEach((listener) => listener());
};

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

export { LanguageProvider, useLanguage };
