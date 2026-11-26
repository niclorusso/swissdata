import { cookies, headers } from "next/headers";
import type { Locale } from "./translations";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, localeFromAcceptLanguage } from "./locale";

/**
 * Language of the request, decided on the server so that the HTML arrives in the right language:
 * 1. the language the visitor chose (cookie), 2. the browser's languages (Accept-Language), 3. English.
 */
export async function getRequestLocale(): Promise<Locale> {
  const chosen = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(chosen)) return chosen;
  return localeFromAcceptLanguage((await headers()).get("accept-language")) ?? DEFAULT_LOCALE;
}
