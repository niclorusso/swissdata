"use client";

import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { BrandMark, Wordmark } from "@/components/family/BrandMark";
import { CURRENT_SITE, FAMILY_INDEPENDENT, FAMILY_SITES } from "@/lib/family";

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
                href={site.url}
                aria-current={site.id === CURRENT_SITE ? "true" : undefined}
                className={`block px-3.5 py-3 border border-white/[0.14] rounded-xl min-h-[44px] hover:border-white/40 ${site.id === CURRENT_SITE ? "bg-white/[0.07]" : ""}`}
              >
                <strong className="block text-white text-[15px] font-semibold mb-0.5">{site.name[locale]}</strong>
                <span className="block text-source leading-[1.45]">{site.text[locale]}</span>
              </a>
            ))}
          </nav>
          <p className="mt-4 text-source">{FAMILY_INDEPENDENT[locale]}</p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
          {[
            { href: "/about", label: t.footer.about, external: false },
            { href: "https://www.bfs.admin.ch", label: "BFS", external: true },
            { href: "https://opendata.swiss", label: "OpenData", external: true },
            { href: "https://www.netlify.com", label: "Powered by Netlify", external: true },
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
        <p className="mt-2 text-source max-w-[60ch]">{t.footer.disclaimer}</p>
      </div>
    </footer>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
