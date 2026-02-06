"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoTooltip } from "@/components/ui/tooltip";
import { Indicator } from "@/types";
import { formatWithUnit, getTrendDisplay } from "@/lib/formatters";
import { useLanguage } from "@/i18n/LanguageContext";
import { TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";

// Educational descriptions for each indicator type (quadrilingual)
const indicatorExplanations: Record<string, { en: { what: string; why: string }; it: { what: string; why: string }; de: { what: string; why: string }; fr: { what: string; why: string } }> = {
  "unemployment-rate-ilo": {
    en: {
      what: "The percentage of the labor force that is jobless and actively seeking employment, based on ILO international standards.",
      why: "The official metric for international comparisons (Eurostat/OECD). Higher than the SECO rate as it counts all active job seekers.",
    },
    it: {
      what: "Percentuale della forza lavoro disoccupata e in cerca attiva di impiego, secondo gli standard internazionali ILO.",
      why: "La metrica ufficiale per confronti internazionali (Eurostat/OCSE). Più alto del tasso SECO perché include tutti i cercatori attivi.",
    },
    de: {
      what: "Der Anteil der Erwerbspersonen, die arbeitslos sind und aktiv eine Beschäftigung suchen, nach internationalen ILO-Standards.",
      why: "Die offizielle Kennzahl für internationale Vergleiche (Eurostat/OECD). Höher als die SECO-Quote, da alle aktiven Arbeitsuchenden gezählt werden.",
    },
    fr: {
      what: "Le pourcentage de la population active qui est sans emploi et recherche activement un travail, selon les normes internationales de l'OIT.",
      why: "La mesure officielle pour les comparaisons internationales (Eurostat/OCDE). Plus élevé que le taux SECO car il compte tous les chercheurs d'emploi actifs.",
    },
  },
  "unemployment-rate": {
    en: {
      what: "The percentage of the labor force registered as unemployed at RAV (regional employment centers).",
      why: "The SECO rate measures only registered job seekers. It's lower than the ILO rate but useful for tracking domestic trends.",
    },
    it: {
      what: "Percentuale della forza lavoro registrata come disoccupata presso gli URC (Uffici regionali di collocamento).",
      why: "Il tasso SECO misura solo i disoccupati iscritti. È inferiore al tasso ILO ma utile per monitorare le tendenze nazionali.",
    },
    de: {
      what: "Der Anteil der Erwerbspersonen, die bei den RAV (Regionale Arbeitsvermittlungszentren) als arbeitslos gemeldet sind.",
      why: "Die SECO-Quote erfasst nur gemeldete Arbeitsuchende. Sie ist niedriger als die ILO-Quote, aber nützlich für inländische Trends.",
    },
    fr: {
      what: "Le pourcentage de la population active inscrite comme chômeur auprès des ORP (Offices régionaux de placement).",
      why: "Le taux SECO ne mesure que les demandeurs d'emploi inscrits. Il est inférieur au taux OIT mais utile pour suivre les tendances nationales.",
    },
  },
  "gdp-growth-rate": {
    en: {
      what: "The annual percentage change in Gross Domestic Product (GDP) - the total value of goods and services produced.",
      why: "Measures overall economic growth. Positive growth means the economy is expanding; negative growth (recession) means it's contracting.",
    },
    it: {
      what: "Variazione percentuale annua del Prodotto Interno Lordo (PIL) - il valore totale di beni e servizi prodotti.",
      why: "Misura la crescita economica complessiva. Crescita positiva = economia in espansione; negativa (recessione) = contrazione.",
    },
    de: {
      what: "Die jährliche prozentuale Veränderung des Bruttoinlandsprodukts (BIP) - der Gesamtwert aller produzierten Waren und Dienstleistungen.",
      why: "Misst das gesamtwirtschaftliche Wachstum. Positives Wachstum = expandierende Wirtschaft; negatives Wachstum (Rezession) = Schrumpfung.",
    },
    fr: {
      what: "La variation annuelle en pourcentage du Produit Intérieur Brut (PIB) - la valeur totale des biens et services produits.",
      why: "Mesure la croissance économique globale. Une croissance positive signifie que l'économie se développe ; une croissance négative (récession) signifie qu'elle se contracte.",
    },
  },
  "gdp-growth": {
    en: {
      what: "The annual percentage change in Gross Domestic Product (GDP) - the total value of goods and services produced.",
      why: "Measures overall economic growth. Positive growth means the economy is expanding; negative growth (recession) means it's contracting.",
    },
    it: {
      what: "Variazione percentuale annua del Prodotto Interno Lordo (PIL) - il valore totale di beni e servizi prodotti.",
      why: "Misura la crescita economica complessiva. Crescita positiva = economia in espansione; negativa (recessione) = contrazione.",
    },
    de: {
      what: "Die jährliche prozentuale Veränderung des Bruttoinlandsprodukts (BIP) - der Gesamtwert aller produzierten Waren und Dienstleistungen.",
      why: "Misst das gesamtwirtschaftliche Wachstum. Positives Wachstum = expandierende Wirtschaft; negatives Wachstum (Rezession) = Schrumpfung.",
    },
    fr: {
      what: "La variation annuelle en pourcentage du Produit Intérieur Brut (PIB) - la valeur totale des biens et services produits.",
      why: "Mesure la croissance économique globale. Une croissance positive signifie que l'économie se développe ; une croissance négative (récession) signifie qu'elle se contracte.",
    },
  },
  "inflation-rate": {
    en: {
      what: "The rate at which prices for goods and services increase over time, measured by the Consumer Price Index (CPI).",
      why: "Moderate inflation (1-2%) is normal. High inflation erodes purchasing power; deflation (negative) can signal economic problems.",
    },
    it: {
      what: "Il tasso a cui i prezzi di beni e servizi aumentano nel tempo, misurato dall'Indice dei Prezzi al Consumo (IPC).",
      why: "Un'inflazione moderata (1-2%) è normale. Un'inflazione alta erode il potere d'acquisto; la deflazione può segnalare problemi economici.",
    },
    de: {
      what: "Die Rate, mit der die Preise für Waren und Dienstleistungen im Laufe der Zeit steigen, gemessen am Konsumentenpreisindex (KPI).",
      why: "Moderate Inflation (1-2%) ist normal. Hohe Inflation verringert die Kaufkraft; Deflation kann auf wirtschaftliche Probleme hinweisen.",
    },
    fr: {
      what: "Le taux auquel les prix des biens et services augmentent au fil du temps, mesuré par l'Indice des Prix à la Consommation (IPC).",
      why: "Une inflation modérée (1-2%) est normale. Une inflation élevée érode le pouvoir d'achat ; la déflation peut signaler des problèmes économiques.",
    },
  },
  "average-wage": {
    en: {
      what: "The median gross monthly salary across all sectors. Median means half earn more, half earn less.",
      why: "Indicates living standards and economic prosperity. Compare with cost of living for a full picture.",
    },
    it: {
      what: "Il salario mensile lordo mediano in tutti i settori. Mediano significa che metà guadagna di più, metà di meno.",
      why: "Indica il tenore di vita e la prosperità economica. Da confrontare con il costo della vita per un quadro completo.",
    },
    de: {
      what: "Der mediane Bruttolohn pro Monat über alle Sektoren. Median bedeutet: die Hälfte verdient mehr, die Hälfte weniger.",
      why: "Zeigt Lebensstandard und wirtschaftlichen Wohlstand. Mit den Lebenshaltungskosten vergleichen für ein vollständiges Bild.",
    },
    fr: {
      what: "Le salaire mensuel brut médian dans tous les secteurs. Médian signifie que la moitié gagne plus, l'autre moitié gagne moins.",
      why: "Indique le niveau de vie et la prospérité économique. À comparer avec le coût de la vie pour une image complète.",
    },
  },
  "housing-price-index": {
    en: {
      what: "An index tracking changes in residential property prices over time (base Q4 2019 = 100).",
      why: "Shows whether housing is becoming more or less affordable. Rapid increases may indicate a housing bubble.",
    },
    it: {
      what: "Un indice che traccia le variazioni dei prezzi immobiliari residenziali nel tempo (base Q4 2019 = 100).",
      why: "Mostra se le abitazioni diventano più o meno accessibili. Aumenti rapidi possono indicare una bolla immobiliare.",
    },
    de: {
      what: "Ein Index, der die Veränderung der Wohnimmobilienpreise im Zeitverlauf verfolgt (Basis Q4 2019 = 100).",
      why: "Zeigt, ob Wohnen erschwinglicher oder teurer wird. Schnelle Anstiege können auf eine Immobilienblase hinweisen.",
    },
    fr: {
      what: "Un indice suivant l'évolution des prix de l'immobilier résidentiel au fil du temps (base T4 2019 = 100).",
      why: "Montre si le logement devient plus ou moins abordable. Des augmentations rapides peuvent indiquer une bulle immobilière.",
    },
  },
  "federal-debt-gdp": {
    en: {
      what: "Net debt of the Swiss Confederation as a percentage of GDP (excluding cantons and municipalities).",
      why: "Managed by the 'debt brake' (Schuldenbremse). Lower debt gives flexibility during crises.",
    },
    it: {
      what: "Debito netto della Confederazione in percentuale del PIL (esclusi Cantoni e Comuni).",
      why: "Gestito dal 'freno all'indebitamento'. Un debito basso offre flessibilità durante le crisi.",
    },
    de: {
      what: "Nettoschulden des Bundes in Prozent des BIP (ohne Kantone und Gemeinden).",
      why: "Wird durch die Schuldenbremse gesteuert. Niedrigere Schulden geben Flexibilität in Krisenzeiten.",
    },
    fr: {
      what: "Dette nette de la Confédération en pourcentage du PIB (hors cantons et communes).",
      why: "Géré par le 'frein à l'endettement'. Une dette plus faible offre de la flexibilité en cas de crise.",
    },
  },
  "public-debt": {
    en: {
      what: "Total government debt as a percentage of GDP.",
      why: "Lower debt gives governments more flexibility during crises. Switzerland's 'debt brake' keeps this among the lowest globally.",
    },
    it: {
      what: "Debito pubblico totale in percentuale del PIL.",
      why: "Un debito basso offre ai governi più flessibilità durante le crisi. Il 'freno all'indebitamento' svizzero lo mantiene tra i più bassi al mondo.",
    },
    de: {
      what: "Gesamte Staatsverschuldung in Prozent des BIP.",
      why: "Niedrigere Schulden geben Regierungen mehr Flexibilität in Krisen. Die Schweizer Schuldenbremse hält diese Quote weltweit auf sehr niedrigem Niveau.",
    },
    fr: {
      what: "Dette publique totale en pourcentage du PIB.",
      why: "Une dette plus faible donne aux gouvernements plus de flexibilité en période de crise. Le 'frein à l'endettement' suisse maintient ce ratio parmi les plus bas au monde.",
    },
  },
  "population-total": {
    en: {
      what: "The total number of permanent residents living in Switzerland.",
      why: "Fundamental demographic measure. Growth affects housing demand, infrastructure needs, and social services planning.",
    },
    it: {
      what: "Il numero totale di residenti permanenti in Svizzera.",
      why: "Misura demografica fondamentale. La crescita influenza la domanda di alloggi, le infrastrutture e i servizi sociali.",
    },
    de: {
      what: "Die Gesamtzahl der ständigen Wohnbevölkerung in der Schweiz.",
      why: "Grundlegende demografische Kennzahl. Wachstum beeinflusst Wohnungsnachfrage, Infrastrukturbedarf und Sozialplanung.",
    },
    fr: {
      what: "Le nombre total de résidents permanents vivant en Suisse.",
      why: "Mesure démographique fondamentale. La croissance affecte la demande de logements, les besoins en infrastructures et la planification des services sociaux.",
    },
  },
  "foreign-population": {
    en: {
      what: "Percentage of permanent residents who are foreign nationals (not Swiss citizens).",
      why: "Reflects immigration patterns. Note: many are long-term residents; this doesn't include naturalized citizens.",
    },
    it: {
      what: "Percentuale di residenti permanenti che sono cittadini stranieri (non svizzeri).",
      why: "Riflette i modelli migratori. Nota: molti sono residenti di lunga data; non include i cittadini naturalizzati.",
    },
    de: {
      what: "Anteil der ständigen Wohnbevölkerung mit ausländischer Staatsangehörigkeit (keine Schweizer Bürger).",
      why: "Spiegelt Migrationsmuster wider. Hinweis: Viele sind Langzeitansässige; eingebürgerte Bürger sind nicht enthalten.",
    },
    fr: {
      what: "Pourcentage des résidents permanents qui sont des ressortissants étrangers (non citoyens suisses).",
      why: "Reflète les tendances migratoires. Note : beaucoup sont des résidents de longue date ; cela n'inclut pas les citoyens naturalisés.",
    },
  },
  "median-age": {
    en: {
      what: "The age that divides the population into two equal halves - half are younger, half are older.",
      why: "Shows population aging trends. A rising median age has implications for pensions, healthcare costs, and labor supply.",
    },
    it: {
      what: "L'età che divide la popolazione in due metà uguali - metà più giovani, metà più anziani.",
      why: "Mostra le tendenze d'invecchiamento. Un'età mediana in aumento ha implicazioni per pensioni, sanità e offerta di lavoro.",
    },
    de: {
      what: "Das Alter, das die Bevölkerung in zwei gleiche Hälften teilt - die Hälfte ist jünger, die Hälfte älter.",
      why: "Zeigt Alterungstrends. Ein steigendes Medianalter hat Auswirkungen auf Renten, Gesundheitskosten und Arbeitskräfteangebot.",
    },
    fr: {
      what: "L'âge qui divise la population en deux moitiés égales - la moitié est plus jeune, l'autre moitié est plus âgée.",
      why: "Montre les tendances du vieillissement de la population. Un âge médian en hausse a des implications pour les retraites, les coûts de santé et l'offre de main-d'œuvre.",
    },
  },
  "life-expectancy": {
    en: {
      what: "The average number of years a person born today can expect to live.",
      why: "A comprehensive measure of population health, healthcare quality, and living conditions.",
    },
    it: {
      what: "Il numero medio di anni che una persona nata oggi può aspettarsi di vivere.",
      why: "Una misura complessiva della salute della popolazione, qualità sanitaria e condizioni di vita.",
    },
    de: {
      what: "Die durchschnittliche Anzahl von Jahren, die ein heute Geborener voraussichtlich leben wird.",
      why: "Ein umfassendes Mass für Bevölkerungsgesundheit, Gesundheitsversorgung und Lebensbedingungen.",
    },
    fr: {
      what: "Le nombre moyen d'années qu'une personne née aujourd'hui peut espérer vivre.",
      why: "Une mesure globale de la santé de la population, de la qualité des soins et des conditions de vie.",
    },
  },
  "crime-rate-per-1000": {
    en: {
      what: "Total offenses under the Swiss Criminal Code (StGB) per 1,000 permanent residents.",
      why: "Measures public safety. Switzerland remains very safe, but cybercrime and vehicle theft have risen since 2022.",
    },
    it: {
      what: "Reati totali secondo il Codice Penale svizzero (CP) per 1'000 residenti permanenti.",
      why: "Misura la sicurezza pubblica. La Svizzera resta molto sicura, ma cybercrimini e furti di veicoli sono aumentati dal 2022.",
    },
    de: {
      what: "Gesamte Straftaten nach Schweizer Strafgesetzbuch (StGB) pro 1'000 ständige Einwohner.",
      why: "Misst die öffentliche Sicherheit. Die Schweiz bleibt sehr sicher, aber Cyberkriminalität und Fahrzeugdiebstahl sind seit 2022 gestiegen.",
    },
    fr: {
      what: "Total des infractions selon le Code pénal suisse (CP) pour 1'000 résidents permanents.",
      why: "Mesure la sécurité publique. La Suisse reste très sûre, mais la cybercriminalité et les vols de véhicules ont augmenté depuis 2022.",
    },
  },
  "crime-rate": {
    en: {
      what: "Number of reported criminal offenses per 100,000 inhabitants.",
      why: "Measures public safety. Note: reporting rates vary, so compare trends over time rather than absolute numbers.",
    },
    it: {
      what: "Numero di reati denunciati ogni 100'000 abitanti.",
      why: "Misura la sicurezza pubblica. Nota: i tassi di denuncia variano, quindi confronta le tendenze nel tempo.",
    },
    de: {
      what: "Anzahl gemeldeter Straftaten pro 100'000 Einwohner.",
      why: "Misst die öffentliche Sicherheit. Hinweis: Anzeigequoten variieren, daher besser Trends im Zeitverlauf vergleichen.",
    },
    fr: {
      what: "Nombre d'infractions pénales signalées pour 100'000 habitants.",
      why: "Mesure la sécurité publique. Note : les taux de signalement varient, comparez donc les tendances dans le temps plutôt que les chiffres absolus.",
    },
  },
  "healthcare-cost": {
    en: {
      what: "Total healthcare expenditure as a percentage of GDP.",
      why: "Switzerland spends more on healthcare than most countries. Costs are rising faster than GDP due to aging and medical technology.",
    },
    it: {
      what: "Spesa sanitaria totale in percentuale del PIL.",
      why: "La Svizzera spende più di molti paesi per la sanità. I costi crescono più del PIL a causa dell'invecchiamento e della tecnologia medica.",
    },
    de: {
      what: "Gesamte Gesundheitsausgaben in Prozent des BIP.",
      why: "Die Schweiz gibt mehr für Gesundheit aus als die meisten Länder. Kosten steigen schneller als das BIP wegen Alterung und Medizintechnologie.",
    },
    fr: {
      what: "Dépenses totales de santé en pourcentage du PIB.",
      why: "La Suisse dépense plus pour la santé que la plupart des pays. Les coûts augmentent plus vite que le PIB en raison du vieillissement et de la technologie médicale.",
    },
  },
  "education-spending": {
    en: {
      what: "Public expenditure on education as a percentage of GDP.",
      why: "Shows government investment in human capital. Switzerland's dual education system (vocational + academic) is highly valued.",
    },
    it: {
      what: "Spesa pubblica per l'istruzione in percentuale del PIL.",
      why: "Mostra l'investimento pubblico nel capitale umano. Il sistema duale svizzero (professionale + accademico) è molto apprezzato.",
    },
    de: {
      what: "Öffentliche Bildungsausgaben in Prozent des BIP.",
      why: "Zeigt staatliche Investitionen in Humankapital. Das duale Schweizer Bildungssystem (Berufs- + Hochschulbildung) wird sehr geschätzt.",
    },
    fr: {
      what: "Dépenses publiques d'éducation en pourcentage du PIB.",
      why: "Montre l'investissement public dans le capital humain. Le système dual suisse (formation professionnelle + académique) est très apprécié.",
    },
  },
  "poverty-rate": {
    en: {
      what: "Percentage of the population living below 60% of median income (at-risk-of-poverty threshold).",
      why: "Indicates economic inequality. Even wealthy countries have poverty, often among elderly and single parents.",
    },
    it: {
      what: "Percentuale della popolazione con reddito inferiore al 60% della mediana (soglia di rischio povertà).",
      why: "Indica la disuguaglianza economica. Anche i paesi ricchi hanno povertà, spesso tra anziani e genitori soli.",
    },
    de: {
      what: "Anteil der Bevölkerung mit Einkommen unter 60% des Medianeinkommens (Armutsgefährdungsschwelle).",
      why: "Zeigt wirtschaftliche Ungleichheit. Auch wohlhabende Länder haben Armut, oft unter Älteren und Alleinerziehenden.",
    },
    fr: {
      what: "Pourcentage de la population vivant en dessous de 60% du revenu médian (seuil de risque de pauvreté).",
      why: "Indique l'inégalité économique. Même les pays riches ont de la pauvreté, souvent parmi les personnes âgées et les parents isolés.",
    },
  },
  "renewable-energy": {
    en: {
      what: "Percentage of total energy consumption from renewable sources (hydro, solar, wind, biomass).",
      why: "Indicates progress toward climate goals. Electricity is 76% renewable, but heating/transport still rely on fossil fuels.",
    },
    it: {
      what: "Percentuale del consumo energetico totale da fonti rinnovabili (idrico, solare, eolico, biomassa).",
      why: "Indica i progressi verso gli obiettivi climatici. L'elettricità è al 76% rinnovabile, ma riscaldamento e trasporti usano ancora fossili.",
    },
    de: {
      what: "Anteil des Gesamtenergieverbrauchs aus erneuerbaren Quellen (Wasser, Solar, Wind, Biomasse).",
      why: "Zeigt Fortschritte bei Klimazielen. Strom ist zu 76% erneuerbar, aber Heizung/Verkehr nutzen noch fossile Brennstoffe.",
    },
    fr: {
      what: "Pourcentage de la consommation totale d'énergie provenant de sources renouvelables (hydraulique, solaire, éolien, biomasse).",
      why: "Indique les progrès vers les objectifs climatiques. L'électricité est à 76% renouvelable, mais le chauffage et les transports dépendent encore des combustibles fossiles.",
    },
  },
};

interface IndicatorCardProps {
  indicator: Indicator;
}

export function IndicatorCard({ indicator }: IndicatorCardProps) {
  const { t, locale } = useLanguage();

  const { color } = getTrendDisplay(
    indicator.trend,
    indicator.id !== "crime-rate" && indicator.id !== "inflation-rate"
  );

  const TrendIcon =
    indicator.trend === "up"
      ? TrendingUp
      : indicator.trend === "down"
      ? TrendingDown
      : Minus;

  const categoryVariant =
    indicator.category === "economic"
      ? "economic"
      : indicator.category === "demographic"
      ? "demographic"
      : "social";

  const explanationData = indicatorExplanations[indicator.id];
  const explanation = explanationData ? explanationData[locale] : null;

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Badge variant={categoryVariant} className="mb-2">
              {indicator.category}
            </Badge>
            <CardTitle className="text-sm sm:text-base font-medium flex items-center gap-1">
              {indicator.shortName}
              {explanation && (
                <InfoTooltip
                  content={
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium text-swiss-gray-900 mb-1">{t.indicatorCard.whatIsIt}</p>
                        <p className="text-swiss-gray-600">{explanation.what}</p>
                      </div>
                      <div>
                        <p className="font-medium text-swiss-gray-900 mb-1">{t.indicatorCard.whyItMatters}</p>
                        <p className="text-swiss-gray-600">{explanation.why}</p>
                      </div>
                    </div>
                  }
                />
              )}
            </CardTitle>
          </div>
          <a
            href={indicator.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-swiss-gray-400 hover:text-swiss-gray-600 transition-colors"
            title={`Source: ${indicator.source}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Main value */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold swiss-number text-swiss-gray-900">
              {formatWithUnit(indicator.value, indicator.unit, locale)}
            </span>
          </div>

          {/* Trend */}
          {indicator.trendPercentage !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${color}`}>
              <TrendIcon className="h-4 w-4" />
              <span className="font-medium">
                {indicator.trendPercentage > 0 ? "+" : ""}
                {indicator.trendPercentage}%
              </span>
              <span className="text-swiss-gray-500">{t.indicatorCard.vsLastYear}</span>
            </div>
          )}

          {/* Context */}
          {indicator.context && (
            <p className="text-xs sm:text-sm text-swiss-gray-600 line-clamp-2">
              {indicator.context}
            </p>
          )}

          {/* Source and date */}
          <div className="flex items-center justify-between text-xs text-swiss-gray-400 pt-2 border-t border-swiss-gray-100">
            <span>{indicator.source}</span>
            <span>{indicator.lastUpdated}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
