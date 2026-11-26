import type { Locale } from "./translations";

/**
 * Labels of the quiz comparison charts (the `label` of comparisonData in src/data/questions.ts) in the four
 * languages: countries, cantons, regions, budget areas, energy sources. A label that is not listed (a year)
 * is shown as written.
 */
const labels: Record<string, Record<Locale, string>> = {
  "Switzerland": { en: "Switzerland", it: "Svizzera", de: "Schweiz", fr: "Suisse" },
  "Germany": { en: "Germany", it: "Germania", de: "Deutschland", fr: "Allemagne" },
  "France": { en: "France", it: "Francia", de: "Frankreich", fr: "France" },
  "Italy": { en: "Italy", it: "Italia", de: "Italien", fr: "Italie" },
  "Austria": { en: "Austria", it: "Austria", de: "Österreich", fr: "Autriche" },
  "Netherlands": { en: "Netherlands", it: "Paesi Bassi", de: "Niederlande", fr: "Pays-Bas" },
  "Belgium": { en: "Belgium", it: "Belgio", de: "Belgien", fr: "Belgique" },
  "Spain": { en: "Spain", it: "Spagna", de: "Spanien", fr: "Espagne" },
  "USA": { en: "USA", it: "Stati Uniti", de: "USA", fr: "États-Unis" },
  "United States": { en: "United States", it: "Stati Uniti", de: "USA", fr: "États-Unis" },
  "UK": { en: "UK", it: "Regno Unito", de: "Vereinigtes Königreich", fr: "Royaume-Uni" },
  "EU Average": { en: "EU Average", it: "Media UE", de: "EU-Durchschnitt", fr: "Moyenne UE" },
  "EU average": { en: "EU average", it: "Media UE", de: "EU-Durchschnitt", fr: "Moyenne UE" },
  "EU": { en: "EU", it: "UE", de: "EU", fr: "UE" },
  "OECD Average": { en: "OECD Average", it: "Media OCSE", de: "OECD-Durchschnitt", fr: "Moyenne OCDE" },
  "Sweden": { en: "Sweden", it: "Svezia", de: "Schweden", fr: "Suède" },
  "Luxembourg": { en: "Luxembourg", it: "Lussemburgo", de: "Luxemburg", fr: "Luxembourg" },
  "Denmark": { en: "Denmark", it: "Danimarca", de: "Dänemark", fr: "Danemark" },
  "Japan": { en: "Japan", it: "Giappone", de: "Japan", fr: "Japon" },
  "Ireland": { en: "Ireland", it: "Irlanda", de: "Irland", fr: "Irlande" },
  "Romania": { en: "Romania", it: "Romania", de: "Rumänien", fr: "Roumanie" },
  "Poland": { en: "Poland", it: "Polonia", de: "Polen", fr: "Pologne" },
  "China": { en: "China", it: "Cina", de: "China", fr: "Chine" },
  "Slovenia": { en: "Slovenia", it: "Slovenia", de: "Slowenien", fr: "Slovénie" },
  "Slovakia": { en: "Slovakia", it: "Slovacchia", de: "Slowakei", fr: "Slovaquie" },
  "Singapore": { en: "Singapore", it: "Singapore", de: "Singapur", fr: "Singapour" },
  "Russia": { en: "Russia", it: "Russia", de: "Russland", fr: "Russie" },
  "Norway": { en: "Norway", it: "Norvegia", de: "Norwegen", fr: "Norvège" },
  "Korea": { en: "Korea", it: "Corea del Sud", de: "Südkorea", fr: "Corée du Sud" },
  "India": { en: "India", it: "India", de: "Indien", fr: "Inde" },
  "Iceland": { en: "Iceland", it: "Islanda", de: "Island", fr: "Islande" },
  "Greece": { en: "Greece", it: "Grecia", de: "Griechenland", fr: "Grèce" },
  "Estonia": { en: "Estonia", it: "Estonia", de: "Estland", fr: "Estonie" },
  "Canada": { en: "Canada", it: "Canada", de: "Kanada", fr: "Canada" },
  "Zug": { en: "Zug", it: "Zugo", de: "Zug", fr: "Zoug" },
  "Ticino": { en: "Ticino", it: "Ticino", de: "Tessin", fr: "Tessin" },
  "Jura": { en: "Jura", it: "Giura", de: "Jura", fr: "Jura" },
  "Solothurn": { en: "Solothurn", it: "Soletta", de: "Solothurn", fr: "Soleure" },
  "Obwalden": { en: "Obwalden", it: "Obvaldo", de: "Obwalden", fr: "Obwald" },
  "Geneva": { en: "Geneva", it: "Ginevra", de: "Genf", fr: "Genève" },
  "Basel-Stadt": { en: "Basel-Stadt", it: "Basilea Città", de: "Basel-Stadt", fr: "Bâle-Ville" },
  "Geneva (canton)": { en: "Geneva (canton)", it: "Ginevra (Cantone)", de: "Genf (Kanton)", fr: "Genève (canton)" },
  "Bern (canton)": { en: "Bern (canton)", it: "Berna (Cantone)", de: "Bern (Kanton)", fr: "Berne (canton)" },
  "Zurich (canton)": { en: "Zurich (canton)", it: "Zurigo (Cantone)", de: "Zürich (Kanton)", fr: "Zurich (canton)" },
  "Zürich region": { en: "Zürich region", it: "Regione di Zurigo", de: "Region Zürich", fr: "Région de Zurich" },
  "Western Switzerland 2025": { en: "Western Switzerland 2025", it: "Svizzera romanda 2025", de: "Westschweiz 2025", fr: "Suisse romande 2025" },
  "Ticino 2025": { en: "Ticino 2025", it: "Ticino 2025", de: "Tessin 2025", fr: "Tessin 2025" },
  "SBB 2025": { en: "SBB 2025", it: "FFS 2025", de: "SBB 2025", fr: "CFF 2025" },
  "SBB 2024": { en: "SBB 2024", it: "FFS 2024", de: "SBB 2024", fr: "CFF 2024" },
  "Swiss Median": { en: "Swiss Median", it: "Mediana svizzera", de: "Schweizer Median", fr: "Médiane suisse" },
  "From Italy": { en: "From Italy", it: "Dall'Italia", de: "Aus Italien", fr: "D'Italie" },
  "From Germany": { en: "From Germany", it: "Dalla Germania", de: "Aus Deutschland", fr: "D'Allemagne" },
  "From France": { en: "From France", it: "Dalla Francia", de: "Aus Frankreich", fr: "De France" },
  "From Austria": { en: "From Austria", it: "Dall'Austria", de: "Aus Österreich", fr: "D'Autriche" },
  "Urban (incl. intermediate)": { en: "Urban (incl. intermediate)", it: "Urbano e intermedio", de: "Städtisch und intermediär", fr: "Urbain et intermédiaire" },
  "Rural": { en: "Rural", it: "Rurale", de: "Ländlich", fr: "Rural" },
  "Hydropower": { en: "Hydropower", it: "Idroelettrico", de: "Wasserkraft", fr: "Hydraulique" },
  "Nuclear": { en: "Nuclear", it: "Nucleare", de: "Kernenergie", fr: "Nucléaire" },
  "Photovoltaics": { en: "Photovoltaics", it: "Fotovoltaico", de: "Photovoltaik", fr: "Photovoltaïque" },
  "Wind": { en: "Wind", it: "Eolico", de: "Wind", fr: "Éolien" },
  "Thermal plants": { en: "Thermal plants", it: "Centrali termiche", de: "Thermische Kraftwerke", fr: "Centrales thermiques" },
  "Social Welfare": { en: "Social Welfare", it: "Previdenza sociale", de: "Soziale Wohlfahrt", fr: "Prévoyance sociale" },
  "Finances & Taxes": { en: "Finances & Taxes", it: "Finanze e imposte", de: "Finanzen und Steuern", fr: "Finances et impôts" },
  "Transport": { en: "Transport", it: "Trasporti", de: "Verkehr", fr: "Transports" },
  "Education & Research": { en: "Education & Research", it: "Formazione e ricerca", de: "Bildung und Forschung", fr: "Formation et recherche" },
  "Security": { en: "Security", it: "Sicurezza", de: "Sicherheit", fr: "Sécurité" },
  "Agriculture": { en: "Agriculture", it: "Agricoltura", de: "Landwirtschaft", fr: "Agriculture" },
  "Foreign Affairs": { en: "Foreign Affairs", it: "Relazioni con l'estero", de: "Beziehungen zum Ausland", fr: "Relations avec l'étranger" },
  "Total": { en: "Total", it: "Totale", de: "Total", fr: "Total" },
  "All assets managed": { en: "All assets managed", it: "Tutti i patrimoni gestiti", de: "Alle verwalteten Vermögen", fr: "Tous les avoirs gérés" },
  "Cross-border private": { en: "Cross-border private", it: "Clientela privata estera", de: "Grenzüberschreitendes Privatkundengeschäft", fr: "Clientèle privée transfrontalière" },
  "Jan 23, 2015": { en: "23 Jan 2015", it: "23.01.2015", de: "23.01.2015", fr: "23.01.2015" },
  "Jan 16, 2015": { en: "16 Jan 2015", it: "16.01.2015", de: "16.01.2015", fr: "16.01.2015" },
  "Jan 15, 2015": { en: "15 Jan 2015", it: "15.01.2015", de: "15.01.2015", fr: "15.01.2015" },
  "2015 vs 2012": { en: "2015", it: "2015", de: "2015", fr: "2015" },
  "2021 vs 2012": { en: "2021", it: "2021", de: "2021", fr: "2021" },
  "2023 vs 2012": { en: "2023", it: "2023", de: "2023", fr: "2023" },
  "2024 vs 2012": { en: "2024", it: "2024", de: "2024", fr: "2024" },
  "2025 vs 2012": { en: "2025", it: "2025", de: "2025", fr: "2025" },
};

/** Label of a comparison bar in the language of the page. */
export function localizeLabel(label: string, locale: Locale): string {
  return labels[label]?.[locale] ?? label;
}

/** The bars drawn in red: Switzerland, matched by the label in the data file, not by the text shown. */
const SWISS_KEYS = new Set(["Switzerland", "Swiss Median"]);

export function isSwissLabel(label: string): boolean {
  return SWISS_KEYS.has(label);
}
