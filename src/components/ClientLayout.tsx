"use client";

import { useState, useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { SplashScreen } from "@/components/SplashScreen";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-swiss-gray-200 py-6 sm:py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="grid grid-cols-2 w-6 h-6 bg-primary rounded">
              <span className="flex items-center justify-center text-white font-bold text-[9px] leading-none">+</span>
              <span className="flex items-center justify-center text-white font-bold text-[9px] leading-none">−</span>
              <span className="flex items-center justify-center text-white font-bold text-[9px] leading-none">×</span>
              <span className="flex items-center justify-center text-white font-bold text-[9px] leading-none">÷</span>
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
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  useEffect(() => {
    // Check if user has already seen the splash in this session
    const seen = sessionStorage.getItem("swissdata-splash-seen");
    if (seen) {
      setShowSplash(false);
      setHasSeenSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setHasSeenSplash(true);
    sessionStorage.setItem("swissdata-splash-seen", "true");
  };

  return (
    <LanguageProvider>
      {showSplash && !hasSeenSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      <div className={`min-h-screen flex flex-col ${showSplash && !hasSeenSplash ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
