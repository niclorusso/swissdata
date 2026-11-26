import type { MetadataRoute } from "next";
import { HREFLANG_ORDER, PAGE_PATHS, SITE_URL, localePath } from "@/i18n/routes";

// Every page in each of the four languages, each entry with its hreflang alternates. Built at build time.
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGE_PATHS.flatMap((path) => {
    const languages: Record<string, string> = {};
    for (const locale of HREFLANG_ORDER) languages[locale] = SITE_URL + localePath(locale, path);
    languages["x-default"] = SITE_URL + (path || "/");
    return HREFLANG_ORDER.map((locale) => ({
      url: SITE_URL + localePath(locale, path),
      alternates: { languages },
    }));
  });
}
