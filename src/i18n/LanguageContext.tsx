"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { translations, Locale } from "./translations";
import { LOCALE_COOKIE, isLocale } from "./locale";

// Recursively convert literal string types to string
type DeepString<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>;
};

type TranslationStrings = DeepString<typeof translations.en>;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationStrings;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function rememberLocale(locale: Locale) {
  // one year; read by the server on the next request (src/i18n/server.ts)
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * The server decides the language of the page (cookie, then Accept-Language, then English) and
 * renders the HTML in it; `initialLocale` hands the same language to the browser, so the first
 * render there is identical and nothing has to be hidden or swapped.
 */
export function LanguageProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    rememberLocale(newLocale);
    document.documentElement.lang = newLocale;
    // the server renders <html lang> and the title again with the new cookie
    router.refresh();
  };

  // Visitors who chose a language before the cookie existed had it in localStorage: carry it over once.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALE_COOKIE);
      if (!stored) return;
      localStorage.removeItem(LOCALE_COOKIE);
      if (isLocale(stored) && !document.cookie.includes(`${LOCALE_COOKIE}=`)) setLocale(stored);
    } catch {
      // storage not available
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
