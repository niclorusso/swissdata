export type Locale = "en" | "it" | "de" | "fr";

type TranslationKeys = typeof translations.en;

export const translations = {
  en: {
    // Navigation
    nav: {
      statistics: "Statistics",
      quiz: "Quiz",
      cantons: "Cantons",
      about: "About",
      switchSite: "SwissData sections",
      language: "Language",
      pages: "Pages",
    },

    common: {
      source: "Source",
      lastCheck: "Data last checked on {lastCheck}",
      published: "published on {date}",
      publishedMonth: "published in {month}",
      axisNotZero: "The vertical axis does not start at zero.",
    },

    categoryName: {
      economic: "Economy",
      demographic: "Population",
      social: "Society",
    },

    // Footer
    footer: {
      disclaimer: "Every figure links to its source; for official use, rely on the source.",
      about: "About",
      changeLog: "Data changes",
      contact: "Contact",
    },


    // Data changes page
    changes: {
      title: "Data changes",
      intro: "Corrections and updates to the figures and texts of the site, with their date. Data last checked on {lastCheck}.",
      update: "Update",
      correction: "Correction",
      source: "Source",
      reportTitle: "Report an error",
      reportLink: "Report an error",
      reportNote: "The link opens a short form on GitHub; a GitHub account is needed for it.",
    },

    // Titles and description of the pages (link previews, search results)
    meta: {
      homeTitle: "SwissData – Official statistics on Switzerland",
      aboutTitle: "About SwissData",
      description: "Official statistics on Switzerland in one place, each with its source and year. Independent site by Nicola Lo Russo, not run by the Confederation.",
    },
    // Home page
    home: {
      title: "Official statistics on Switzerland",
      lead: "The main figures in one place, each with its official source and the year it refers to.",
      independent: "Independent site by Nicola Lo Russo, not run by the Confederation",
      allIndicators: "All {indicatorCount} indicators year by year →",
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
      languageNote: "",
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
      internationalComparison: "Comparison",
    },

    // Statistics page
    statistics: {
      title: "Statistics year by year",
      subtitle: "Each dot is one year's figure, as published by the source named under the chart.",
      all: "All",
      chartLabel: "{title}: from {firstValue} in {from} to {lastValue} in {to}",
      noData: "No data for this period",
      categories: "Categories",
      period: "Period",
    },

    // Time range
    timeRange: {
      "5Y": "5 Years",
      "10Y": "10 Years",
      "20Y": "20 Years",
      ALL: "All Time",
    },

    // Cantons page
    cantons: {
      title: "Canton Comparison",
      subtitle: "Six indicators for the 26 cantons: the darker the colour, the higher the value. Selecting a canton shows its figures; the table below ranks them all.",
      colorBy: "Indicator:",
      unemployment: "Registered unemployment",
      foreignPopulation: "Foreign population",
      healthPremium: "Health insurance premium",
      gdpPerCapita: "GDP per capita",
      averageRent: "Average rent",
      crimeRate: "Offences per 1,000 inhabitants",
      // what the value of each indicator is, with {year} from src/data/cantons.ts
      unitPhrases: {
        "unemployment-rate": "% of the labour force, {year} average",
        "foreign-population": "% of permanent residents, 31.12.{year}",
        "health-premium": "francs a month, average over all ages, {year}",
        "gdp-per-capita": "francs per inhabitant, current prices, {year}",
        "average-rent": "francs a month, average net rent, {year}",
        "crime-rate-per-1000": "Criminal Code offences per 1,000 inhabitants, {year}",
      },
      // unit in the table header and after the last legend label
      unitShort: {
        "%": "%",
        "CHF/month": "CHF/month",
        "CHF": "CHF",
        "per 1,000 inhabitants": "per 1,000",
      },
      switzerland: "Switzerland",
      allCantons: "All cantons",
      canton: "Canton",
      population: "Population",
      area: "Area (km\u00B2)",
      legendRange: "from {from} to under {to}: {count}",
      legendRangeLast: "from {from} to {to}: {count}",
      legendCount: "{n} cantons",
      legendCountOne: "1 canton",
      legendNoCanton: "no canton",
      legendHint: "Select a band to highlight its cantons.",
      readout: "{canton}: {value} · Switzerland: {national}",
      readoutEmpty: "Select a canton on the map or in the table.",
      allFigures: "All figures for the canton ↓",
      compareHint: "To compare two cantons, find both in the table, which is sorted by the chosen indicator.",
      unemploymentNote: "This is registered unemployment (SECO). The ILO rate also counts people not registered at an employment centre and is higher (Switzerland {year}: {ilo}).",
      dataSources: "Data sources",
      provisional: "provisional",
      bordersSummary: "Cantonal borders (Moutier)",
      territoryNote: "Population, area and foreign share use the cantonal borders of 1 January 2026: Moutier, in the canton of Bern until 31 December 2025, is counted in the canton of Jura. The foreign share is recomputed for these borders from the STATPOP figures of 31 December 2025, so for Jura and Bern it differs from the share the FSO publishes for the 2025 borders.",
      oldBordersNote: "The health premium is the 2026 premium, on the 2026 borders (the FOPH premium regions for 2026 list Moutier under Jura). These indicators refer to the borders before 2026, with Moutier in the canton of Bern: {list}.",
      clickToSelect: "Select to see the figures",
    },

    // Canton tooltip
    cantonTooltip: {
      population: "Population",
      area: "Area",
      populationDensity: "Population Density",
      nationalValue: "Switzerland: {value}",
      close: "Close",
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
      ctaTitle: "Knowledge is power. Use it wisely.",
      ctaText: "The next time you hear a bold claim about Switzerland, check the data. Stay informed—with facts, not assumptions.",
    },


    // Indicator card
    indicatorCard: {
      more: "More information: {title}",
      chartLink: "Chart since {firstYear} →",
    },

    // Change against the previous figure: {delta} first ("+0,5"), then the year and the previous figure
    change: {
      points: "{delta} points compared with {prevYear} ({previous})",
      pointsOne: "{delta} point compared with {prevYear} ({previous})",
      years: "{delta} years compared with {prevYear} ({previous})",
      yearsOne: "{delta} year compared with {prevYear} ({previous})",
      relative: "{delta} compared with {prevYear} ({previous})",
      previous: "{prevYear}: {previous}",
      same: "unchanged from {prevYear}",
    },
  },

  it: {
    // Navigation
    nav: {
      statistics: "Statistiche",
      quiz: "Quiz",
      cantons: "Cantoni",
      about: "Il progetto",
      switchSite: "Sezioni di SwissData",
      language: "Lingua",
      pages: "Pagine",
    },

    common: {
      source: "Fonte",
      lastCheck: "Ultima verifica dei dati: {lastCheck}",
      published: "pubblicato il {date}",
      publishedMonth: "pubblicato {month}",
      axisNotZero: "L'asse verticale non parte da zero.",
    },

    categoryName: {
      economic: "Economia",
      demographic: "Popolazione",
      social: "Società",
    },

    // Footer
    footer: {
      disclaimer: "Ogni cifra rimanda alla sua fonte; per un uso ufficiale fa fede la fonte.",
      about: "Il progetto",
      changeLog: "Modifiche ai dati",
      contact: "Contatto",
    },


    // Data changes page
    changes: {
      title: "Modifiche ai dati",
      intro: "Correzioni e aggiornamenti delle cifre e dei testi del sito, con la data. Ultima verifica dei dati: {lastCheck}.",
      update: "Aggiornamento",
      correction: "Correzione",
      source: "Fonte",
      reportTitle: "Segnalare un errore",
      reportLink: "Segnala un errore",
      reportNote: "Il link apre un breve modulo su GitHub; per usarlo serve un account GitHub.",
    },

    // Titles and description of the pages (link previews, search results)
    meta: {
      homeTitle: "SwissData – Statistiche ufficiali sulla Svizzera",
      aboutTitle: "Il progetto SwissData",
      description: "Statistiche ufficiali sulla Svizzera in un unico posto, ognuna con fonte e anno. Sito indipendente di Nicola Lo Russo, non della Confederazione.",
    },
    // Home page
    home: {
      title: "Statistiche ufficiali sulla Svizzera",
      lead: "Le cifre principali in un unico posto, ognuna con la fonte ufficiale e l'anno a cui si riferisce.",
      independent: "Sito indipendente di Nicola Lo Russo, non della Confederazione",
      allIndicators: "Tutti i {indicatorCount} indicatori anno per anno →",
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
      languageNote: "",
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
      internationalComparison: "Confronto",
    },

    // Statistics page
    statistics: {
      title: "Statistiche anno per anno",
      subtitle: "Ogni punto è il dato di un anno, come pubblicato dalla fonte indicata sotto il grafico.",
      all: "Tutti",
      chartLabel: "{title}: da {firstValue} nel {from} a {lastValue} nel {to}",
      noData: "Nessun dato per questo periodo",
      categories: "Categorie",
      period: "Periodo",
    },

    // Time range
    timeRange: {
      "5Y": "5 anni",
      "10Y": "10 anni",
      "20Y": "20 anni",
      ALL: "Tutto",
    },

    // Cantons page
    cantons: {
      title: "Confronto cantonale",
      subtitle: "Sei indicatori per i 26 Cantoni: più scuro il colore, più alto il valore. Selezionando un Cantone se ne vedono le cifre; la tabella sotto li ordina tutti.",
      colorBy: "Indicatore:",
      unemployment: "Disoccupazione registrata",
      foreignPopulation: "Popolazione straniera",
      healthPremium: "Premio cassa malati",
      gdpPerCapita: "PIL pro capite",
      averageRent: "Affitto medio",
      crimeRate: "Reati per 1000 abitanti",
      // what the value of each indicator is, with {year} from src/data/cantons.ts
      unitPhrases: {
        "unemployment-rate": "% delle persone attive, media {year}",
        "foreign-population": "% dei residenti permanenti, 31.12.{year}",
        "health-premium": "franchi al mese, media di tutte le età, {year}",
        "gdp-per-capita": "franchi per abitante, prezzi correnti, {year}",
        "average-rent": "franchi al mese, affitto netto medio, {year}",
        "crime-rate-per-1000": "reati del Codice penale per 1000 abitanti, {year}",
      },
      // unit in the table header and after the last legend label
      unitShort: {
        "%": "%",
        "CHF/month": "CHF/mese",
        "CHF": "CHF",
        "per 1,000 inhabitants": "per 1000",
      },
      switzerland: "Svizzera",
      allCantons: "Tutti i Cantoni",
      canton: "Cantone",
      population: "Popolazione",
      area: "Superficie (km\u00B2)",
      legendRange: "da {from} a meno di {to}: {count}",
      legendRangeLast: "da {from} a {to}: {count}",
      legendCount: "{n} Cantoni",
      legendCountOne: "1 Cantone",
      legendNoCanton: "nessun Cantone",
      legendHint: "Selezionare una fascia per evidenziarne i Cantoni.",
      readout: "{canton}: {value} · Svizzera: {national}",
      readoutEmpty: "Selezionare un Cantone sulla mappa o nella tabella.",
      allFigures: "Tutte le cifre del Cantone ↓",
      compareHint: "Per confrontare due Cantoni: cercarli nella tabella, ordinata per l'indicatore scelto.",
      unemploymentNote: "Qui la disoccupazione registrata (SECO). Il tasso ILO conta anche chi non è iscritto a un URC ed è più alto (Svizzera {year}: {ilo}).",
      dataSources: "Fonti dei dati",
      provisional: "provvisorio",
      bordersSummary: "Confini cantonali (Moutier)",
      territoryNote: "Popolazione, superficie e quota di stranieri seguono i confini cantonali del 1° gennaio 2026: Moutier, nel Canton Berna fino al 31 dicembre 2025, è contata nel Canton Giura. La quota di stranieri è ricalcolata per questi confini dai dati STATPOP del 31 dicembre 2025; per Giura e Berna è quindi diversa da quella che l'UST pubblica per i confini del 2025.",
      oldBordersNote: "Il premio di cassa malati è quello del 2026, sui confini del 2026 (le regioni di premio 2026 dell'UFSP elencano Moutier nel Giura). Questi indicatori si riferiscono ai confini precedenti al 2026, con Moutier nel Canton Berna: {list}.",
      clickToSelect: "Seleziona per vedere i dati",
    },

    // Canton tooltip
    cantonTooltip: {
      population: "Popolazione",
      area: "Superficie",
      populationDensity: "Densit\u00E0 di popolazione",
      nationalValue: "Svizzera: {value}",
      close: "Chiudi",
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
      accuracyScoringDesc: "Il punteggio di una risposta è 100\u00A0% meno la distanza tra la tua stima e il valore reale, misurata in rapporto all'ampiezza del cursore. Una stima che sbaglia di un decimo dell'ampiezza vale 90\u00A0%.",
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
      ctaTitle: "La conoscenza è potere. Usala saggiamente.",
      ctaText: "La prossima volta che senti un'affermazione audace sulla Svizzera, controlla i dati. Rimani informato—con i fatti, non con le supposizioni.",
    },

    // Indicator card
    indicatorCard: {
      more: "Altre informazioni: {title}",
      chartLink: "Grafico dal {firstYear} →",
    },

    // Change against the previous figure: {delta} first ("+0,5"), then the year and the previous figure
    change: {
      points: "{delta} punti rispetto al {prevYear} ({previous})",
      pointsOne: "{delta} punti rispetto al {prevYear} ({previous})",
      years: "{delta} anni rispetto al {prevYear} ({previous})",
      yearsOne: "{delta} anni rispetto al {prevYear} ({previous})",
      relative: "{delta} rispetto al {prevYear} ({previous})",
      previous: "Nel {prevYear}: {previous}",
      same: "invariato rispetto al {prevYear}",
    },
  },

  de: {
    // Navigation
    nav: {
      statistics: "Statistiken",
      quiz: "Quiz",
      cantons: "Kantone",
      about: "Das Projekt",
      switchSite: "Bereiche von SwissData",
      language: "Sprache",
      pages: "Seiten",
    },

    common: {
      source: "Quelle",
      lastCheck: "Daten zuletzt geprüft am {lastCheck}",
      published: "veröffentlicht am {date}",
      publishedMonth: "veröffentlicht im {month}",
      axisNotZero: "Die senkrechte Achse beginnt nicht bei null.",
    },

    categoryName: {
      economic: "Wirtschaft",
      demographic: "Bevölkerung",
      social: "Gesellschaft",
    },

    // Footer
    footer: {
      disclaimer: "Jede Zahl verweist auf ihre Quelle; für amtliche Zwecke gilt die Quelle.",
      about: "Das Projekt",
      changeLog: "Datenänderungen",
      contact: "Kontakt",
    },


    // Data changes page
    changes: {
      title: "Datenänderungen",
      intro: "Korrekturen und Aktualisierungen der Zahlen und Texte der Website, mit Datum. Daten zuletzt geprüft am {lastCheck}.",
      update: "Aktualisierung",
      correction: "Korrektur",
      source: "Quelle",
      reportTitle: "Einen Fehler melden",
      reportLink: "Fehler melden",
      reportNote: "Der Link öffnet ein kurzes Formular auf GitHub; dafür braucht es ein GitHub-Konto.",
    },

    // Titles and description of the pages (link previews, search results)
    meta: {
      homeTitle: "SwissData – Amtliche Statistiken zur Schweiz",
      aboutTitle: "Das Projekt SwissData",
      description: "Amtliche Statistiken zur Schweiz an einem Ort, jede mit Quelle und Jahr. Unabhängige Website von Nicola Lo Russo, nicht des Bundes.",
    },
    // Home page
    home: {
      title: "Amtliche Statistiken zur Schweiz",
      lead: "Die wichtigsten Zahlen an einem Ort, jede mit ihrer amtlichen Quelle und dem Jahr, auf das sie sich bezieht.",
      independent: "Unabhängige Website von Nicola Lo Russo, nicht des Bundes",
      allIndicators: "Alle {indicatorCount} Indikatoren Jahr für Jahr →",
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
      languageNote: "Die Quizfragen und ihre Erklärungen gibt es nur auf Englisch und Italienisch. Hier erscheinen sie auf Englisch.",
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
      internationalComparison: "Vergleich",
    },

    // Statistics page
    statistics: {
      title: "Statistiken Jahr für Jahr",
      subtitle: "Jeder Punkt ist der Wert eines Jahres, wie ihn die Quelle unter der Grafik veröffentlicht.",
      all: "Alle",
      chartLabel: "{title}: von {firstValue} ({from}) bis {lastValue} ({to})",
      noData: "Keine Daten für diesen Zeitraum",
      categories: "Kategorien",
      period: "Zeitraum",
    },

    // Time range
    timeRange: {
      "5Y": "5 Jahre",
      "10Y": "10 Jahre",
      "20Y": "20 Jahre",
      ALL: "Alle",
    },

    // Cantons page
    cantons: {
      title: "Kantonsvergleich",
      subtitle: "Sechs Indikatoren für die 26 Kantone: Je dunkler die Farbe, desto höher der Wert. Ein ausgewählter Kanton zeigt seine Zahlen; die Tabelle darunter ordnet alle Kantone.",
      colorBy: "Indikator:",
      unemployment: "Registrierte Arbeitslosigkeit",
      foreignPopulation: "Ausländische Bevölkerung",
      healthPremium: "Krankenkassenprämie",
      gdpPerCapita: "BIP pro Kopf",
      averageRent: "Durchschnittsmiete",
      crimeRate: "Straftaten pro 1000 Einwohner",
      // what the value of each indicator is, with {year} from src/data/cantons.ts
      unitPhrases: {
        "unemployment-rate": "% der Erwerbspersonen, Jahresmittel {year}",
        "foreign-population": "% der ständigen Wohnbevölkerung, 31.12.{year}",
        "health-premium": "Franken pro Monat, Mittel aller Altersklassen, {year}",
        "gdp-per-capita": "Franken pro Einwohner, zu laufenden Preisen, {year}",
        "average-rent": "Franken pro Monat, durchschnittlicher Nettomietzins, {year}",
        "crime-rate-per-1000": "Straftaten nach StGB pro 1000 Einwohner, {year}",
      },
      // unit in the table header and after the last legend label
      unitShort: {
        "%": "%",
        "CHF/month": "CHF/Monat",
        "CHF": "CHF",
        "per 1,000 inhabitants": "pro 1000",
      },
      switzerland: "Schweiz",
      allCantons: "Alle Kantone",
      canton: "Kanton",
      population: "Bevölkerung",
      area: "Fläche (km²)",
      legendRange: "von {from} bis unter {to}: {count}",
      legendRangeLast: "von {from} bis {to}: {count}",
      legendCount: "{n} Kantone",
      legendCountOne: "1 Kanton",
      legendNoCanton: "kein Kanton",
      legendHint: "Ein Feld der Legende auswählen, um seine Kantone hervorzuheben.",
      readout: "{canton}: {value} · Schweiz: {national}",
      readoutEmpty: "Einen Kanton auf der Karte oder in der Tabelle auswählen.",
      allFigures: "Alle Zahlen des Kantons ↓",
      compareHint: "Zwei Kantone vergleichen: beide in der Tabelle suchen; sie ist nach dem gewählten Indikator geordnet.",
      unemploymentNote: "Hier die registrierte Arbeitslosigkeit (SECO). Die Erwerbslosenquote gemäss ILO zählt auch Personen, die nicht beim RAV gemeldet sind, und liegt höher (Schweiz {year}: {ilo}).",
      dataSources: "Datenquellen",
      provisional: "provisorisch",
      bordersSummary: "Kantonsgrenzen (Moutier)",
      territoryNote: "Bevölkerung, Fläche und Ausländeranteil beziehen sich auf die Kantonsgrenzen vom 1. Januar 2026: Moutier, bis 31. Dezember 2025 im Kanton Bern, wird zum Kanton Jura gezählt. Der Ausländeranteil ist aus den STATPOP-Zahlen vom 31. Dezember 2025 für diese Grenzen neu berechnet und weicht deshalb für Jura und Bern vom Anteil ab, den das BFS für die Grenzen von 2025 veröffentlicht.",
      oldBordersNote: "Die Krankenkassenprämie ist jene von 2026, auf den Grenzen von 2026 (die Prämienregionen 2026 des BAG führen Moutier unter Jura). Diese Indikatoren beziehen sich auf die Grenzen vor 2026, mit Moutier im Kanton Bern: {list}.",
      clickToSelect: "Auswählen, um die Zahlen zu sehen",
    },

    // Canton tooltip
    cantonTooltip: {
      population: "Bevölkerung",
      area: "Fläche",
      populationDensity: "Bevölkerungsdichte",
      nationalValue: "Schweiz: {value}",
      close: "Schliessen",
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
      accuracyScoringDesc: "Die Punktzahl einer Antwort ist 100\u00A0% minus der Abstand zwischen deiner Schätzung und dem tatsächlichen Wert, gemessen am Bereich des Schiebereglers. Eine Schätzung, die um einen Zehntel des Bereichs danebenliegt, ergibt 90\u00A0%.",
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
      ctaTitle: "Wissen ist Macht. Nutze es weise.",
      ctaText: "Das nächste Mal, wenn du eine kühne Behauptung über die Schweiz hörst, überprüfe die Daten. Bleib informiert—mit Fakten, nicht mit Annahmen.",
    },


    // Indicator card
    indicatorCard: {
      more: "Mehr Informationen: {title}",
      chartLink: "Verlauf seit {firstYear} →",
    },

    // Change against the previous figure: {delta} first ("+0,5"), then the year and the previous figure
    change: {
      points: "{delta} Prozentpunkte gegenüber {prevYear} ({previous})",
      pointsOne: "{delta} Prozentpunkte gegenüber {prevYear} ({previous})",
      years: "{delta} Jahre gegenüber {prevYear} ({previous})",
      yearsOne: "{delta} Jahre gegenüber {prevYear} ({previous})",
      relative: "{delta} gegenüber {prevYear} ({previous})",
      previous: "{prevYear}: {previous}",
      same: "unverändert gegenüber {prevYear}",
    },
  },

  fr: {
    // Navigation
    nav: {
      statistics: "Statistiques",
      quiz: "Quiz",
      cantons: "Cantons",
      about: "À propos",
      switchSite: "Sections de SwissData",
      language: "Langue",
      pages: "Pages",
    },

    common: {
      source: "Source",
      lastCheck: "Données vérifiées le {lastCheck}",
      published: "publié le {date}",
      publishedMonth: "publié en {month}",
      axisNotZero: "L'axe vertical ne commence pas à zéro.",
    },

    categoryName: {
      economic: "Économie",
      demographic: "Population",
      social: "Société",
    },

    // Footer
    footer: {
      disclaimer: "Chaque chiffre renvoie à sa source ; pour un usage officiel, seule la source fait foi.",
      about: "À propos",
      changeLog: "Modifications des données",
      contact: "Contact",
    },


    // Data changes page
    changes: {
      title: "Modifications des données",
      intro: "Corrections et mises à jour des chiffres et des textes du site, avec leur date. Données vérifiées le {lastCheck}.",
      update: "Mise à jour",
      correction: "Correction",
      source: "Source",
      reportTitle: "Signaler une erreur",
      reportLink: "Signaler une erreur",
      reportNote: "Le lien ouvre un court formulaire sur GitHub ; il faut un compte GitHub pour l'utiliser.",
    },

    // Titles and description of the pages (link previews, search results)
    meta: {
      homeTitle: "SwissData – Statistiques officielles sur la Suisse",
      aboutTitle: "Le projet SwissData",
      description: "Statistiques officielles sur la Suisse réunies en un seul endroit, chacune avec sa source et son année. Site indépendant de Nicola Lo Russo, pas de la Confédération.",
    },
    // Home page
    home: {
      title: "Statistiques officielles sur la Suisse",
      lead: "Les principaux chiffres réunis en un seul endroit, chacun avec sa source officielle et l'année à laquelle il se rapporte.",
      independent: "Site indépendant de Nicola Lo Russo, pas de la Confédération",
      allIndicators: "Les {indicatorCount} indicateurs année par année →",
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
      languageNote: "Les questions du quiz et leurs explications existent uniquement en anglais et en italien. Elles s'affichent ici en anglais.",
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
      internationalComparison: "Comparaison",
    },

    // Statistics page
    statistics: {
      title: "Statistiques année par année",
      subtitle: "Chaque point est la valeur d'une année, telle que publiée par la source indiquée sous le graphique.",
      all: "Tous",
      chartLabel: "{title} : de {firstValue} en {from} à {lastValue} en {to}",
      noData: "Pas de données pour cette période",
      categories: "Catégories",
      period: "Période",
    },

    // Time range
    timeRange: {
      "5Y": "5 ans",
      "10Y": "10 ans",
      "20Y": "20 ans",
      ALL: "Tout",
    },

    // Cantons page
    cantons: {
      title: "Comparaison des cantons",
      subtitle: "Six indicateurs pour les 26 cantons : plus la couleur est foncée, plus la valeur est élevée. Sélectionner un canton affiche ses chiffres ; le tableau ci-dessous les classe tous.",
      colorBy: "Indicateur :",
      unemployment: "Chômage enregistré",
      foreignPopulation: "Population étrangère",
      healthPremium: "Prime d'assurance-maladie",
      gdpPerCapita: "PIB par habitant",
      averageRent: "Loyer moyen",
      crimeRate: "Infractions pour 1000 habitants",
      // what the value of each indicator is, with {year} from src/data/cantons.ts
      unitPhrases: {
        "unemployment-rate": "% de la population active, moyenne {year}",
        "foreign-population": "% de la population résidante permanente, 31.12.{year}",
        "health-premium": "francs par mois, moyenne de toutes les classes d'âge, {year}",
        "gdp-per-capita": "francs par habitant, prix courants, {year}",
        "average-rent": "francs par mois, loyer net moyen, {year}",
        "crime-rate-per-1000": "infractions au Code pénal pour 1000 habitants, {year}",
      },
      // unit in the table header and after the last legend label
      unitShort: {
        "%": "%",
        "CHF/month": "CHF/mois",
        "CHF": "CHF",
        "per 1,000 inhabitants": "pour 1000",
      },
      switzerland: "Suisse",
      allCantons: "Tous les cantons",
      canton: "Canton",
      population: "Population",
      area: "Superficie (km²)",
      legendRange: "de {from} à moins de {to} : {count}",
      legendRangeLast: "de {from} à {to} : {count}",
      legendCount: "{n} cantons",
      legendCountOne: "1 canton",
      legendNoCanton: "aucun canton",
      legendHint: "Sélectionner une tranche pour mettre ses cantons en évidence.",
      readout: "{canton} : {value} · Suisse : {national}",
      readoutEmpty: "Sélectionner un canton sur la carte ou dans le tableau.",
      allFigures: "Tous les chiffres du canton ↓",
      compareHint: "Pour comparer deux cantons : les chercher dans le tableau, classé selon l'indicateur choisi.",
      unemploymentNote: "Ici le chômage enregistré (SECO). Le taux au sens du BIT compte aussi les personnes non inscrites dans un ORP et il est plus élevé (Suisse {year} : {ilo}).",
      dataSources: "Sources des données",
      provisional: "provisoire",
      bordersSummary: "Frontières cantonales (Moutier)",
      territoryNote: "La population, la superficie et la part d'étrangers se rapportent aux frontières cantonales du 1er janvier 2026 : Moutier, dans le canton de Berne jusqu'au 31 décembre 2025, est comptée dans le canton du Jura. La part d'étrangers est recalculée pour ces frontières à partir des chiffres STATPOP du 31 décembre 2025 ; pour le Jura et Berne, elle diffère donc de celle que l'OFS publie pour les frontières de 2025.",
      oldBordersNote: "La prime d'assurance-maladie est celle de 2026, sur les frontières de 2026 (les régions de primes 2026 de l'OFSP classent Moutier dans le Jura). Ces indicateurs se rapportent aux frontières d'avant 2026, avec Moutier dans le canton de Berne : {list}.",
      clickToSelect: "Sélectionner pour voir les chiffres",
    },

    // Canton tooltip
    cantonTooltip: {
      population: "Population",
      area: "Superficie",
      populationDensity: "Densité de population",
      nationalValue: "Suisse : {value}",
      close: "Fermer",
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
      accuracyScoringDesc: "Le score d'une réponse est 100\u202F% moins l'écart entre votre estimation et la valeur réelle, mesuré par rapport à l'étendue du curseur. Une estimation qui s'écarte d'un dixième de l'étendue vaut 90\u202F%.",
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
      ctaTitle: "La connaissance est un pouvoir. Utilisez-la sagement.",
      ctaText: "La prochaine fois que vous entendez une affirmation audacieuse sur la Suisse, vérifiez les données. Restez informé—avec des faits, pas des suppositions.",
    },


    // Indicator card
    indicatorCard: {
      more: "Plus d'informations : {title}",
      chartLink: "Évolution depuis {firstYear} →",
    },

    // Change against the previous figure: {delta} first ("+0,5"), then the year and the previous figure
    change: {
      points: "{delta} points par rapport à {prevYear} ({previous})",
      pointsOne: "{delta} point par rapport à {prevYear} ({previous})",
      years: "{delta} ans par rapport à {prevYear} ({previous})",
      yearsOne: "{delta} an par rapport à {prevYear} ({previous})",
      relative: "{delta} par rapport à {prevYear} ({previous})",
      previous: "En {prevYear} : {previous}",
      same: "inchangé par rapport à {prevYear}",
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
