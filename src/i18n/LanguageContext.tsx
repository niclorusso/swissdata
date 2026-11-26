"use client";

import { createContext, useContext, useEffect, useMemo, ReactNode } from "react";
import { translations, Locale } from "./translations";
import { LOCALE_COOKIE, isLocale } from "./locale";

// Recursively convert literal string types to string
type DeepString<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>;
};

type TranslationStrings = DeepString<typeof translations.en>;

interface LanguageContextType {
  locale: Locale;
  t: TranslationStrings;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

/**
 * Remembers the language chosen in the header for one year. The addresses without a language
 * (/, /cantons, …) then lead to it (src/proxy.ts).
 */
export function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * The language comes from the address (/it, /de, /fr, /en): the page was prerendered in it, so the
 * first render in the browser is identical to the HTML and nothing is swapped after loading.
 */
export function LanguageProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  // Visitors who chose a language before the cookie existed had it in localStorage: keep it as their choice.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALE_COOKIE);
      if (!stored) return;
      localStorage.removeItem(LOCALE_COOKIE);
      if (isLocale(stored) && !document.cookie.includes(`${LOCALE_COOKIE}=`)) rememberLocale(stored);
    } catch {
      // storage not available
    }
  }, []);

  const value = useMemo(() => ({ locale, t: translations[locale] }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
