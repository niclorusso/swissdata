import type { Locale } from "./translations";

export const LOCALES: Locale[] = ["en", "it", "de", "fr"];
export const DEFAULT_LOCALE: Locale = "en";
/** Cookie that holds the language the visitor chose in the header. The server reads it to render the page. */
export const LOCALE_COOKIE = "swissdata-locale";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as string[]).includes(value);
}

/**
 * The first language of an Accept-Language header that the site has, by descending q value
 * ("fr;q=0.7, it;q=0.9, en;q=0.5" -> "it"). null if none of the four is listed.
 */
export function localeFromAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null;
  const wanted = header
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const weight = q ? Number(q.slice(2)) : 1;
      return { code: tag.trim().slice(0, 2).toLowerCase(), weight: Number.isFinite(weight) ? weight : 0, index };
    })
    .filter((entry) => entry.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);
  for (const entry of wanted) if (isLocale(entry.code)) return entry.code;
  return null;
}
