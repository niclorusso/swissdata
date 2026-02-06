"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { BarChart3, Brain, Map, Info, TrendingUp } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();

  const navItems = [
    { href: "/", label: t.nav.dashboard, icon: BarChart3 },
    { href: "/statistics", label: t.nav.statistics, icon: TrendingUp },
    { href: "/quiz", label: t.nav.quiz, icon: Brain },
    { href: "/cantons", label: t.nav.cantons, icon: Map },
    { href: "/about", label: t.nav.about, icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-swiss-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="grid grid-cols-2 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded">
              <span className="flex items-center justify-center text-white font-bold text-[11px] sm:text-[13px] leading-none">+</span>
              <span className="flex items-center justify-center text-white font-bold text-[11px] sm:text-[13px] leading-none">−</span>
              <span className="flex items-center justify-center text-white font-bold text-[11px] sm:text-[13px] leading-none">×</span>
              <span className="flex items-center justify-center text-white font-bold text-[11px] sm:text-[13px] leading-none">÷</span>
            </div>
            <span className="font-bold text-lg sm:text-xl text-swiss-gray-900">
              Swiss<span className="text-primary">Data</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-swiss-gray-600 hover:bg-swiss-gray-100 hover:text-swiss-gray-900"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}

            {/* Language Toggle - Desktop */}
            <div className="ml-2 flex items-center rounded-md border border-swiss-gray-200 overflow-hidden">
              <button
                onClick={() => setLocale("en")}
                className={cn(
                  "px-2.5 py-1.5 text-xs font-semibold transition-colors",
                  locale === "en"
                    ? "bg-swiss-gray-900 text-white"
                    : "text-swiss-gray-500 hover:text-swiss-gray-900"
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLocale("de")}
                className={cn(
                  "px-2.5 py-1.5 text-xs font-semibold transition-colors",
                  locale === "de"
                    ? "bg-swiss-gray-900 text-white"
                    : "text-swiss-gray-500 hover:text-swiss-gray-900"
                )}
              >
                DE
              </button>
              <button
                onClick={() => setLocale("fr")}
                className={cn(
                  "px-2.5 py-1.5 text-xs font-semibold transition-colors",
                  locale === "fr"
                    ? "bg-swiss-gray-900 text-white"
                    : "text-swiss-gray-500 hover:text-swiss-gray-900"
                )}
              >
                FR
              </button>
              <button
                onClick={() => setLocale("it")}
                className={cn(
                  "px-2.5 py-1.5 text-xs font-semibold transition-colors",
                  locale === "it"
                    ? "bg-swiss-gray-900 text-white"
                    : "text-swiss-gray-500 hover:text-swiss-gray-900"
                )}
              >
                IT
              </button>
            </div>
          </nav>

          {/* Mobile: language toggle + nav */}
          <div className="flex md:hidden items-center gap-0.5">
            {/* Language Toggle - Mobile */}
            <div className="flex items-center rounded border border-swiss-gray-200 overflow-hidden mr-0.5">
              <button
                onClick={() => setLocale("en")}
                className={cn(
                  "px-1.5 py-0.5 text-[10px] font-semibold transition-colors",
                  locale === "en"
                    ? "bg-swiss-gray-900 text-white"
                    : "text-swiss-gray-500"
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLocale("de")}
                className={cn(
                  "px-1.5 py-0.5 text-[10px] font-semibold transition-colors",
                  locale === "de"
                    ? "bg-swiss-gray-900 text-white"
                    : "text-swiss-gray-500"
                )}
              >
                DE
              </button>
              <button
                onClick={() => setLocale("fr")}
                className={cn(
                  "px-1.5 py-0.5 text-[10px] font-semibold transition-colors",
                  locale === "fr"
                    ? "bg-swiss-gray-900 text-white"
                    : "text-swiss-gray-500"
                )}
              >
                FR
              </button>
              <button
                onClick={() => setLocale("it")}
                className={cn(
                  "px-1.5 py-0.5 text-[10px] font-semibold transition-colors",
                  locale === "it"
                    ? "bg-swiss-gray-900 text-white"
                    : "text-swiss-gray-500"
                )}
              >
                IT
              </button>
            </div>

            {/* Mobile nav icons */}
            <nav className="flex items-center">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "p-1.5 rounded-md transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-swiss-gray-600 hover:bg-swiss-gray-100"
                    )}
                    title={item.label}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
