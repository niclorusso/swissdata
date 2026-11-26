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
    // Page shown for an address that does not exist
    notFound: {
      title: "Page not found",
      text: "This address does not lead to any page of SwissData. The pages of the site:",
      home: "Home page",
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
      title: "Quiz on Swiss statistics",
      intro: "{questionCount} questions with a number as the answer: estimate it with a slider, then see the exact figure, its source and a comparison. The answers come from federal offices, Eurostat, the OECD and other bodies, named under each answer.",
      languageNote: "",
      chooseLength: "Number of questions:",
      length: "{n} questions",
      revealAnswer: "Show the answer",
      nextQuestion: "Next question",
      seeResults: "See the result",
      restartQuiz: "Start again",
    },

    // Quiz - Question Card
    questionCard: {
      question: "Question",
      of: "of",
      sliderHint: "Move the slider to your estimate.",
    },

    // Quiz - Score Card
    scoreCard: {
      title: "Result",
      averageAccuracy: "Average accuracy: {value}",
      newQuiz: "New quiz",
      shareResult: "Share result",
      shareTitle: "SwissData quiz",
      shareText: "SwissData quiz on Swiss statistics: average accuracy {score} over {n} questions.",
      answers: "Answers",
      estimateAnswer: "Estimate: {guess} · Answer: {answer}",
      unknownQuestion: "Unknown question",
    },

    // Quiz - Reveal Animation
    reveal: {
      accuracy: "Accuracy: {value}",
      yourGuess: "Estimate",
      actualValue: "Answer",
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
      whatTitle: "What it is",
      what: "SwissData brings together official statistics on Switzerland: {indicatorCount} national indicators with their yearly series, six indicators by canton and {questionCount} quiz questions. Every figure gives its source, the year it refers to and a link to the source. The quiz also uses other sources, such as the OECD, SBB and the Swiss Bankers Association, always named.",
      whoTitle: "Who makes it",
      who: "Nicola Lo Russo, as an independent project. SwissData is not a website of the Confederation or of a federal office and publishes no official data of its own: the sources named are authoritative. With the Parliament and Public spending sites it is part of SwissData. Contact: {contactLink}.",
      whyTitle: "Why",
      why: "Official statistics are public but spread across many offices and tables, and rarely explained for non-specialists. Here the main ones sit together, each with a plain-language definition.",
      checkTitle: "How the figures are checked",
      check: "Every figure is taken from the table or publication of the body named as its source, never from press articles. On {lastCheck} every figure on the site was compared one by one with its source. Each correction is recorded, with its date, under data changes.",
      changeLogLink: "Data changes →",
      reportTitle: "Report an error",
      report: "If you find a wrong or outdated figure, report it with the link below, giving the page, the figure and, if possible, the correct source. Corrections appear under data changes.",
      limitsTitle: "Limits",
      limit1: "Statistics come out with a delay: the year shown is the year a figure refers to, not the year it was published.",
      limit2: "Different measures of the same thing give different figures, such as ILO and registered unemployment. The site shows both, with their definitions.",
      limit3: "The figures show how much, not why.",
      limit4: "The quiz questions exist only in Italian and English.",
      quizScoreTitle: "The quiz score",
      quizScore: "The score of an answer is 100% minus the distance between your guess and the actual value, measured as a share of the slider's range. A guess off by a tenth of the range scores 90%.",
      sourcesTitle: "Sources",
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
      axisNotZero: "L’asse verticale non parte da zero.",
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
    // Page shown for an address that does not exist
    notFound: {
      title: "Pagina non trovata",
      text: "Questo indirizzo non porta a nessuna pagina di SwissData. Le pagine del sito:",
      home: "Pagina iniziale",
    },

    // Home page
    home: {
      title: "Statistiche ufficiali sulla Svizzera",
      lead: "Le cifre principali in un unico posto, ognuna con la fonte ufficiale e l’anno a cui si riferisce.",
      independent: "Sito indipendente di Nicola Lo Russo, non della Confederazione",
      allIndicators: "Tutti i {indicatorCount} indicatori anno per anno →",
    },

    // Quiz page
    quiz: {
      title: "Quiz sulle statistiche svizzere",
      intro: "{questionCount} domande con una cifra come risposta: la si stima con un cursore, poi compaiono la cifra esatta, la fonte e un confronto. Le risposte vengono da uffici federali, Eurostat, OCSE e altri enti, indicati sotto ogni risposta.",
      languageNote: "",
      chooseLength: "Numero di domande:",
      length: "{n} domande",
      revealAnswer: "Mostra la risposta",
      nextQuestion: "Prossima domanda",
      seeResults: "Vedi il risultato",
      restartQuiz: "Ricomincia",
    },

    // Quiz - Question Card
    questionCard: {
      question: "Domanda",
      of: "di",
      sliderHint: "Spostare il cursore sulla propria stima.",
    },

    // Quiz - Score Card
    scoreCard: {
      title: "Risultato",
      averageAccuracy: "Precisione media: {value}",
      newQuiz: "Nuovo quiz",
      shareResult: "Condividi risultato",
      shareTitle: "Quiz di SwissData",
      shareText: "Quiz di SwissData sulle statistiche svizzere: precisione media {score} su {n} domande.",
      answers: "Risposte",
      estimateAnswer: "Stima: {guess} · Risposta: {answer}",
      unknownQuestion: "Domanda sconosciuta",
    },

    // Quiz - Reveal Animation
    reveal: {
      accuracy: "Precisione: {value}",
      yourGuess: "Stima",
      actualValue: "Risposta",
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
      compareHint: "Per confrontare due Cantoni: cercarli nella tabella, ordinata per l’indicatore scelto.",
      unemploymentNote: "Qui la disoccupazione registrata (SECO). Il tasso ILO conta anche chi non è iscritto a un URC ed è più alto (Svizzera {year}: {ilo}).",
      dataSources: "Fonti dei dati",
      provisional: "provvisorio",
      bordersSummary: "Confini cantonali (Moutier)",
      territoryNote: "Popolazione, superficie e quota di stranieri seguono i confini cantonali del 1° gennaio 2026: Moutier, nel Canton Berna fino al 31 dicembre 2025, è contata nel Canton Giura. La quota di stranieri è ricalcolata per questi confini dai dati STATPOP del 31 dicembre 2025; per Giura e Berna è quindi diversa da quella che l’UST pubblica per i confini del 2025.",
      oldBordersNote: "Il premio di cassa malati è quello del 2026, sui confini del 2026 (le regioni di premio 2026 dell’UFSP elencano Moutier nel Giura). Questi indicatori si riferiscono ai confini precedenti al 2026, con Moutier nel Canton Berna: {list}.",
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
      title: "Il progetto SwissData",
      whatTitle: "Che cos’è",
      what: "SwissData riunisce statistiche ufficiali sulla Svizzera: {indicatorCount} indicatori nazionali con le loro serie annuali, sei indicatori per Cantone e {questionCount} domande di quiz. Ogni cifra indica la fonte, l’anno a cui si riferisce e il link alla fonte. Il quiz usa anche altre fonti, per esempio OCSE, FFS e Associazione svizzera dei banchieri, sempre indicate.",
      whoTitle: "Chi lo fa",
      who: "Nicola Lo Russo, come progetto indipendente. SwissData non è un sito della Confederazione né di un ufficio federale e non pubblica dati ufficiali propri: fanno fede le fonti indicate. Con i siti Parlamento e Spesa pubblica fa parte di SwissData. Contatto: {contactLink}.",
      whyTitle: "Perché",
      why: "Le statistiche ufficiali sono pubbliche ma sparse tra molti uffici e tabelle, e di rado spiegate a chi non è del mestiere. Qui le principali stanno insieme, ognuna con una definizione in parole semplici.",
      checkTitle: "Come sono controllate le cifre",
      check: "Ogni cifra è presa dalla tabella o dalla pubblicazione dell’ente indicato come fonte, mai da articoli di stampa. Il {lastCheck} tutte le cifre del sito sono state confrontate una per una con le loro fonti. Ogni correzione è annotata, con la data, tra le modifiche ai dati.",
      changeLogLink: "Modifiche ai dati →",
      reportTitle: "Segnalare un errore",
      report: "Chi trova una cifra sbagliata o superata può segnalarla con il link qui sotto, indicando la pagina, la cifra e, se possibile, la fonte corretta. Le correzioni compaiono tra le modifiche ai dati.",
      limitsTitle: "Limiti",
      limit1: "Le statistiche escono con ritardo: l’anno indicato è quello a cui si riferisce la cifra, non quello della pubblicazione.",
      limit2: "Misure diverse dello stesso fenomeno danno cifre diverse, per esempio la disoccupazione secondo l’ILO e quella registrata. Il sito le indica entrambe, con la definizione.",
      limit3: "Le cifre mostrano quanto, non perché.",
      limit4: "Le domande del quiz esistono solo in italiano e in inglese.",
      quizScoreTitle: "Il punteggio del quiz",
      quizScore: "Il punteggio di una risposta è 100\u00A0% meno la distanza tra la tua stima e il valore reale, misurata in rapporto all’ampiezza del cursore. Una stima che sbaglia di un decimo dell’ampiezza vale 90\u00A0%.",
      sourcesTitle: "Fonti",
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
    // Page shown for an address that does not exist
    notFound: {
      title: "Seite nicht gefunden",
      text: "Unter dieser Adresse gibt es keine Seite von SwissData. Die Seiten der Website:",
      home: "Startseite",
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
      title: "Quiz zur Schweizer Statistik",
      intro: "{questionCount} Fragen mit einer Zahl als Antwort: Man schätzt sie mit einem Schieberegler, danach erscheinen die genaue Zahl, die Quelle und ein Vergleich. Die Antworten stammen von Bundesämtern, Eurostat, der OECD und weiteren Stellen, die bei jeder Antwort genannt sind.",
      languageNote: "Die Fragen gibt es nur auf Italienisch und Englisch; hier erscheinen sie auf Englisch.",
      chooseLength: "Anzahl Fragen:",
      length: "{n} Fragen",
      revealAnswer: "Antwort zeigen",
      nextQuestion: "Nächste Frage",
      seeResults: "Ergebnis anzeigen",
      restartQuiz: "Neu beginnen",
    },

    // Quiz - Question Card
    questionCard: {
      question: "Frage",
      of: "von",
      sliderHint: "Den Schieberegler auf die eigene Schätzung stellen.",
    },

    // Quiz - Score Card
    scoreCard: {
      title: "Ergebnis",
      averageAccuracy: "Durchschnittliche Genauigkeit: {value}",
      newQuiz: "Neues Quiz",
      shareResult: "Ergebnis teilen",
      shareTitle: "Quiz von SwissData",
      shareText: "Quiz von SwissData zur Schweizer Statistik: durchschnittliche Genauigkeit {score} bei {n} Fragen.",
      answers: "Antworten",
      estimateAnswer: "Schätzung: {guess} · Antwort: {answer}",
      unknownQuestion: "Unbekannte Frage",
    },

    // Quiz - Reveal Animation
    reveal: {
      accuracy: "Genauigkeit: {value}",
      yourGuess: "Schätzung",
      actualValue: "Antwort",
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
      title: "Das Projekt SwissData",
      whatTitle: "Was es ist",
      what: "SwissData stellt amtliche Statistiken zur Schweiz zusammen: {indicatorCount} nationale Indikatoren mit ihren Jahresreihen, sechs Indikatoren pro Kanton und {questionCount} Quizfragen. Jede Zahl nennt ihre Quelle, das Jahr, auf das sie sich bezieht, und den Link zur Quelle. Das Quiz nutzt auch andere Quellen, etwa OECD, SBB und Schweizerische Bankiervereinigung, immer mit Angabe.",
      whoTitle: "Wer es macht",
      who: "Nicola Lo Russo, als unabhängiges Projekt. SwissData ist keine Website des Bundes oder eines Bundesamts und veröffentlicht keine eigenen amtlichen Daten: Massgebend sind die genannten Quellen. Zusammen mit den Websites Parlament und Öffentliche Ausgaben gehört es zu SwissData. Kontakt: {contactLink}.",
      whyTitle: "Warum",
      why: "Amtliche Statistiken sind öffentlich, aber auf viele Ämter und Tabellen verteilt und selten für Laien erklärt. Hier stehen die wichtigsten beisammen, jede mit einer Definition in einfachen Worten.",
      checkTitle: "Wie die Zahlen geprüft werden",
      check: "Jede Zahl stammt aus der Tabelle oder Publikation der genannten Stelle, nie aus Medienberichten. Am {lastCheck} wurden alle Zahlen der Website einzeln mit ihren Quellen verglichen. Jede Korrektur ist mit Datum bei den Datenänderungen vermerkt.",
      changeLogLink: "Datenänderungen →",
      reportTitle: "Einen Fehler melden",
      report: "Wer eine falsche oder veraltete Zahl findet, kann sie über den Link unten melden, mit Seite, Zahl und wenn möglich der richtigen Quelle. Korrekturen erscheinen bei den Datenänderungen.",
      limitsTitle: "Grenzen",
      limit1: "Statistiken erscheinen mit Verzögerung: Das angegebene Jahr ist das Jahr, auf das sich die Zahl bezieht, nicht das Erscheinungsjahr.",
      limit2: "Verschiedene Masse für dasselbe ergeben verschiedene Zahlen, etwa die Erwerbslosenquote gemäss ILO und die registrierte Arbeitslosigkeit. Die Website nennt beide, mit Definition.",
      limit3: "Die Zahlen zeigen, wie viel, nicht warum.",
      limit4: "Die Quizfragen gibt es nur auf Italienisch und Englisch.",
      quizScoreTitle: "Die Punktzahl im Quiz",
      quizScore: "Die Punktzahl einer Antwort ist 100\u00A0% minus der Abstand zwischen deiner Schätzung und dem tatsächlichen Wert, gemessen am Bereich des Schiebereglers. Eine Schätzung, die um einen Zehntel des Bereichs danebenliegt, ergibt 90\u00A0%.",
      sourcesTitle: "Quellen",
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
      axisNotZero: "L’axe vertical ne commence pas à zéro.",
    },

    categoryName: {
      economic: "Économie",
      demographic: "Population",
      social: "Société",
    },

    // Footer
    footer: {
      disclaimer: "Chaque chiffre renvoie à sa source\u202F; pour un usage officiel, seule la source fait foi.",
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
      reportNote: "Le lien ouvre un court formulaire sur GitHub\u202F; il faut un compte GitHub pour l’utiliser.",
    },

    // Titles and description of the pages (link previews, search results)
    meta: {
      homeTitle: "SwissData – Statistiques officielles sur la Suisse",
      aboutTitle: "Le projet SwissData",
      description: "Statistiques officielles sur la Suisse réunies en un seul endroit, chacune avec sa source et son année. Site indépendant de Nicola Lo Russo, pas de la Confédération.",
    },
    // Page shown for an address that does not exist
    notFound: {
      title: "Page introuvable",
      text: "Cette adresse ne mène à aucune page de SwissData. Les pages du site\u202F:",
      home: "Page d’accueil",
    },

    // Home page
    home: {
      title: "Statistiques officielles sur la Suisse",
      lead: "Les principaux chiffres réunis en un seul endroit, chacun avec sa source officielle et l’année à laquelle il se rapporte.",
      independent: "Site indépendant de Nicola Lo Russo, pas de la Confédération",
      allIndicators: "Les {indicatorCount} indicateurs année par année →",
    },

    // Quiz page
    quiz: {
      title: "Quiz sur la statistique suisse",
      intro: "{questionCount} questions dont la réponse est un chiffre\u202F: on l’estime avec un curseur, puis s’affichent le chiffre exact, la source et une comparaison. Les réponses proviennent d’offices fédéraux, d’Eurostat, de l’OCDE et d’autres organismes, indiqués sous chaque réponse.",
      languageNote: "Les questions n’existent qu’en italien et en anglais\u202F; elles s’affichent ici en anglais.",
      chooseLength: "Nombre de questions\u202F:",
      length: "{n} questions",
      revealAnswer: "Afficher la réponse",
      nextQuestion: "Question suivante",
      seeResults: "Voir le résultat",
      restartQuiz: "Recommencer",
    },

    // Quiz - Question Card
    questionCard: {
      question: "Question",
      of: "sur",
      sliderHint: "Placer le curseur sur son estimation.",
    },

    // Quiz - Score Card
    scoreCard: {
      title: "Résultat",
      averageAccuracy: "Précision moyenne\u202F: {value}",
      newQuiz: "Nouveau quiz",
      shareResult: "Partager le résultat",
      shareTitle: "Quiz SwissData",
      shareText: "Quiz SwissData sur la statistique suisse\u202F: précision moyenne de {score} sur {n} questions.",
      answers: "Réponses",
      estimateAnswer: "Estimation\u202F: {guess} · Réponse\u202F: {answer}",
      unknownQuestion: "Question inconnue",
    },

    // Quiz - Reveal Animation
    reveal: {
      accuracy: "Précision\u202F: {value}",
      yourGuess: "Estimation",
      actualValue: "Réponse",
      context: "Contexte",
      internationalComparison: "Comparaison",
    },

    // Statistics page
    statistics: {
      title: "Statistiques année par année",
      subtitle: "Chaque point est la valeur d’une année, telle que publiée par la source indiquée sous le graphique.",
      all: "Tous",
      chartLabel: "{title}\u202F: de {firstValue} en {from} à {lastValue} en {to}",
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
      subtitle: "Six indicateurs pour les 26 cantons\u202F: plus la couleur est foncée, plus la valeur est élevée. Sélectionner un canton affiche ses chiffres\u202F; le tableau ci-dessous les classe tous.",
      colorBy: "Indicateur\u202F:",
      unemployment: "Chômage enregistré",
      foreignPopulation: "Population étrangère",
      healthPremium: "Prime d’assurance-maladie",
      gdpPerCapita: "PIB par habitant",
      averageRent: "Loyer moyen",
      crimeRate: "Infractions pour 1000 habitants",
      // what the value of each indicator is, with {year} from src/data/cantons.ts
      unitPhrases: {
        "unemployment-rate": "% de la population active, moyenne {year}",
        "foreign-population": "% de la population résidante permanente, 31.12.{year}",
        "health-premium": "francs par mois, moyenne de toutes les classes d’âge, {year}",
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
      legendRange: "de {from} à moins de {to}\u202F: {count}",
      legendRangeLast: "de {from} à {to}\u202F: {count}",
      legendCount: "{n} cantons",
      legendCountOne: "1 canton",
      legendNoCanton: "aucun canton",
      legendHint: "Sélectionner une tranche pour mettre ses cantons en évidence.",
      readout: "{canton}\u202F: {value} · Suisse\u202F: {national}",
      readoutEmpty: "Sélectionner un canton sur la carte ou dans le tableau.",
      allFigures: "Tous les chiffres du canton ↓",
      compareHint: "Pour comparer deux cantons\u202F: les chercher dans le tableau, classé selon l’indicateur choisi.",
      unemploymentNote: "Ici le chômage enregistré (SECO). Le taux au sens du BIT compte aussi les personnes non inscrites dans un ORP et il est plus élevé (Suisse {year}\u202F: {ilo}).",
      dataSources: "Sources des données",
      provisional: "provisoire",
      bordersSummary: "Frontières cantonales (Moutier)",
      territoryNote: "La population, la superficie et la part d’étrangers se rapportent aux frontières cantonales du 1er janvier 2026\u202F: Moutier, dans le canton de Berne jusqu’au 31 décembre 2025, est comptée dans le canton du Jura. La part d’étrangers est recalculée pour ces frontières à partir des chiffres STATPOP du 31 décembre 2025\u202F; pour le Jura et Berne, elle diffère donc de celle que l’OFS publie pour les frontières de 2025.",
      oldBordersNote: "La prime d’assurance-maladie est celle de 2026, sur les frontières de 2026 (les régions de primes 2026 de l’OFSP classent Moutier dans le Jura). Ces indicateurs se rapportent aux frontières d’avant 2026, avec Moutier dans le canton de Berne\u202F: {list}.",
      clickToSelect: "Sélectionner pour voir les chiffres",
    },

    // Canton tooltip
    cantonTooltip: {
      population: "Population",
      area: "Superficie",
      populationDensity: "Densité de population",
      nationalValue: "Suisse\u202F: {value}",
      close: "Fermer",
    },

    // About page
    about: {
      title: "Le projet SwissData",
      whatTitle: "Ce que c’est",
      what: "SwissData réunit des statistiques officielles sur la Suisse\u202F: {indicatorCount} indicateurs nationaux avec leurs séries annuelles, six indicateurs par canton et {questionCount} questions de quiz. Chaque chiffre indique sa source, l’année à laquelle il se rapporte et le lien vers la source. Le quiz utilise aussi d’autres sources, par exemple l’OCDE, les CFF et l’Association suisse des banquiers, toujours indiquées.",
      whoTitle: "Qui le fait",
      who: "Nicola Lo Russo, en tant que projet indépendant. SwissData n’est pas un site de la Confédération ni d’un office fédéral et ne publie pas de données officielles propres\u202F: seules les sources indiquées font foi. Avec les sites Parlement et Dépenses publiques, il fait partie de SwissData. Contact\u202F: {contactLink}.",
      whyTitle: "Pourquoi",
      why: "Les statistiques officielles sont publiques mais dispersées entre de nombreux offices et tableaux, et rarement expliquées aux non-spécialistes. Ici, les principales sont réunies, chacune avec une définition en mots simples.",
      checkTitle: "Comment les chiffres sont vérifiés",
      check: "Chaque chiffre provient du tableau ou de la publication de l’organisme indiqué comme source, jamais d’articles de presse. Le {lastCheck}, tous les chiffres du site ont été comparés un à un avec leurs sources. Chaque correction est notée, avec sa date, dans les modifications des données.",
      changeLogLink: "Modifications des données →",
      reportTitle: "Signaler une erreur",
      report: "Toute personne qui trouve un chiffre faux ou dépassé peut le signaler avec le lien ci-dessous, en indiquant la page, le chiffre et si possible la bonne source. Les corrections figurent dans les modifications des données.",
      limitsTitle: "Limites",
      limit1: "Les statistiques paraissent avec retard\u202F: l’année indiquée est celle à laquelle se rapporte le chiffre, pas celle de sa publication.",
      limit2: "Des mesures différentes d’un même phénomène donnent des chiffres différents, par exemple le chômage au sens du BIT et le chômage enregistré. Le site indique les deux, avec leur définition.",
      limit3: "Les chiffres montrent combien, pas pourquoi.",
      limit4: "Les questions du quiz n’existent qu’en italien et en anglais.",
      quizScoreTitle: "Le score du quiz",
      quizScore: "Le score d’une réponse est 100\u202F% moins l’écart entre votre estimation et la valeur réelle, mesuré par rapport à l’étendue du curseur. Une estimation qui s’écarte d’un dixième de l’étendue vaut 90\u202F%.",
      sourcesTitle: "Sources",
    },


    // Indicator card
    indicatorCard: {
      more: "Plus d’informations\u202F: {title}",
      chartLink: "Évolution depuis {firstYear} →",
    },

    // Change against the previous figure: {delta} first ("+0,5"), then the year and the previous figure
    change: {
      points: "{delta} points par rapport à {prevYear} ({previous})",
      pointsOne: "{delta} point par rapport à {prevYear} ({previous})",
      years: "{delta} ans par rapport à {prevYear} ({previous})",
      yearsOne: "{delta} an par rapport à {prevYear} ({previous})",
      relative: "{delta} par rapport à {prevYear} ({previous})",
      previous: "En {prevYear}\u202F: {previous}",
      same: "inchangé par rapport à {prevYear}",
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
