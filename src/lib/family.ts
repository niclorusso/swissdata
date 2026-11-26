import { LocalizedText } from "@/types";

// The three SwissData sites. The header (section switcher) and the footer of each site show the same three.
export type FamilySiteId = "sd" | "parl" | "spend";

export interface FamilySite {
  id: FamilySiteId;
  url: string;
  /** name in the header switcher */
  short: LocalizedText;
  /** name in the footer */
  name: LocalizedText;
  /** one line in the footer */
  text: LocalizedText;
}

export const CURRENT_SITE: FamilySiteId = "sd";

export const FAMILY_SITES: FamilySite[] = [
  {
    id: "sd",
    url: "https://swissdata-platform.ch",
    short: { it: "Indicatori", de: "Indikatoren", fr: "Indicateurs", en: "Indicators" },
    name: { it: "Indicatori", de: "Indikatoren", fr: "Indicateurs", en: "Indicators" },
    text: {
      it: "Indicatori su economia, popolazione e società, con quiz e confronto tra Cantoni.",
      en: "Indicators on the economy, population and society, with a quiz and a comparison of cantons.",
      de: "Indikatoren zu Wirtschaft, Bevölkerung und Gesellschaft, mit Quiz und Kantonsvergleich.",
      fr: "Indicateurs sur l'économie, la population et la société, avec un quiz et une comparaison des cantons.",
    },
  },
  {
    id: "parl",
    url: "https://parliament.swissdata-platform.ch",
    short: { it: "Parlamento", de: "Parlament", fr: "Parlement", en: "Parliament" },
    name: { it: "Parlamento", de: "Parlament", fr: "Parlement", en: "Parliament" },
    text: {
      it: "Il Consiglio nazionale, votazione per votazione.",
      en: "The National Council, vote by vote.",
      de: "Der Nationalrat, Abstimmung für Abstimmung.",
      fr: "Le Conseil national, vote par vote.",
    },
  },
  {
    id: "spend",
    url: "https://spending.swissdata-platform.ch",
    short: { it: "Spesa", de: "Ausgaben", fr: "Dépenses", en: "Spending" },
    name: { it: "Spesa pubblica", de: "Öffentliche Ausgaben", fr: "Dépenses publiques", en: "Public spending" },
    text: {
      it: "Quanto spendono Confederazione, Cantoni e Comuni, e per che cosa.",
      en: "How much the Confederation, cantons and municipalities spend, and on what.",
      de: "Wie viel Bund, Kantone und Gemeinden ausgeben, und wofür.",
      fr: "Combien dépensent la Confédération, les cantons et les communes, et pour quoi.",
    },
  },
];

/**
 * Address of a SwissData site for a visitor reading in `locale`, so that the language is kept where the
 * target can take it:
 * - this site: its own home page (the language is already known here);
 * - Parliament: it, de, fr, en through ?lang= (read by its i18n setup, then remembered there);
 * - Spending: Italian at the root, English under /en/ (German and French readers get English).
 */
export function familySiteHref(site: FamilySite, locale: "it" | "de" | "fr" | "en"): string {
  if (site.id === CURRENT_SITE) return "/";
  if (site.id === "parl") return `${site.url}/?lang=${locale}`;
  return locale === "it" ? `${site.url}/` : `${site.url}/en/`;
}

export const FAMILY_INDEPENDENT: LocalizedText = {
  it: "Progetto indipendente di Nicola Lo Russo. Non è un sito ufficiale della Confederazione.",
  en: "Independent project by Nicola Lo Russo. Not an official website of the Confederation.",
  de: "Unabhängiges Projekt von Nicola Lo Russo. Keine offizielle Website des Bundes.",
  fr: "Projet indépendant de Nicola Lo Russo. Ce n'est pas un site officiel de la Confédération.",
};

export const LANGUAGES: { code: "it" | "de" | "fr" | "en"; label: string }[] = [
  { code: "it", label: "Italiano" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];
