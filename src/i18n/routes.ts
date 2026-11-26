import type { Locale } from "./translations";

export const SITE_URL = "https://swissdata-platform.ch";

/**
 * The pages of the site, without the language ("" is the home page). Each one exists four times,
 * at /it…, /de…, /fr… and /en…, prerendered at build time.
 */
export const PAGE_PATHS = ["", "/statistics", "/quiz", "/cantons", "/about"] as const;
export type PagePath = (typeof PAGE_PATHS)[number];

/** Order of the languages in the hreflang links and in the sitemap. */
export const HREFLANG_ORDER: Locale[] = ["it", "de", "fr", "en"];

/** Address of a page in a language: ("de", "/cantons") -> "/de/cantons", ("de", "") -> "/de". */
export function localePath(locale: Locale, path: string = ""): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

/** The same page in another language: ("/de/cantons", "fr") -> "/fr/cantons". */
export function switchLocalePath(pathname: string, locale: Locale): string {
  return localePath(locale, pathname.replace(/^\/(?:it|de|fr|en)(?=\/|$)/, ""));
}
