import { LocalizedText } from "@/types";

// Every body whose figures appear on the site, with what is taken from it.
// scope: where its figures are shown. "indicators" = dashboard and statistics pages,
// "cantons" = canton page, "quiz" = quiz only.
export interface DataSource {
  abbr: string;
  url: string;
  scope: "indicators" | "cantons" | "quiz";
  name: LocalizedText;
  use: LocalizedText;
}

export const dataSources: DataSource[] = [
  {
    abbr: "FSO",
    url: "https://www.bfs.admin.ch",
    scope: "indicators",
    name: { en: "Federal Statistical Office (FSO)", it: "Ufficio federale di statistica (UST)", de: "Bundesamt für Statistik (BFS)", fr: "Office fédéral de la statistique (OFS)" },
    use: { en: "Most indicators, the canton figures and many quiz questions.", it: "La maggior parte degli indicatori, i dati dei Cantoni e molte domande del quiz.", de: "Die meisten Indikatoren, die Kantonszahlen und viele Quizfragen.", fr: "La plupart des indicateurs, les chiffres des cantons et de nombreuses questions du quiz." },
  },
  {
    abbr: "SECO",
    url: "https://www.seco.admin.ch",
    scope: "indicators",
    name: { en: "State Secretariat for Economic Affairs (SECO)", it: "Segreteria di Stato dell’economia (SECO)", de: "Staatssekretariat für Wirtschaft (SECO)", fr: "Secrétariat d’État à l’économie (SECO)" },
    use: { en: "Registered unemployment.", it: "Disoccupazione registrata.", de: "Registrierte Arbeitslosigkeit.", fr: "Chômage enregistré." },
  },
  {
    abbr: "FFA",
    url: "https://www.efv.admin.ch",
    scope: "indicators",
    name: { en: "Federal Finance Administration (FFA)", it: "Amministrazione federale delle finanze (AFF)", de: "Eidgenössische Finanzverwaltung (EFV)", fr: "Administration fédérale des finances (AFF)" },
    use: { en: "Federal debt, federal budget, public debt.", it: "Debito federale, preventivo federale, debito pubblico.", de: "Bundesschulden, Bundesbudget, Staatsschulden.", fr: "Dette fédérale, budget fédéral, dette publique." },
  },
  {
    abbr: "SFOE",
    url: "https://www.bfe.admin.ch",
    scope: "indicators",
    name: { en: "Swiss Federal Office of Energy (SFOE)", it: "Ufficio federale dell’energia (UFE)", de: "Bundesamt für Energie (BFE)", fr: "Office fédéral de l’énergie (OFEN)" },
    use: { en: "Renewable energy and electricity production.", it: "Energie rinnovabili e produzione di elettricità.", de: "Erneuerbare Energien und Stromproduktion.", fr: "Énergies renouvelables et production d’électricité." },
  },
  {
    abbr: "Eurostat",
    url: "https://ec.europa.eu/eurostat",
    scope: "indicators",
    name: { en: "Eurostat (statistical office of the European Union)", it: "Eurostat (ufficio statistico dell’Unione europea)", de: "Eurostat (Statistisches Amt der Europäischen Union)", fr: "Eurostat (office statistique de l’Union européenne)" },
    use: { en: "Median age, life expectancy and most European comparisons in the quiz.", it: "Età mediana, speranza di vita e la maggior parte dei confronti europei del quiz.", de: "Medianalter, Lebenserwartung und die meisten europäischen Vergleiche im Quiz.", fr: "Âge médian, espérance de vie et la plupart des comparaisons européennes du quiz." },
  },
  {
    abbr: "FOPH",
    url: "https://www.bag.admin.ch",
    scope: "cantons",
    name: { en: "Federal Office of Public Health (FOPH)", it: "Ufficio federale della sanità pubblica (UFSP)", de: "Bundesamt für Gesundheit (BAG)", fr: "Office fédéral de la santé publique (OFSP)" },
    use: { en: "Health insurance premiums and premium subsidies.", it: "Premi di cassa malati e riduzioni dei premi.", de: "Krankenkassenprämien und Prämienverbilligungen.", fr: "Primes d’assurance-maladie et réductions de primes." },
  },
  {
    abbr: "swisstopo",
    url: "https://www.swisstopo.admin.ch",
    scope: "cantons",
    name: { en: "Federal Office of Topography (swisstopo)", it: "Ufficio federale di topografia (swisstopo)", de: "Bundesamt für Landestopografie (swisstopo)", fr: "Office fédéral de topographie (swisstopo)" },
    use: { en: "Area of the cantons.", it: "Superficie dei Cantoni.", de: "Fläche der Kantone.", fr: "Superficie des cantons." },
  },
  {
    abbr: "SNB",
    url: "https://www.snb.ch",
    scope: "quiz",
    name: { en: "Swiss National Bank (SNB)", it: "Banca nazionale svizzera (BNS)", de: "Schweizerische Nationalbank (SNB)", fr: "Banque nationale suisse (BNS)" },
    use: { en: "Number of banks and gold reserves.", it: "Numero di banche e riserve d’oro.", de: "Anzahl Banken und Goldreserven.", fr: "Nombre de banques et réserves d’or." },
  },
  {
    abbr: "FOEN",
    url: "https://www.bafu.admin.ch",
    scope: "quiz",
    name: { en: "Federal Office for the Environment (FOEN)", it: "Ufficio federale dell’ambiente (UFAM)", de: "Bundesamt für Umwelt (BAFU)", fr: "Office fédéral de l’environnement (OFEV)" },
    use: { en: "CO2 emissions and recycling.", it: "Emissioni di CO2 e riciclaggio.", de: "CO2-Emissionen und Recycling.", fr: "Émissions de CO2 et recyclage." },
  },
  {
    abbr: "SERI",
    url: "https://www.sbfi.admin.ch",
    scope: "quiz",
    name: { en: "State Secretariat for Education, Research and Innovation (SERI)", it: "Segreteria di Stato per la formazione, la ricerca e l’innovazione (SEFRI)", de: "Staatssekretariat für Bildung, Forschung und Innovation (SBFI)", fr: "Secrétariat d’État à la formation, à la recherche et à l’innovation (SEFRI)" },
    use: { en: "Vocational education and training.", it: "Formazione professionale.", de: "Berufsbildung.", fr: "Formation professionnelle." },
  },
  {
    abbr: "FSIO",
    url: "https://www.bsv.admin.ch",
    scope: "quiz",
    name: { en: "Federal Social Insurance Office (FSIO)", it: "Ufficio federale delle assicurazioni sociali (UFAS)", de: "Bundesamt für Sozialversicherungen (BSV)", fr: "Office fédéral des assurances sociales (OFAS)" },
    use: { en: "Financial outlook of the AHV.", it: "Prospettive finanziarie dell’AVS.", de: "Finanzperspektiven der AHV.", fr: "Perspectives financières de l’AVS." },
  },
  {
    abbr: "OECD",
    url: "https://www.oecd.org",
    scope: "quiz",
    name: { en: "Organisation for Economic Co-operation and Development (OECD)", it: "Organizzazione per la cooperazione e lo sviluppo economico (OCSE)", de: "Organisation für wirtschaftliche Zusammenarbeit und Entwicklung (OECD)", fr: "Organisation de coopération et de développement économiques (OCDE)" },
    use: { en: "Wages, tax revenue, health and education spending, tertiary degrees.", it: "Salari, entrate fiscali, spesa per sanità e istruzione, titoli terziari.", de: "Löhne, Steuereinnahmen, Gesundheits- und Bildungsausgaben, Tertiärabschlüsse.", fr: "Salaires, recettes fiscales, dépenses de santé et d’éducation, diplômes tertiaires." },
  },
  {
    abbr: "World Bank",
    url: "https://data.worldbank.org",
    scope: "quiz",
    name: { en: "World Bank", it: "Banca mondiale", de: "Weltbank", fr: "Banque mondiale" },
    use: { en: "Exports as a share of GDP.", it: "Esportazioni in rapporto al PIL.", de: "Exporte im Verhältnis zum BIP.", fr: "Exportations par rapport au PIB." },
  },
  {
    abbr: "IMF",
    url: "https://www.imf.org",
    scope: "quiz",
    name: { en: "International Monetary Fund (IMF)", it: "Fondo monetario internazionale (FMI)", de: "Internationaler Währungsfonds (IWF)", fr: "Fonds monétaire international (FMI)" },
    use: { en: "Gold reserves of central banks.", it: "Riserve d’oro delle banche centrali.", de: "Goldreserven der Zentralbanken.", fr: "Réserves d’or des banques centrales." },
  },
  {
    abbr: "ECB",
    url: "https://www.ecb.europa.eu",
    scope: "quiz",
    name: { en: "European Central Bank (ECB)", it: "Banca centrale europea (BCE)", de: "Europäische Zentralbank (EZB)", fr: "Banque centrale européenne (BCE)" },
    use: { en: "Reference rate of the euro against the franc.", it: "Tasso di riferimento dell’euro rispetto al franco.", de: "Referenzkurs des Euro zum Franken.", fr: "Taux de référence de l’euro face au franc." },
  },
  {
    abbr: "SIPRI",
    url: "https://www.sipri.org",
    scope: "quiz",
    name: { en: "Stockholm International Peace Research Institute (SIPRI)", it: "Stockholm International Peace Research Institute (SIPRI)", de: "Stockholm International Peace Research Institute (SIPRI)", fr: "Stockholm International Peace Research Institute (SIPRI)" },
    use: { en: "Military spending as a share of GDP.", it: "Spesa militare in rapporto al PIL.", de: "Militärausgaben im Verhältnis zum BIP.", fr: "Dépenses militaires par rapport au PIB." },
  },
  {
    abbr: "WGC",
    url: "https://www.gold.org",
    scope: "quiz",
    name: { en: "World Gold Council", it: "World Gold Council", de: "World Gold Council", fr: "World Gold Council" },
    use: { en: "Rank of official gold holdings.", it: "Classifica delle riserve ufficiali d’oro.", de: "Rangliste der offiziellen Goldbestände.", fr: "Classement des réserves officielles d’or." },
  },
  {
    abbr: "SBA",
    url: "https://www.swissbanking.ch",
    scope: "quiz",
    name: { en: "Swiss Bankers Association (SBA)", it: "Associazione svizzera dei banchieri (ASB)", de: "Schweizerische Bankiervereinigung (SBVg)", fr: "Association suisse des banquiers (ASB)" },
    use: { en: "Assets managed by banks in Switzerland.", it: "Patrimoni gestiti dalle banche in Svizzera.", de: "Von Banken in der Schweiz verwaltete Vermögen.", fr: "Avoirs gérés par les banques en Suisse." },
  },
  {
    abbr: "SBB",
    url: "https://www.sbb.ch",
    scope: "quiz",
    name: { en: "Swiss Federal Railways (SBB)", it: "Ferrovie federali svizzere (FFS)", de: "Schweizerische Bundesbahnen (SBB)", fr: "Chemins de fer fédéraux suisses (CFF)" },
    use: { en: "Punctuality of trains.", it: "Puntualità dei treni.", de: "Pünktlichkeit der Züge.", fr: "Ponctualité des trains." },
  },
];
