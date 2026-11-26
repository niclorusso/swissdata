import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, localeFromAcceptLanguage } from "@/i18n/locale";

/**
 * The addresses without a language (/, /cantons, /statistics, /quiz, /about: the addresses of the site
 * before each language had its own) send the visitor to the same page in a language: the one chosen in
 * the header (cookie swissdata-locale), else the first of the browser's languages that the site has
 * (Accept-Language, by q value), else English. Only a redirect: the pages themselves are static HTML,
 * prerendered in each language, and this code does not run for them.
 *
 * Why not Netlify's _redirects with Language= and Cookie= conditions: on Netlify the Next.js adapter serves
 * every page through one function on /*, and Netlify checks functions before _redirects
 * (https://docs.netlify.com/resources/troubleshooting/request-chain/), so those rules would not be reached
 * for these paths. This proxy runs on Netlify as an edge function, before that function.
 */
export function proxy(request: NextRequest) {
  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(chosen)
    ? chosen
    : localeFromAcceptLanguage(request.headers.get("accept-language")) ?? DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = url.pathname === "/" ? `/${locale}` : `/${locale}${url.pathname}`;
  const response = NextResponse.redirect(url, 302);
  // the target depends on the cookie and the browser's languages: no shared cache may keep it
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Cookie, Accept-Language");
  return response;
}

// Only the old addresses; every address that starts with /it, /de, /fr or /en goes straight to its page.
export const config = {
  matcher: ["/", "/cantons", "/statistics", "/quiz", "/about"],
};
