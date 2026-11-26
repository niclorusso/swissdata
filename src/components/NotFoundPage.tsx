"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { ClientLayout } from "@/components/ClientLayout";
import { useLanguage } from "@/i18n/LanguageContext";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/locale";
import { localePath } from "@/i18n/routes";
import type { Locale } from "@/i18n/translations";

/** Language of the address (/de/…), else English. On the server, where the address is not known: English. */
function useAddressLocale(): Locale {
  return useSyncExternalStore(
    () => () => {},
    () => {
      const first = window.location.pathname.split("/")[1];
      return isLocale(first) ? first : DEFAULT_LOCALE;
    },
    () => DEFAULT_LOCALE
  );
}

function NotFoundContent() {
  const { t, locale } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const pages = [
    { href: localePath(locale), label: t.notFound.home },
    { href: localePath(locale, "/statistics"), label: t.nav.statistics },
    { href: localePath(locale, "/cantons"), label: t.nav.cantons },
    { href: localePath(locale, "/quiz"), label: t.nav.quiz },
    { href: localePath(locale, "/about"), label: t.nav.about },
  ];

  return (
    <div className="container mx-auto px-4 py-10 sm:py-16">
      {/* React puts the title in the head; it follows the language of the address */}
      <title>{`${t.notFound.title} – SwissData`}</title>
      <div className="max-w-[68ch] space-y-4">
        <h1 className="text-[1.75rem] sm:text-[2.5rem] font-bold leading-tight text-ink">{t.notFound.title}</h1>
        <p className="text-base sm:text-lg text-swiss-gray-700">{t.notFound.text}</p>
        <ul className="space-y-1">
          {pages.map((page) => (
            <li key={page.href}>
              <Link href={page.href} className="inline-flex items-center min-h-[44px] text-base font-medium text-ink underline underline-offset-[3px] hover:text-swiss-gray-600">
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * The page for an address that does not exist, with the site's header and footer. It is one static page for
 * every unknown address, so the language is read from the address in the browser: /de/… in German, /fr/… in
 * French, anything else in English. Without JavaScript it stays in English.
 */
export function NotFoundPage() {
  const locale = useAddressLocale();
  return (
    <ClientLayout locale={locale}>
      <NotFoundContent />
    </ClientLayout>
  );
}
