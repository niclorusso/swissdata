import type { Locale } from "./translations";

// Publisher of each indicator (the `source` field of src/data/indicators.ts) with the office's
// official name in the language of the page.
const FSO = { en: "FSO, Federal Statistical Office", de: "BFS, Bundesamt für Statistik", fr: "OFS, Office fédéral de la statistique", it: "UST, Ufficio federale di statistica" };

const names: Record<string, Record<Locale, string>> = {
  "FSO / UST (Federal Statistical Office)": FSO,
  "FSO (Federal Statistical Office)": FSO,
  "FSO (Federal Statistical Office), STATPOP": { en: `${FSO.en} (STATPOP)`, de: `${FSO.de} (STATPOP)`, fr: `${FSO.fr} (STATPOP)`, it: `${FSO.it} (STATPOP)` },
  "FSO / UST (National Accounts)": { en: `${FSO.en} (national accounts)`, de: `${FSO.de} (Volkswirtschaftliche Gesamtrechnung)`, fr: `${FSO.fr} (comptes nationaux)`, it: `${FSO.it} (contabilità nazionale)` },
  "FSO (Police Crime Statistics, PCS)": { en: `${FSO.en} (police crime statistics)`, de: `${FSO.de} (Polizeiliche Kriminalstatistik)`, fr: `${FSO.fr} (statistique policière de la criminalité)`, it: `${FSO.it} (statistica criminale di polizia)` },
  "FSO (SILC survey)": { en: `${FSO.en} (SILC survey)`, de: `${FSO.de} (Erhebung SILC)`, fr: `${FSO.fr} (enquête SILC)`, it: `${FSO.it} (indagine SILC)` },
  "SECO (State Secretariat for Economic Affairs)": { en: "SECO, State Secretariat for Economic Affairs", de: "SECO, Staatssekretariat für Wirtschaft", fr: "SECO, Secrétariat d'État à l'économie", it: "SECO, Segreteria di Stato dell'economia" },
  "FFA / AFF (Federal Finance Administration)": { en: "FFA, Federal Finance Administration", de: "EFV, Eidgenössische Finanzverwaltung", fr: "AFF, Administration fédérale des finances", it: "AFF, Amministrazione federale delle finanze" },
  "SFOE (Swiss Federal Office of Energy)": { en: "SFOE, Swiss Federal Office of Energy", de: "BFE, Bundesamt für Energie", fr: "OFEN, Office fédéral de l'énergie", it: "UFE, Ufficio federale dell'energia" },
  "Eurostat (based on FSO data)": { en: "Eurostat (based on FSO data)", de: "Eurostat (auf Basis von BFS-Daten)", fr: "Eurostat (d'après les données de l'OFS)", it: "Eurostat (su dati dell'UST)" },
  "Eurostat (based on FSO data); FSO for figures by sex": { en: "Eurostat (based on FSO data); FSO for figures by sex", de: "Eurostat (auf Basis von BFS-Daten); BFS für die Zahlen nach Geschlecht", fr: "Eurostat (d'après les données de l'OFS) ; OFS pour les chiffres par sexe", it: "Eurostat (su dati dell'UST); UST per i dati per sesso" },
};

/** Name of the publisher in the language of the page; the text of the data file if it is not in the list. */
export function localizeSource(source: string, locale: Locale): string {
  return names[source]?.[locale] ?? source;
}
