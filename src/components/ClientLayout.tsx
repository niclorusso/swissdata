"use client";

import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/translations";
import { Navigation } from "@/components/Navigation";
import { BrandMark, Wordmark } from "@/components/family/BrandMark";
import { CURRENT_SITE, FAMILY_INDEPENDENT, FAMILY_SITES, familySiteHref } from "@/lib/family";
import { localePath } from "@/i18n/routes";
import { CONTACT_LABEL, CONTACT_URL, DATA_CHECKED } from "@/data/meta";
import { colon, formatLongDate } from "@/lib/formatters";

/** Family footer: the three SwissData sites and the line on independence first, then this site's own links. */
function Footer() {
  const { t, locale } = useLanguage();

  return (
    <footer className="mt-12 pt-9 pb-7 text-[#b9bdc3]" style={{ background: "var(--sdf-footer)" }}>
      <div className="container mx-auto px-4">
        <div className="pb-7 mb-7 border-b border-white/[0.12]">
          <div className="flex items-center gap-2 text-lg mb-[18px]">
            <BrandMark size={26} />
            <Wordmark onDark />
          </div>
          <nav aria-label="SwissData" className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            {FAMILY_SITES.map((site) => (
              <a
                key={site.id}
                href={familySiteHref(site, locale)}
                aria-current={site.id === CURRENT_SITE ? "true" : undefined}
                className={`block px-3.5 py-3 border border-white/[0.14] rounded-xl min-h-[44px] hover:border-white/40 ${site.id === CURRENT_SITE ? "bg-white/[0.07]" : ""}`}
              >
                <strong className="block text-white text-[15px] font-[650] mb-0.5">{site.name[locale]}</strong>
                <span className="block text-source leading-[1.45]">{site.text[locale]}</span>
              </a>
            ))}
          </nav>
          <p className="mt-4 text-source">{FAMILY_INDEPENDENT[locale]}</p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
          {[
            { href: localePath(locale, "/about"), label: t.footer.about, external: false },
            { href: localePath(locale, "/changes"), label: t.footer.changeLog, external: false },
            { href: CONTACT_URL, label: `${t.footer.contact}${colon(locale)} ${CONTACT_LABEL}`, external: true },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center min-h-[44px] min-w-[44px] text-[#d7dade] hover:text-white hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="mt-1 text-sm text-[#d7dade]">
          {t.common.lastCheck.replace("{lastCheck}", formatLongDate(DATA_CHECKED, locale))}
        </p>
        <p className="mt-2 text-source max-w-[60ch]">{t.footer.disclaimer}</p>
        {/* Netlify's open-source plan asks for this link; the owner will confirm whether the site is on that plan */}
        <p className="mt-4 text-source">
          <a
            href="https://www.netlify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-[44px] text-[#b9bdc3] hover:text-white hover:underline"
          >
            Powered by Netlify
          </a>
        </p>
      </div>
    </footer>
  );
}

export function ClientLayout({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <LanguageProvider locale={locale}>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
