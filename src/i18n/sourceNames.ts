import type { Locale } from "./translations";

// Publisher of each indicator (the `source` field of src/data/indicators.ts) as the SwissData sites write it:
// the office's full name in the language of the page, then its acronym in that language.
const FSO = { en: "Federal Statistical Office (FSO)", de: "Bundesamt für Statistik (BFS)", fr: "Office fédéral de la statistique (OFS)", it: "Ufficio federale di statistica (UST)" };

const names: Record<string, Record<Locale, string>> = {
  "FSO / UST (Federal Statistical Office)": FSO,
  "FSO (Federal Statistical Office)": FSO,
  "FSO (Federal Statistical Office), STATPOP": { en: `${FSO.en}, STATPOP`, de: `${FSO.de}, STATPOP`, fr: `${FSO.fr}, STATPOP`, it: `${FSO.it}, STATPOP` },
  "FSO / UST (National Accounts)": { en: `${FSO.en}, national accounts`, de: `${FSO.de}, Volkswirtschaftliche Gesamtrechnung`, fr: `${FSO.fr}, comptes nationaux`, it: `${FSO.it}, contabilità nazionale` },
  "FSO (Police Crime Statistics, PCS)": { en: `${FSO.en}, police crime statistics`, de: `${FSO.de}, Polizeiliche Kriminalstatistik`, fr: `${FSO.fr}, statistique policière de la criminalité`, it: `${FSO.it}, statistica criminale di polizia` },
  "FSO (SILC survey)": { en: `${FSO.en}, SILC survey`, de: `${FSO.de}, Erhebung SILC`, fr: `${FSO.fr}, enquête SILC`, it: `${FSO.it}, indagine SILC` },
  "SECO (State Secretariat for Economic Affairs)": { en: "State Secretariat for Economic Affairs (SECO)", de: "Staatssekretariat für Wirtschaft (SECO)", fr: "Secrétariat d'État à l'économie (SECO)", it: "Segreteria di Stato dell'economia (SECO)" },
  "FFA / AFF (Federal Finance Administration)": { en: "Federal Finance Administration (FFA)", de: "Eidgenössische Finanzverwaltung (EFV)", fr: "Administration fédérale des finances (AFF)", it: "Amministrazione federale delle finanze (AFF)" },
  "SFOE (Swiss Federal Office of Energy)": { en: "Swiss Federal Office of Energy (SFOE)", de: "Bundesamt für Energie (BFE)", fr: "Office fédéral de l'énergie (OFEN)", it: "Ufficio federale dell'energia (UFE)" },
  "Eurostat (based on FSO data)": { en: "Eurostat, from data of the Federal Statistical Office (FSO)", de: "Eurostat, nach Daten des Bundesamts für Statistik (BFS)", fr: "Eurostat, d'après les données de l'Office fédéral de la statistique (OFS)", it: "Eurostat, su dati dell'Ufficio federale di statistica (UST)" },
  "Eurostat (based on FSO data); FSO for figures by sex": { en: "Eurostat, from data of the Federal Statistical Office (FSO); FSO for the figures by sex", de: "Eurostat, nach Daten des Bundesamts für Statistik (BFS); BFS für die Zahlen nach Geschlecht", fr: "Eurostat, d'après les données de l'Office fédéral de la statistique (OFS) ; OFS pour les chiffres par sexe", it: "Eurostat, su dati dell'Ufficio federale di statistica (UST); UST per i dati per sesso" },
};

/** Name of the publisher in the language of the page; the text of the data file if it is not in the list. */
export function localizeSource(source: string, locale: Locale): string {
  return names[source]?.[locale] ?? source;
}

// Publisher of the canton figures (first word of the English source in src/data/cantons.ts).
const OFFICES: Record<string, Record<Locale, string>> = {
  FSO,
  SECO: names["SECO (State Secretariat for Economic Affairs)"],
  FOPH: { en: "Federal Office of Public Health (FOPH)", de: "Bundesamt für Gesundheit (BAG)", fr: "Office fédéral de la santé publique (OFSP)", it: "Ufficio federale della sanità pubblica (UFSP)" },
  swisstopo: { en: "Federal Office of Topography (swisstopo)", de: "Bundesamt für Landestopografie (swisstopo)", fr: "Office fédéral de topographie (swisstopo)", it: "Ufficio federale di topografia (swisstopo)" },
};

/** "SECO, registered unemployment, …" -> "Segreteria di Stato dell'economia (SECO)". */
export function cantonPublisher(englishSource: string, locale: Locale): string {
  const office = englishSource.split(/[ ,]/)[0];
  return OFFICES[office]?.[locale] ?? englishSource;
}
