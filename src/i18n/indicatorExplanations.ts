import type { Locale } from "./translations";

// Explanations shown in the info tooltip of each indicator: "what" (what it is) and "why" (why it matters).
// The dashboard cards on the home page and the statistics page show different texts for most indicators.
// A text written once, as a plain string, is shown in both places.
// A text written as { card, statistics } has one wording for each place.
export type ExplanationVariant = "card" | "statistics";
type ExplanationText = string | Record<ExplanationVariant, string>;
export type IndicatorExplanation = { what: string; why: string };

const indicatorExplanations: Record<string, Record<Locale, { what: ExplanationText; why: ExplanationText }>> = {
  "unemployment-rate": {
    en: {
      what: "The percentage of the labor force registered as unemployed at RAV (regional employment centers).",
      why: {
        card: "The SECO rate counts only people registered as unemployed. It's lower than the ILO rate but useful for tracking domestic trends.",
        statistics: "A key health indicator of the economy. Low unemployment suggests a strong job market.",
      },
    },
    it: {
      what: "Percentuale della forza lavoro registrata come disoccupata presso gli URC (Uffici regionali di collocamento).",
      why: {
        card: "Il tasso SECO misura solo i disoccupati iscritti. È inferiore al tasso ILO ma utile per monitorare le tendenze nazionali.",
        statistics: "Un indicatore chiave della salute economica. Una bassa disoccupazione indica un mercato del lavoro forte.",
      },
    },
    de: {
      what: "Der Anteil der Erwerbspersonen, die bei den RAV (Regionale Arbeitsvermittlungszentren) als arbeitslos gemeldet sind.",
      why: {
        card: "Die SECO-Quote erfasst nur gemeldete Arbeitslose. Sie ist niedriger als die ILO-Quote, aber nützlich für inländische Trends.",
        statistics: "Ein wichtiger Indikator für die wirtschaftliche Gesundheit. Niedrige Arbeitslosigkeit deutet auf einen starken Arbeitsmarkt hin.",
      },
    },
    fr: {
      what: "Le pourcentage de la population active inscrite comme chômeur auprès des ORP (Offices régionaux de placement).",
      why: {
        card: "Le taux SECO ne mesure que les chômeurs inscrits. Il est inférieur au taux OIT mais utile pour suivre les tendances nationales.",
        statistics: "Un indicateur clé de la santé économique. Un faible chômage suggère un marché du travail solide.",
      },
    },
  },
  "unemployment-rate-ilo": {
    en: {
      what: {
        card: "The percentage of the labor force that is jobless and actively seeking employment, based on ILO international standards.",
        statistics: "The percentage of the labor force that is jobless and actively seeking employment (ILO definition).",
      },
      why: {
        card: "The official metric for international comparisons (Eurostat/OECD). Higher than the SECO rate as it counts all active job seekers.",
        statistics: "The official metric for international comparisons (Eurostat/OECD). Higher than SECO rate.",
      },
    },
    it: {
      what: {
        card: "Percentuale della forza lavoro disoccupata e in cerca attiva di impiego, secondo gli standard internazionali ILO.",
        statistics: "Percentuale della forza lavoro disoccupata e in cerca attiva di impiego (definizione ILO).",
      },
      why: {
        card: "La metrica ufficiale per confronti internazionali (Eurostat/OCSE). Più alto del tasso SECO perché include tutti i cercatori attivi.",
        statistics: "La metrica ufficiale per confronti internazionali (Eurostat/OCSE). Più alto del tasso SECO.",
      },
    },
    de: {
      what: {
        card: "Der Anteil der Erwerbspersonen, die arbeitslos sind und aktiv eine Beschäftigung suchen, nach internationalen ILO-Standards.",
        statistics: "Der Anteil der Erwerbspersonen, die arbeitslos sind und aktiv eine Beschäftigung suchen (ILO-Definition).",
      },
      why: {
        card: "Die offizielle Kennzahl für internationale Vergleiche (Eurostat/OECD). Höher als die SECO-Quote, da alle aktiven Arbeitsuchenden gezählt werden.",
        statistics: "Die offizielle Kennzahl für internationale Vergleiche (Eurostat/OECD). Höher als die SECO-Quote.",
      },
    },
    fr: {
      what: {
        card: "Le pourcentage de la population active qui est sans emploi et recherche activement un travail, selon les normes internationales de l'OIT.",
        statistics: "Le pourcentage de la population active qui est sans emploi et recherche activement un travail (définition OIT).",
      },
      why: {
        card: "La mesure officielle pour les comparaisons internationales (Eurostat/OCDE). Plus élevé que le taux SECO car il compte tous les chercheurs d'emploi actifs.",
        statistics: "La mesure officielle pour les comparaisons internationales (Eurostat/OCDE). Plus élevé que le taux SECO.",
      },
    },
  },
  "gdp-growth": {
    en: {
      what: {
        card: "The annual percentage change in Gross Domestic Product (GDP) - the total value of goods and services produced.",
        statistics: "The annual percentage change in Gross Domestic Product - the total value of goods and services produced.",
      },
      why: {
        card: "Measures overall economic growth. Positive growth means the economy is expanding; negative growth (recession) means it's contracting.",
        statistics: "Measures overall economic growth. Positive = expanding; negative = recession.",
      },
    },
    it: {
      what: {
        card: "Variazione percentuale annua del Prodotto Interno Lordo (PIL) - il valore totale di beni e servizi prodotti.",
        statistics: "Variazione percentuale annua del PIL - il valore totale di beni e servizi prodotti.",
      },
      why: {
        card: "Misura la crescita economica complessiva. Crescita positiva = economia in espansione; negativa (recessione) = contrazione.",
        statistics: "Misura la crescita economica. Positivo = espansione; negativo = recessione.",
      },
    },
    de: {
      what: {
        card: "Die jährliche prozentuale Veränderung des Bruttoinlandsprodukts (BIP) - der Gesamtwert aller produzierten Waren und Dienstleistungen.",
        statistics: "Die jährliche prozentuale Veränderung des BIP - der Gesamtwert aller produzierten Waren und Dienstleistungen.",
      },
      why: {
        card: "Misst das gesamtwirtschaftliche Wachstum. Positives Wachstum = expandierende Wirtschaft; negatives Wachstum (Rezession) = Schrumpfung.",
        statistics: "Misst das Wirtschaftswachstum. Positiv = Expansion; negativ = Rezession.",
      },
    },
    fr: {
      what: {
        card: "La variation annuelle en pourcentage du Produit Intérieur Brut (PIB) - la valeur totale des biens et services produits.",
        statistics: "La variation annuelle en pourcentage du PIB - la valeur totale des biens et services produits.",
      },
      why: {
        card: "Mesure la croissance économique globale. Une croissance positive signifie que l'économie se développe ; une croissance négative (récession) signifie qu'elle se contracte.",
        statistics: "Mesure la croissance économique. Positif = expansion ; négatif = récession.",
      },
    },
  },
  "gdp-growth-rate": {
    en: {
      what: {
        card: "The annual percentage change in Gross Domestic Product (GDP) - the total value of goods and services produced.",
        statistics: "The annual percentage change in Gross Domestic Product - the total value of goods and services produced.",
      },
      why: {
        card: "Measures overall economic growth. Positive growth means the economy is expanding; negative growth (recession) means it's contracting.",
        statistics: "Measures overall economic growth. Positive = expanding; negative = recession.",
      },
    },
    it: {
      what: {
        card: "Variazione percentuale annua del Prodotto Interno Lordo (PIL) - il valore totale di beni e servizi prodotti.",
        statistics: "Variazione percentuale annua del PIL - il valore totale di beni e servizi prodotti.",
      },
      why: {
        card: "Misura la crescita economica complessiva. Crescita positiva = economia in espansione; negativa (recessione) = contrazione.",
        statistics: "Misura la crescita economica. Positivo = espansione; negativo = recessione.",
      },
    },
    de: {
      what: {
        card: "Die jährliche prozentuale Veränderung des Bruttoinlandsprodukts (BIP) - der Gesamtwert aller produzierten Waren und Dienstleistungen.",
        statistics: "Die jährliche prozentuale Veränderung des BIP - der Gesamtwert aller produzierten Waren und Dienstleistungen.",
      },
      why: {
        card: "Misst das gesamtwirtschaftliche Wachstum. Positives Wachstum = expandierende Wirtschaft; negatives Wachstum (Rezession) = Schrumpfung.",
        statistics: "Misst das Wirtschaftswachstum. Positiv = Expansion; negativ = Rezession.",
      },
    },
    fr: {
      what: {
        card: "La variation annuelle en pourcentage du Produit Intérieur Brut (PIB) - la valeur totale des biens et services produits.",
        statistics: "La variation annuelle en pourcentage du PIB - la valeur totale des biens et services produits.",
      },
      why: {
        card: "Mesure la croissance économique globale. Une croissance positive signifie que l'économie se développe ; une croissance négative (récession) signifie qu'elle se contracte.",
        statistics: "Mesure la croissance économique. Positif = expansion ; négatif = récession.",
      },
    },
  },
  "inflation-rate": {
    en: {
      what: {
        card: "The rate at which prices for goods and services increase over time, measured by the Consumer Price Index (CPI).",
        statistics: "The rate at which prices increase over time, measured by the Consumer Price Index (CPI).",
      },
      why: {
        card: "The SNB defines price stability as a rise in consumer prices of less than 2% a year; a lasting fall in prices (deflation) also breaches it. From 2000 to 2025 Swiss inflation averaged 0.6% a year.",
        statistics: "The SNB defines price stability as a rise in consumer prices of less than 2% a year. From 2000 to 2025 Swiss inflation averaged 0.6% a year.",
      },
    },
    it: {
      what: {
        card: "Il tasso a cui i prezzi di beni e servizi aumentano nel tempo, misurato dall'Indice dei Prezzi al Consumo (IPC).",
        statistics: "Il tasso a cui i prezzi aumentano nel tempo, misurato dall'Indice dei Prezzi al Consumo (IPC).",
      },
      why: {
        card: "La BNS definisce la stabilità dei prezzi come un aumento dei prezzi al consumo inferiore al 2\u00A0% all'anno; anche un calo duraturo dei prezzi (deflazione) la viola. Dal 2000 al 2025 il rincaro in Svizzera è stato in media dello 0,6\u00A0% all'anno.",
        statistics: "La BNS definisce la stabilità dei prezzi come un aumento dei prezzi al consumo inferiore al 2\u00A0% all'anno. Dal 2000 al 2025 il rincaro in Svizzera è stato in media dello 0,6\u00A0% all'anno.",
      },
    },
    de: {
      what: {
        card: "Die Rate, mit der die Preise für Waren und Dienstleistungen im Laufe der Zeit steigen, gemessen am Konsumentenpreisindex (KPI).",
        statistics: "Die Rate, mit der die Preise im Laufe der Zeit steigen, gemessen am Konsumentenpreisindex (KPI).",
      },
      why: {
        card: "Die SNB versteht unter Preisstabilität einen Anstieg der Konsumentenpreise von weniger als 2\u00A0% pro Jahr; auch ein anhaltender Rückgang des Preisniveaus (Deflation) verletzt sie. Von 2000 bis 2025 betrug die Teuerung in der Schweiz im Durchschnitt 0,6\u00A0% pro Jahr.",
        statistics: "Die SNB versteht unter Preisstabilität einen Anstieg der Konsumentenpreise von weniger als 2\u00A0% pro Jahr. Von 2000 bis 2025 betrug die Teuerung in der Schweiz im Durchschnitt 0,6\u00A0% pro Jahr.",
      },
    },
    fr: {
      what: {
        card: "Le taux auquel les prix des biens et services augmentent au fil du temps, mesuré par l'Indice des Prix à la Consommation (IPC).",
        statistics: "Le taux auquel les prix augmentent au fil du temps, mesuré par l'Indice des Prix à la Consommation (IPC).",
      },
      why: {
        card: "La BNS assimile la stabilité des prix à une hausse des prix à la consommation de moins de 2\u00A0% par an ; une baisse durable des prix (déflation) y contrevient aussi. De 2000 à 2025, le renchérissement en Suisse a été en moyenne de 0,6\u00A0% par an.",
        statistics: "La BNS assimile la stabilité des prix à une hausse des prix à la consommation de moins de 2\u00A0% par an. De 2000 à 2025, le renchérissement en Suisse a été en moyenne de 0,6\u00A0% par an.",
      },
    },
  },
  "average-wage": {
    en: {
      what: {
        card: "The median gross monthly salary across all sectors. Median means half earn more, half earn less.",
        statistics: "The median gross monthly salary. Median means half earn more, half earn less.",
      },
      why: {
        card: "Indicates living standards and economic prosperity. Compare with cost of living for a full picture.",
        statistics: "Indicates living standards. Compare with cost of living for the full picture.",
      },
    },
    it: {
      what: {
        card: "Il salario mensile lordo mediano in tutti i settori. Mediano significa che metà guadagna di più, metà di meno.",
        statistics: "Il salario mensile lordo mediano. Mediano significa che metà guadagna di più, metà di meno.",
      },
      why: {
        card: "Indica il tenore di vita e la prosperità economica. Da confrontare con il costo della vita per un quadro completo.",
        statistics: "Indica il tenore di vita. Da confrontare con il costo della vita per il quadro completo.",
      },
    },
    de: {
      what: {
        card: "Der mediane Bruttolohn pro Monat über alle Sektoren. Median bedeutet: die Hälfte verdient mehr, die Hälfte weniger.",
        statistics: "Der mediane Bruttomonatslohn. Median bedeutet: die Hälfte verdient mehr, die Hälfte weniger.",
      },
      why: {
        card: "Zeigt Lebensstandard und wirtschaftlichen Wohlstand. Mit den Lebenshaltungskosten vergleichen für ein vollständiges Bild.",
        statistics: "Zeigt den Lebensstandard. Mit den Lebenshaltungskosten vergleichen für das vollständige Bild.",
      },
    },
    fr: {
      what: {
        card: "Le salaire mensuel brut médian dans tous les secteurs. Médian signifie que la moitié gagne plus, l'autre moitié gagne moins.",
        statistics: "Le salaire mensuel brut médian. Médian signifie que la moitié gagne plus, l'autre moitié moins.",
      },
      why: {
        card: "Indique le niveau de vie et la prospérité économique. À comparer avec le coût de la vie pour une image complète.",
        statistics: "Indique le niveau de vie. À comparer avec le coût de la vie pour une image complète.",
      },
    },
  },
  "housing-price-index": {
    en: {
      what: {
        card: "An index tracking changes in residential property prices over time, shown as annual average (base Q4 2019 = 100).",
        statistics: "An index tracking residential property prices over time, as annual average (base Q4 2019 = 100).",
      },
      why: {
        card: "Shows whether housing is becoming more or less affordable. Rapid increases may indicate a housing bubble.",
        statistics: "Shows housing affordability trends. Rapid increases may signal a bubble.",
      },
    },
    it: {
      what: {
        card: "Un indice che traccia le variazioni dei prezzi immobiliari residenziali nel tempo, in media annua (base Q4 2019 = 100).",
        statistics: "Un indice che traccia i prezzi immobiliari residenziali nel tempo, in media annua (base Q4 2019 = 100).",
      },
      why: {
        card: "Mostra se le abitazioni diventano più o meno accessibili. Aumenti rapidi possono indicare una bolla immobiliare.",
        statistics: "Mostra le tendenze di accessibilità abitativa. Aumenti rapidi possono segnalare una bolla.",
      },
    },
    de: {
      what: {
        card: "Ein Index, der die Veränderung der Wohnimmobilienpreise im Zeitverlauf verfolgt, als Jahresdurchschnitt (Basis Q4 2019 = 100).",
        statistics: "Ein Index, der die Wohnimmobilienpreise im Zeitverlauf verfolgt, als Jahresdurchschnitt (Basis Q4 2019 = 100).",
      },
      why: {
        card: "Zeigt, ob Wohnen erschwinglicher oder teurer wird. Schnelle Anstiege können auf eine Immobilienblase hinweisen.",
        statistics: "Zeigt Trends bei der Erschwinglichkeit von Wohnraum. Schnelle Anstiege können eine Blase signalisieren.",
      },
    },
    fr: {
      what: {
        card: "Un indice suivant l'évolution des prix de l'immobilier résidentiel au fil du temps, en moyenne annuelle (base T4 2019 = 100).",
        statistics: "Un indice suivant l'évolution des prix de l'immobilier résidentiel, en moyenne annuelle (base T4 2019 = 100).",
      },
      why: {
        card: "Montre si le logement devient plus ou moins abordable. Des augmentations rapides peuvent indiquer une bulle immobilière.",
        statistics: "Montre les tendances d'accessibilité au logement. Des hausses rapides peuvent signaler une bulle.",
      },
    },
  },
  "public-debt": {
    en: {
      what: "Total government debt as a percentage of GDP.",
      why: {
        card: "Lower debt gives governments more flexibility during crises. Switzerland's 'debt brake' keeps this among the lowest globally.",
        statistics: "Lower debt = more flexibility during crises. Switzerland's 'debt brake' keeps this low.",
      },
    },
    it: {
      what: "Debito pubblico totale in percentuale del PIL.",
      why: {
        card: "Un debito basso offre ai governi più flessibilità durante le crisi. Il 'freno all'indebitamento' svizzero lo mantiene tra i più bassi al mondo.",
        statistics: "Meno debito = più flessibilità durante le crisi. Il 'freno all'indebitamento' svizzero lo mantiene basso.",
      },
    },
    de: {
      what: "Gesamte Staatsverschuldung in Prozent des BIP.",
      why: {
        card: "Niedrigere Schulden geben Regierungen mehr Flexibilität in Krisen. Die Schweizer Schuldenbremse hält diese Quote weltweit auf sehr niedrigem Niveau.",
        statistics: "Weniger Schulden = mehr Flexibilität in Krisen. Die Schweizer Schuldenbremse hält diesen Wert niedrig.",
      },
    },
    fr: {
      what: "Dette publique totale en pourcentage du PIB.",
      why: {
        card: "Une dette plus faible donne aux gouvernements plus de flexibilité en période de crise. Le 'frein à l'endettement' suisse maintient ce ratio parmi les plus bas au monde.",
        statistics: "Moins de dette = plus de flexibilité en cas de crise. Le 'frein à l'endettement' suisse maintient ce niveau bas.",
      },
    },
  },
  "federal-debt-gdp": {
    en: {
      what: {
        card: "Net debt of the Swiss Confederation as a percentage of GDP (excluding cantons and municipalities).",
        statistics: "Net debt of the Swiss Confederation as a percentage of GDP.",
      },
      why: {
        card: "Managed by the 'debt brake' (Schuldenbremse). Lower debt gives flexibility during crises.",
        statistics: "Managed by the 'debt brake'. Lower debt gives flexibility during crises.",
      },
    },
    it: {
      what: {
        card: "Debito netto della Confederazione in percentuale del PIL (esclusi Cantoni e Comuni).",
        statistics: "Debito netto della Confederazione in percentuale del PIL.",
      },
      why: "Gestito dal 'freno all'indebitamento'. Un debito basso offre flessibilità durante le crisi.",
    },
    de: {
      what: {
        card: "Nettoschulden des Bundes in Prozent des BIP (ohne Kantone und Gemeinden).",
        statistics: "Nettoschulden des Bundes in Prozent des BIP.",
      },
      why: "Wird durch die Schuldenbremse gesteuert. Niedrigere Schulden geben Flexibilität in Krisenzeiten.",
    },
    fr: {
      what: {
        card: "Dette nette de la Confédération en pourcentage du PIB (hors cantons et communes).",
        statistics: "Dette nette de la Confédération en pourcentage du PIB.",
      },
      why: "Géré par le 'frein à l'endettement'. Une dette plus faible offre de la flexibilité en cas de crise.",
    },
  },
  "population-total": {
    en: {
      what: {
        card: "The total number of permanent residents living in Switzerland.",
        statistics: "Total permanent residents living in Switzerland.",
      },
      why: {
        card: "Fundamental demographic measure. Growth affects housing demand, infrastructure needs, and social services planning.",
        statistics: "Affects housing demand, infrastructure needs, and social services planning.",
      },
    },
    it: {
      what: {
        card: "Il numero totale di residenti permanenti in Svizzera.",
        statistics: "Totale dei residenti permanenti in Svizzera.",
      },
      why: {
        card: "Misura demografica fondamentale. La crescita influenza la domanda di alloggi, le infrastrutture e i servizi sociali.",
        statistics: "Influenza la domanda di alloggi, le infrastrutture e i servizi sociali.",
      },
    },
    de: {
      what: {
        card: "Die Gesamtzahl der ständigen Wohnbevölkerung in der Schweiz.",
        statistics: "Gesamtzahl der ständigen Wohnbevölkerung in der Schweiz.",
      },
      why: {
        card: "Grundlegende demografische Kennzahl. Wachstum beeinflusst Wohnungsnachfrage, Infrastrukturbedarf und Sozialplanung.",
        statistics: "Beeinflusst Wohnungsnachfrage, Infrastrukturbedarf und Sozialplanung.",
      },
    },
    fr: {
      what: {
        card: "Le nombre total de résidents permanents vivant en Suisse.",
        statistics: "Total des résidents permanents vivant en Suisse.",
      },
      why: {
        card: "Mesure démographique fondamentale. La croissance affecte la demande de logements, les besoins en infrastructures et la planification des services sociaux.",
        statistics: "Affecte la demande de logements, les besoins en infrastructures et la planification des services sociaux.",
      },
    },
  },
  "foreign-population": {
    en: {
      what: {
        card: "Percentage of permanent residents who are foreign nationals (not Swiss citizens).",
        statistics: "Percentage of permanent residents who are foreign nationals.",
      },
      why: {
        card: "Reflects immigration patterns. Note: many are long-term residents; this doesn't include naturalized citizens.",
        statistics: "Reflects immigration patterns. Many are long-term residents.",
      },
    },
    it: {
      what: {
        card: "Percentuale di residenti permanenti che sono cittadini stranieri (non svizzeri).",
        statistics: "Percentuale di residenti permanenti di nazionalità straniera.",
      },
      why: {
        card: "Riflette i modelli migratori. Nota: molti sono residenti di lunga data; non include i cittadini naturalizzati.",
        statistics: "Riflette i modelli migratori. Molti sono residenti di lunga data.",
      },
    },
    de: {
      what: {
        card: "Anteil der ständigen Wohnbevölkerung mit ausländischer Staatsangehörigkeit (keine Schweizer Bürger).",
        statistics: "Anteil der ständigen Wohnbevölkerung mit ausländischer Staatsangehörigkeit.",
      },
      why: {
        card: "Spiegelt Migrationsmuster wider. Hinweis: Viele sind Langzeitansässige; eingebürgerte Bürger sind nicht enthalten.",
        statistics: "Spiegelt Migrationsmuster wider. Viele sind Langzeitansässige.",
      },
    },
    fr: {
      what: {
        card: "Pourcentage des résidents permanents qui sont des ressortissants étrangers (non citoyens suisses).",
        statistics: "Pourcentage des résidents permanents qui sont des ressortissants étrangers.",
      },
      why: {
        card: "Reflète les tendances migratoires. Note : beaucoup sont des résidents de longue date ; cela n'inclut pas les citoyens naturalisés.",
        statistics: "Reflète les tendances migratoires. Beaucoup sont des résidents de longue date.",
      },
    },
  },
  "median-age": {
    en: {
      what: {
        card: "The age that divides the population into two equal halves - half are younger, half are older.",
        statistics: "The age that divides the population into two equal halves.",
      },
      why: {
        card: "Shows population aging trends. A rising median age has implications for pensions, healthcare costs, and labor supply.",
        statistics: "Rising median age impacts pensions, healthcare costs, and labor supply.",
      },
    },
    it: {
      what: {
        card: "L'età che divide la popolazione in due metà uguali - metà più giovani, metà più anziani.",
        statistics: "L'età che divide la popolazione in due metà uguali.",
      },
      why: {
        card: "Mostra le tendenze d'invecchiamento. Un'età mediana in aumento ha implicazioni per pensioni, sanità e offerta di lavoro.",
        statistics: "Un'età mediana in aumento ha impatti su pensioni, sanità e offerta di lavoro.",
      },
    },
    de: {
      what: {
        card: "Das Alter, das die Bevölkerung in zwei gleiche Hälften teilt - die Hälfte ist jünger, die Hälfte älter.",
        statistics: "Das Alter, das die Bevölkerung in zwei gleiche Hälften teilt.",
      },
      why: {
        card: "Zeigt Alterungstrends. Ein steigendes Medianalter hat Auswirkungen auf Renten, Gesundheitskosten und Arbeitskräfteangebot.",
        statistics: "Ein steigendes Medianalter wirkt sich auf Renten, Gesundheitskosten und Arbeitskräfteangebot aus.",
      },
    },
    fr: {
      what: {
        card: "L'âge qui divise la population en deux moitiés égales - la moitié est plus jeune, l'autre moitié est plus âgée.",
        statistics: "L'âge qui divise la population en deux moitiés égales.",
      },
      why: {
        card: "Montre les tendances du vieillissement de la population. Un âge médian en hausse a des implications pour les retraites, les coûts de santé et l'offre de main-d'œuvre.",
        statistics: "Un âge médian en hausse impacte les retraites, les coûts de santé et l'offre de main-d'œuvre.",
      },
    },
  },
  "life-expectancy": {
    en: {
      what: {
        card: "The average number of years a person born today can expect to live.",
        statistics: "Average years a person born today can expect to live.",
      },
      why: {
        card: "A comprehensive measure of population health, healthcare quality, and living conditions.",
        statistics: "Measures population health, healthcare quality, and living conditions.",
      },
    },
    it: {
      what: {
        card: "Il numero medio di anni che una persona nata oggi può aspettarsi di vivere.",
        statistics: "Anni medi che una persona nata oggi può aspettarsi di vivere.",
      },
      why: {
        card: "Una misura complessiva della salute della popolazione, qualità sanitaria e condizioni di vita.",
        statistics: "Misura la salute della popolazione, la qualità sanitaria e le condizioni di vita.",
      },
    },
    de: {
      what: {
        card: "Die durchschnittliche Anzahl von Jahren, die ein heute Geborener voraussichtlich leben wird.",
        statistics: "Durchschnittliche Jahre, die ein heute Geborener erwarten kann zu leben.",
      },
      why: {
        card: "Ein umfassendes Mass für Bevölkerungsgesundheit, Gesundheitsversorgung und Lebensbedingungen.",
        statistics: "Misst Bevölkerungsgesundheit, Gesundheitsversorgung und Lebensbedingungen.",
      },
    },
    fr: {
      what: {
        card: "Le nombre moyen d'années qu'une personne née aujourd'hui peut espérer vivre.",
        statistics: "Années moyennes qu'une personne née aujourd'hui peut espérer vivre.",
      },
      why: {
        card: "Une mesure globale de la santé de la population, de la qualité des soins et des conditions de vie.",
        statistics: "Mesure la santé de la population, la qualité des soins et les conditions de vie.",
      },
    },
  },
  "crime-rate": {
    en: {
      what: {
        card: "Number of reported criminal offenses per 100,000 inhabitants.",
        statistics: "Reported criminal offenses per 100,000 inhabitants.",
      },
      why: {
        card: "Measures public safety. Note: reporting rates vary, so compare trends over time rather than absolute numbers.",
        statistics: "Measures public safety. Compare trends over time, not absolute numbers.",
      },
    },
    it: {
      what: {
        card: "Numero di reati denunciati ogni 100\u202F000 abitanti.",
        statistics: "Reati denunciati ogni 100\u202F000 abitanti.",
      },
      why: {
        card: "Misura la sicurezza pubblica. Nota: i tassi di denuncia variano, quindi confronta le tendenze nel tempo.",
        statistics: "Misura la sicurezza pubblica. Confronta le tendenze nel tempo, non i numeri assoluti.",
      },
    },
    de: {
      what: {
        card: "Anzahl gemeldeter Straftaten pro 100\u202F000 Einwohner.",
        statistics: "Gemeldete Straftaten pro 100\u202F000 Einwohner.",
      },
      why: {
        card: "Misst die öffentliche Sicherheit. Hinweis: Anzeigequoten variieren, daher besser Trends im Zeitverlauf vergleichen.",
        statistics: "Misst die öffentliche Sicherheit. Vergleiche Trends im Zeitverlauf, nicht absolute Zahlen.",
      },
    },
    fr: {
      what: {
        card: "Nombre d'infractions pénales signalées pour 100\u202F000 habitants.",
        statistics: "Infractions pénales signalées pour 100\u202F000 habitants.",
      },
      why: {
        card: "Mesure la sécurité publique. Note : les taux de signalement varient, comparez donc les tendances dans le temps plutôt que les chiffres absolus.",
        statistics: "Mesure la sécurité publique. Comparez les tendances dans le temps, pas les chiffres absolus.",
      },
    },
  },
  "crime-rate-per-1000": {
    en: {
      what: "Offences under the Swiss Criminal Code (StGB) recorded by the police per 1,000 permanent residents.",
      why: "Measures public safety. In 2025 recorded offences fell by 1.5% after three years of increases.",
    },
    it: {
      what: "Reati secondo il Codice penale svizzero (CP) registrati dalla polizia per 1000 residenti permanenti.",
      why: "Misura la sicurezza pubblica. Nel 2025 i reati registrati sono diminuiti dell'1,5\u00A0% dopo tre anni di aumento.",
    },
    de: {
      what: "Polizeilich registrierte Straftaten nach Schweizer Strafgesetzbuch (StGB) pro 1000 ständige Einwohner.",
      why: "Misst die öffentliche Sicherheit. 2025 gingen die registrierten Straftaten um 1,5\u00A0% zurück, nach drei Jahren mit Zunahmen.",
    },
    fr: {
      what: "Infractions au Code pénal suisse (CP) enregistrées par la police pour 1000 résidents permanents.",
      why: "Mesure la sécurité publique. En 2025 les infractions enregistrées ont reculé de 1,5\u00A0% après trois années de hausse.",
    },
  },
  "healthcare-cost": {
    en: {
      what: "Costs of the healthcare system as a percentage of GDP.",
      why: "Shows how much of economic output goes to healthcare. In 2024 the costs were CHF 97.2 billion (provisional), CHF 899 per person per month.",
    },
    it: {
      what: "Costi del sistema sanitario in percentuale del PIL.",
      why: "Indica quanta parte della produzione economica va alla sanità. Nel 2024 i costi sono stati di 97,2 miliardi di franchi (dato provvisorio), 899 franchi al mese per persona.",
    },
    de: {
      what: "Kosten des Gesundheitswesens in Prozent des BIP.",
      why: "Zeigt, welcher Teil der Wirtschaftsleistung ins Gesundheitswesen fliesst. 2024 betrugen die Kosten 97,2 Milliarden Franken (provisorisch), 899 Franken pro Person und Monat.",
    },
    fr: {
      what: "Coûts du système de santé en pourcentage du PIB.",
      why: "Montre quelle part de la production économique va à la santé. En 2024 les coûts étaient de 97,2 milliards de francs (provisoire), 899 francs par personne et par mois.",
    },
  },
  "education-spending": {
    en: {
      what: {
        card: "Public expenditure on education as a percentage of GDP.",
        statistics: "Public education expenditure as % of GDP.",
      },
      why: {
        card: "Shows how much the public sector spends on schools, vocational training and universities. About two thirds of young people in Switzerland go through vocational education and training (SERI, 2025).",
        statistics: "Shows how much the public sector spends on schools, vocational training and universities.",
      },
    },
    it: {
      what: {
        card: "Spesa pubblica per l'istruzione in percentuale del PIL.",
        statistics: "Spesa pubblica per l'istruzione in % del PIL.",
      },
      why: {
        card: "Mostra quanto spende il settore pubblico per scuole, formazione professionale e università. Circa due terzi dei giovani in Svizzera seguono una formazione professionale di base (SEFRI, 2025).",
        statistics: "Mostra quanto spende il settore pubblico per scuole, formazione professionale e università.",
      },
    },
    de: {
      what: {
        card: "Öffentliche Bildungsausgaben in Prozent des BIP.",
        statistics: "Öffentliche Bildungsausgaben in % des BIP.",
      },
      why: {
        card: "Zeigt, wie viel die öffentliche Hand für Schulen, Berufsbildung und Hochschulen ausgibt. Rund zwei Drittel der Jugendlichen in der Schweiz absolvieren eine berufliche Grundbildung (SBFI, 2025).",
        statistics: "Zeigt, wie viel die öffentliche Hand für Schulen, Berufsbildung und Hochschulen ausgibt.",
      },
    },
    fr: {
      what: {
        card: "Dépenses publiques d'éducation en pourcentage du PIB.",
        statistics: "Dépenses publiques d'éducation en % du PIB.",
      },
      why: {
        card: "Montre combien les pouvoirs publics dépensent pour les écoles, la formation professionnelle et les hautes écoles. Environ deux tiers des jeunes en Suisse suivent une formation professionnelle initiale (SEFRI, 2025).",
        statistics: "Montre combien les pouvoirs publics dépensent pour les écoles, la formation professionnelle et les hautes écoles.",
      },
    },
  },
  "poverty-rate": {
    en: {
      what: "Poverty rate (absolute): share of the population with a household income below the poverty line.",
      why: "In 2024 the poverty line was CHF 2,388 per month for a single person. The at-risk-of-poverty rate (income below 60% of the median) is a separate figure: 16.4%.",
    },
    it: {
      what: "Tasso di povertà (assoluta): quota della popolazione con un reddito inferiore alla soglia di povertà.",
      why: "Nel 2024 la soglia di povertà era di 2388 franchi al mese per una persona sola. Il tasso di rischio di povertà (reddito inferiore al 60\u00A0% della mediana) è un dato distinto: 16,4\u00A0%.",
    },
    de: {
      what: "Armutsquote (absolut): Anteil der Bevölkerung mit einem Einkommen unter der Armutsgrenze.",
      why: "2024 lag die Armutsgrenze bei 2388 Franken pro Monat für eine Einzelperson. Die Armutsgefährdungsquote (Einkommen unter 60\u00A0% des Medians) ist eine eigene Zahl: 16,4\u00A0%.",
    },
    fr: {
      what: "Taux de pauvreté (absolue) : part de la population dont le revenu est inférieur au seuil de pauvreté.",
      why: "En 2024 le seuil de pauvreté était de 2388 francs par mois pour une personne seule. Le taux de risque de pauvreté (revenu inférieur à 60\u00A0% de la médiane) est un chiffre distinct : 16,4\u00A0%.",
    },
  },
  "renewable-energy": {
    en: {
      what: "Share of total final energy consumption that comes from renewable sources (hydro, solar, wind, biomass).",
      why: "Indicates progress toward climate goals. In 2025, 68.3% of net electricity production was renewable, against 30.6% of total final energy consumption.",
    },
    it: {
      what: "Quota del consumo finale totale di energia coperta da fonti rinnovabili (idrico, solare, eolico, biomassa).",
      why: "Indica i progressi verso gli obiettivi climatici. Nel 2025 era rinnovabile il 68,3\u00A0% della produzione netta di elettricità, contro il 30,6\u00A0% del consumo finale totale di energia.",
    },
    de: {
      what: "Anteil des gesamten Endenergieverbrauchs aus erneuerbaren Quellen (Wasser, Solar, Wind, Biomasse).",
      why: "Zeigt Fortschritte bei den Klimazielen. 2025 waren 68,3\u00A0% der Netto-Stromproduktion erneuerbar, gegenüber 30,6\u00A0% des gesamten Endenergieverbrauchs.",
    },
    fr: {
      what: "Part de la consommation finale totale d'énergie provenant de sources renouvelables (hydraulique, solaire, éolien, biomasse).",
      why: "Indique les progrès vers les objectifs climatiques. En 2025, 68,3\u00A0% de la production nette d'électricité était renouvelable, contre 30,6\u00A0% de la consommation finale totale d'énergie.",
    },
  },
};

// The explanation of an indicator in one language, with the wording for the given place.
// Returns null if the indicator has no explanation.
export function getIndicatorExplanation(indicatorId: string, locale: Locale, variant: ExplanationVariant): IndicatorExplanation | null {
  const entry = indicatorExplanations[indicatorId]?.[locale];
  if (!entry) return null;
  const pick = (text: ExplanationText) => (typeof text === "string" ? text : text[variant]);
  return { what: pick(entry.what), why: pick(entry.why) };
}
