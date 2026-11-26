import { LocalizedText } from "@/types";

/**
 * Dated changes to the figures and texts of the site, newest first. Shown on the page "Data changes"
 * (/it/changes, /de/changes, /fr/changes, /en/changes). A full check of the data also moves
 * DATA_CHECKED in src/data/meta.ts.
 *
 * The log starts on 26 November 2026; the full check of 12 November 2026 is one summary entry at the end.
 * "Before" names only a value that visitors could see on swissdata-platform.ch: a value that was changed
 * again before it was published is not listed. All four languages say the same.
 */
export interface ChangeLogEntry {
  /** ISO date of the change */
  date: string;
  /** "update": a newer figure from the source; "correction": a figure, text, label or link that was wrong */
  kind: "update" | "correction";
  text: LocalizedText;
  /** one line per figure, for an entry that changes several */
  items?: LocalizedText[];
  source?: { name: LocalizedText; url: string };
}

export const changeLog: ChangeLogEntry[] = [
  {
    date: "2026-11-26",
    kind: "update",
    text: {
      it: "Spesa pubblica per l’istruzione: la serie viene ora dalla tabella UST T 15.06.01.03, con un valore per ogni anno dal 2000 al 2023. Ultimo dato: 5,5\u00A0% del PIL nel 2023 (prima: 5,6\u00A0% nel 2022, provvisorio). Anche per gli anni precedenti la tabella dà valori più bassi: 5,2\u00A0% nel 2022, 5,4\u00A0% nel 2021 e 5,7\u00A0% nel 2020 (prima: 5,6, 5,6 e 5,9\u00A0%). Aggiornata anche la domanda del quiz.",
      de: "Öffentliche Bildungsausgaben: Die Reihe stammt jetzt aus der BFS-Tabelle T 15.06.01.03, mit einem Wert für jedes Jahr von 2000 bis 2023. Letzter Wert: 5,5\u00A0% des BIP im Jahr 2023 (vorher: 5,6\u00A0% für 2022, provisorisch). Auch für die früheren Jahre gibt die Tabelle tiefere Werte: 5,2\u00A0% für 2022, 5,4\u00A0% für 2021 und 5,7\u00A0% für 2020 (vorher: 5,6, 5,6 und 5,9\u00A0%). Auch die Quizfrage ist angepasst.",
      fr: "Dépenses publiques d’éducation\u202F: la série provient désormais du tableau OFS T 15.06.01.03, avec une valeur pour chaque année de 2000 à 2023. Dernière valeur\u202F: 5,5\u202F% du PIB en 2023 (auparavant\u202F: 5,6\u202F% pour 2022, provisoire). Pour les années précédentes aussi, le tableau donne des valeurs plus basses\u202F: 5,2\u202F% en 2022, 5,4\u202F% en 2021 et 5,7\u202F% en 2020 (auparavant\u202F: 5,6, 5,6 et 5,9\u202F%). La question du quiz est aussi mise à jour.",
      en: "Public spending on education: the series now comes from FSO table T 15.06.01.03, with a figure for every year from 2000 to 2023. Latest figure: 5.5% of GDP in 2023 (before: 5.6% for 2022, provisional). The table also gives lower figures for earlier years: 5.2% for 2022, 5.4% for 2021 and 5.7% for 2020 (before: 5.6, 5.6 and 5.9%). The quiz question was updated as well.",
    },
    source: {
      name: { it: "UST, tabella T 15.06.01.03", de: "BFS, Tabelle T 15.06.01.03", fr: "OFS, tableau T 15.06.01.03", en: "FSO, table T 15.06.01.03" },
      url: "https://www.bfs.admin.ch/asset/de/je-d-15.06.01.03",
    },
  },
  {
    date: "2026-11-26",
    kind: "update",
    text: {
      it: "Disoccupazione registrata nei Cantoni: medie annue del 2025 al posto di quelle del 2024, dalla tabella UST T 3.3.2.3 con i dati della SECO. Svizzera: 2,8\u00A0% (prima: 2,4\u00A0% nel 2024).",
      de: "Registrierte Arbeitslosigkeit in den Kantonen: Jahresmittel 2025 statt 2024, aus der BFS-Tabelle T 3.3.2.3 mit den Zahlen des SECO. Schweiz: 2,8\u00A0% (vorher: 2,4\u00A0% für 2024).",
      fr: "Chômage enregistré dans les cantons\u202F: moyennes annuelles 2025 au lieu de 2024, tirées du tableau OFS T 3.3.2.3 avec les chiffres du SECO. Suisse\u202F: 2,8\u202F% (auparavant\u202F: 2,4\u202F% pour 2024).",
      en: "Registered unemployment by canton: 2025 annual averages instead of 2024, from FSO table T 3.3.2.3 with SECO's figures. Switzerland: 2.8% (before: 2.4% for 2024).",
    },
    source: {
      name: { it: "UST, tabella T 3.3.2.3", de: "BFS, Tabelle T 3.3.2.3", fr: "OFS, tableau T 3.3.2.3", en: "FSO, table T 3.3.2.3" },
      url: "https://www.bfs.admin.ch/asset/de/je-d-03.03.02.03",
    },
  },
  {
    date: "2026-11-26",
    kind: "update",
    text: {
      it: "Quiz: cifre aggiornate alle ultime pubblicazioni ufficiali.",
      de: "Quiz: Zahlen nach den neuesten amtlichen Veröffentlichungen aktualisiert.",
      fr: "Quiz\u202F: chiffres mis à jour selon les dernières publications officielles.",
      en: "Quiz: figures updated to the latest official releases.",
    },
    items: [
      {
        it: "Banche in Svizzera: 225 a fine 2025 (prima: 230 a fine 2024), BNS.",
        de: "Banken in der Schweiz: 225 Ende 2025 (vorher: 230 Ende 2024), SNB.",
        fr: "Banques en Suisse\u202F: 225 à fin 2025 (auparavant\u202F: 230 à fin 2024), BNS.",
        en: "Banks in Switzerland: 225 at the end of 2025 (before: 230 at the end of 2024), SNB.",
      },
      {
        it: "Oro della BNS, grafico di confronto: dati del FMI di settembre e ottobre 2026 (Russia: novembre 2025). Cina 2435,4 tonnellate (prima: 2306,3, tabella del World Gold Council di febbraio 2026), ora davanti alla Russia; Germania 3349,1 (prima: 3350,3).",
        de: "Gold der SNB, Vergleichsgrafik: Daten des IWF für September und Oktober 2026 (Russland: November 2025). China 2435,4 Tonnen (vorher: 2306,3, Tabelle des World Gold Council vom Februar 2026), jetzt vor Russland; Deutschland 3349,1 (vorher: 3350,3).",
        fr: "Or de la BNS, graphique de comparaison\u202F: données du FMI pour septembre et octobre 2026 (Russie\u202F: novembre 2025). Chine 2435,4 tonnes (auparavant\u202F: 2306,3, tableau du World Gold Council de février 2026), désormais devant la Russie\u202F; Allemagne 3349,1 (auparavant\u202F: 3350,3).",
        en: "SNB gold, comparison chart: IMF data for September and October 2026 (Russia: November 2025). China 2,435.4 tonnes (before: 2,306.3, World Gold Council table of February 2026), now ahead of Russia; Germany 3,349.1 (before: 3,350.3).",
      },
      {
        it: "Debito pubblico lordo (definizione FMI): 40,1\u00A0% del PIL nel 2025 (prima: 40,2\u00A0%); secondo la definizione di Maastricht 23,4\u00A0% (prima: 24,2\u00A0%). AFF, dati del 22 settembre 2026. Il grafico prende i valori degli altri Paesi dallo stesso file (OCSE, Economic Outlook 119), per esempio Stati Uniti 125,9\u00A0% (prima: 122,6\u00A0%).",
        de: "Bruttoschulden des Staates (Definition des IWF): 40,1\u00A0% des BIP im Jahr 2025 (vorher: 40,2\u00A0%); nach der Maastricht-Definition 23,4\u00A0% (vorher: 24,2\u00A0%). EFV, Daten vom 22. September 2026. Die Grafik nimmt die Werte der anderen Länder aus derselben Datei (OECD, Economic Outlook 119), zum Beispiel USA 125,9\u00A0% (vorher: 122,6\u00A0%).",
        fr: "Dette publique brute (définition du FMI)\u202F: 40,1\u202F% du PIB en 2025 (auparavant\u202F: 40,2\u202F%)\u202F; selon la définition de Maastricht, 23,4\u202F% (auparavant\u202F: 24,2\u202F%). AFF, données du 22 septembre 2026. Le graphique reprend les valeurs des autres pays du même fichier (OCDE, Economic Outlook 119), par exemple États-Unis 125,9\u202F% (auparavant\u202F: 122,6\u202F%).",
        en: "Gross public debt (IMF definition): 40.1% of GDP in 2025 (before: 40.2%); under the Maastricht definition 23.4% (before: 24.2%). FFA, data of 22 September 2026. The chart takes the other countries from the same file (OECD Economic Outlook 119), for example the USA 125.9% (before: 122.6%).",
      },
      {
        it: "Costi della sanità: 11,4\u00A0% del PIL nel 2024 secondo l’UST (prima: 11,8\u00A0% secondo l’OCSE).",
        de: "Kosten des Gesundheitswesens: 11,4\u00A0% des BIP im Jahr 2024 gemäss BFS (vorher: 11,8\u00A0% gemäss OECD).",
        fr: "Coûts de la santé\u202F: 11,4\u202F% du PIB en 2024 selon l’OFS (auparavant\u202F: 11,8\u202F% selon l’OCDE).",
        en: "Healthcare costs: 11.4% of GDP in 2024 according to the FSO (before: 11.8% according to the OECD).",
      },
      {
        it: "Abitazioni occupate dal proprietario: 35,7\u00A0% nel 2024 (prima: 35,9\u00A0% nel 2022).",
        de: "Von den Eigentümern bewohnte Wohnungen: 35,7\u00A0% im Jahr 2024 (vorher: 35,9\u00A0% für 2022).",
        fr: "Logements occupés par leur propriétaire\u202F: 35,7\u202F% en 2024 (auparavant\u202F: 35,9\u202F% en 2022).",
        en: "Owner-occupied dwellings: 35.7% in 2024 (before: 35.9% in 2022).",
      },
      {
        it: "Tragitto casa-lavoro: 30,2 minuti in media nel 2024 (prima: 29,6 minuti nel 2022).",
        de: "Arbeitsweg: durchschnittlich 30,2 Minuten im Jahr 2024 (vorher: 29,6 Minuten für 2022).",
        fr: "Trajet domicile-travail\u202F: 30,2 minutes en moyenne en 2024 (auparavant\u202F: 29,6 minutes en 2022).",
        en: "Commute to work: 30.2 minutes on average in 2024 (before: 29.6 minutes in 2022).",
      },
      {
        it: "Crescita del PIL reale: 1,5\u00A0% nel 2024 e 1,6\u00A0% nel 2025 (prima: 1,4\u00A0% e 1,3\u00A0%), UST, 25 agosto 2026.",
        de: "Wachstum des realen BIP: 1,5\u00A0% im Jahr 2024 und 1,6\u00A0% im Jahr 2025 (vorher: 1,4\u00A0% und 1,3\u00A0%), BFS, 25. August 2026.",
        fr: "Croissance du PIB réel\u202F: 1,5\u202F% en 2024 et 1,6\u202F% en 2025 (auparavant\u202F: 1,4\u202F% et 1,3\u202F%), OFS, 25 août 2026.",
        en: "Real GDP growth: 1.5% in 2024 and 1.6% in 2025 (before: 1.4% and 1.3%), FSO, 25 August 2026.",
      },
      {
        it: "Automobili per 1000 abitanti: 535 nel 2025 (prima: 535 nel 2024; il dato del 2024 è stato rivisto a 536).",
        de: "Personenwagen pro 1000 Einwohner: 535 im Jahr 2025 (vorher: 535 für 2024; der Wert für 2024 wurde auf 536 revidiert).",
        fr: "Voitures pour 1000 habitants\u202F: 535 en 2025 (auparavant\u202F: 535 en 2024\u202F; le chiffre de 2024 a été révisé à 536).",
        en: "Cars per 1,000 inhabitants: 535 in 2025 (before: 535 in 2024; the 2024 figure was revised to 536).",
      },
      {
        it: "Salario medio a parità di potere d’acquisto: classifica OCSE del 2025, secondo posto su 33 Paesi con un dato (prima: 2024, su 38 Paesi).",
        de: "Durchschnittslohn zu Kaufkraftparitäten: OECD-Rangliste 2025, zweiter Platz unter 33 Ländern mit einem Wert (vorher: 2024, unter 38 Ländern).",
        fr: "Salaire moyen à parité de pouvoir d’achat\u202F: classement OCDE 2025, deuxième rang sur 33 pays disposant d’un chiffre (auparavant\u202F: 2024, sur 38 pays).",
        en: "Average wage at purchasing power parity: OECD ranking for 2025, second of 33 countries with a figure (before: 2024, of 38 countries).",
      },
      {
        it: "Difesa: la domanda indica il preventivo 2026 e il grafico la spesa militare in % del PIL secondo il SIPRI (2025; Svizzera 0,8\u00A0%, prima: 0,7\u00A0%). Tolto il riferimento all’obiettivo NATO del 2\u00A0% del PIL: dal vertice dell’Aia del 2025 l’impegno è del 5\u00A0% entro il 2035.",
        de: "Verteidigung: Die Frage nennt den Voranschlag 2026, die Grafik die Militärausgaben in % des BIP gemäss SIPRI (2025; Schweiz 0,8\u00A0%, vorher: 0,7\u00A0%). Der Hinweis auf das NATO-Ziel von 2\u00A0% des BIP ist entfernt: Seit dem Gipfel von Den Haag 2025 gilt die Zusage von 5\u00A0% bis 2035.",
        fr: "Défense\u202F: la question indique le budget 2026 et le graphique les dépenses militaires en % du PIB selon le SIPRI (2025\u202F; Suisse 0,8\u202F%, auparavant\u202F: 0,7\u202F%). La mention de l’objectif de l’OTAN de 2\u202F% du PIB est retirée\u202F: depuis le sommet de La Haye de 2025, l’engagement est de 5\u202F% d’ici 2035.",
        en: "Defence: the question names the 2026 budget and the chart shows military spending in % of GDP according to SIPRI (2025; Switzerland 0.8%, before: 0.7%). The reference to NATO's 2% of GDP guideline was removed: since the 2025 Hague summit the commitment is 5% by 2035.",
      },
      {
        it: "Tempo parziale: il 39,8\u00A0% è la cifra secondo la definizione di Eurostat; secondo quella dell’UST è il 38,7\u00A0% (2025). La domanda ora lo dice.",
        de: "Teilzeit: 39,8\u00A0% ist der Wert nach der Definition von Eurostat; nach jener des BFS sind es 38,7\u00A0% (2025). Die Frage sagt das jetzt.",
        fr: "Temps partiel\u202F: 39,8\u202F% est le chiffre selon la définition d’Eurostat\u202F; selon celle de l’OFS, il est de 38,7\u202F% (2025). La question le précise désormais.",
        en: "Part-time work: 39.8% is the figure under Eurostat's definition; under the FSO's it is 38.7% (2025). The question now says so.",
      },
    ],
  },
  {
    date: "2026-11-26",
    kind: "correction",
    text: {
      it: "Variazione rispetto all’anno precedente nelle schede della pagina iniziale: ogni scheda indicava la variazione della cifra in % («rispetto all’anno scorso»), anche per i tassi: la disoccupazione salita dal 4,3 al 4,8\u00A0% appariva come +11,6\u00A0%. Per tassi e quote il sito indica ora la differenza in punti, calcolata dai valori non arrotondati della fonte: disoccupazione ILO +0,5 punti (prima: +11,6\u00A0%), costi della sanità +0,2 punti (prima: +1,8\u00A0%), tasso di povertà +0,3 punti (prima: +3,7\u00A0%), debito federale −0,5 punti (prima: −3\u00A0%). Per la crescita del PIL è indicato il valore del 2024, 1,5\u00A0% (prima: +6,7\u00A0%); per l’età mediana e la speranza di vita la differenza in anni, +0,1 anni ciascuna (prima: +0,2\u00A0% e +0,1\u00A0%). Popolazione (+0,8\u00A0%) e reati (−2,5\u00A0%) mantengono la variazione in %.",
      de: "Veränderung gegenüber dem Vorjahr auf den Karten der Startseite: Jede Karte zeigte die Veränderung der Zahl in % («gegenüber Vorjahr»), auch bei Quoten: Die von 4,3 auf 4,8\u00A0% gestiegene Erwerbslosenquote erschien als +11,6\u00A0%. Bei Quoten und Anteilen zeigt die Website jetzt die Differenz in Prozentpunkten, berechnet aus den ungerundeten Werten der Quelle: Erwerbslosenquote gemäss ILO +0,5 Prozentpunkte (vorher: +11,6\u00A0%), Kosten des Gesundheitswesens +0,2 Prozentpunkte (vorher: +1,8\u00A0%), Armutsquote +0,3 Prozentpunkte (vorher: +3,7\u00A0%), Bundesschulden −0,5 Prozentpunkte (vorher: −3\u00A0%). Beim BIP-Wachstum steht der Wert für 2024, 1,5\u00A0% (vorher: +6,7\u00A0%), beim Medianalter und bei der Lebenserwartung die Differenz in Jahren, je +0,1 Jahre (vorher: +0,2\u00A0% und +0,1\u00A0%). Bevölkerung (+0,8\u00A0%) und Straftaten (−2,5\u00A0%) behalten die Veränderung in %.",
      fr: "Variation par rapport à l’année précédente sur les fiches de la page d’accueil\u202F: chaque fiche indiquait la variation du chiffre en % («\u202Fpar rapport à l’année dernière\u202F»), aussi pour les taux\u202F: le chômage passé de 4,3 à 4,8\u202F% apparaissait comme +11,6\u202F%. Pour les taux et les parts, le site indique désormais l’écart en points, calculé à partir des valeurs non arrondies de la source\u202F: chômage au sens du BIT +0,5 point (auparavant\u202F: +11,6\u202F%), coûts de la santé +0,2 point (auparavant\u202F: +1,8\u202F%), taux de pauvreté +0,3 point (auparavant\u202F: +3,7\u202F%), dette fédérale −0,5 point (auparavant\u202F: −3\u202F%). Pour la croissance du PIB, le site indique la valeur de 2024, 1,5\u202F% (auparavant\u202F: +6,7\u202F%)\u202F; pour l’âge médian et l’espérance de vie, l’écart en années, +0,1 an chacun (auparavant\u202F: +0,2\u202F% et +0,1\u202F%). La population (+0,8\u202F%) et les infractions (−2,5\u202F%) gardent la variation en %.",
      en: "Change from the previous year on the home page cards: every card gave the change of the figure in % ('vs last year'), also for rates: ILO unemployment rising from 4.3 to 4.8% appeared as +11.6%. For rates and shares the site now shows the difference in percentage points, computed from the unrounded figures of the source: ILO unemployment +0.5 points (before: +11.6%), healthcare costs +0.2 points (before: +1.8%), poverty rate +0.3 points (before: +3.7%), federal debt −0.5 points (before: −3%). GDP growth shows the figure for 2024, 1.5% (before: +6.7%); median age and life expectancy the difference in years, +0.1 years each (before: +0.2% and +0.1%). Population (+0.8%) and offences (−2.5%) keep the change in %.",
    },
  },
  {
    date: "2026-11-26",
    kind: "correction",
    text: {
      it: "Costi della sanità, confronto OCSE per il 2024: Germania 12,2\u00A0%, Austria 11,7\u00A0%, Francia 11,3\u00A0% e Italia 8,5\u00A0% del PIL (prima: 12,3, 11,8, 11,5 e 8,4\u00A0%). La Svizzera (11,4\u00A0%) è quindi allo stesso livello della Francia, non sotto.",
      de: "Kosten des Gesundheitswesens, OECD-Vergleich für 2024: Deutschland 12,2\u00A0%, Österreich 11,7\u00A0%, Frankreich 11,3\u00A0% und Italien 8,5\u00A0% des BIP (vorher: 12,3, 11,8, 11,5 und 8,4\u00A0%). Die Schweiz (11,4\u00A0%) liegt damit gleichauf mit Frankreich, nicht darunter.",
      fr: "Coûts de la santé, comparaison OCDE pour 2024\u202F: Allemagne 12,2\u202F%, Autriche 11,7\u202F%, France 11,3\u202F% et Italie 8,5\u202F% du PIB (auparavant\u202F: 12,3, 11,8, 11,5 et 8,4\u202F%). La Suisse (11,4\u202F%) est donc au niveau de la France, pas en dessous.",
      en: "Healthcare costs, OECD comparison for 2024: Germany 12.2%, Austria 11.7%, France 11.3% and Italy 8.5% of GDP (before: 12.3, 11.8, 11.5 and 8.4%). Switzerland (11.4%) is therefore level with France, not below it.",
    },
  },
  {
    date: "2026-11-26",
    kind: "correction",
    text: {
      it: "Elettricità rinnovabile: il 68,3\u00A0% è la quota della produzione netta (produzione meno il consumo delle pompe di accumulazione), mentre il 55,5\u00A0% dell’idroelettrico e l’11,8\u00A0% del fotovoltaico sono quote della produzione lorda (UFE, 2025). Prima i testi le riferivano tutte alla stessa produzione.",
      de: "Erneuerbarer Strom: 68,3\u00A0% ist der Anteil an der Nettoproduktion (Produktion abzüglich des Verbrauchs der Speicherpumpen), 55,5\u00A0% für die Wasserkraft und 11,8\u00A0% für die Photovoltaik sind Anteile an der Bruttoproduktion (BFE, 2025). Vorher bezogen die Texte alle drei auf dieselbe Produktion.",
      fr: "Électricité renouvelable\u202F: 68,3\u202F% est la part de la production nette (production moins la consommation des pompes d’accumulation), tandis que 55,5\u202F% pour l’hydraulique et 11,8\u202F% pour le photovoltaïque sont des parts de la production brute (OFEN, 2025). Auparavant, les textes rapportaient les trois à la même production.",
      en: "Renewable electricity: 68.3% is the share of net production (production minus the electricity used by storage pumps), while 55.5% for hydropower and 11.8% for photovoltaics are shares of gross production (SFOE, 2025). Before, the texts referred all three to the same production.",
    },
  },
  {
    date: "2026-11-26",
    kind: "correction",
    text: {
      it: "Speranza di vita 2025: l’UST ha pubblicato le cifre del 2025 come provvisorie il 18 giugno 2026; la sua tabella del 24 settembre 2026 riporta gli stessi valori senza questa indicazione. I testi ora dicono entrambe le cose (prima: «provvisorie»).",
      de: "Lebenserwartung 2025: Das BFS veröffentlichte die Zahlen für 2025 am 18. Juni 2026 als provisorisch; seine Tabelle vom 24. September 2026 enthält dieselben Werte ohne diesen Hinweis. Die Texte sagen jetzt beides (vorher: «provisorisch»).",
      fr: "Espérance de vie 2025\u202F: l’OFS a publié les chiffres de 2025 comme provisoires le 18 juin 2026\u202F; son tableau du 24 septembre 2026 contient les mêmes valeurs sans cette mention. Les textes disent désormais les deux (auparavant\u202F: «\u202Fprovisoires\u202F»).",
      en: "Life expectancy 2025: the FSO published the 2025 figures as provisional on 18 June 2026; its table of 24 September 2026 has the same values without that flag. The texts now say both (before: 'provisional').",
    },
  },
  {
    date: "2026-11-26",
    kind: "correction",
    text: {
      it: "Reati e rinnovabili: la cifra sui reati conta solo i reati del Codice penale e quella sulle rinnovabili è una quota del consumo finale di energia, non dell’elettricità. Le etichette ora lo dicono.",
      de: "Straftaten und erneuerbare Energie: Die Zahl zu den Straftaten zählt nur Straftaten nach Strafgesetzbuch, jene zu den erneuerbaren Energien ist ein Anteil am Endenergieverbrauch, nicht am Strom. Die Bezeichnungen sagen das jetzt.",
      fr: "Infractions et énergies renouvelables\u202F: le chiffre des infractions ne compte que les infractions au Code pénal, et celui des renouvelables est une part de la consommation finale d’énergie, pas de l’électricité. Les intitulés le disent désormais.",
      en: "Offences and renewables: the offences figure counts Criminal Code offences only, and the renewables figure is a share of final energy consumption, not of electricity. The labels now say so.",
    },
  },
  {
    date: "2026-11-26",
    kind: "correction",
    text: {
      it: "Link alle fonti: tre link del quiz non funzionavano più e tredici link dell’UST nel quiz portavano alla pagina di scelta della lingua; ora ognuno porta alla tabella o al comunicato con la cifra. Il debito della Confederazione rimanda alla statistica tascabile «Finanze pubbliche 2025» dell’AFF, le domande su difesa e migrazione al preventivo 2027 dell’AFF (volume 1, colonna del preventivo 2026). Il rapporto annuale delle FFS, non più raggiungibile, è sostituito dal rapporto breve del Consiglio federale sulle FFS 2025.",
      de: "Links zu den Quellen: Drei Links im Quiz funktionierten nicht mehr, und dreizehn Links des BFS im Quiz führten auf die Seite zur Sprachwahl; jetzt führt jeder zur Tabelle oder Mitteilung mit der Zahl. Die Bundesschulden verweisen auf die Taschenstatistik «Öffentliche Finanzen 2025» der EFV, die Fragen zu Verteidigung und Migration auf den Voranschlag 2027 der EFV (Band 1, Spalte des Voranschlags 2026). Der nicht mehr erreichbare Geschäftsbericht der SBB ist durch den Kurzbericht des Bundesrates zur SBB 2025 ersetzt.",
      fr: "Liens vers les sources\u202F: trois liens du quiz ne fonctionnaient plus et treize liens de l’OFS dans le quiz menaient à la page de choix de la langue\u202F; chacun mène désormais au tableau ou au communiqué qui contient le chiffre. La dette de la Confédération renvoie à la statistique de poche «\u202FFinances publiques 2025\u202F» de l’AFF, les questions sur la défense et la migration au budget 2027 de l’AFF (volume 1, colonne du budget 2026). Le rapport de gestion des CFF, qui n’est plus accessible, est remplacé par le rapport succinct du Conseil fédéral sur les CFF 2025.",
      en: "Links to sources: three quiz links no longer worked and thirteen FSO links in the quiz led to the language choice page; each now leads to the table or release with the figure. Federal debt links to the FFA pocket statistics 'Public finances 2025', the defence and migration questions to the FFA's 2027 budget (volume 1, column of the 2026 budget). The SBB annual report, no longer available, is replaced by the Federal Council's short report on SBB 2025.",
    },
  },
  {
    date: "2026-11-26",
    kind: "correction",
    text: {
      it: "Quiz: ogni grafico indica che cosa mostra, la fonte e l’anno. Quindici grafici mostrano per la Svizzera un valore diverso dalla risposta perché usano un’altra fonte, definizione o anno; il titolo del grafico ora dice quale.",
      de: "Quiz: Jede Grafik nennt, was sie zeigt, die Quelle und das Jahr. Fünfzehn Grafiken zeigen für die Schweiz einen anderen Wert als die Antwort, weil sie eine andere Quelle, Definition oder ein anderes Jahr verwenden; der Titel der Grafik sagt jetzt, welche.",
      fr: "Quiz\u202F: chaque graphique indique ce qu’il montre, la source et l’année. Quinze graphiques montrent pour la Suisse une valeur différente de la réponse, car ils utilisent une autre source, définition ou année\u202F; le titre du graphique précise désormais laquelle.",
      en: "Quiz: every chart says what it shows, its source and its year. Fifteen charts show a Swiss value different from the answer because they use another source, definition or year; the chart title now says which.",
    },
  },
  {
    date: "2026-11-26",
    kind: "correction",
    text: {
      it: "Quiz: le domande sull’oro della BNS, sul preventivo per la migrazione e sull’apprendistato indicano ora l’anno. La risposta sul tragitto casa-lavoro indica il mezzo di trasporto principale nel 2024: auto 49,4\u00A0%, treno 17,1\u00A0%, bus o tram 13,6\u00A0% dei 3,7 milioni di pendolari (UST, T 11.4.4.4; prima: la metà, 16 e 13\u00A0% di 3,6 milioni, 2022).",
      de: "Quiz: Die Fragen zum Gold der SNB, zum Migrationsbudget und zur Berufslehre nennen jetzt das Jahr. Die Antwort zum Arbeitsweg nennt das Hauptverkehrsmittel 2024: Auto 49,4\u00A0%, Zug 17,1\u00A0%, Bus oder Tram 13,6\u00A0% der 3,7 Millionen Pendlerinnen und Pendler (BFS, T 11.4.4.4; vorher: die Hälfte, 16 und 13\u00A0% von 3,6 Millionen, 2022).",
      fr: "Quiz\u202F: les questions sur l’or de la BNS, le budget de la migration et l’apprentissage indiquent désormais l’année. La réponse sur le trajet domicile-travail indique le moyen de transport principal en 2024\u202F: voiture 49,4\u202F%, train 17,1\u202F%, bus ou tram 13,6\u202F% des 3,7 millions de pendulaires (OFS, T 11.4.4.4\u202F; auparavant\u202F: la moitié, 16 et 13\u202F% de 3,6 millions, 2022).",
      en: "Quiz: the questions on the SNB's gold, the migration budget and apprenticeships now state their year. The commute answer gives the main means of transport in 2024: car 49.4%, train 17.1%, bus or tram 13.6% of the 3.7 million commuters (FSO, T 11.4.4.4; before: half, 16 and 13% of 3.6 million, 2022).",
    },
  },
  {
    date: "2026-11-26",
    kind: "correction",
    text: {
      it: "Quiz, disoccupazione: il 4,9\u00A0% del confronto è la cifra di Eurostat per le persone tra 15 e 74 anni; la cifra nazionale dell’UST secondo l’ILO è 4,8\u00A0%. La spiegazione ora lo dice.",
      de: "Quiz, Arbeitslosigkeit: Die 4,9\u00A0% im Vergleich sind die Zahl von Eurostat für Personen von 15 bis 74 Jahren; die nationale Zahl des BFS gemäss ILO ist 4,8\u00A0%. Die Erklärung sagt das jetzt.",
      fr: "Quiz, chômage\u202F: les 4,9\u202F% de la comparaison sont le chiffre d’Eurostat pour les personnes de 15 à 74 ans\u202F; le chiffre national de l’OFS au sens du BIT est de 4,8\u202F%. L’explication le précise désormais.",
      en: "Quiz, unemployment: the 4.9% in the comparison is Eurostat's figure for people aged 15 to 74; the FSO's national ILO figure is 4.8%. The explanation now says so.",
    },
  },
{
    date: "2026-11-26",
    kind: "correction",
    text: {
      it: "Schede della pagina iniziale: le cifre sono indicate con i decimali della fonte, come nella pagina delle statistiche. Costi della sanità 11,4\u00A0% del PIL (prima: 11\u00A0%, UST), reati 61,3 per 1000 abitanti (prima: 61, UST), popolazione 9,127 milioni (prima: 9 milioni, UST), debito federale 16,1\u00A0% del PIL (prima: 16\u00A0%, AFF), età mediana 42,9 anni (prima: 43, Eurostat), speranza di vita 84,2 anni (prima: 84, Eurostat).",
      de: "Karten der Startseite: Die Zahlen stehen mit den Nachkommastellen der Quelle, wie auf der Seite Statistiken. Kosten des Gesundheitswesens 11,4\u00A0% des BIP (vorher: 11\u00A0%, BFS), Straftaten 61,3 pro 1000 Einwohner (vorher: 61, BFS), Bevölkerung 9,127 Millionen (vorher: 9 Millionen, BFS), Bundesschulden 16,1\u00A0% des BIP (vorher: 16\u00A0%, EFV), Medianalter 42,9 Jahre (vorher: 43, Eurostat), Lebenserwartung 84,2 Jahre (vorher: 84, Eurostat).",
      fr: "Fiches de la page d’accueil\u202F: les chiffres sont indiqués avec les décimales de la source, comme sur la page des statistiques. Coûts de la santé 11,4\u202F% du PIB (auparavant\u202F: 11\u202F%, OFS), infractions 61,3 pour 1000 habitants (auparavant\u202F: 61, OFS), population 9,127 millions (auparavant\u202F: 9 millions, OFS), dette fédérale 16,1\u202F% du PIB (auparavant\u202F: 16\u202F%, AFF), âge médian 42,9 ans (auparavant\u202F: 43, Eurostat), espérance de vie 84,2 ans (auparavant\u202F: 84, Eurostat).",
      en: "Home page cards: the figures are shown with the decimals of the source, as on the statistics page. Healthcare costs 11.4% of GDP (before: 11%, FSO), offences 61.3 per 1,000 inhabitants (before: 61, FSO), population 9.127 million (before: 9 million, FSO), federal debt 16.1% of GDP (before: 16%, FFA), median age 42.9 years (before: 43, Eurostat), life expectancy 84.2 years (before: 84, Eurostat).",
    },
  },
  {
    date: "2026-11-26",
    kind: "correction",
    text: {
      it: "Popolazione a fine 2025: 9\u202F127\u202F125 residenti permanenti, la cifra definitiva dell’UST del 20 agosto 2026 (prima: 9\u202F127\u202F100 nella pagina iniziale e nel quiz). Nel quiz anche la cifra di un anno prima è quella esatta: 9\u202F051\u202F029 (prima: 9\u202F051\u202F000).",
      de: "Bevölkerung Ende 2025: 9\u202F127\u202F125 ständige Einwohnerinnen und Einwohner, die definitive Zahl des BFS vom 20. August 2026 (vorher: 9\u202F127\u202F100 auf der Startseite und im Quiz). Im Quiz ist auch die Zahl des Vorjahres jetzt die genaue: 9\u202F051\u202F029 (vorher: 9\u202F051\u202F000).",
      fr: "Population à fin 2025\u202F: 9\u202F127\u202F125 résidents permanents, le chiffre définitif de l’OFS du 20 août 2026 (auparavant\u202F: 9\u202F127\u202F100 sur la page d’accueil et dans le quiz). Dans le quiz, le chiffre de l’année précédente est aussi le chiffre exact\u202F: 9\u202F051\u202F029 (auparavant\u202F: 9\u202F051\u202F000).",
      en: "Population at the end of 2025: 9,127,125 permanent residents, the FSO's definitive figure of 20 August 2026 (before: 9,127,100 on the home page and in the quiz). In the quiz the figure a year earlier is now the exact one too: 9,051,029 (before: 9,051,000).",
    },
    source: {
      name: { it: "UST, STAT-TAB px-x-0102020000_101", de: "BFS, STAT-TAB px-x-0102020000_101", fr: "OFS, STAT-TAB px-x-0102020000_101", en: "FSO, STAT-TAB px-x-0102020000_101" },
      url: "https://www.pxweb.bfs.admin.ch/pxweb/de/px-x-0102020000_101/",
    },
  },
  {
    date: "2026-11-26",
    kind: "correction",
    text: {
      it: "Inflazione: il testo informativo non dice più che «un’inflazione moderata (1-2\u00A0%) è normale». La BNS considera stabili i prezzi quando l’indice dei prezzi al consumo sale di meno del 2\u00A0% all’anno.",
      de: "Inflation: Der Infotext sagt nicht mehr, «moderate Inflation (1-2\u00A0%) ist normal». Die SNB setzt Preisstabilität einem Anstieg des Landesindex der Konsumentenpreise von weniger als 2\u00A0% pro Jahr gleich.",
      fr: "Inflation\u202F: le texte d’information ne dit plus qu’«\u202Fune inflation modérée (1-2\u202F%) est normale\u202F». La BNS assimile la stabilité des prix à une hausse de l’indice des prix à la consommation de moins de 2\u202F% par an.",
      en: "Inflation: the info text no longer says that 'moderate inflation (1-2%) is normal'. The SNB equates price stability with a rise in the consumer price index of less than 2% a year.",
    },
    source: {
      name: { it: "BNS, strategia di politica monetaria", de: "SNB, geldpolitische Strategie", fr: "BNS, stratégie de politique monétaire", en: "SNB, monetary policy strategy" },
      url: "https://www.snb.ch/en/the-snb/mandates-goals/monetary-policy/strategy",
    },
  },
  {
    date: "2026-11-26",
    kind: "correction",
    text: {
      it: "Cantoni, nota sui confini: anche la quota di stranieri segue i confini del 1° gennaio 2026 (Moutier nel Canton Giura), ricalcolata dai dati STATPOP del 31 dicembre 2025; per Giura e Berna è quindi diversa da quella che l’UST pubblica per i confini del 2025. Il premio di cassa malati è quello del 2026, sui confini del 2026. Prima la nota diceva che solo popolazione e superficie seguono i confini del 2026.",
      de: "Kantone, Hinweis zu den Grenzen: Auch der Ausländeranteil bezieht sich auf die Grenzen vom 1. Januar 2026 (Moutier im Kanton Jura), neu berechnet aus den STATPOP-Zahlen vom 31. Dezember 2025; für Jura und Bern weicht er deshalb vom Anteil ab, den das BFS für die Grenzen von 2025 veröffentlicht. Die Krankenkassenprämie ist jene von 2026, auf den Grenzen von 2026. Vorher sagte der Hinweis, nur Bevölkerung und Fläche bezögen sich auf die Grenzen von 2026.",
      fr: "Cantons, note sur les frontières\u202F: la part d’étrangers se rapporte elle aussi aux frontières du 1er janvier 2026 (Moutier dans le canton du Jura), recalculée à partir des chiffres STATPOP du 31 décembre 2025\u202F; pour le Jura et Berne, elle diffère donc de celle que l’OFS publie pour les frontières de 2025. La prime d’assurance-maladie est celle de 2026, sur les frontières de 2026. Auparavant, la note disait que seules la population et la superficie se rapportent aux frontières de 2026.",
      en: "Cantons, note on the borders: the foreign share also uses the borders of 1 January 2026 (Moutier in the canton of Jura), recomputed from the STATPOP figures of 31 December 2025, so for Jura and Bern it differs from the share the FSO publishes for the 2025 borders. The health premium is the 2026 premium, on the 2026 borders. Before, the note said that only population and area use the 2026 borders.",
    },
    source: {
      name: { it: "UST, STATPOP, STAT-TAB px-x-0102020000_201", de: "BFS, STATPOP, STAT-TAB px-x-0102020000_201", fr: "OFS, STATPOP, STAT-TAB px-x-0102020000_201", en: "FSO, STATPOP, STAT-TAB px-x-0102020000_201" },
      url: "https://www.pxweb.bfs.admin.ch/pxweb/de/px-x-0102020000_201/",
    },
  },
  {
    date: "2026-11-26",
    kind: "correction",
    text: {
      it: "Cantoni: la cifra per tutto il Paese si intitola «Svizzera» (prima: «Media nazionale»). È il tasso della Svizzera, non una media dei Cantoni.",
      de: "Kantone: Die Zahl für das ganze Land heisst «Schweiz» (vorher: «Nationaler Durchschnitt»). Sie ist die Quote der Schweiz, kein Durchschnitt der Kantone.",
      fr: "Cantons\u202F: le chiffre pour l’ensemble du pays s’intitule «\u202FSuisse\u202F» (auparavant\u202F: «\u202FMoyenne nationale\u202F»). C’est le taux de la Suisse, pas une moyenne des cantons.",
      en: "Cantons: the figure for the whole country is headed 'Switzerland' (before: 'National average'). It is the Swiss rate, not an average of the cantons.",
    },
  },
  {
    date: "2026-11-26",
    kind: "correction",
    text: {
      it: "Pagina «Il progetto» e piè di pagina: il punteggio del quiz è il 100\u00A0% meno la distanza tra la stima e il valore reale, in rapporto all’ampiezza del cursore; la pagina parlava di una funzione esponenziale, che il quiz non usa. Il piè di pagina diceva «Dati provenienti da statistiche ufficiali del governo svizzero (UST, SECO, UFSP)»; le cifre vengono anche da Eurostat, dall’OCSE e da altri enti, che la pagina «Il progetto» ora elenca tutti.",
      de: "Seite «Das Projekt» und Fusszeile: Die Punktzahl im Quiz ist 100\u00A0% minus der Abstand zwischen der Schätzung und dem tatsächlichen Wert, gemessen am Bereich des Schiebereglers; die Seite nannte eine exponentielle Funktion, die das Quiz nicht verwendet. Die Fusszeile sagte «Daten aus offiziellen Schweizer Statistiken (BFS, SECO, BAG)»; die Zahlen stammen auch von Eurostat, der OECD und weiteren Stellen, die die Seite «Das Projekt» jetzt alle nennt.",
      fr: "Page «\u202FÀ propos\u202F» et pied de page\u202F: le score du quiz est 100\u202F% moins l’écart entre l’estimation et la valeur réelle, rapporté à l’étendue du curseur\u202F; la page parlait d’une fonction exponentielle, que le quiz n’utilise pas. Le pied de page disait «\u202FDonnées provenant des statistiques officielles du gouvernement suisse (OFS, SECO, OFSP)\u202F»\u202F; les chiffres viennent aussi d’Eurostat, de l’OCDE et d’autres organismes, que la page «\u202FÀ propos\u202F» liste désormais tous.",
      en: "About page and footer: the quiz score is 100% minus the distance between the guess and the actual value, as a share of the slider's range; the page spoke of an exponential function, which the quiz does not use. The footer said 'Data sourced from official Swiss government statistics (BFS, SECO, BAG)'; the figures also come from Eurostat, the OECD and other bodies, which the About page now lists in full.",
    },
  },
  {
    date: "2026-11-12",
    kind: "correction",
    text: {
      it: "Verifica completa delle cifre sulle fonti ufficiali. Indicatori: valore, valore precedente e serie dalle tabelle ufficiali correnti; tolti gli anni senza una cifra pubblicata (296 punti dati invece di 317). Cantoni: cifre generate dalle tabelle di UST, SECO e UFSP, un anno di riferimento per indicatore, con anno e fonte sulla pagina. Quiz: risposte e confronti verificati, una fonte per confronto; 47 delle 53 domande indicano ora l’anno (prima: 2). Il grafico del preventivo federale è sostituito da un link al sito sulla spesa pubblica.",
      de: "Vollständige Prüfung der Zahlen an den amtlichen Quellen. Indikatoren: Wert, Vorjahreswert und Reihe aus den aktuellen amtlichen Tabellen; Jahre ohne veröffentlichte Zahl entfernt (296 Datenpunkte statt 317). Kantone: Zahlen aus Tabellen von BFS, SECO und BAG erzeugt, ein Referenzjahr pro Indikator, mit Jahr und Quelle auf der Seite. Quiz: Antworten und Vergleiche geprüft, eine Quelle pro Vergleich; 47 der 53 Fragen nennen jetzt das Jahr (vorher: 2). Die Grafik zum Bundesbudget ist durch einen Link auf die Website zu den öffentlichen Ausgaben ersetzt.",
      fr: "Vérification complète des chiffres auprès des sources officielles. Indicateurs\u202F: valeur, valeur précédente et série tirées des tableaux officiels actuels\u202F; les années sans chiffre publié ont été retirées (296 points de données au lieu de 317). Cantons\u202F: chiffres générés à partir des tableaux de l’OFS, du SECO et de l’OFSP, une année de référence par indicateur, avec l’année et la source sur la page. Quiz\u202F: réponses et comparaisons vérifiées, une source par comparaison\u202F; 47 des 53 questions indiquent désormais l’année (auparavant\u202F: 2). Le graphique du budget fédéral est remplacé par un lien vers le site des dépenses publiques.",
      en: "Full check of the figures against the official sources. Indicators: value, previous value and series from the current official tables; years without a published figure were removed (296 data points instead of 317). Cantons: figures generated from FSO, SECO and FOPH tables, one reference year per indicator, with year and source on the page. Quiz: answers and comparisons checked, one source per comparison; 47 of the 53 questions now state their year (before: 2). The federal budget chart was replaced by a link to the public spending site.",
    },
  },
];
