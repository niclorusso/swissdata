import { LocalizedText } from "@/types";

/**
 * Dated changes to the figures and texts of the site, newest first. Shown on the page "Data changes"
 * (/it/changes, /de/changes, /fr/changes, /en/changes). A full check of the data also moves
 * DATA_CHECKED in src/data/meta.ts.
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
      it: "Spesa pubblica per l’istruzione: la serie viene ora dalla tabella UST T 15.06.01.03, con un valore per ogni anno dal 2000 al 2023. Ultimo dato: 5,5\u00A0% del PIL nel 2023 (prima: 5,6\u00A0% nel 2022, provvisorio). Aggiornata anche la domanda del quiz.",
      de: "Öffentliche Bildungsausgaben: Die Reihe stammt jetzt aus der BFS-Tabelle T 15.06.01.03, mit einem Wert für jedes Jahr von 2000 bis 2023. Letzter Wert: 5,5\u00A0% des BIP im Jahr 2023 (vorher: 5,6\u00A0% für 2022, provisorisch). Auch die Quizfrage ist angepasst.",
      fr: "Dépenses publiques d’éducation\u202F: la série provient désormais du tableau OFS T 15.06.01.03, avec une valeur pour chaque année de 2000 à 2023. Dernière valeur\u202F: 5,5\u202F% du PIB en 2023 (auparavant\u202F: 5,6\u202F% pour 2022, provisoire). La question du quiz est aussi mise à jour.",
      en: "Public spending on education: the series now comes from FSO table T 15.06.01.03, with a figure for every year from 2000 to 2023. Latest figure: 5.5% of GDP in 2023 (before: 5.6% for 2022, provisional). The quiz question was updated as well.",
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
        it: "Debito pubblico lordo (definizione FMI): 40,1\u00A0% del PIL nel 2025 (prima: 40,2\u00A0%), AFF, dati del 22 settembre 2026.",
        de: "Bruttoschulden des Staates (Definition des IWF): 40,1\u00A0% des BIP im Jahr 2025 (vorher: 40,2\u00A0%), EFV, Daten vom 22. September 2026.",
        fr: "Dette publique brute (définition du FMI)\u202F: 40,1\u202F% du PIB en 2025 (auparavant\u202F: 40,2\u202F%), AFF, données du 22 septembre 2026.",
        en: "Gross public debt (IMF definition): 40.1% of GDP in 2025 (before: 40.2%), FFA, data of 22 September 2026.",
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
        it: "Difesa: la domanda indica il preventivo 2026 e il grafico la spesa militare in % del PIL secondo il SIPRI (2025). Tolto il riferimento all’obiettivo NATO del 2\u00A0% del PIL: dal vertice dell’Aia del 2025 l’impegno è del 5\u00A0% entro il 2035.",
        de: "Verteidigung: Die Frage nennt den Voranschlag 2026, die Grafik die Militärausgaben in % des BIP gemäss SIPRI (2025). Der Hinweis auf das NATO-Ziel von 2\u00A0% des BIP ist entfernt: Seit dem Gipfel von Den Haag 2025 gilt die Zusage von 5\u00A0% bis 2035.",
        fr: "Défense\u202F: la question indique le budget 2026 et le graphique les dépenses militaires en % du PIB selon le SIPRI (2025). La mention de l’objectif de l’OTAN de 2\u202F% du PIB est retirée\u202F: depuis le sommet de La Haye de 2025, l’engagement est de 5\u202F% d’ici 2035.",
        en: "Defence: the question names the 2026 budget and the chart shows military spending in % of GDP according to SIPRI (2025). The reference to NATO's 2% of GDP guideline was removed: since the 2025 Hague summit the commitment is 5% by 2035.",
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
      it: "Variazioni percentuali rispetto all’anno precedente ricalcolate dai valori non arrotondati delle fonti: disoccupazione ILO da +11,6 a +11,5\u00A0%, disoccupazione registrata da +16,7 a +18,8\u00A0%, crescita del PIL da +6,7 a +6,1\u00A0%, costi della sanità da +1,8 a +1,7\u00A0%, spesa per l’istruzione da +5,8 a +4,7\u00A0%, tasso di povertà da +3,7 a +3,9\u00A0%. Per i tassi il sito indica ora la differenza in punti.",
      de: "Prozentuale Veränderungen gegenüber dem Vorjahr aus den ungerundeten Werten der Quellen neu berechnet: Erwerbslosenquote gemäss ILO von +11,6 auf +11,5\u00A0%, registrierte Arbeitslosigkeit von +16,7 auf +18,8\u00A0%, BIP-Wachstum von +6,7 auf +6,1\u00A0%, Kosten des Gesundheitswesens von +1,8 auf +1,7\u00A0%, Bildungsausgaben von +5,8 auf +4,7\u00A0%, Armutsquote von +3,7 auf +3,9\u00A0%. Bei Quoten zeigt die Website jetzt die Differenz in Prozentpunkten.",
      fr: "Variations en pourcentage par rapport à l’année précédente recalculées à partir des valeurs non arrondies des sources\u202F: chômage au sens du BIT de +11,6 à +11,5\u202F%, chômage enregistré de +16,7 à +18,8\u202F%, croissance du PIB de +6,7 à +6,1\u202F%, coûts de la santé de +1,8 à +1,7\u202F%, dépenses d’éducation de +5,8 à +4,7\u202F%, taux de pauvreté de +3,7 à +3,9\u202F%. Pour les taux, le site indique désormais l’écart en points.",
      en: "Percentage changes from the previous year recomputed from the sources' unrounded values: ILO unemployment from +11.6 to +11.5%, registered unemployment from +16.7 to +18.8%, GDP growth from +6.7 to +6.1%, healthcare costs from +1.8 to +1.7%, education spending from +5.8 to +4.7%, poverty rate from +3.7 to +3.9%. For rates the site now shows the difference in points.",
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
      it: "Elettricità rinnovabile: il 68,3\u00A0% è la quota della produzione netta (produzione meno il consumo delle pompe di accumulazione), mentre il 55,5\u00A0% dell’idroelettrico e l'11,8\u00A0% del fotovoltaico sono quote della produzione lorda (UFE, 2025). Prima i testi le riferivano tutte alla stessa produzione.",
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
      it: "Link alle fonti: tre link del quiz non funzionavano più e tredici link dell’UST portavano alla pagina di scelta della lingua; ora ognuno porta alla tabella o al comunicato con la cifra. Il debito della Confederazione rimanda alla statistica tascabile «Finanze pubbliche 2025» dell’AFF, le domande su difesa e migrazione al preventivo 2027 dell’AFF (volume 1, colonna del preventivo 2026). Il rapporto annuale delle FFS, non più raggiungibile, è sostituito dal rapporto breve del Consiglio federale sulle FFS 2025.",
      de: "Links zu den Quellen: Drei Links im Quiz funktionierten nicht mehr, und dreizehn Links des BFS führten auf die Seite zur Sprachwahl; jetzt führt jeder zur Tabelle oder Mitteilung mit der Zahl. Die Bundesschulden verweisen auf die Taschenstatistik «Öffentliche Finanzen 2025» der EFV, die Fragen zu Verteidigung und Migration auf den Voranschlag 2027 der EFV (Band 1, Spalte des Voranschlags 2026). Der nicht mehr erreichbare Geschäftsbericht der SBB ist durch den Kurzbericht des Bundesrates zur SBB 2025 ersetzt.",
      fr: "Liens vers les sources\u202F: trois liens du quiz ne fonctionnaient plus et treize liens de l’OFS menaient à la page de choix de la langue\u202F; chacun mène désormais au tableau ou au communiqué qui contient le chiffre. La dette de la Confédération renvoie à la statistique de poche «\u202FFinances publiques 2025\u202F» de l’AFF, les questions sur la défense et la migration au budget 2027 de l’AFF (volume 1, colonne du budget 2026). Le rapport de gestion des CFF, qui n’est plus accessible, est remplacé par le rapport succinct du Conseil fédéral sur les CFF 2025.",
      en: "Links to sources: three quiz links no longer worked and thirteen FSO links led to the language choice page; each now leads to the table or release with the figure. Federal debt links to the FFA pocket statistics 'Public finances 2025', the defence and migration questions to the FFA's 2027 budget (volume 1, column of the 2026 budget). The SBB annual report, no longer available, is replaced by the Federal Council's short report on SBB 2025.",
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
      it: "Quiz: le domande sull’oro della BNS, sul preventivo per la migrazione e sull’apprendistato indicano ora l’anno. La risposta sul tragitto casa-lavoro indica anche il mezzo di trasporto principale nel 2024: auto 49,4\u00A0%, treno 17,1\u00A0%, bus o tram 13,6\u00A0% dei 3,7 milioni di pendolari (UST, T 11.4.4.4).",
      de: "Quiz: Die Fragen zum Gold der SNB, zum Migrationsbudget und zur Berufslehre nennen jetzt das Jahr. Die Antwort zum Arbeitsweg nennt auch das Hauptverkehrsmittel 2024: Auto 49,4\u00A0%, Zug 17,1\u00A0%, Bus oder Tram 13,6\u00A0% der 3,7 Millionen Pendlerinnen und Pendler (BFS, T 11.4.4.4).",
      fr: "Quiz\u202F: les questions sur l’or de la BNS, le budget de la migration et l’apprentissage indiquent désormais l’année. La réponse sur le trajet domicile-travail indique aussi le moyen de transport principal en 2024\u202F: voiture 49,4\u202F%, train 17,1\u202F%, bus ou tram 13,6\u202F% des 3,7 millions de pendulaires (OFS, T 11.4.4.4).",
      en: "Quiz: the questions on the SNB's gold, the migration budget and apprenticeships now state their year. The commute answer also gives the main means of transport in 2024: car 49.4%, train 17.1%, bus or tram 13.6% of the 3.7 million commuters (FSO, T 11.4.4.4).",
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
];
