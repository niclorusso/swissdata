export type Locale = "en" | "it";

type TranslationKeys = typeof translations.en;

export const translations = {
  en: {
    // Navigation
    nav: {
      dashboard: "Dashboard",
      statistics: "Statistics",
      quiz: "Quiz",
      cantons: "Cantons",
      about: "About",
    },

    // Footer
    footer: {
      disclaimer: "Data sourced from official Swiss government statistics (BFS, SECO, BAG). Always verify before making decisions.",
      about: "About",
    },

    // Home page
    home: {
      badge: "100% sourced from official Swiss statistics",
      title: "Data-Driven Insights for",
      titleHighlight: "Informed Voting",
      subtitle: "Cut through the noise. Explore real statistics about Switzerland\u2019s economy, demographics, and society. Test your knowledge with verified data from official sources.",
      testKnowledge: "Test Your Knowledge",
      exploreByCanton: "Explore by Canton",
      // Quick stats
      indicatorsTracked: "indicators tracked",
      officialSources: "official sources",
      cantonsCovered: "cantons covered",
      questionsInQuiz: "questions in quiz",
      // CTA
      ctaTitle: "Think you know Swiss statistics?",
      ctaText: "Take our Knowledge Quiz and see how your assumptions compare to reality. You might be surprised!",
      startQuiz: "Start the Quiz",
      // Sources
      ourSources: "Our Sources",
      sourceBFS: "Federal Statistical Office",
      sourceSECO: "State Secretariat for Economic Affairs",
      sourceBAG: "Federal Office of Public Health",
      sourceOpenData: "Swiss Open Government Data",
    },

    // Quiz page
    quiz: {
      title: "Knowledge Quiz",
      subtitle: "How well do you know Switzerland? Test your knowledge of Swiss statistics and discover the facts.",
      howItWorks: "How It Works",
      step1Title: "Read the question",
      step1Desc: "We\u2019ll ask you about a Swiss statistic",
      step2Title: "Make your guess",
      step2Desc: "Use the slider to estimate the answer",
      step3Title: "Learn the facts",
      step3Desc: "See the actual data with sources and international comparisons",
      chooseLength: "Choose quiz length:",
      questionsAvailable: "questions available",
      quick: "Quick",
      standard: "Standard",
      deepDive: "Deep Dive",
      topicsCovered: "Topics Covered",
      topicEconomy: "Economy & Employment",
      topicPopulation: "Population & Migration",
      topicHealthcare: "Healthcare & Housing",
      topicEnergy: "Energy & Infrastructure",
      progress: "Progress",
      revealAnswer: "Reveal Answer",
      nextQuestion: "Next Question",
      seeResults: "See Results",
      restartQuiz: "Restart Quiz",
    },

    // Quiz - Question Card
    questionCard: {
      question: "Question",
      of: "of",
      testKnowledge: "Test Your Knowledge",
      sliderHint: "Use the slider below to make your guess",
    },

    // Quiz - Score Card
    scoreCard: {
      quizComplete: "Quiz Complete!",
      dataExpert: "Data Expert!",
      wellInformed: "Well Informed",
      goodKnowledge: "Good Knowledge",
      roomToLearn: "Room to Learn",
      keepExploring: "Keep Exploring",
      timeToFactCheck: "Time to Fact-Check!",
      averageAccuracy: "Average Accuracy",
      tryAgain: "Try Again",
      shareResult: "Share Result",
      shareText: "I scored {score}% on the SwissData Knowledge Quiz! How well do you know Swiss statistics?",
      yourAnswers: "Your Answers",
      yourGuess: "Your guess:",
      actual: "Actual:",
      unknownQuestion: "Unknown question",
    },

    // Quiz - Reveal Animation
    reveal: {
      accurate: "accurate",
      yourGuess: "Your guess",
      actualValue: "Actual value",
      context: "Context",
      internationalComparison: "International Comparison",
      viewSource: "View source",
    },

    // Statistics page
    statistics: {
      title: "Statistics & Trends",
      subtitle: "Explore Switzerland\u2019s key indicators over time. Data spans back to 2000 for most metrics.",
      allCategories: "All Categories",
      economic: "Economic",
      demographic: "Demographic",
      social: "Social",
      keyEconomicIndicators: "Key Economic Indicators",
      economicTrends: "Economic Trends",
      demographicTrends: "Demographic Trends",
      socialTrends: "Social Trends",
      comparingChart: "Comparing unemployment rate, GDP growth, and inflation over time. Vertical lines mark major economic events.",
      federalBudget: "Federal Budget Breakdown (2026)",
      federalBudgetSubtitle: "How Switzerland allocates its CHF 78 billion federal budget across key areas.",
      source: "Source:",
      viewSource: "View source",
      dataSources: "Data Sources",
      whatIsIt: "What is it?",
      whyItMatters: "Why it matters",
      // Source descriptions
      sourceBFS: "Federal Statistical Office",
      sourceSECO: "State Secretariat for Economic Affairs",
      sourceBAG: "Federal Office of Public Health",
      sourceOpenData: "Swiss Open Government Data",
    },

    // Time range
    timeRange: {
      "5Y": "5 Years",
      "10Y": "10 Years",
      "20Y": "20 Years",
      ALL: "All Time",
    },

    // Historical events
    events: {
      financialCrisis: "Financial Crisis",
      snbShock: "SNB Shock",
      covid: "COVID-19",
    },

    // Cantons page
    cantons: {
      title: "Canton Comparison",
      subtitle: "Explore how different cantons compare across key indicators. Click on a canton to see detailed statistics.",
      colorBy: "Color by:",
      unemployment: "Unemployment",
      foreignPopulation: "Foreign Population",
      healthcareCost: "Healthcare Cost",
      gdpPerCapita: "GDP per Capita",
      averageRent: "Average Rent",
      crimeRate: "Crime Rate",
      selectCanton: "Select a canton on the map to see details",
      nationalAverage: "National Average",
      allCantons: "All Cantons",
      canton: "Canton",
      population: "Population",
      area: "Area (km\u00B2)",
      density: "Density",
      lower: "Lower",
      higher: "Higher",
    },

    // Canton tooltip
    cantonTooltip: {
      population: "Population",
      area: "Area",
      keyIndicators: "Key Indicators",
      populationDensity: "Population Density",
      vsCH: "vs CH",
    },

    // About page
    about: {
      title: "About SwissData",
      mission: "Our mission is to provide Swiss citizens with accurate, accessible data to make informed decisions\u2014especially when voting.",
      whyTitle: "Why Data-Driven Voting Matters",
      whyP1: "Switzerland\u2019s direct democracy gives citizens significant power to shape policy. But with this power comes responsibility\u2014the responsibility to make decisions based on facts, not fear.",
      whyP2: "Political debates often rely on emotions, anecdotes, and selective statistics. Misconceptions spread easily and can influence how people vote. Our goal is to provide a reliable source of truth that anyone can access before heading to the ballot box.",
      whyP3: "We don\u2019t tell you how to vote. We simply show you the data and let you decide.",
      principlesTitle: "Our Principles",
      principle1Title: "Political Neutrality",
      principle1Desc: "We present data without political commentary. We don\u2019t endorse parties, candidates, or positions. The numbers speak for themselves.",
      principle2Title: "Full Transparency",
      principle2Desc: "Every data point links to its official source. We show methodology, update dates, and confidence levels. You can verify everything yourself.",
      principle3Title: "Regular Updates",
      principle3Desc: "Statistics change. We commit to keeping our data current and clearly marking when information was last updated.",
      principle4Title: "Context Over Clickbait",
      principle4Desc: "Numbers alone can mislead. We always provide context, historical trends, and international comparisons to give you the full picture.",
      sourcesTitle: "Our Sources",
      sourcesIntro: "We exclusively use official Swiss government statistics and internationally recognized databases:",
      // Sources
      bfsName: "Federal Statistical Office",
      bfsDesc: "The primary source for Swiss statistics on population, economy, society, and environment.",
      secoName: "State Secretariat for Economic Affairs",
      secoDesc: "Labor market statistics, unemployment figures, and economic indicators.",
      bagName: "Federal Office of Public Health",
      bagDesc: "Health statistics, insurance data, and public health indicators.",
      semName: "State Secretariat for Migration",
      semDesc: "Migration statistics, asylum data, and visa information.",
      snbName: "Swiss National Bank",
      snbDesc: "Financial statistics, exchange rates, and monetary policy data.",
      oecdName: "Organisation for Economic Co-operation and Development",
      oecdDesc: "International comparisons and standardized economic indicators.",
      // Methodology
      methodologyTitle: "Methodology",
      dataCollectionTitle: "Data Collection",
      dataCollectionDesc: "We collect data directly from official government APIs and publications. We never use secondary sources or media reports without verification. All data points include links to their original sources.",
      questionSelectionTitle: "Question Selection",
      questionSelectionDesc: "The questions in our quiz cover key Swiss statistics across economic, demographic, and social domains. We select topics that are relevant to informed citizenship and testable with official data sources.",
      accuracyScoringTitle: "Accuracy Scoring",
      accuracyScoringDesc: "Quiz accuracy is calculated using an exponential decay function based on the distance between your guess and the actual value, normalized by the question\u2019s range. This rewards close guesses while being forgiving of reasonable estimates.",
      updateFrequencyTitle: "Update Frequency",
      updateFrequencyDesc: "We update indicators as soon as new official data is released. Most economic indicators are updated quarterly; demographic data annually. Each indicator shows its last update date.",
      // Limitations
      limitationsTitle: "Limitations",
      limitation1: "Statistics are not the whole story.",
      limitation1Desc: "Numbers can show trends but don\u2019t capture individual experiences or local variations.",
      limitation2: "Definitions matter.",
      limitation2Desc: 'How "unemployment" or "crime" is defined affects the numbers. We link to methodological notes where available.',
      limitation3: "Correlation is not causation.",
      limitation3Desc: "We show data, not explanations. The reasons behind trends are complex and often debated.",
      limitation4: "Data can have delays.",
      limitation4Desc: "Official statistics take time to compile. The most recent data may be from months or years ago.",
      // CTA
      ctaTitle: "Knowledge is power. Use it wisely.",
      ctaText: "The next time you hear a bold claim about Switzerland, check the data. Make your vote count\u2014informed by facts, not fears.",
    },

    // Category section
    category: {
      economicTitle: "Economic Indicators",
      economicDesc: "GDP, employment, and financial health of Switzerland",
      demographicTitle: "Demographic Indicators",
      demographicDesc: "Population, migration, and age structure",
      socialTitle: "Social Indicators",
      socialDesc: "Healthcare, education, and quality of life",
      historicalTrend: "Historical Trend",
    },

    // Indicator card
    indicatorCard: {
      whatIsIt: "What is it?",
      whyItMatters: "Why it matters",
      vsLastYear: "vs last year",
    },
  },

  it: {
    // Navigation
    nav: {
      dashboard: "Dashboard",
      statistics: "Statistiche",
      quiz: "Quiz",
      cantons: "Cantoni",
      about: "Chi siamo",
    },

    // Footer
    footer: {
      disclaimer: "Dati provenienti da statistiche ufficiali del governo svizzero (UST, SECO, UFSP). Verificare sempre prima di prendere decisioni.",
      about: "Chi siamo",
    },

    // Home page
    home: {
      badge: "100% basato su statistiche ufficiali svizzere",
      title: "Dati per decisioni",
      titleHighlight: "di voto informate",
      subtitle: "Vai oltre il rumore. Esplora statistiche reali sull\u2019economia, la demografia e la societ\u00E0 svizzera. Testa le tue conoscenze con dati verificati da fonti ufficiali.",
      testKnowledge: "Testa le tue conoscenze",
      exploreByCanton: "Esplora per Cantone",
      // Quick stats
      indicatorsTracked: "indicatori monitorati",
      officialSources: "fonti ufficiali",
      cantonsCovered: "cantoni coperti",
      questionsInQuiz: "domande nel quiz",
      // CTA
      ctaTitle: "Pensi di conoscere le statistiche svizzere?",
      ctaText: "Fai il nostro Quiz e scopri come le tue supposizioni si confrontano con la realt\u00E0. Potresti sorprenderti!",
      startQuiz: "Inizia il Quiz",
      // Sources
      ourSources: "Le nostre fonti",
      sourceBFS: "Ufficio federale di statistica",
      sourceSECO: "Segretariato di Stato dell\u2019economia",
      sourceBAG: "Ufficio federale della sanit\u00E0 pubblica",
      sourceOpenData: "Dati aperti del governo svizzero",
    },

    // Quiz page
    quiz: {
      title: "Quiz di conoscenza",
      subtitle: "Quanto conosci la Svizzera? Testa le tue conoscenze sulle statistiche svizzere e scopri i fatti.",
      howItWorks: "Come funziona",
      step1Title: "Leggi la domanda",
      step1Desc: "Ti chiederemo di una statistica svizzera",
      step2Title: "Fai la tua stima",
      step2Desc: "Usa il cursore per stimare la risposta",
      step3Title: "Scopri i fatti",
      step3Desc: "Visualizza i dati reali con fonti e confronti internazionali",
      chooseLength: "Scegli la lunghezza del quiz:",
      questionsAvailable: "domande disponibili",
      quick: "Veloce",
      standard: "Standard",
      deepDive: "Approfondito",
      topicsCovered: "Argomenti trattati",
      topicEconomy: "Economia e occupazione",
      topicPopulation: "Popolazione e migrazione",
      topicHealthcare: "Sanit\u00E0 e alloggio",
      topicEnergy: "Energia e infrastrutture",
      progress: "Progresso",
      revealAnswer: "Rivela la risposta",
      nextQuestion: "Prossima domanda",
      seeResults: "Vedi risultati",
      restartQuiz: "Ricomincia il Quiz",
    },

    // Quiz - Question Card
    questionCard: {
      question: "Domanda",
      of: "di",
      testKnowledge: "Testa le tue conoscenze",
      sliderHint: "Usa il cursore qui sotto per fare la tua stima",
    },

    // Quiz - Score Card
    scoreCard: {
      quizComplete: "Quiz completato!",
      dataExpert: "Esperto di dati!",
      wellInformed: "Ben informato",
      goodKnowledge: "Buona conoscenza",
      roomToLearn: "Margine di miglioramento",
      keepExploring: "Continua a esplorare",
      timeToFactCheck: "\u00C8 ora di verificare i fatti!",
      averageAccuracy: "Precisione media",
      tryAgain: "Riprova",
      shareResult: "Condividi risultato",
      shareText: "Ho ottenuto {score}% nel Quiz SwissData! Quanto conosci le statistiche svizzere?",
      yourAnswers: "Le tue risposte",
      yourGuess: "La tua stima:",
      actual: "Valore reale:",
      unknownQuestion: "Domanda sconosciuta",
    },

    // Quiz - Reveal Animation
    reveal: {
      accurate: "preciso",
      yourGuess: "La tua stima",
      actualValue: "Valore reale",
      context: "Contesto",
      internationalComparison: "Confronto internazionale",
      viewSource: "Vedi fonte",
    },

    // Statistics page
    statistics: {
      title: "Statistiche e tendenze",
      subtitle: "Esplora gli indicatori chiave della Svizzera nel tempo. I dati risalgono al 2000 per la maggior parte delle metriche.",
      allCategories: "Tutte le categorie",
      economic: "Economici",
      demographic: "Demografici",
      social: "Sociali",
      keyEconomicIndicators: "Indicatori economici chiave",
      economicTrends: "Tendenze economiche",
      demographicTrends: "Tendenze demografiche",
      socialTrends: "Tendenze sociali",
      comparingChart: "Confronto tra tasso di disoccupazione, crescita del PIL e inflazione nel tempo. Le linee verticali indicano eventi economici importanti.",
      federalBudget: "Ripartizione del bilancio federale (2026)",
      federalBudgetSubtitle: "Come la Svizzera distribuisce i suoi 78 miliardi di CHF del bilancio federale.",
      source: "Fonte:",
      viewSource: "Vedi fonte",
      dataSources: "Fonti dei dati",
      whatIsIt: "Cos\u2019\u00E8?",
      whyItMatters: "Perch\u00E9 \u00E8 importante",
      // Source descriptions
      sourceBFS: "Ufficio federale di statistica",
      sourceSECO: "Segretariato di Stato dell\u2019economia",
      sourceBAG: "Ufficio federale della sanit\u00E0 pubblica",
      sourceOpenData: "Dati aperti del governo svizzero",
    },

    // Time range
    timeRange: {
      "5Y": "5 anni",
      "10Y": "10 anni",
      "20Y": "20 anni",
      ALL: "Tutto",
    },

    // Historical events
    events: {
      financialCrisis: "Crisi finanziaria",
      snbShock: "Shock BNS",
      covid: "COVID-19",
    },

    // Cantons page
    cantons: {
      title: "Confronto cantonale",
      subtitle: "Scopri come i diversi cantoni si confrontano sugli indicatori chiave. Clicca su un cantone per vedere le statistiche dettagliate.",
      colorBy: "Colora per:",
      unemployment: "Disoccupazione",
      foreignPopulation: "Popolazione straniera",
      healthcareCost: "Costo sanitario",
      gdpPerCapita: "PIL pro capite",
      averageRent: "Affitto medio",
      crimeRate: "Tasso di criminalit\u00E0",
      selectCanton: "Seleziona un cantone sulla mappa per vedere i dettagli",
      nationalAverage: "Media nazionale",
      allCantons: "Tutti i cantoni",
      canton: "Cantone",
      population: "Popolazione",
      area: "Superficie (km\u00B2)",
      density: "Densit\u00E0",
      lower: "Minore",
      higher: "Maggiore",
    },

    // Canton tooltip
    cantonTooltip: {
      population: "Popolazione",
      area: "Superficie",
      keyIndicators: "Indicatori chiave",
      populationDensity: "Densit\u00E0 di popolazione",
      vsCH: "vs CH",
    },

    // About page
    about: {
      title: "Chi \u00E8 SwissData",
      mission: "La nostra missione \u00E8 fornire ai cittadini svizzeri dati accurati e accessibili per prendere decisioni informate, specialmente quando votano.",
      whyTitle: "Perch\u00E9 il voto basato sui dati \u00E8 importante",
      whyP1: "La democrazia diretta svizzera d\u00E0 ai cittadini un potere significativo nel plasmare le politiche. Ma con questo potere viene la responsabilit\u00E0 di prendere decisioni basate sui fatti, non sulla paura.",
      whyP2: "I dibattiti politici spesso si basano su emozioni, aneddoti e statistiche selettive. Le idee sbagliate si diffondono facilmente e possono influenzare il voto. Il nostro obiettivo \u00E8 fornire una fonte affidabile di verit\u00E0 accessibile a tutti prima di andare alle urne.",
      whyP3: "Non ti diciamo come votare. Ti mostriamo semplicemente i dati e lasciamo che tu decida.",
      principlesTitle: "I nostri principi",
      principle1Title: "Neutralit\u00E0 politica",
      principle1Desc: "Presentiamo i dati senza commenti politici. Non appoggiamo partiti, candidati o posizioni. I numeri parlano da soli.",
      principle2Title: "Totale trasparenza",
      principle2Desc: "Ogni dato \u00E8 collegato alla sua fonte ufficiale. Mostriamo la metodologia, le date di aggiornamento e i livelli di affidabilit\u00E0. Puoi verificare tutto tu stesso.",
      principle3Title: "Aggiornamenti regolari",
      principle3Desc: "Le statistiche cambiano. Ci impegniamo a mantenere i nostri dati aggiornati e a indicare chiaramente quando le informazioni sono state aggiornate l\u2019ultima volta.",
      principle4Title: "Contesto, non sensazionalismo",
      principle4Desc: "I numeri da soli possono ingannare. Forniamo sempre contesto, tendenze storiche e confronti internazionali per darti il quadro completo.",
      sourcesTitle: "Le nostre fonti",
      sourcesIntro: "Utilizziamo esclusivamente statistiche ufficiali del governo svizzero e banche dati riconosciute a livello internazionale:",
      // Sources
      bfsName: "Ufficio federale di statistica",
      bfsDesc: "La fonte principale per le statistiche svizzere su popolazione, economia, societ\u00E0 e ambiente.",
      secoName: "Segretariato di Stato dell\u2019economia",
      secoDesc: "Statistiche sul mercato del lavoro, dati sulla disoccupazione e indicatori economici.",
      bagName: "Ufficio federale della sanit\u00E0 pubblica",
      bagDesc: "Statistiche sanitarie, dati assicurativi e indicatori di salute pubblica.",
      semName: "Segretariato di Stato della migrazione",
      semDesc: "Statistiche sulla migrazione, dati sull\u2019asilo e informazioni sui visti.",
      snbName: "Banca nazionale svizzera",
      snbDesc: "Statistiche finanziarie, tassi di cambio e dati di politica monetaria.",
      oecdName: "Organizzazione per la cooperazione e lo sviluppo economico",
      oecdDesc: "Confronti internazionali e indicatori economici standardizzati.",
      // Methodology
      methodologyTitle: "Metodologia",
      dataCollectionTitle: "Raccolta dati",
      dataCollectionDesc: "Raccogliamo i dati direttamente dalle API e pubblicazioni ufficiali del governo. Non utilizziamo mai fonti secondarie o reportage senza verifica. Tutti i dati includono collegamenti alle fonti originali.",
      questionSelectionTitle: "Selezione delle domande",
      questionSelectionDesc: "Le domande del nostro quiz coprono le principali statistiche svizzere nei settori economico, demografico e sociale. Selezioniamo argomenti rilevanti per una cittadinanza informata e verificabili con fonti ufficiali.",
      accuracyScoringTitle: "Calcolo della precisione",
      accuracyScoringDesc: "La precisione del quiz viene calcolata utilizzando una funzione di decadimento esponenziale basata sulla distanza tra la tua stima e il valore reale, normalizzata per l\u2019intervallo della domanda. Questo premia le stime vicine pur essendo tollerante con le stime ragionevoli.",
      updateFrequencyTitle: "Frequenza di aggiornamento",
      updateFrequencyDesc: "Aggiorniamo gli indicatori non appena vengono rilasciati nuovi dati ufficiali. La maggior parte degli indicatori economici viene aggiornata trimestralmente; i dati demografici annualmente. Ogni indicatore mostra la data dell\u2019ultimo aggiornamento.",
      // Limitations
      limitationsTitle: "Limiti",
      limitation1: "Le statistiche non raccontano tutta la storia.",
      limitation1Desc: "I numeri possono mostrare tendenze ma non catturano esperienze individuali o variazioni locali.",
      limitation2: "Le definizioni contano.",
      limitation2Desc: "Come vengono definiti \"disoccupazione\" o \"criminalit\u00E0\" influenza i numeri. Colleghiamo le note metodologiche dove disponibili.",
      limitation3: "Correlazione non significa causalit\u00E0.",
      limitation3Desc: "Mostriamo dati, non spiegazioni. Le ragioni dietro le tendenze sono complesse e spesso dibattute.",
      limitation4: "I dati possono avere ritardi.",
      limitation4Desc: "Le statistiche ufficiali richiedono tempo per essere compilate. I dati pi\u00F9 recenti potrebbero risalire a mesi o anni fa.",
      // CTA
      ctaTitle: "La conoscenza \u00E8 potere. Usala saggiamente.",
      ctaText: "La prossima volta che senti un\u2019affermazione audace sulla Svizzera, controlla i dati. Fai contare il tuo voto \u2014 informato dai fatti, non dalle paure.",
    },

    // Category section
    category: {
      economicTitle: "Indicatori economici",
      economicDesc: "PIL, occupazione e salute finanziaria della Svizzera",
      demographicTitle: "Indicatori demografici",
      demographicDesc: "Popolazione, migrazione e struttura per et\u00E0",
      socialTitle: "Indicatori sociali",
      socialDesc: "Sanit\u00E0, istruzione e qualit\u00E0 della vita",
      historicalTrend: "Tendenza storica",
    },

    // Indicator card
    indicatorCard: {
      whatIsIt: "Cos\u2019\u00E8?",
      whyItMatters: "Perch\u00E9 \u00E8 importante",
      vsLastYear: "rispetto all\u2019anno scorso",
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
