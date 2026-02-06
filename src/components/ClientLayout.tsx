"use client";

import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { Navigation } from "@/components/Navigation";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-swiss-gray-200 py-6 sm:py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 bg-primary rounded">
              <span className="text-white font-bold text-sm">+</span>
            </div>
            <span className="font-semibold text-swiss-gray-900">
              SwissData
            </span>
          </div>
          <p className="text-xs sm:text-sm text-swiss-gray-500 text-center px-4">
            {t.footer.disclaimer}
          </p>
          <div className="flex items-center gap-4 text-sm text-swiss-gray-500">
            <a href="/about" className="hover:text-swiss-gray-900">
              {t.footer.about}
            </a>
            <a
              href="https://www.bfs.admin.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-swiss-gray-900"
            >
              BFS
            </a>
            <a
              href="https://opendata.swiss"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-swiss-gray-900"
            >
              OpenData
            </a>
            <a
              href="https://www.netlify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-swiss-gray-900"
            >
              Powered by Netlify
            </a>
          </div>
        </div>
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
