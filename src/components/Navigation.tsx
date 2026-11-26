"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { colon } from "@/lib/formatters";
import { rememberLocale, useLanguage } from "@/i18n/LanguageContext";
import { localePath, switchLocalePath } from "@/i18n/routes";
import { BrandMark, Wordmark, Chevron } from "@/components/family/BrandMark";
import { CURRENT_SITE, FAMILY_SITES, LANGUAGES, familySiteHref } from "@/lib/family";

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
    // the panel opens under the lockup, aligned with the mark
    <div ref={root} onBlur={onBlur} className="relative flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg leading-none whitespace-nowrap min-w-0 max-[359px]:gap-1">
      <Link href={localePath(locale)} className="inline-flex items-center gap-1.5 max-[359px]:gap-1 sm:gap-2 min-h-[44px]" aria-label="SwissData">
        <BrandMark size={28} className="w-6 h-6 sm:w-7 sm:h-7" />
        <Wordmark />
      </Link>
      <span aria-hidden="true" className="font-normal text-[#a9a69c]">/</span>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${t.nav.switchSite}${colon(locale)} ${current.short[locale]}`}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-[3px] min-h-[44px] font-semibold text-swiss-gray-600 hover:text-ink"
      >
        {current.short[locale]}
        <Chevron className={cn("transition-transform", open && "rotate-180")} />
      </button>
      <div id={id} hidden={!open} className={cn(panel, "left-0 min-w-[230px] max-w-[calc(100vw-32px)]")}>
        <ul aria-label={t.nav.switchSite}>
          {FAMILY_SITES.map((site) => (
            <li key={site.id}>
              <a
                href={familySiteHref(site, locale)}
                aria-current={site.id === CURRENT_SITE ? "true" : undefined}
                className={cn(
                  "flex items-center gap-1.5 min-h-[44px] px-2.5 rounded-lg text-[15px] hover:bg-paper",
                  site.id === CURRENT_SITE ? "bg-paper text-ink font-[650]" : "text-swiss-gray-600 font-medium"
                )}
              >
                <Wordmark /> <span>/ {site.short[locale]}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * The language as one pill ("IT ▾") that opens the four languages, each a link to the same page in that
 * language. A click also remembers the choice for the addresses without a language (/, /cantons, …).
 */
function LanguageMenu() {
  const { locale, t } = useLanguage();
  const pathname = usePathname();
  const { open, setOpen, root, button, onBlur } = useDisclosure();
  const id = useId();

  return (
    <div ref={root} className="relative flex-none" onBlur={onBlur}>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${t.nav.language}${colon(locale)} ${LANGUAGES.find((l) => l.code === locale)?.label}`}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 h-11 lg:h-9 px-2.5 max-[359px]:px-2 lg:px-3 border border-swiss-gray-300 rounded-full bg-white text-ink text-sm font-semibold"
      >
        {locale.toUpperCase()}
        <Chevron className={cn("transition-transform", open && "rotate-180")} />
      </button>
      <div id={id} hidden={!open} className={cn(panel, "right-0 top-[48px] lg:top-[40px] min-w-[170px] max-w-[calc(100vw-32px)]")}>
        <ul aria-label={t.nav.language}>
          {LANGUAGES.map((language) => (
            <li key={language.code}>
              <a
                href={switchLocalePath(pathname, language.code)}
                hrefLang={language.code}
                lang={language.code}
                aria-current={language.code === locale ? "true" : undefined}
                onClick={() => rememberLocale(language.code)}
                className={cn(
                  "flex w-full items-center gap-2.5 min-h-[44px] px-2.5 rounded-lg text-[15px] hover:bg-paper",
                  language.code === locale ? "bg-paper text-ink font-semibold" : "text-swiss-gray-600 font-medium"
                )}
              >
                <span className="w-6 font-semibold">{language.code.toUpperCase()}</span>
                {language.label}
              </a>
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
  const { t, locale } = useLanguage();
  const row = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState({ left: false, right: false });

  const pages = [
    { href: localePath(locale, "/statistics"), label: t.nav.statistics },
    { href: localePath(locale, "/cantons"), label: t.nav.cantons },
    { href: localePath(locale, "/quiz"), label: t.nav.quiz },
    { href: localePath(locale, "/about"), label: t.nav.about },
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
    <div className="order-3 basis-full lg:order-2 lg:basis-auto lg:ml-auto border-t border-[#eceae3] lg:border-0 -mx-2 lg:mx-0 min-w-0 relative">
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
                  "flex-none inline-flex items-center min-h-[44px] px-2.5 text-[15px] font-[550] whitespace-nowrap",
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
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-9 flex items-center justify-start pl-1 text-swiss-gray-600 bg-gradient-to-r from-[#f5f4ef] via-[#f5f4efe6] to-transparent lg:hidden">
          <Chevron className="rotate-90" />
        </span>
      )}
      {more.right && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-9 flex items-center justify-end pr-1 text-swiss-gray-600 bg-gradient-to-l from-[#f5f4ef] via-[#f5f4efe6] to-transparent lg:hidden">
          <Chevron className="-rotate-90" />
        </span>
      )}
    </div>
  );
}

/**
 * Family header: mark + "SwissData / Section" at the left, the language pill at the right, the pages as one row
 * of words. On the paper background and not sticky, as on the other two sites: more room for the content on phones.
 */
export function Navigation() {
  return (
    <header className="relative z-50 w-full border-b border-line bg-paper">
      <div className="container mx-auto px-4">
        {/* below 1024px: two rows (lockup and language, then the pages); from 1024px: one row */}
        <div className="relative flex flex-wrap items-center gap-x-2 sm:gap-x-4 min-h-[52px] lg:min-h-[60px]">
          <div className="order-1 flex items-center min-h-[52px]">
            <SectionSwitcher />
          </div>
          <PageRow />
          <div className="order-2 lg:order-3 ml-auto lg:ml-0 flex items-center">
            <LanguageMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
