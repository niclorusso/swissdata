import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE } from "@/i18n/locale";
import { HREFLANG_ORDER, SITE_URL, localePath, type PagePath } from "@/i18n/routes";
import { LANGUAGES } from "@/lib/family";

/**
 * Static fallback for the addresses without a language (/, /statistics, /quiz, /cantons, /about, /changes).
 * Normally src/proxy.ts answers these addresses with a redirect before any page is served. If the proxy does
 * not run (for example if the host does not deploy it), this prerendered page does the same in the browser:
 * the language chosen in the header (cookie), else the first of the browser's languages that the site has,
 * else English. Without JavaScript it shows the four language versions as plain links.
 */
export function LanguageRedirect({ path }: { path: PagePath }) {
  const script =
    "(function(){" +
    `var a=${JSON.stringify(LOCALES)},p=${JSON.stringify(path)},l=null;` +
    `var m=document.cookie.match(/(?:^|;\\s*)${LOCALE_COOKIE}=([^;]+)/);` +
    "if(m&&a.indexOf(m[1])>=0)l=m[1];" +
    "var n=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''];" +
    "for(var i=0;!l&&i<n.length;i++){var c=String(n[i]).slice(0,2).toLowerCase();if(a.indexOf(c)>=0)l=c;}" +
    `location.replace('/'+(l||${JSON.stringify(DEFAULT_LOCALE)})+p+location.search+location.hash);` +
    "})();";
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <p>SwissData</p>
        <ul>
          {LANGUAGES.map(({ code, label }) => (
            <li key={code}>
              <a href={localePath(code, path)} hrefLang={code} lang={code}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </noscript>
    </>
  );
}

/**
 * Metadata of the fallback page: the same hreflang links as the four language versions, whose x-default is
 * this address; the canonical address is this address itself, as for each language version.
 */
export function languageRedirectMetadata(path: PagePath): Metadata {
  const languages: Record<string, string> = {};
  for (const locale of HREFLANG_ORDER) languages[locale] = localePath(locale, path);
  languages["x-default"] = path || "/";
  return {
    metadataBase: new URL(SITE_URL),
    title: "SwissData",
    alternates: { canonical: path || "/", languages },
  };
}
