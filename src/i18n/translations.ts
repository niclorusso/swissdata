export type Locale = "en" | "it" | "de" | "fr";

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
      spending: "Spending",
    },

    // Footer
    footer: {
      disclaimer: "Each figure names its source: Swiss federal offices, Eurostat, the OECD and others. Check the source before relying on a figure.",
      about: "About",
    },

    // Home page
    home: {
      spendingTitle: "Public spending",
      spendingText: "How much the Confederation, the cantons and the municipalities spend, and on what: federal budget, revenue, debt, federal contracts and the accounts of every municipality in Ticino and Zurich. In English and Italian.",
      badge: "100% sourced from official Swiss statistics",
      title: "Switzerland",
      titleHighlight: "in Numbers",
      subtitle: "Statistics on Switzerland's economy, population and society, each with its source. A quiz to test what you know.",
      testKnowledge: "Test Your Knowledge",
      exploreByCanton: "Explore by Canton",
      showStats: "Show Statistics",
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
      federalBudget: "Public spending",
      federalBudgetSubtitle: "The 2026 federal budget is CHF 91.1 billion. Spending by area, revenue, debt, cantons, municipalities and federal contracts are on the SwissData spending site (in English and Italian).",
      openSpending: "Open public spending",
      source: "Source:",
      viewSource: "View source",
      dataSources: "Data Sources",
      whatIsIt: "What is it?",
      whyItMatters: "Why it matters",
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
      healthPremium: "Health Insurance Premium",
      gdpPerCapita: "GDP per Capita",
      averageRent: "Average Rent",
      crimeRate: "Offences per 1,000 inhabitants",
      selectCanton: "Select a canton on the map to see details",
      switzerland: "Switzerland",
      allCantons: "All Cantons",
      canton: "Canton",
      population: "Population",
      area: "Area (km\u00B2)",
      density: "Density",
      lower: "Lower",
      higher: "Higher",
      unemploymentNote: "Note: This is the SECO registered unemployment rate, which counts people registered as unemployed at RAV offices. The dashboard also shows the ILO rate, which includes all active job seekers and is higher.",
      dataSources: "Data sources",
      provisional: "provisional",
      territoryNote: "Population, area and foreign share use the cantonal borders of 1 January 2026: Moutier, in the canton of Bern until 31 December 2025, is counted in the canton of Jura. The foreign share is recomputed for these borders from the STATPOP figures of 31 December 2025, so for Jura and Bern it differs from the share the FSO publishes for the 2025 borders.",
      oldBordersNote: "These indicators refer to the borders before 2026, with Moutier in the canton of Bern: {list}.",
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
      mission: "Our mission is to make Swiss data accessible to everyone—citizens, researchers, journalists, and anyone curious about Switzerland.",
      whyTitle: "Why Accessible Data Matters",
      whyP1: "Data helps us understand our world. But official statistics are often buried in complex reports, scattered across different agencies, or presented in formats that are hard to understand.",
      whyP2: "Misconceptions about Switzerland spread easily when accurate data isn't accessible. Our goal is to provide a reliable, user-friendly source of truth that anyone can explore and understand.",
      whyP3: "We don't interpret the data for you. We simply present it clearly and let you draw your own conclusions.",
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
      sourcesIntro: "The indicators and the canton figures come from Swiss federal offices and Eurostat. The quiz also uses the OECD, the World Bank, the IMF, the European Central Bank, SIPRI, the World Gold Council, the Swiss Bankers Association and SBB. Each figure names its source.",
      // Methodology
      methodologyTitle: "Methodology",
      dataCollectionTitle: "Data Collection",
      dataCollectionDesc: "We take each figure from the table, database or publication of the body named as its source, and link to it. We do not use media reports as a source.",
      questionSelectionTitle: "Question Selection",
      questionSelectionDesc: "The questions in our quiz cover key Swiss statistics across economic, demographic, and social domains. We select topics that are relevant to informed citizenship and testable with official data sources.",
      accuracyScoringTitle: "Accuracy Scoring",
      accuracyScoringDesc: "The score of an answer is 100% minus the distance between your guess and the actual value, measured as a share of the slider's range. A guess off by a tenth of the range scores 90%.",
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
      ctaText: "The next time you hear a bold claim about Switzerland, check the data. Stay informed—with facts, not assumptions.",
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
      viewAllStatistics: "View All Statistics",
    },

    // Indicator card
    indicatorCard: {
      whatIsIt: "What is it?",
      whyItMatters: "Why it matters",
      vsLastYear: "vs last year",
      vsPeriod: "vs {period}",
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
      spending: "Spesa pubblica",
    },

    // Footer
    footer: {
      disclaimer: "Ogni cifra indica la sua fonte: uffici federali svizzeri, Eurostat, OCSE e altre. Verifica la fonte prima di basarti su una cifra.",
      about: "Chi siamo",
    },

    // Home page
    home: {
      spendingTitle: "Spesa pubblica",
      spendingText: "Quanto spendono Confederazione, Cantoni e Comuni, e per che cosa: bilancio federale, entrate, debito, appalti federali e i conti di tutti i Comuni di Ticino e Zurigo.",
      badge: "100% basato su statistiche ufficiali svizzere",
      title: "La Svizzera",
      titleHighlight: "in numeri",
      subtitle: "Statistiche su economia, popolazione e società della Svizzera, ognuna con la sua fonte. Un quiz per mettere alla prova quello che sai.",
      testKnowledge: "Testa le tue conoscenze",
      exploreByCanton: "Esplora per Cantone",
      showStats: "Vedi Statistiche",
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
      federalBudget: "Spesa pubblica",
      federalBudgetSubtitle: "Il preventivo federale 2026 è di 91,1 miliardi di CHF. Spese per settore, entrate, debito, Cantoni, Comuni e appalti federali sono nel sito SwissData sulla spesa pubblica.",
      openSpending: "Apri la spesa pubblica",
      source: "Fonte:",
      viewSource: "Vedi fonte",
      dataSources: "Fonti dei dati",
      whatIsIt: "Cos\u2019\u00E8?",
      whyItMatters: "Perch\u00E9 \u00E8 importante",
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
      healthPremium: "Premio cassa malati",
      gdpPerCapita: "PIL pro capite",
      averageRent: "Affitto medio",
      crimeRate: "Reati per 1000 abitanti",
      selectCanton: "Seleziona un cantone sulla mappa per vedere i dettagli",
      switzerland: "Svizzera",
      allCantons: "Tutti i cantoni",
      canton: "Cantone",
      population: "Popolazione",
      area: "Superficie (km\u00B2)",
      density: "Densit\u00E0",
      lower: "Minore",
      higher: "Maggiore",
      unemploymentNote: "Nota: tasso di disoccupazione SECO, che conta i disoccupati iscritti agli URC. La dashboard mostra anche il tasso ILO, che include tutte le persone in cerca di lavoro ed \u00E8 pi\u00F9 alto.",
      dataSources: "Fonti dei dati",
      provisional: "provvisorio",
      territoryNote: "Popolazione, superficie e quota di stranieri seguono i confini cantonali del 1° gennaio 2026: Moutier, nel Canton Berna fino al 31 dicembre 2025, è contata nel Canton Giura. La quota di stranieri è ricalcolata per questi confini dai dati STATPOP del 31 dicembre 2025; per Giura e Berna è quindi diversa da quella che l'UST pubblica per i confini del 2025.",
      oldBordersNote: "Questi indicatori si riferiscono ai confini precedenti al 2026, con Moutier nel Canton Berna: {list}.",
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
      title: "Chi è SwissData",
      mission: "La nostra missione è rendere i dati svizzeri accessibili a tutti—cittadini, ricercatori, giornalisti e chiunque sia curioso della Svizzera.",
      whyTitle: "Perché i dati accessibili sono importanti",
      whyP1: "I dati ci aiutano a capire il mondo. Ma le statistiche ufficiali sono spesso nascoste in rapporti complessi, sparse tra diverse agenzie o presentate in formati difficili da comprendere.",
      whyP2: "Le idee sbagliate sulla Svizzera si diffondono facilmente quando i dati accurati non sono accessibili. Il nostro obiettivo è fornire una fonte affidabile e facile da usare che chiunque possa esplorare e capire.",
      whyP3: "Non interpretiamo i dati per te. Li presentiamo semplicemente in modo chiaro e ti lasciamo trarre le tue conclusioni.",
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
      sourcesIntro: "Gli indicatori e i dati dei Cantoni vengono da uffici federali svizzeri e da Eurostat. Il quiz usa anche OCSE, Banca mondiale, FMI, Banca centrale europea, SIPRI, World Gold Council, Associazione svizzera dei banchieri e FFS. Ogni cifra indica la sua fonte.",
      // Methodology
      methodologyTitle: "Metodologia",
      dataCollectionTitle: "Raccolta dati",
      dataCollectionDesc: "Prendiamo ogni cifra dalla tabella, dalla banca dati o dalla pubblicazione dell'ente indicato come fonte, con il link. Non usiamo articoli di stampa come fonte.",
      questionSelectionTitle: "Selezione delle domande",
      questionSelectionDesc: "Le domande del nostro quiz coprono le principali statistiche svizzere nei settori economico, demografico e sociale. Selezioniamo argomenti rilevanti per una cittadinanza informata e verificabili con fonti ufficiali.",
      accuracyScoringTitle: "Calcolo della precisione",
      accuracyScoringDesc: "Il punteggio di una risposta è 100% meno la distanza tra la tua stima e il valore reale, misurata in rapporto all'ampiezza del cursore. Una stima che sbaglia di un decimo dell'ampiezza vale 90%.",
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
      ctaTitle: "La conoscenza è potere. Usala saggiamente.",
      ctaText: "La prossima volta che senti un'affermazione audace sulla Svizzera, controlla i dati. Rimani informato—con i fatti, non con le supposizioni.",
    },

    // Category section
    category: {
      economicTitle: "Indicatori economici",
      economicDesc: "PIL, occupazione e salute finanziaria della Svizzera",
      demographicTitle: "Indicatori demografici",
      demographicDesc: "Popolazione, migrazione e struttura per et\u00E0",
      socialTitle: "Indicatori sociali",
      socialDesc: "Sanit\u00E0, istruzione e qualit\u00E0 della vita",
      historicalTrend: "Tendenza storica",      viewAllStatistics: "Vedi tutte le statistiche",    },

    // Indicator card
    indicatorCard: {
      whatIsIt: "Cos'è?",
      whyItMatters: "Perché è importante",
      vsLastYear: "rispetto all'anno scorso",
      vsPeriod: "rispetto al {period}",
    },
  },

  de: {
    // Navigation
    nav: {
      dashboard: "Dashboard",
      statistics: "Statistiken",
      quiz: "Quiz",
      cantons: "Kantone",
      about: "Über uns",
      spending: "Staatsausgaben",
    },

    // Footer
    footer: {
      disclaimer: "Jede Zahl nennt ihre Quelle: Schweizer Bundesämter, Eurostat, OECD und weitere. Prüfe die Quelle, bevor du dich auf eine Zahl stützt.",
      about: "Über uns",
    },

    // Home page
    home: {
      spendingTitle: "Staatsausgaben",
      spendingText: "Wie viel Bund, Kantone und Gemeinden ausgeben und wofür: Bundeshaushalt, Einnahmen, Schulden, Beschaffungen des Bundes und die Rechnungen aller Gemeinden der Kantone Tessin und Zürich. Auf Englisch und Italienisch.",
      badge: "100% aus offiziellen Schweizer Statistiken",
      title: "Die Schweiz",
      titleHighlight: "in Zahlen",
      subtitle: "Statistiken zu Wirtschaft, Bevölkerung und Gesellschaft der Schweiz, jede mit ihrer Quelle. Ein Quiz, um dein Wissen zu testen.",
      testKnowledge: "Teste dein Wissen",
      exploreByCanton: "Nach Kanton erkunden",
      showStats: "Statistiken anzeigen",
      // Quick stats
      indicatorsTracked: "erfasste Indikatoren",
      officialSources: "offizielle Quellen",
      cantonsCovered: "abgedeckte Kantone",
      questionsInQuiz: "Fragen im Quiz",
      // CTA
      ctaTitle: "Glaubst du, die Schweizer Statistiken zu kennen?",
      ctaText: "Mach unser Wissensquiz und finde heraus, wie deine Annahmen mit der Realität übereinstimmen. Du könntest überrascht sein!",
      startQuiz: "Quiz starten",
      // Sources
      ourSources: "Unsere Quellen",
    },

    // Quiz page
    quiz: {
      title: "Wissensquiz",
      subtitle: "Wie gut kennst du die Schweiz? Teste dein Wissen über Schweizer Statistiken und entdecke die Fakten.",
      howItWorks: "So funktioniert's",
      step1Title: "Lies die Frage",
      step1Desc: "Wir fragen dich nach einer Schweizer Statistik",
      step2Title: "Mach deine Schätzung",
      step2Desc: "Verwende den Schieberegler, um die Antwort zu schätzen",
      step3Title: "Erfahre die Fakten",
      step3Desc: "Sieh die tatsächlichen Daten mit Quellen und internationalen Vergleichen",
      chooseLength: "Wähle die Quizlänge:",
      questionsAvailable: "verfügbare Fragen",
      quick: "Schnell",
      standard: "Standard",
      deepDive: "Vertieft",
      topicsCovered: "Behandelte Themen",
      topicEconomy: "Wirtschaft & Beschäftigung",
      topicPopulation: "Bevölkerung & Migration",
      topicHealthcare: "Gesundheit & Wohnen",
      topicEnergy: "Energie & Infrastruktur",
      progress: "Fortschritt",
      revealAnswer: "Antwort zeigen",
      nextQuestion: "Nächste Frage",
      seeResults: "Ergebnisse anzeigen",
      restartQuiz: "Quiz neu starten",
    },

    // Quiz - Question Card
    questionCard: {
      question: "Frage",
      of: "von",
      testKnowledge: "Teste dein Wissen",
      sliderHint: "Verwende den Schieberegler unten, um deine Schätzung abzugeben",
    },

    // Quiz - Score Card
    scoreCard: {
      quizComplete: "Quiz abgeschlossen!",
      dataExpert: "Datenexperte!",
      wellInformed: "Gut informiert",
      goodKnowledge: "Gutes Wissen",
      roomToLearn: "Raum zum Lernen",
      keepExploring: "Weiter erkunden",
      timeToFactCheck: "Zeit für einen Faktencheck!",
      averageAccuracy: "Durchschnittliche Genauigkeit",
      tryAgain: "Erneut versuchen",
      shareResult: "Ergebnis teilen",
      shareText: "Ich habe {score}% im SwissData Wissensquiz erreicht! Wie gut kennst du die Schweizer Statistiken?",
      yourAnswers: "Deine Antworten",
      yourGuess: "Deine Schätzung:",
      actual: "Tatsächlich:",
      unknownQuestion: "Unbekannte Frage",
    },

    // Quiz - Reveal Animation
    reveal: {
      accurate: "genau",
      yourGuess: "Deine Schätzung",
      actualValue: "Tatsächlicher Wert",
      context: "Kontext",
      internationalComparison: "Internationaler Vergleich",
      viewSource: "Quelle anzeigen",
    },

    // Statistics page
    statistics: {
      title: "Statistiken & Trends",
      subtitle: "Entdecke die wichtigsten Indikatoren der Schweiz im Zeitverlauf. Die Daten reichen für die meisten Kennzahlen bis 2000 zurück.",
      allCategories: "Alle Kategorien",
      economic: "Wirtschaftlich",
      demographic: "Demografisch",
      social: "Sozial",
      keyEconomicIndicators: "Wichtige Wirtschaftsindikatoren",
      economicTrends: "Wirtschaftstrends",
      demographicTrends: "Demografische Trends",
      socialTrends: "Soziale Trends",
      comparingChart: "Vergleich von Arbeitslosenquote, BIP-Wachstum und Inflation im Zeitverlauf. Vertikale Linien markieren wichtige wirtschaftliche Ereignisse.",
      federalBudget: "Staatsausgaben",
      federalBudgetSubtitle: "Der Voranschlag 2026 des Bundes beträgt 91,1 Milliarden CHF. Ausgaben nach Aufgabengebiet, Einnahmen, Schulden, Kantone, Gemeinden und Beschaffungen des Bundes stehen auf der SwissData-Seite zu den Staatsausgaben (auf Englisch und Italienisch).",
      openSpending: "Staatsausgaben öffnen",
      source: "Quelle:",
      viewSource: "Quelle anzeigen",
      dataSources: "Datenquellen",
      whatIsIt: "Was ist das?",
      whyItMatters: "Warum es wichtig ist",
    },

    // Time range
    timeRange: {
      "5Y": "5 Jahre",
      "10Y": "10 Jahre",
      "20Y": "20 Jahre",
      ALL: "Alle",
    },

    // Historical events
    events: {
      financialCrisis: "Finanzkrise",
      snbShock: "SNB-Schock",
      covid: "COVID-19",
    },

    // Cantons page
    cantons: {
      title: "Kantonsvergleich",
      subtitle: "Entdecke, wie sich die verschiedenen Kantone bei den wichtigsten Indikatoren unterscheiden. Klicke auf einen Kanton, um detaillierte Statistiken zu sehen.",
      colorBy: "Färben nach:",
      unemployment: "Arbeitslosigkeit",
      foreignPopulation: "Ausländische Bevölkerung",
      healthPremium: "Krankenkassenprämie",
      gdpPerCapita: "BIP pro Kopf",
      averageRent: "Durchschnittsmiete",
      crimeRate: "Straftaten pro 1000 Einwohner",
      selectCanton: "Wähle einen Kanton auf der Karte, um Details zu sehen",
      switzerland: "Schweiz",
      allCantons: "Alle Kantone",
      canton: "Kanton",
      population: "Bevölkerung",
      area: "Fläche (km²)",
      density: "Dichte",
      lower: "Niedriger",
      higher: "Höher",
      unemploymentNote: "Hinweis: Dies ist die Arbeitslosenquote des SECO, die bei den RAV registrierte Arbeitslose zählt. Das Dashboard zeigt auch die ILO-Quote, die alle aktiv Stellensuchenden umfasst und höher liegt.",
      dataSources: "Datenquellen",
      provisional: "provisorisch",
      territoryNote: "Bevölkerung, Fläche und Ausländeranteil beziehen sich auf die Kantonsgrenzen vom 1. Januar 2026: Moutier, bis 31. Dezember 2025 im Kanton Bern, wird zum Kanton Jura gezählt. Der Ausländeranteil ist aus den STATPOP-Zahlen vom 31. Dezember 2025 für diese Grenzen neu berechnet und weicht deshalb für Jura und Bern vom Anteil ab, den das BFS für die Grenzen von 2025 veröffentlicht.",
      oldBordersNote: "Diese Indikatoren beziehen sich auf die Grenzen vor 2026, mit Moutier im Kanton Bern: {list}.",
    },

    // Canton tooltip
    cantonTooltip: {
      population: "Bevölkerung",
      area: "Fläche",
      keyIndicators: "Wichtige Indikatoren",
      populationDensity: "Bevölkerungsdichte",
      vsCH: "vs CH",
    },

    // About page
    about: {
      title: "Über SwissData",
      mission: "Unsere Mission ist es, Schweizer Daten für alle zugänglich zu machen—Bürger, Forscher, Journalisten und alle, die neugierig auf die Schweiz sind.",
      whyTitle: "Warum zugängliche Daten wichtig sind",
      whyP1: "Daten helfen uns, unsere Welt zu verstehen. Aber offizielle Statistiken sind oft in komplexen Berichten versteckt, über verschiedene Behörden verstreut oder in schwer verständlichen Formaten präsentiert.",
      whyP2: "Missverständnisse über die Schweiz verbreiten sich leicht, wenn genaue Daten nicht zugänglich sind. Unser Ziel ist es, eine zuverlässige, benutzerfreundliche Quelle der Wahrheit zu bieten, die jeder erkunden und verstehen kann.",
      whyP3: "Wir interpretieren die Daten nicht für dich. Wir präsentieren sie einfach klar und lassen dich deine eigenen Schlüsse ziehen.",
      principlesTitle: "Unsere Grundsätze",
      principle1Title: "Politische Neutralität",
      principle1Desc: "Wir präsentieren Daten ohne politischen Kommentar. Wir unterstützen keine Parteien, Kandidaten oder Positionen. Die Zahlen sprechen für sich.",
      principle2Title: "Volle Transparenz",
      principle2Desc: "Jeder Datenpunkt verweist auf seine offizielle Quelle. Wir zeigen Methodik, Aktualisierungsdaten und Vertrauensniveaus. Du kannst alles selbst überprüfen.",
      principle3Title: "Regelmässige Aktualisierungen",
      principle3Desc: "Statistiken ändern sich. Wir verpflichten uns, unsere Daten aktuell zu halten und deutlich zu kennzeichnen, wann Informationen zuletzt aktualisiert wurden.",
      principle4Title: "Kontext statt Clickbait",
      principle4Desc: "Zahlen allein können irreführen. Wir liefern immer Kontext, historische Trends und internationale Vergleiche, um dir das vollständige Bild zu geben.",
      sourcesTitle: "Unsere Quellen",
      sourcesIntro: "Die Indikatoren und die Kantonszahlen stammen von Schweizer Bundesämtern und von Eurostat. Das Quiz verwendet zudem OECD, Weltbank, IWF, Europäische Zentralbank, SIPRI, World Gold Council, Schweizerische Bankiervereinigung und SBB. Jede Zahl nennt ihre Quelle.",
      // Methodology
      methodologyTitle: "Methodik",
      dataCollectionTitle: "Datenerhebung",
      dataCollectionDesc: "Wir entnehmen jede Zahl der Tabelle, Datenbank oder Publikation der als Quelle genannten Stelle und verlinken sie. Medienberichte verwenden wir nicht als Quelle.",
      questionSelectionTitle: "Fragenauswahl",
      questionSelectionDesc: "Die Fragen in unserem Quiz decken wichtige Schweizer Statistiken aus den Bereichen Wirtschaft, Demografie und Gesellschaft ab. Wir wählen Themen, die für informierte Bürger relevant und mit offiziellen Datenquellen überprüfbar sind.",
      accuracyScoringTitle: "Genauigkeitsbewertung",
      accuracyScoringDesc: "Die Punktzahl einer Antwort ist 100% minus der Abstand zwischen deiner Schätzung und dem tatsächlichen Wert, gemessen am Bereich des Schiebereglers. Eine Schätzung, die um einen Zehntel des Bereichs danebenliegt, ergibt 90%.",
      updateFrequencyTitle: "Aktualisierungshäufigkeit",
      updateFrequencyDesc: "Wir aktualisieren Indikatoren, sobald neue offizielle Daten veröffentlicht werden. Die meisten Wirtschaftsindikatoren werden vierteljährlich aktualisiert; demografische Daten jährlich. Jeder Indikator zeigt sein letztes Aktualisierungsdatum.",
      // Limitations
      limitationsTitle: "Einschränkungen",
      limitation1: "Statistiken erzählen nicht die ganze Geschichte.",
      limitation1Desc: "Zahlen können Trends zeigen, aber erfassen nicht individuelle Erfahrungen oder lokale Unterschiede.",
      limitation2: "Definitionen sind wichtig.",
      limitation2Desc: "Wie «Arbeitslosigkeit» oder «Kriminalität» definiert wird, beeinflusst die Zahlen. Wir verlinken methodische Hinweise, wo verfügbar.",
      limitation3: "Korrelation ist nicht Kausalität.",
      limitation3Desc: "Wir zeigen Daten, keine Erklärungen. Die Gründe hinter Trends sind komplex und oft umstritten.",
      limitation4: "Daten können verzögert sein.",
      limitation4Desc: "Offizielle Statistiken brauchen Zeit zur Zusammenstellung. Die neuesten Daten können Monate oder Jahre alt sein.",
      // CTA
      ctaTitle: "Wissen ist Macht. Nutze es weise.",
      ctaText: "Das nächste Mal, wenn du eine kühne Behauptung über die Schweiz hörst, überprüfe die Daten. Bleib informiert—mit Fakten, nicht mit Annahmen.",
    },

    // Category section
    category: {
      economicTitle: "Wirtschaftsindikatoren",
      economicDesc: "BIP, Beschäftigung und finanzielle Gesundheit der Schweiz",
      demographicTitle: "Demografische Indikatoren",
      demographicDesc: "Bevölkerung, Migration und Altersstruktur",
      socialTitle: "Soziale Indikatoren",
      socialDesc: "Gesundheit, Bildung und Lebensqualität",
      historicalTrend: "Historischer Trend",
      viewAllStatistics: "Alle Statistiken anzeigen",
    },

    // Indicator card
    indicatorCard: {
      whatIsIt: "Was ist das?",
      whyItMatters: "Warum es wichtig ist",
      vsLastYear: "gegenüber Vorjahr",
      vsPeriod: "gegenüber {period}",
    },
  },

  fr: {
    // Navigation
    nav: {
      dashboard: "Tableau de bord",
      statistics: "Statistiques",
      quiz: "Quiz",
      cantons: "Cantons",
      about: "À propos",
      spending: "Dépenses publiques",
    },

    // Footer
    footer: {
      disclaimer: "Chaque chiffre indique sa source : offices fédéraux suisses, Eurostat, OCDE et autres. Vérifiez la source avant de vous appuyer sur un chiffre.",
      about: "À propos",
    },

    // Home page
    home: {
      spendingTitle: "Dépenses publiques",
      spendingText: "Combien dépensent la Confédération, les cantons et les communes, et pour quoi : budget fédéral, recettes, dette, marchés publics fédéraux et comptes de toutes les communes du Tessin et de Zurich. En anglais et en italien.",
      badge: "100% basé sur les statistiques officielles suisses",
      title: "La Suisse",
      titleHighlight: "en chiffres",
      subtitle: "Des statistiques sur l'économie, la population et la société suisses, chacune avec sa source. Un quiz pour tester vos connaissances.",
      testKnowledge: "Testez vos connaissances",
      exploreByCanton: "Explorer par canton",
      showStats: "Voir les statistiques",
      // Quick stats
      indicatorsTracked: "indicateurs suivis",
      officialSources: "sources officielles",
      cantonsCovered: "cantons couverts",
      questionsInQuiz: "questions dans le quiz",
      // CTA
      ctaTitle: "Pensez-vous connaître les statistiques suisses ?",
      ctaText: "Faites notre quiz et découvrez comment vos suppositions se comparent à la réalité. Vous pourriez être surpris !",
      startQuiz: "Commencer le quiz",
      // Sources
      ourSources: "Nos sources",
    },

    // Quiz page
    quiz: {
      title: "Quiz de connaissances",
      subtitle: "Connaissez-vous bien la Suisse ? Testez vos connaissances sur les statistiques suisses et découvrez les faits.",
      howItWorks: "Comment ça marche",
      step1Title: "Lisez la question",
      step1Desc: "Nous vous poserons une question sur une statistique suisse",
      step2Title: "Faites votre estimation",
      step2Desc: "Utilisez le curseur pour estimer la réponse",
      step3Title: "Découvrez les faits",
      step3Desc: "Voyez les données réelles avec les sources et comparaisons internationales",
      chooseLength: "Choisissez la longueur du quiz :",
      questionsAvailable: "questions disponibles",
      quick: "Rapide",
      standard: "Standard",
      deepDive: "Approfondi",
      topicsCovered: "Sujets couverts",
      topicEconomy: "Économie et emploi",
      topicPopulation: "Population et migration",
      topicHealthcare: "Santé et logement",
      topicEnergy: "Énergie et infrastructures",
      progress: "Progression",
      revealAnswer: "Révéler la réponse",
      nextQuestion: "Question suivante",
      seeResults: "Voir les résultats",
      restartQuiz: "Recommencer le quiz",
    },

    // Quiz - Question Card
    questionCard: {
      question: "Question",
      of: "sur",
      testKnowledge: "Testez vos connaissances",
      sliderHint: "Utilisez le curseur ci-dessous pour faire votre estimation",
    },

    // Quiz - Score Card
    scoreCard: {
      quizComplete: "Quiz terminé !",
      dataExpert: "Expert des données !",
      wellInformed: "Bien informé",
      goodKnowledge: "Bonnes connaissances",
      roomToLearn: "Marge de progression",
      keepExploring: "Continuez à explorer",
      timeToFactCheck: "Il est temps de vérifier les faits !",
      averageAccuracy: "Précision moyenne",
      tryAgain: "Réessayer",
      shareResult: "Partager le résultat",
      shareText: "J'ai obtenu {score}% au Quiz SwissData ! Connaissez-vous bien les statistiques suisses ?",
      yourAnswers: "Vos réponses",
      yourGuess: "Votre estimation :",
      actual: "Valeur réelle :",
      unknownQuestion: "Question inconnue",
    },

    // Quiz - Reveal Animation
    reveal: {
      accurate: "précis",
      yourGuess: "Votre estimation",
      actualValue: "Valeur réelle",
      context: "Contexte",
      internationalComparison: "Comparaison internationale",
      viewSource: "Voir la source",
    },

    // Statistics page
    statistics: {
      title: "Statistiques et tendances",
      subtitle: "Explorez les indicateurs clés de la Suisse dans le temps. Les données remontent à 2000 pour la plupart des métriques.",
      allCategories: "Toutes les catégories",
      economic: "Économiques",
      demographic: "Démographiques",
      social: "Sociaux",
      keyEconomicIndicators: "Indicateurs économiques clés",
      economicTrends: "Tendances économiques",
      demographicTrends: "Tendances démographiques",
      socialTrends: "Tendances sociales",
      comparingChart: "Comparaison du taux de chômage, de la croissance du PIB et de l'inflation au fil du temps. Les lignes verticales marquent les événements économiques majeurs.",
      federalBudget: "Dépenses publiques",
      federalBudgetSubtitle: "Le budget 2026 de la Confédération est de 91,1 milliards de CHF. Dépenses par domaine, recettes, dette, cantons, communes et marchés publics fédéraux se trouvent sur le site SwissData des dépenses publiques (en anglais et en italien).",
      openSpending: "Ouvrir les dépenses publiques",
      source: "Source :",
      viewSource: "Voir la source",
      dataSources: "Sources des données",
      whatIsIt: "Qu'est-ce que c'est ?",
      whyItMatters: "Pourquoi c'est important",
    },

    // Time range
    timeRange: {
      "5Y": "5 ans",
      "10Y": "10 ans",
      "20Y": "20 ans",
      ALL: "Tout",
    },

    // Historical events
    events: {
      financialCrisis: "Crise financière",
      snbShock: "Choc BNS",
      covid: "COVID-19",
    },

    // Cantons page
    cantons: {
      title: "Comparaison des cantons",
      subtitle: "Découvrez comment les différents cantons se comparent sur les indicateurs clés. Cliquez sur un canton pour voir les statistiques détaillées.",
      colorBy: "Colorer par :",
      unemployment: "Chômage",
      foreignPopulation: "Population étrangère",
      healthPremium: "Prime d'assurance-maladie",
      gdpPerCapita: "PIB par habitant",
      averageRent: "Loyer moyen",
      crimeRate: "Infractions pour 1000 habitants",
      selectCanton: "Sélectionnez un canton sur la carte pour voir les détails",
      switzerland: "Suisse",
      allCantons: "Tous les cantons",
      canton: "Canton",
      population: "Population",
      area: "Superficie (km²)",
      density: "Densité",
      lower: "Inférieur",
      higher: "Supérieur",
      unemploymentNote: "Note : il s'agit du taux de chômage du SECO, qui compte les chômeurs inscrits auprès des ORP. Le tableau de bord montre aussi le taux BIT, qui inclut toutes les personnes en recherche active d'emploi et est plus élevé.",
      dataSources: "Sources des données",
      provisional: "provisoire",
      territoryNote: "La population, la superficie et la part d'étrangers se rapportent aux frontières cantonales du 1er janvier 2026 : Moutier, dans le canton de Berne jusqu'au 31 décembre 2025, est comptée dans le canton du Jura. La part d'étrangers est recalculée pour ces frontières à partir des chiffres STATPOP du 31 décembre 2025 ; pour le Jura et Berne, elle diffère donc de celle que l'OFS publie pour les frontières de 2025.",
      oldBordersNote: "Ces indicateurs se rapportent aux frontières d'avant 2026, avec Moutier dans le canton de Berne : {list}.",
    },

    // Canton tooltip
    cantonTooltip: {
      population: "Population",
      area: "Superficie",
      keyIndicators: "Indicateurs clés",
      populationDensity: "Densité de population",
      vsCH: "vs CH",
    },

    // About page
    about: {
      title: "À propos de SwissData",
      mission: "Notre mission est de rendre les données suisses accessibles à tous—citoyens, chercheurs, journalistes et toute personne curieuse de la Suisse.",
      whyTitle: "Pourquoi les données accessibles sont importantes",
      whyP1: "Les données nous aident à comprendre notre monde. Mais les statistiques officielles sont souvent enfouies dans des rapports complexes, dispersées entre différentes agences ou présentées dans des formats difficiles à comprendre.",
      whyP2: "Les idées fausses sur la Suisse se propagent facilement lorsque les données exactes ne sont pas accessibles. Notre objectif est de fournir une source fiable et conviviale que chacun peut explorer et comprendre.",
      whyP3: "Nous n'interprétons pas les données pour vous. Nous les présentons simplement clairement et vous laissons tirer vos propres conclusions.",
      principlesTitle: "Nos principes",
      principle1Title: "Neutralité politique",
      principle1Desc: "Nous présentons les données sans commentaire politique. Nous ne soutenons pas de partis, de candidats ou de positions. Les chiffres parlent d'eux-mêmes.",
      principle2Title: "Transparence totale",
      principle2Desc: "Chaque donnée renvoie à sa source officielle. Nous montrons la méthodologie, les dates de mise à jour et les niveaux de confiance. Vous pouvez tout vérifier vous-même.",
      principle3Title: "Mises à jour régulières",
      principle3Desc: "Les statistiques changent. Nous nous engageons à maintenir nos données à jour et à indiquer clairement quand les informations ont été mises à jour pour la dernière fois.",
      principle4Title: "Contexte, pas sensationnalisme",
      principle4Desc: "Les chiffres seuls peuvent induire en erreur. Nous fournissons toujours du contexte, des tendances historiques et des comparaisons internationales pour vous donner une image complète.",
      sourcesTitle: "Nos sources",
      sourcesIntro: "Les indicateurs et les chiffres des cantons proviennent d'offices fédéraux suisses et d'Eurostat. Le quiz utilise aussi l'OCDE, la Banque mondiale, le FMI, la Banque centrale européenne, le SIPRI, le World Gold Council, l'Association suisse des banquiers et les CFF. Chaque chiffre indique sa source.",
      // Methodology
      methodologyTitle: "Méthodologie",
      dataCollectionTitle: "Collecte des données",
      dataCollectionDesc: "Nous prenons chaque chiffre dans le tableau, la base de données ou la publication de l'organisme indiqué comme source, avec le lien. Nous n'utilisons pas d'articles de presse comme source.",
      questionSelectionTitle: "Sélection des questions",
      questionSelectionDesc: "Les questions de notre quiz couvrent les principales statistiques suisses dans les domaines économique, démographique et social. Nous sélectionnons des sujets pertinents pour une citoyenneté informée et vérifiables avec des sources officielles.",
      accuracyScoringTitle: "Calcul de la précision",
      accuracyScoringDesc: "Le score d'une réponse est 100% moins l'écart entre votre estimation et la valeur réelle, mesuré par rapport à l'étendue du curseur. Une estimation qui s'écarte d'un dixième de l'étendue vaut 90%.",
      updateFrequencyTitle: "Fréquence de mise à jour",
      updateFrequencyDesc: "Nous mettons à jour les indicateurs dès que de nouvelles données officielles sont publiées. La plupart des indicateurs économiques sont mis à jour trimestriellement ; les données démographiques annuellement. Chaque indicateur affiche sa date de dernière mise à jour.",
      // Limitations
      limitationsTitle: "Limites",
      limitation1: "Les statistiques ne racontent pas toute l'histoire.",
      limitation1Desc: "Les chiffres peuvent montrer des tendances mais ne capturent pas les expériences individuelles ou les variations locales.",
      limitation2: "Les définitions comptent.",
      limitation2Desc: "La façon dont le \"chômage\" ou la \"criminalité\" est défini affecte les chiffres. Nous renvoyons aux notes méthodologiques lorsqu'elles sont disponibles.",
      limitation3: "Corrélation n'est pas causalité.",
      limitation3Desc: "Nous montrons des données, pas des explications. Les raisons derrière les tendances sont complexes et souvent débattues.",
      limitation4: "Les données peuvent avoir des délais.",
      limitation4Desc: "Les statistiques officielles prennent du temps à compiler. Les données les plus récentes peuvent dater de plusieurs mois ou années.",
      // CTA
      ctaTitle: "La connaissance est un pouvoir. Utilisez-la sagement.",
      ctaText: "La prochaine fois que vous entendez une affirmation audacieuse sur la Suisse, vérifiez les données. Restez informé—avec des faits, pas des suppositions.",
    },

    // Category section
    category: {
      economicTitle: "Indicateurs économiques",
      economicDesc: "PIB, emploi et santé financière de la Suisse",
      demographicTitle: "Indicateurs démographiques",
      demographicDesc: "Population, migration et structure par âge",
      socialTitle: "Indicateurs sociaux",
      socialDesc: "Santé, éducation et qualité de vie",
      historicalTrend: "Tendance historique",
      viewAllStatistics: "Voir toutes les statistiques",
    },

    // Indicator card
    indicatorCard: {
      whatIsIt: "Qu'est-ce que c'est ?",
      whyItMatters: "Pourquoi c'est important",
      vsLastYear: "par rapport à l'année dernière",
      vsPeriod: "par rapport à {period}",
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
