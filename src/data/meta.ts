import type { Locale } from "@/i18n/translations";

/**
 * Date (ISO) of the last check of every figure on the site against its source. It is shown on the home
 * page, in the footer and on the About page. Change it only together with a dated entry in
 * src/data/changeLog.ts.
 */
export const DATA_CHECKED = "2026-11-26";

/** Contact of the author, as on the Parliament site (no e-mail address on the page). */
export const CONTACT_URL = "https://nicolalorusso.ch";
export const CONTACT_LABEL = "nicolalorusso.ch";

/** Public repository of the site: error reports open a new issue there (a GitHub account is needed). */
const ISSUES_NEW_URL = "https://github.com/niclorusso/swissdata/issues/new";

const REPORT_TEMPLATE: Record<Locale, { title: string; body: string }> = {
  it: {
    title: "Errore nei dati: ",
    body: "Pagina (indirizzo):\n\nCifra:\n\nChe cosa sembra sbagliato:\n\nFonte (se nota):\n",
  },
  de: {
    title: "Fehler in den Daten: ",
    body: "Seite (Adresse):\n\nZahl:\n\nWas scheint falsch:\n\nQuelle (falls bekannt):\n",
  },
  fr: {
    title: "Erreur dans les données\u202F: ",
    body: "Page (adresse)\u202F:\n\nChiffre\u202F:\n\nCe qui semble faux\u202F:\n\nSource (si connue)\u202F:\n",
  },
  en: {
    title: "Data error: ",
    body: "Page (address):\n\nFigure:\n\nWhat seems wrong:\n\nSource (if known):\n",
  },
};

/** Address that opens a new issue with a short template in the language of the page. */
export function reportErrorUrl(locale: Locale): string {
  const { title, body } = REPORT_TEMPLATE[locale];
  return `${ISSUES_NEW_URL}?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}
