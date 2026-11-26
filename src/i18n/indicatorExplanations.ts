import type { Locale } from "./translations";

// Short explanations shown in the info tooltip of each indicator
// (statistics page and dashboard cards). One entry per indicator id.
export type IndicatorExplanation = { what: string; why: string };

export const indicatorExplanations: Record<string, Record<Locale, IndicatorExplanation>> = {
  "unemployment-rate": {
    en: {
      what: "The percentage of the labor force registered as unemployed at RAV (regional employment centers).",
      why: "A key health indicator of the economy. Low unemployment suggests a strong job market.",
    },
    it: {
      what: "Percentuale della forza lavoro registrata come disoccupata presso gli URC (Uffici regionali di collocamento).",
      why: "Un indicatore chiave della salute economica. Una bassa disoccupazione indica un mercato del lavoro forte.",
    },
    de: {
      what: "Der Anteil der Erwerbspersonen, die bei den RAV (Regionale Arbeitsvermittlungszentren) als arbeitslos gemeldet sind.",
      why: "Ein wichtiger Indikator für die wirtschaftliche Gesundheit. Niedrige Arbeitslosigkeit deutet auf einen starken Arbeitsmarkt hin.",
    },
    fr: {
      what: "Le pourcentage de la population active inscrite comme chômeur auprès des ORP (Offices régionaux de placement).",
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
      what: "An index tracking residential property prices over time, as annual average (base Q4 2019 = 100).",
      why: "Shows housing affordability trends. Rapid increases may signal a bubble.",
    },
    it: {
      what: "Un indice che traccia i prezzi immobiliari residenziali nel tempo, in media annua (base Q4 2019 = 100).",
      why: "Mostra le tendenze di accessibilità abitativa. Aumenti rapidi possono segnalare una bolla.",
    },
    de: {
      what: "Ein Index, der die Wohnimmobilienpreise im Zeitverlauf verfolgt, als Jahresdurchschnitt (Basis Q4 2019 = 100).",
      why: "Zeigt Trends bei der Erschwinglichkeit von Wohnraum. Schnelle Anstiege können eine Blase signalisieren.",
    },
    fr: {
      what: "Un indice suivant l'évolution des prix de l'immobilier résidentiel, en moyenne annuelle (base T4 2019 = 100).",
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
      what: "Offences under the Swiss Criminal Code (StGB) recorded by the police per 1,000 permanent residents.",
      why: "Measures public safety. In 2025 recorded offences fell by 1.5% after three years of increases.",
    },
    it: {
      what: "Reati secondo il Codice penale svizzero (CP) registrati dalla polizia per 1'000 residenti permanenti.",
      why: "Misura la sicurezza pubblica. Nel 2025 i reati registrati sono diminuiti dell'1,5% dopo tre anni di aumento.",
    },
    de: {
      what: "Polizeilich registrierte Straftaten nach Schweizer Strafgesetzbuch (StGB) pro 1'000 ständige Einwohner.",
      why: "Misst die öffentliche Sicherheit. 2025 gingen die registrierten Straftaten um 1,5% zurück, nach drei Jahren mit Zunahmen.",
    },
    fr: {
      what: "Infractions au Code pénal suisse (CP) enregistrées par la police pour 1'000 résidents permanents.",
      why: "Mesure la sécurité publique. En 2025 les infractions enregistrées ont reculé de 1,5% après trois années de hausse.",
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
      what: "Poverty rate (absolute): share of the population with a household income below the poverty line.",
      why: "In 2024 the poverty line was CHF 2,388 per month for a single person. The at-risk-of-poverty rate (income below 60% of the median) is a separate figure: 16.4%.",
    },
    it: {
      what: "Tasso di povertà (assoluta): quota della popolazione con un reddito inferiore alla soglia di povertà.",
      why: "Nel 2024 la soglia di povertà era di 2388 franchi al mese per una persona sola. Il tasso di rischio di povertà (reddito inferiore al 60% della mediana) è un dato distinto: 16,4%.",
    },
    de: {
      what: "Armutsquote (absolut): Anteil der Bevölkerung mit einem Einkommen unter der Armutsgrenze.",
      why: "2024 lag die Armutsgrenze bei 2388 Franken pro Monat für eine Einzelperson. Die Armutsgefährdungsquote (Einkommen unter 60% des Medians) ist eine eigene Zahl: 16,4%.",
    },
    fr: {
      what: "Taux de pauvreté (absolue) : part de la population dont le revenu est inférieur au seuil de pauvreté.",
      why: "En 2024 le seuil de pauvreté était de 2388 francs par mois pour une personne seule. Le taux de risque de pauvreté (revenu inférieur à 60% de la médiane) est un chiffre distinct : 16,4%.",
    },
  },
  "renewable-energy": {
    en: {
      what: "Share of total final energy consumption that comes from renewable sources (hydro, solar, wind, biomass).",
      why: "Indicates progress toward climate goals. In 2025, 68.3% of electricity production was renewable, against 30.6% of total final energy consumption.",
    },
    it: {
      what: "Quota del consumo finale totale di energia coperta da fonti rinnovabili (idrico, solare, eolico, biomassa).",
      why: "Indica i progressi verso gli obiettivi climatici. Nel 2025 era rinnovabile il 68,3% della produzione di elettricità, contro il 30,6% del consumo finale totale di energia.",
    },
    de: {
      what: "Anteil des gesamten Endenergieverbrauchs aus erneuerbaren Quellen (Wasser, Solar, Wind, Biomasse).",
      why: "Zeigt Fortschritte bei den Klimazielen. 2025 waren 68,3% der Stromproduktion erneuerbar, gegenüber 30,6% des gesamten Endenergieverbrauchs.",
    },
    fr: {
      what: "Part de la consommation finale totale d'énergie provenant de sources renouvelables (hydraulique, solaire, éolien, biomasse).",
      why: "Indique les progrès vers les objectifs climatiques. En 2025, 68,3% de la production d'électricité était renouvelable, contre 30,6% de la consommation finale totale d'énergie.",
    },
  },
};
