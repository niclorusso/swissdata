"use client";

import { createContext, useContext, useState, useEffect, useLayoutEffect, useRef, ReactNode } from "react";
import { translations, Locale } from "./translations";

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

export const LOCALES: Locale[] = ["en", "it", "de", "fr"];
export const LOCALE_STORAGE_KEY = "swissdata-locale";

/**
 * Runs in <head> before the first paint (see layout.tsx). The language is, in this order:
 * the one the visitor chose earlier, the first of the browser's languages that the site has,
 * English. It is written to <html lang>. The pages are prerendered in English, so for another
 * language the body stays hidden until React has put the texts in that language (no flash of English).
 */
export const LANGUAGE_INIT_SCRIPT = `(function(){try{var k=['en','it','de','fr'],l=null;try{l=localStorage.getItem('${LOCALE_STORAGE_KEY}')}catch(e){}if(k.indexOf(l)<0){l=null;var n=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''];for(var i=0;i<n.length;i++){var c=String(n[i]).slice(0,2).toLowerCase();if(k.indexOf(c)>=0){l=c;break}}}l=l||'en';var d=document.documentElement;d.lang=l;if(l!=='en'){d.classList.add('sd-lang-pending');setTimeout(function(){d.classList.remove('sd-lang-pending')},4000)}}catch(e){}})();`;

const LanguageContext = createContext<LanguageContextType | null>(null);

const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function LanguageProvider({ children }: { children: ReactNode }) {
  // First render in English, like the prerendered page; the language found by the script
  // is applied in a layout effect, before the browser paints.
  const [locale, setLocaleState] = useState<Locale>("en");
  const detected = useRef(false);

  useBrowserLayoutEffect(() => {
    if (!detected.current) {
      detected.current = true;
      const initial = document.documentElement.lang as Locale;
      if (LOCALES.includes(initial) && initial !== locale) {
        setLocaleState(initial);
        return; // this effect runs again with the new language
      }
    }
    document.documentElement.lang = locale;
    document.documentElement.classList.remove("sd-lang-pending");
    const t = translations[locale];
    document.title = `SwissData – ${t.home.title} ${t.home.titleHighlight}`;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    } catch {
      // storage not available: the choice lasts for this visit
    }
  };

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
