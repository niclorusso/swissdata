import type { Metadata } from "next";
import { translations, type Locale } from "./translations";
import { isLocale } from "./locale";
import { HREFLANG_ORDER, SITE_URL, localePath, type PagePath } from "./routes";

const OG_LOCALE = { en: "en_CH", it: "it_CH", de: "de_CH", fr: "fr_CH" } as const;

/** Title of a page in a language: the home page has the site's title, the others "{page H1} – SwissData". */
function pageTitle(locale: Locale, path: PagePath): string {
  const t = translations[locale];
  switch (path) {
    case "":
      return t.meta.homeTitle;
    case "/about":
      return t.meta.aboutTitle;
    case "/statistics":
      return `${t.statistics.title} – SwissData`;
    case "/cantons":
      return `${t.cantons.title} – SwissData`;
    case "/quiz":
      return `${t.quiz.title} – SwissData`;
    case "/changes":
      return `${t.changes.title} – SwissData`;
  }
}

/** Title and description of the site in one language, written into the HTML at build time. */
export function siteMetadata(locale: Locale, path: PagePath = ""): Metadata {
  const t = translations[locale];
  const title = pageTitle(locale, path);
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: t.meta.description,
    authors: [{ name: "Nicola Lo Russo" }],
    openGraph: { title, description: t.meta.description, type: "website", locale: OG_LOCALE[locale] },
  };
}

/**
 * Metadata of one page in one language: its title, the description, the canonical address of this
 * language version and the hreflang links to the four versions. x-default is the address without a
 * language, which sends each visitor to their language (src/proxy.ts).
 */
export function pageMetadata(lang: string, path: PagePath): Metadata {
  if (!isLocale(lang)) return {};
  const site = siteMetadata(lang, path);
  const languages: Record<string, string> = {};
  for (const locale of HREFLANG_ORDER) languages[locale] = localePath(locale, path);
  languages["x-default"] = path || "/";
  return {
    ...site,
    alternates: { canonical: localePath(lang, path), languages },
    openGraph: { ...site.openGraph, url: localePath(lang, path) },
  };
}
