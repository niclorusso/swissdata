"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { BrandMark, Wordmark, Chevron } from "@/components/family/BrandMark";
import { CURRENT_SITE, FAMILY_SITES, LANGUAGES } from "@/lib/family";

/** A button that opens a small panel. Closes on Escape (focus back on the button), on a click outside and when focus leaves. */
function useDisclosure() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onBlur = (event: React.FocusEvent) => {
    if (root.current && event.relatedTarget && !root.current.contains(event.relatedTarget as Node)) setOpen(false);
  };

  return { open, setOpen, root, button, onBlur };
}

const panel =
  "absolute top-[42px] z-[80] bg-white border border-line rounded-xl shadow-[0_12px_32px_rgba(20,24,29,0.14)] p-1.5";

/** "SwissData / Section": the section name opens the list of the three SwissData sites. */
function SectionSwitcher() {
  const { locale, t } = useLanguage();
  const { open, setOpen, root, button, onBlur } = useDisclosure();
  const id = useId();
  const current = FAMILY_SITES.find((site) => site.id === CURRENT_SITE)!;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg leading-none whitespace-nowrap min-w-0">
      <Link href="/" className="inline-flex items-center gap-1.5 sm:gap-2 min-h-[44px]" aria-label="SwissData">
        <BrandMark size={28} className="w-6 h-6 sm:w-7 sm:h-7" />
        <Wordmark />
      </Link>
      <span aria-hidden="true" className="font-normal text-[#a9a69c]">/</span>
      <div ref={root} className="relative" onBlur={onBlur}>
        <button
          ref={button}
          type="button"
          aria-expanded={open}
          aria-controls={id}
          aria-label={`${t.nav.switchSite}: ${current.short[locale]}`}
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-[3px] min-h-[44px] font-semibold text-swiss-gray-600 hover:text-ink"
        >
          {current.short[locale]}
          <Chevron className={cn("transition-transform", open && "rotate-180")} />
        </button>
        <div id={id} hidden={!open} className={cn(panel, "-left-3 min-w-[230px]")}>
          <ul aria-label={t.nav.switchSite}>
            {FAMILY_SITES.map((site) => (
              <li key={site.id}>
                <a
                  href={site.url}
                  aria-current={site.id === CURRENT_SITE ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 min-h-[44px] px-2.5 rounded-lg text-[15px] hover:bg-paper",
                    site.id === CURRENT_SITE ? "bg-paper text-ink font-semibold" : "text-swiss-gray-600 font-medium"
                  )}
                >
                  <Wordmark /> <span>/ {site.short[locale]}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** The language as one pill ("IT ▾") that opens the four languages. */
function LanguageMenu() {
  const { locale, setLocale, t } = useLanguage();
  const { open, setOpen, root, button, onBlur } = useDisclosure();
  const id = useId();

  return (
    <div ref={root} className="relative flex-none" onBlur={onBlur}>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${t.nav.language}: ${LANGUAGES.find((l) => l.code === locale)?.label}`}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 h-11 sm:h-9 px-2.5 sm:px-3 border border-swiss-gray-300 rounded-full bg-white text-ink text-sm font-semibold"
      >
        {locale.toUpperCase()}
        <Chevron className={cn("transition-transform", open && "rotate-180")} />
      </button>
      <div id={id} hidden={!open} className={cn(panel, "right-0 sm:top-[40px] top-[48px] min-w-[170px]")}>
        <ul aria-label={t.nav.language}>
          {LANGUAGES.map((language) => (
            <li key={language.code}>
              <button
                type="button"
                lang={language.code}
                aria-current={language.code === locale ? "true" : undefined}
                onClick={() => {
                  setLocale(language.code);
                  setOpen(false);
                  button.current?.focus();
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-4 min-h-[44px] px-2.5 rounded-lg text-[15px] hover:bg-paper",
                  language.code === locale ? "bg-paper text-ink font-semibold" : "text-swiss-gray-600 font-medium"
                )}
              >
                {language.label}
                <span className="text-sm">{language.code.toUpperCase()}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** The pages of this site as one row of words. On phones the row scrolls sideways and a fade with an arrow shows that there is more. */
function PageRow() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const row = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState({ left: false, right: false });

  const pages = [
    { href: "/", label: t.nav.dashboard },
    { href: "/statistics", label: t.nav.statistics },
    { href: "/quiz", label: t.nav.quiz },
    { href: "/cantons", label: t.nav.cantons },
    { href: "/about", label: t.nav.about },
  ];

  const measure = useCallback(() => {
    const el = row.current;
    if (!el) return;
    const left = el.scrollLeft > 4;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setMore((previous) => (previous.left === left && previous.right === right ? previous : { left, right }));
  }, []);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    // bring the current page into view inside the row (the page itself does not move)
    const current = el.querySelector<HTMLElement>('[aria-current="page"]');
    if (current) {
      const overRight = current.offsetLeft + current.offsetWidth - (el.scrollLeft + el.clientWidth);
      if (overRight > 0) el.scrollLeft += overRight + 24;
      else if (current.offsetLeft < el.scrollLeft) el.scrollLeft = Math.max(0, current.offsetLeft - 24);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname, t, measure]);

  return (
    <div className="relative order-3 basis-full md:order-2 md:basis-auto md:ml-auto border-t border-[#eceae3] md:border-0 -mx-2 md:mx-0 min-w-0">
      <nav aria-label={t.nav.pages}>
        <div ref={row} onScroll={measure} className="sdf-navrow flex gap-1 overflow-x-auto">
          {pages.map((page) => {
            const active = pathname === page.href;
            return (
              <Link
                key={page.href}
                href={page.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex-none inline-flex items-center min-h-[44px] px-2.5 text-[15px] font-medium whitespace-nowrap",
                  active ? "text-ink shadow-[inset_0_-3px_0_var(--sdf-accent)]" : "text-swiss-gray-600 hover:text-ink"
                )}
              >
                {page.label}
              </Link>
            );
          })}
        </div>
      </nav>
      {more.left && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-9 flex items-center justify-start pl-1 text-swiss-gray-600 bg-gradient-to-r from-[#f5f4ef] via-[#f5f4efe6] to-transparent md:hidden">
          <Chevron className="rotate-90" />
        </span>
      )}
      {more.right && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-9 flex items-center justify-end pr-1 text-swiss-gray-600 bg-gradient-to-l from-[#f5f4ef] via-[#f5f4efe6] to-transparent md:hidden">
          <Chevron className="-rotate-90" />
        </span>
      )}
    </div>
  );
}

/** Family header: mark + "SwissData / Section" at the left, the language pill at the right, the pages as one row of words. */
export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-[rgba(245,244,239,0.92)] backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-x-4 min-h-[52px] md:min-h-[60px]">
          <div className="order-1 flex items-center min-h-[52px]">
            <SectionSwitcher />
          </div>
          <PageRow />
          <div className="order-2 md:order-3 ml-auto md:ml-0 flex items-center">
            <LanguageMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
