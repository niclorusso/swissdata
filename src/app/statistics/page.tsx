"use client";

import { useState, useMemo } from "react";
import { indicators, getIndicatorsByCategory, getLocalizedIndicators, getLocalizedIndicatorsByCategory } from "@/data/indicators";
import { LargeChart, SingleIndicatorChart } from "@/components/statistics/LargeChart";
import { SpendingPieChart } from "@/components/statistics/SpendingPieChart";
import {
  TimeRangeSelector,
  TimeRange,
  getYearRangeFromSelection,
} from "@/components/statistics/TimeRangeSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  TrendingUp,
  Users,
  Heart,
  DollarSign,
  ExternalLink,
  Calendar,
  PieChart as PieChartIcon,
} from "lucide-react";

// Educational descriptions for indicators (quadrilingual)
const indicatorExplanations: Record<string, { en: { what: string; why: string }; it: { what: string; why: string }; de: { what: string; why: string }; fr: { what: string; why: string } }> = {
  "unemployment-rate": {
    en: {
      what: "The percentage of the labor force that is jobless and actively seeking employment.",
      why: "A key health indicator of the economy. Low unemployment suggests a strong job market.",
    },
    it: {
      what: "Percentuale della forza lavoro disoccupata e in cerca attiva di impiego.",
      why: "Un indicatore chiave della salute economica. Una bassa disoccupazione indica un mercato del lavoro forte.",
    },
    de: {
      what: "Der Anteil der Erwerbspersonen, die arbeitslos sind und aktiv eine Beschäftigung suchen.",
      why: "Ein wichtiger Indikator für die wirtschaftliche Gesundheit. Niedrige Arbeitslosigkeit deutet auf einen starken Arbeitsmarkt hin.",
    },
    fr: {
      what: "Le pourcentage de la population active qui est sans emploi et recherche activement un travail.",
      why: "Un indicateur clé de la santé économique. Un faible chômage suggère un marché du travail solide.",
    },
  },
  "unemployment-rate-ilo": {
    en: {
      what: "The percentage of the labor force that is jobless and actively seeking employment (ILO definition).",
      why: "The official metric for international comparisons (Eurostat/OECD). Higher than SECO rate.",
    },
    it: {
      what: "Percentuale della forza lavoro disoccupata e in cerca attiva di impiego (definizione ILO).",
      why: "La metrica ufficiale per confronti internazionali (Eurostat/OCSE). Più alto del tasso SECO.",
    },
    de: {
      what: "Der Anteil der Erwerbspersonen, die arbeitslos sind und aktiv eine Beschäftigung suchen (ILO-Definition).",
      why: "Die offizielle Kennzahl für internationale Vergleiche (Eurostat/OECD). Höher als die SECO-Quote.",
    },
    fr: {
      what: "Le pourcentage de la population active qui est sans emploi et recherche activement un travail (définition OIT).",
      why: "La mesure officielle pour les comparaisons internationales (Eurostat/OCDE). Plus élevé que le taux SECO.",
    },
  },
  "gdp-growth": {
    en: {
      what: "The annual percentage change in Gross Domestic Product - the total value of goods and services produced.",
      why: "Measures overall economic growth. Positive = expanding; negative = recession.",
    },
    it: {
      what: "Variazione percentuale annua del PIL - il valore totale di beni e servizi prodotti.",
      why: "Misura la crescita economica. Positivo = espansione; negativo = recessione.",
    },
    de: {
      what: "Die jährliche prozentuale Veränderung des BIP - der Gesamtwert aller produzierten Waren und Dienstleistungen.",
      why: "Misst das Wirtschaftswachstum. Positiv = Expansion; negativ = Rezession.",
    },
    fr: {
      what: "La variation annuelle en pourcentage du PIB - la valeur totale des biens et services produits.",
      why: "Mesure la croissance économique. Positif = expansion ; négatif = récession.",
    },
  },
  "gdp-growth-rate": {
    en: {
      what: "The annual percentage change in Gross Domestic Product - the total value of goods and services produced.",
      why: "Measures overall economic growth. Positive = expanding; negative = recession.",
    },
    it: {
      what: "Variazione percentuale annua del PIL - il valore totale di beni e servizi prodotti.",
      why: "Misura la crescita economica. Positivo = espansione; negativo = recessione.",
    },
    de: {
      what: "Die jährliche prozentuale Veränderung des BIP - der Gesamtwert aller produzierten Waren und Dienstleistungen.",
      why: "Misst das Wirtschaftswachstum. Positiv = Expansion; negativ = Rezession.",
    },
    fr: {
      what: "La variation annuelle en pourcentage du PIB - la valeur totale des biens et services produits.",
      why: "Mesure la croissance économique. Positif = expansion ; négatif = récession.",
    },
  },
  "inflation-rate": {
    en: {
      what: "The rate at which prices increase over time, measured by the Consumer Price Index (CPI).",
      why: "Moderate inflation (1-2%) is normal. High inflation erodes purchasing power.",
    },
    it: {
      what: "Il tasso a cui i prezzi aumentano nel tempo, misurato dall'Indice dei Prezzi al Consumo (IPC).",
      why: "Un'inflazione moderata (1-2%) è normale. Un'inflazione alta erode il potere d'acquisto.",
    },
    de: {
      what: "Die Rate, mit der die Preise im Laufe der Zeit steigen, gemessen am Konsumentenpreisindex (KPI).",
      why: "Moderate Inflation (1-2%) ist normal. Hohe Inflation verringert die Kaufkraft.",
    },
    fr: {
      what: "Le taux auquel les prix augmentent au fil du temps, mesuré par l'Indice des Prix à la Consommation (IPC).",
      why: "Une inflation modérée (1-2%) est normale. Une inflation élevée érode le pouvoir d'achat.",
    },
  },
  "average-wage": {
    en: {
      what: "The median gross monthly salary. Median means half earn more, half earn less.",
      why: "Indicates living standards. Compare with cost of living for the full picture.",
    },
    it: {
      what: "Il salario mensile lordo mediano. Mediano significa che metà guadagna di più, metà di meno.",
      why: "Indica il tenore di vita. Da confrontare con il costo della vita per il quadro completo.",
    },
    de: {
      what: "Der mediane Bruttomonatslohn. Median bedeutet: die Hälfte verdient mehr, die Hälfte weniger.",
      why: "Zeigt den Lebensstandard. Mit den Lebenshaltungskosten vergleichen für das vollständige Bild.",
    },
    fr: {
      what: "Le salaire mensuel brut médian. Médian signifie que la moitié gagne plus, l'autre moitié moins.",
      why: "Indique le niveau de vie. À comparer avec le coût de la vie pour une image complète.",
    },
  },
  "housing-price-index": {
    en: {
      what: "An index tracking residential property prices over time (base year = 100).",
      why: "Shows housing affordability trends. Rapid increases may signal a bubble.",
    },
    it: {
      what: "Un indice che traccia i prezzi immobiliari residenziali nel tempo (anno base = 100).",
      why: "Mostra le tendenze di accessibilità abitativa. Aumenti rapidi possono segnalare una bolla.",
    },
    de: {
      what: "Ein Index, der die Wohnimmobilienpreise im Zeitverlauf verfolgt (Basisjahr = 100).",
      why: "Zeigt Trends bei der Erschwinglichkeit von Wohnraum. Schnelle Anstiege können eine Blase signalisieren.",
    },
    fr: {
      what: "Un indice suivant l'évolution des prix de l'immobilier résidentiel (année de base = 100).",
      why: "Montre les tendances d'accessibilité au logement. Des hausses rapides peuvent signaler une bulle.",
    },
  },
  "public-debt": {
    en: {
      what: "Total government debt as a percentage of GDP.",
      why: "Lower debt = more flexibility during crises. Switzerland's 'debt brake' keeps this low.",
    },
    it: {
      what: "Debito pubblico totale in percentuale del PIL.",
      why: "Meno debito = più flessibilità durante le crisi. Il 'freno all'indebitamento' svizzero lo mantiene basso.",
    },
    de: {
      what: "Gesamte Staatsverschuldung in Prozent des BIP.",
      why: "Weniger Schulden = mehr Flexibilität in Krisen. Die Schweizer Schuldenbremse hält diesen Wert niedrig.",
    },
    fr: {
      what: "Dette publique totale en pourcentage du PIB.",
      why: "Moins de dette = plus de flexibilité en cas de crise. Le 'frein à l'endettement' suisse maintient ce niveau bas.",
    },
  },
  "federal-debt-gdp": {
    en: {
      what: "Net debt of the Swiss Confederation as a percentage of GDP.",
      why: "Managed by the 'debt brake'. Lower debt gives flexibility during crises.",
    },
    it: {
      what: "Debito netto della Confederazione in percentuale del PIL.",
      why: "Gestito dal 'freno all'indebitamento'. Un debito basso offre flessibilità durante le crisi.",
    },
    de: {
      what: "Nettoschulden des Bundes in Prozent des BIP.",
      why: "Wird durch die Schuldenbremse gesteuert. Niedrigere Schulden geben Flexibilität in Krisenzeiten.",
    },
    fr: {
      what: "Dette nette de la Confédération en pourcentage du PIB.",
      why: "Géré par le 'frein à l'endettement'. Une dette plus faible offre de la flexibilité en cas de crise.",
    },
  },
  "population-total": {
    en: {
      what: "Total permanent residents living in Switzerland.",
      why: "Affects housing demand, infrastructure needs, and social services planning.",
    },
    it: {
      what: "Totale dei residenti permanenti in Svizzera.",
      why: "Influenza la domanda di alloggi, le infrastrutture e i servizi sociali.",
    },
    de: {
      what: "Gesamtzahl der ständigen Wohnbevölkerung in der Schweiz.",
      why: "Beeinflusst Wohnungsnachfrage, Infrastrukturbedarf und Sozialplanung.",
    },
    fr: {
      what: "Total des résidents permanents vivant en Suisse.",
      why: "Affecte la demande de logements, les besoins en infrastructures et la planification des services sociaux.",
    },
  },
  "foreign-population": {
    en: {
      what: "Percentage of permanent residents who are foreign nationals.",
      why: "Reflects immigration patterns. Many are long-term residents.",
    },
    it: {
      what: "Percentuale di residenti permanenti di nazionalità straniera.",
      why: "Riflette i modelli migratori. Molti sono residenti di lunga data.",
    },
    de: {
      what: "Anteil der ständigen Wohnbevölkerung mit ausländischer Staatsangehörigkeit.",
      why: "Spiegelt Migrationsmuster wider. Viele sind Langzeitansässige.",
    },
    fr: {
      what: "Pourcentage des résidents permanents qui sont des ressortissants étrangers.",
      why: "Reflète les tendances migratoires. Beaucoup sont des résidents de longue date.",
    },
  },
  "median-age": {
    en: {
      what: "The age that divides the population into two equal halves.",
      why: "Rising median age impacts pensions, healthcare costs, and labor supply.",
    },
    it: {
      what: "L'età che divide la popolazione in due metà uguali.",
      why: "Un'età mediana in aumento ha impatti su pensioni, sanità e offerta di lavoro.",
    },
    de: {
      what: "Das Alter, das die Bevölkerung in zwei gleiche Hälften teilt.",
      why: "Ein steigendes Medianalter wirkt sich auf Renten, Gesundheitskosten und Arbeitskräfteangebot aus.",
    },
    fr: {
      what: "L'âge qui divise la population en deux moitiés égales.",
      why: "Un âge médian en hausse impacte les retraites, les coûts de santé et l'offre de main-d'œuvre.",
    },
  },
  "life-expectancy": {
    en: {
      what: "Average years a person born today can expect to live.",
      why: "Measures population health, healthcare quality, and living conditions.",
    },
    it: {
      what: "Anni medi che una persona nata oggi può aspettarsi di vivere.",
      why: "Misura la salute della popolazione, la qualità sanitaria e le condizioni di vita.",
    },
    de: {
      what: "Durchschnittliche Jahre, die ein heute Geborener erwarten kann zu leben.",
      why: "Misst Bevölkerungsgesundheit, Gesundheitsversorgung und Lebensbedingungen.",
    },
    fr: {
      what: "Années moyennes qu'une personne née aujourd'hui peut espérer vivre.",
      why: "Mesure la santé de la population, la qualité des soins et les conditions de vie.",
    },
  },
  "crime-rate": {
    en: {
      what: "Reported criminal offenses per 100,000 inhabitants.",
      why: "Measures public safety. Compare trends over time, not absolute numbers.",
    },
    it: {
      what: "Reati denunciati ogni 100'000 abitanti.",
      why: "Misura la sicurezza pubblica. Confronta le tendenze nel tempo, non i numeri assoluti.",
    },
    de: {
      what: "Gemeldete Straftaten pro 100'000 Einwohner.",
      why: "Misst die öffentliche Sicherheit. Vergleiche Trends im Zeitverlauf, nicht absolute Zahlen.",
    },
    fr: {
      what: "Infractions pénales signalées pour 100'000 habitants.",
      why: "Mesure la sécurité publique. Comparez les tendances dans le temps, pas les chiffres absolus.",
    },
  },
  "crime-rate-per-1000": {
    en: {
      what: "Total offenses under the Swiss Criminal Code per 1,000 permanent residents.",
      why: "Measures public safety. Switzerland remains very safe despite recent increases.",
    },
    it: {
      what: "Reati totali secondo il Codice Penale svizzero per 1'000 residenti.",
      why: "Misura la sicurezza pubblica. La Svizzera resta molto sicura nonostante i recenti aumenti.",
    },
    de: {
      what: "Gesamte Straftaten nach Schweizer StGB pro 1'000 ständige Einwohner.",
      why: "Misst die öffentliche Sicherheit. Die Schweiz bleibt trotz jüngster Anstiege sehr sicher.",
    },
    fr: {
      what: "Total des infractions selon le Code pénal suisse pour 1'000 résidents.",
      why: "Mesure la sécurité publique. La Suisse reste très sûre malgré les augmentations récentes.",
    },
  },
  "healthcare-cost": {
    en: {
      what: "Average monthly health insurance premium for basic coverage.",
      why: "A significant household expense. 26% of residents receive subsidies.",
    },
    it: {
      what: "Premio mensile medio dell'assicurazione sanitaria per la copertura base.",
      why: "Una spesa familiare significativa. Il 26% dei residenti riceve sussidi.",
    },
    de: {
      what: "Durchschnittliche monatliche Krankenkassenprämie für die Grundversicherung.",
      why: "Eine bedeutende Haushaltsausgabe. 26% der Einwohner erhalten Prämienverbilligungen.",
    },
    fr: {
      what: "Prime mensuelle moyenne d'assurance maladie pour la couverture de base.",
      why: "Une dépense ménagère importante. 26% des résidents reçoivent des subventions.",
    },
  },
  "education-spending": {
    en: {
      what: "Public education expenditure as % of GDP.",
      why: "Shows investment in human capital. Switzerland values both vocational and academic paths.",
    },
    it: {
      what: "Spesa pubblica per l'istruzione in % del PIL.",
      why: "Mostra l'investimento nel capitale umano. La Svizzera valorizza sia il percorso professionale che accademico.",
    },
    de: {
      what: "Öffentliche Bildungsausgaben in % des BIP.",
      why: "Zeigt Investitionen in Humankapital. Die Schweiz schätzt sowohl berufliche als auch akademische Wege.",
    },
    fr: {
      what: "Dépenses publiques d'éducation en % du PIB.",
      why: "Montre l'investissement dans le capital humain. La Suisse valorise les voies professionnelles et académiques.",
    },
  },
  "poverty-rate": {
    en: {
      what: "Percentage living below the national poverty line.",
      why: "Even wealthy countries have poverty, often among elderly and single parents.",
    },
    it: {
      what: "Percentuale che vive sotto la soglia di povertà nazionale.",
      why: "Anche i paesi ricchi hanno povertà, spesso tra anziani e genitori soli.",
    },
    de: {
      what: "Anteil der Bevölkerung unter der nationalen Armutsgrenze.",
      why: "Auch wohlhabende Länder haben Armut, oft unter Älteren und Alleinerziehenden.",
    },
    fr: {
      what: "Pourcentage vivant en dessous du seuil de pauvreté national.",
      why: "Même les pays riches ont de la pauvreté, souvent parmi les personnes âgées et les parents isolés.",
    },
  },
  "renewable-energy": {
    en: {
      what: "Percentage of total energy from renewable sources.",
      why: "Progress toward climate goals. Electricity is 76% renewable; heating/transport less so.",
    },
    it: {
      what: "Percentuale dell'energia totale da fonti rinnovabili.",
      why: "Progressi verso gli obiettivi climatici. L'elettricità è al 76% rinnovabile; riscaldamento/trasporti meno.",
    },
    de: {
      what: "Anteil der Gesamtenergie aus erneuerbaren Quellen.",
      why: "Fortschritte bei Klimazielen. Strom ist zu 76% erneuerbar; Heizung/Verkehr weniger.",
    },
    fr: {
      what: "Pourcentage de l'énergie totale provenant de sources renouvelables.",
      why: "Progrès vers les objectifs climatiques. L'électricité est à 76% renouvelable ; chauffage/transport moins.",
    },
  },
};

type CategoryFilter = "all" | "economic" | "demographic" | "social";

export default function StatisticsPage() {
  const { t, locale } = useLanguage();
  const [timeRange, setTimeRange] = useState<TimeRange>("20Y");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const startYear = getYearRangeFromSelection(timeRange);

  const categoryTabs: { value: CategoryFilter; label: string; icon: any }[] = [
    { value: "all", label: t.statistics.allCategories, icon: TrendingUp },
    { value: "economic", label: t.statistics.economic, icon: DollarSign },
    { value: "demographic", label: t.statistics.demographic, icon: Users },
    { value: "social", label: t.statistics.social, icon: Heart },
  ];

  const historicalEvents = [
    { year: 2008, label: t.events.financialCrisis },
    { year: 2015, label: t.events.snbShock },
    { year: 2020, label: t.events.covid },
  ];

  const filteredIndicators = useMemo(() => {
    if (categoryFilter === "all") return getLocalizedIndicators(locale);
    return getLocalizedIndicatorsByCategory(categoryFilter, locale);
  }, [categoryFilter, locale]);

  const economicIndicators = getLocalizedIndicatorsByCategory("economic", locale);
  const demographicIndicators = getLocalizedIndicatorsByCategory("demographic", locale);
  const socialIndicators = getLocalizedIndicatorsByCategory("social", locale);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-swiss-gray-900 mb-2">
          {t.statistics.title}
        </h1>
        <p className="text-sm sm:text-base text-swiss-gray-600">
          {t.statistics.subtitle}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-swiss-gray-500 shrink-0" />
          <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-swiss-gray-200 bg-white p-1 overflow-x-auto">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.value}
                onClick={() => setCategoryFilter(tab.value)}
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                  categoryFilter === tab.value
                    ? "bg-swiss-gray-900 text-white"
                    : "text-swiss-gray-600 hover:text-swiss-gray-900 hover:bg-swiss-gray-50"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Federal Budget Breakdown - only show on "All" view */}
      {categoryFilter === "all" && (
        <section className="mb-8 sm:mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <PieChartIcon className="h-5 w-5 text-blue-600" />
                {t.statistics.federalBudget}
              </CardTitle>
              <p className="text-sm text-swiss-gray-500">
                {t.statistics.federalBudgetSubtitle}
              </p>
            </CardHeader>
            <CardContent>
              <SpendingPieChart />
              <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-swiss-gray-100">
                <span className="text-xs text-swiss-gray-500">{t.statistics.source} Federal Finance Administration (EFV)</span>
                <a 
                  href="https://www.efv.admin.ch/en/expenditure" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  {t.statistics.viewSource}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Economic Indicators Detail */}
      {(categoryFilter === "all" || categoryFilter === "economic") && (
        <section className="mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold text-swiss-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            {t.statistics.economicTrends}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {economicIndicators.map((indicator) => (
              <Card key={indicator.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                        {indicator.shortName}
                        {indicatorExplanations[indicator.id] && (
                          <InfoTooltip
                            content={
                              <div className="space-y-2">
                                <div>
                                  <p className="font-medium text-swiss-gray-900 mb-1">{t.statistics.whatIsIt}</p>
                                  <p className="text-swiss-gray-600">{indicatorExplanations[indicator.id][locale].what}</p>
                                </div>
                                <div>
                                  <p className="font-medium text-swiss-gray-900 mb-1">{t.statistics.whyItMatters}</p>
                                  <p className="text-swiss-gray-600">{indicatorExplanations[indicator.id][locale].why}</p>
                                </div>
                              </div>
                            }
                          />
                        )}
                      </CardTitle>
                      <p className="text-xs sm:text-sm text-swiss-gray-500">{indicator.description}</p>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-blue-600 swiss-number shrink-0">
                      {indicator.unit === "people"
                        ? (indicator.value / 1000000).toFixed(1) + "M"
                        : indicator.unit === "CHF"
                        ? `${indicator.value.toLocaleString("de-CH")}`
                        : indicator.unit === "CHF/month"
                        ? `${indicator.value}`
                        : `${indicator.value}${indicator.unit === "%" ? "%" : ""}`}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                  <SingleIndicatorChart indicator={indicator} height={160} startYear={startYear} color="#2563EB" />
                  <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-swiss-gray-100">
                    <span className="text-xs text-swiss-gray-500">{t.statistics.source} {indicator.source}</span>
                    <a href={indicator.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                      {t.statistics.viewSource}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Demographic Indicators */}
      {(categoryFilter === "all" || categoryFilter === "demographic") && (
        <section className="mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold text-swiss-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            {t.statistics.demographicTrends}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {demographicIndicators.map((indicator) => (
              <Card key={indicator.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <CardTitle className="text-sm sm:text-base">{indicator.shortName}</CardTitle>
                      <p className="text-xs sm:text-sm text-swiss-gray-500">{indicator.description}</p>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-purple-600 swiss-number shrink-0">
                      {indicator.unit === "people" ? (indicator.value / 1000000).toFixed(1) + "M" : indicator.unit === "years" ? `${indicator.value}` : `${indicator.value}${indicator.unit === "%" ? "%" : ""}`}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                  <SingleIndicatorChart indicator={indicator} height={160} startYear={startYear} color="#7C3AED" />
                  <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-swiss-gray-100">
                    <span className="text-xs text-swiss-gray-500">{t.statistics.source} {indicator.source}</span>
                    <a href={indicator.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:underline flex items-center gap-1">
                      {t.statistics.viewSource}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Social Indicators */}
      {(categoryFilter === "all" || categoryFilter === "social") && (
        <section className="mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold text-swiss-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <Heart className="h-5 w-5 text-green-600" />
            {t.statistics.socialTrends}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {socialIndicators.map((indicator) => (
              <Card key={indicator.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <CardTitle className="text-sm sm:text-base">{indicator.shortName}</CardTitle>
                      <p className="text-xs sm:text-sm text-swiss-gray-500">{indicator.description}</p>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-green-600 swiss-number shrink-0">
                      {indicator.unit === "CHF/month" ? `${indicator.value}` : indicator.unit === "per 100k" ? indicator.value.toLocaleString("de-CH") : `${indicator.value}${indicator.unit === "%" ? "%" : ""}`}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                  <SingleIndicatorChart indicator={indicator} height={160} startYear={startYear} color="#059669" />
                  <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-swiss-gray-100">
                    <span className="text-xs text-swiss-gray-500">{t.statistics.source} {indicator.source}</span>
                    <a href={indicator.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline flex items-center gap-1">
                      {t.statistics.viewSource}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Data Sources Footer */}
      <section className="border-t border-swiss-gray-200 pt-6 sm:pt-8 mt-8 sm:mt-12">
        <h3 className="text-lg font-semibold text-swiss-gray-900 mb-4">{t.statistics.dataSources}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { name: "BFS", url: "https://www.bfs.admin.ch", desc: t.statistics.sourceBFS },
            { name: "SECO", url: "https://www.seco.admin.ch", desc: t.statistics.sourceSECO },
            { name: "BAG", url: "https://www.bag.admin.ch", desc: t.statistics.sourceBAG },
            { name: "OpenData.swiss", url: "https://opendata.swiss", desc: t.statistics.sourceOpenData },
          ].map((source) => (
            <a key={source.name} href={source.url} target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 bg-swiss-gray-50 rounded-lg hover:bg-swiss-gray-100 transition-colors">
              <p className="font-medium text-swiss-gray-900 text-sm sm:text-base">{source.name}</p>
              <p className="text-xs sm:text-sm text-swiss-gray-500">{source.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
