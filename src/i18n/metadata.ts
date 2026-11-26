import type { Metadata } from "next";
import { translations, type Locale } from "./translations";
import { isLocale } from "./locale";
import { HREFLANG_ORDER, SITE_URL, localePath, type PagePath } from "./routes";

const OG_LOCALE = { en: "en_CH", it: "it_CH", de: "de_CH", fr: "fr_CH" } as const;

/** Title and description of the site in one language, written into the HTML at build time. */
export function siteMetadata(locale: Locale): Metadata {
  const t = translations[locale];
  const title = `SwissData – ${t.home.title} ${t.home.titleHighlight}`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: t.home.subtitle,
    keywords: ["Switzerland", "statistics", "data", "economy", "demographics", "BFS", "SECO"],
    authors: [{ name: "SwissData" }],
    openGraph: { title, description: t.home.subtitle, type: "website", locale: OG_LOCALE[locale] },
  };
}

/**
 * Metadata of one page in one language: the site's title and description, the canonical address of this
 * language version and the hreflang links to the four versions. x-default is the address without a
 * language, which sends each visitor to their language (src/proxy.ts).
 */
export function pageMetadata(lang: string, path: PagePath): Metadata {
  if (!isLocale(lang)) return {};
  const site = siteMetadata(lang);
  const languages: Record<string, string> = {};
  for (const locale of HREFLANG_ORDER) languages[locale] = localePath(locale, path);
  languages["x-default"] = path || "/";
  return {
    ...site,
    alternates: { canonical: localePath(lang, path), languages },
    openGraph: { ...site.openGraph, url: localePath(lang, path) },
  };
}
