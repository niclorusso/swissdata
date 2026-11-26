import { Locale } from "./translations";

// Italian translations for indicator data fields
const indicatorTranslationsIT: Record<
  string,
  { name: string; shortName: string; description: string; context: string }
> = {
  "unemployment-rate-ilo": {
    name: "Tasso di disoccupazione (ILO)",
    shortName: "Disoccupazione (ILO)",
    description: "Tasso di disoccupazione secondo la definizione ILO: persone senza lavoro, in cerca attiva e disponibili, iscritte o no a un URC (media annua)",
    context: "È il tasso usato per i confronti internazionali. Nel 2025 era al 4,8\u00A0%, contro il 4,3\u00A0% del 2024.",
  },
  "unemployment-rate": {
    name: "Tasso di disoccupazione (SECO)",
    shortName: "Disoccupazione",
    description: "Disoccupati iscritti agli URC (Uffici regionali di collocamento) in rapporto alla popolazione attiva (media annua)",
    context: "Il tasso SECO conta solo le persone iscritte come disoccupate a un URC, perciò è più basso del tasso ILO (2025: 2,8\u00A0% contro 4,8\u00A0%).",
  },
  "gdp-growth-rate": {
    name: "Tasso di crescita del PIL",
    shortName: "Crescita PIL",
    description: "Tasso di crescita annuale del PIL reale (ai prezzi dell'anno precedente)",
    context: "Prima stima dell'UST per il 2025, pubblicata il 25 agosto 2026. La crescita del 2024 è stata rivista dall'1,4\u00A0% all'1,5\u00A0%.",
  },
  "gdp-growth": {
    name: "Tasso di crescita del PIL",
    shortName: "Crescita del PIL",
    description: "Tasso di crescita annuale del PIL (reale)",
    context:
      "La Svizzera mantiene una crescita costante nonostante le incertezze globali.",
  },
  "inflation-rate": {
    name: "Tasso d'inflazione (IPC)",
    shortName: "Inflazione",
    description: "Rincaro medio annuo secondo l'Indice dei prezzi al consumo",
    context: "Il rincaro medio annuo è sceso dal 2,8\u00A0% del 2022 allo 0,2\u00A0% del 2025.",
  },
  "average-wage": {
    name: "Salario mensile mediano (lordo)",
    shortName: "Salario mediano",
    description: "Salario mensile lordo mediano per un posto a tempo pieno, settore privato e pubblico insieme. La rilevazione si fa ogni due anni.",
    context: "Il salario mediano è passato da 6788\u00A0franchi nel 2022 a 7024\u00A0franchi nel 2024 (+3,5\u00A0%). Metà dei dipendenti guadagna di più, metà di meno.",
  },
  "federal-debt-gdp": {
    name: "Debito federale (% del PIL)",
    shortName: "Debito federale",
    description:
      "Debito netto della Confederazione in percentuale del PIL (esclusi Cantoni/Comuni)",
    context:
      "Questa cifra è gestita dal 'freno all'indebitamento'. Il debito netto è salito da 103\u00A0mld CHF (2019) a 142\u00A0mld CHF (2023) con le spese pandemiche ed era di 140\u00A0mld CHF a fine 2025.",
  },
  "public-debt": {
    name: "Debito pubblico (% del PIL)",
    shortName: "Debito pubblico",
    description:
      "Debito pubblico totale in percentuale del PIL",
    context:
      "La Svizzera ha uno dei rapporti debito/PIL più bassi tra i paesi sviluppati.",
  },
  "housing-price-index": {
    name: "Indice dei prezzi immobiliari (Q4 2019=100)",
    shortName: "Prezzi immobiliari",
    description: "Indice ufficiale per case unifamiliari e appartamenti di proprietà, media annua (IMPI, base Q4 2019 = 100)",
    context: "Nel 2025 i prezzi delle abitazioni di proprietà sono saliti in media del 4,6\u00A0%, dopo l'1,7\u00A0% del 2024 e il 2,2\u00A0% del 2023. L'indice esiste dal 2017.",
  },
  "foreign-population": {
    name: "Popolazione residente straniera",
    shortName: "Residenti stranieri",
    description: "Percentuale di residenti permanenti senza cittadinanza svizzera (31 dicembre)",
    context: "A fine 2025 la Svizzera contava 9\u202F127\u202F100 residenti permanenti, di cui 2\u202F528\u202F100 stranieri. I gruppi più numerosi sono italiani, tedeschi, portoghesi e francesi.",
  },
  "population-total": {
    name: "Popolazione totale",
    shortName: "Popolazione",
    description: "Popolazione residente permanente al 31 dicembre (in milioni)",
    context: "A fine 2025 la Svizzera contava 9\u202F127\u202F100 residenti permanenti, lo 0,8\u00A0% in più rispetto a un anno prima (9\u202F051\u202F029). La soglia dei 9\u00A0milioni è stata superata nel corso del 2024: a fine 2023 i residenti erano 8\u202F962\u202F258.",
  },
  "median-age": {
    name: "Età mediana",
    shortName: "Età mediana",
    description: "Età mediana della popolazione residente al 1° gennaio",
    context: "L'età mediana è salita da 31,5 anni nel 1965 a 42,9 nel 2025. Al 1° gennaio 2025 era di 45,5 anni in Germania, 49,1 in Italia e 44,9 nell'UE.",
  },
  "life-expectancy": {
    name: "Speranza di vita alla nascita",
    shortName: "Speranza di vita",
    description: "Speranza di vita alla nascita, entrambi i sessi",
    context: "Nel 2024 la speranza di vita alla nascita era di 82,4 anni per gli uomini e 85,9 per le donne. Dati dell'UST per il 2025: 82,7 e 86,3 (pubblicati come provvisori il 18 giugno 2026; la tabella dell'UST del 24 settembre 2026 riporta gli stessi valori). Dopo il calo del 2020 (83,1) il valore complessivo è dal 2023 sopra il livello del 2019 (83,8).",
  },
  "crime-rate-per-1000": {
    name: "Reati del Codice penale per 1000 abitanti",
    shortName: "Reati del Codice penale",
    description: "Reati secondo il Codice penale svizzero (CP) registrati dalla polizia per 1000 residenti permanenti",
    context: "Nel 2025 la polizia ha registrato 554\u202F963 reati secondo il Codice penale, l'1,5\u00A0% in meno rispetto al 2024, dopo tre anni di aumento. I reati contro il patrimonio sono diminuiti del 3,5\u00A0%, i reati violenti gravi sono aumentati dell'8,1\u00A0%. Gli omicidi consumati sono stati 55 (0,6 ogni 100\u202F000 residenti) e i reati commessi con modalità digitali 57\u202F761.",
  },
  "crime-rate": {
    name: "Tasso di criminalità",
    shortName: "Criminalità",
    description:
      "Reati penali registrati ogni 100\u202F000 abitanti",
    context:
      "I reati violenti rappresentano solo circa il 5\u00A0% di tutti i reati. La maggior parte riguarda il patrimonio.",
  },
  "healthcare-cost": {
    name: "Costi della sanità (% del PIL)",
    shortName: "Costi della sanità",
    description: "Costi del sistema sanitario in percentuale del prodotto interno lordo",
    context: "Nel 2024 il sistema sanitario è costato 97,2\u00A0miliardi di franchi (dato provvisorio), il 4,1\u00A0% in più rispetto al 2023, cioè 899\u00A0franchi al mese per persona. In rapporto al PIL la Svizzera (11,4\u00A0%) è sotto Germania (12,2\u00A0%) e Austria (11,7\u00A0%), allo stesso livello della Francia (11,3\u00A0%) e sopra l'Italia (8,5\u00A0%) (OCSE, 2024).",
  },
  "education-spending": {
    name: "Spesa per l'istruzione (% del PIL)",
    shortName: "Istruzione",
    description:
      "Spesa pubblica per l'istruzione in percentuale del PIL",
    context:
      "Nel 2023 Confederazione, Cantoni e Comuni hanno speso 45,5\u00A0miliardi di franchi per l'istruzione, il 18,1\u00A0% della spesa pubblica totale e il 5,5\u00A0% del PIL (2022: 42,7\u00A0miliardi di franchi, 5,2\u00A0%).",
  },
  "poverty-rate": {
    name: "Tasso di povertà (assoluta)",
    shortName: "Tasso di povertà",
    description: "Tasso di povertà (assoluta): quota della popolazione con un reddito inferiore alla soglia di povertà",
    context: "Nel 2024 l'8,4\u00A0% della popolazione, circa 743\u202F000 persone, era in povertà reddituale. La soglia di povertà era di 2388\u00A0franchi al mese per una persona sola e di 4159\u00A0franchi per due adulti con due figli. Il tasso di rischio di povertà è una misura distinta (reddito inferiore al 60\u00A0% della mediana): 16,4\u00A0%, circa 1\u202F451\u202F000 persone. I dati precedenti al 2014 non sono confrontabili.",
  },
  "renewable-energy": {
    name: "Quota rinnovabile del consumo finale di energia",
    shortName: "Rinnovabili (consumo finale di energia)",
    description: "Quota di energia rinnovabile sul consumo finale totale di energia",
    context: "La quota rinnovabile del consumo finale di energia è scesa al 25,7\u00A0% nel 2022 e da allora è aumentata ogni anno. Nel 2025 era rinnovabile il 68,3\u00A0% della produzione netta di elettricità (produzione meno il consumo delle pompe di accumulazione). Della produzione lorda, l'idroelettrico ha fornito il 55,5\u00A0% e il fotovoltaico l'11,8\u00A0%.",
  },
};

// Italian translations for quiz question fields
const questionTranslationsIT: Record<
  string,
  { question: string; explanation: string; comparisonLabel?: string }
> = {
  "unemployment-rate": {
    question:
      "Qual era il tasso di disoccupazione registrato in Svizzera nel 2025 (SECO, media annua)?",
    explanation:
      "Nel 2025 il tasso di disoccupazione registrato è stato in media del 2,8\u00A0%, contro il 2,4\u00A0% del 2024 (SECO). Conta solo le persone iscritte a un ufficio regionale di collocamento. Il grafico usa la definizione ILO, basata su un'indagine e confrontabile tra Paesi: con questa misura la Svizzera era al 4,9\u00A0% nel 2025 e l'UE al 6,0\u00A0% (Eurostat).",
    comparisonLabel: "Tasso di disoccupazione ILO, 2025, in % (Eurostat; la risposta è il tasso SECO dei disoccupati iscritti)",
  },
  "youth-unemployment": {
    question:
      "Qual era il tasso di disoccupazione giovanile (15-24 anni, definizione ILO) in Svizzera nel 2025?",
    explanation:
      "Nel 2025 la disoccupazione giovanile secondo la definizione ILO era dell'8,8\u00A0% (2024: 8,2\u00A0%), più alta del tasso per tutte le età (4,9\u00A0%) ma molto sotto la media UE del 15,2\u00A0%. Fonte: rilevazione sulle forze di lavoro dell'UST, pubblicata da Eurostat.",
    comparisonLabel: "Tasso di disoccupazione giovanile (ILO, 15-24 anni), 2025, in % (Eurostat)",
  },
  "labor-participation": {
    question:
      "Qual era il tasso di attività in Svizzera (15-64 anni) nel 2025?",
    explanation:
      "Nel 2025 l'84,1\u00A0% delle persone tra 15 e 64 anni in Svizzera lavorava o cercava lavoro, contro il 75,6\u00A0% nell'UE. Tra le donne il tasso era dell'80,8\u00A0%. Fonte: rilevazione sulle forze di lavoro dell'UST, pubblicata da Eurostat.",
    comparisonLabel: "Tasso di attività, 15-64 anni, 2025, in % (Eurostat)",
  },
  "part-time-rate": {
    question:
      "Quale percentuale degli occupati in Svizzera lavorava a tempo parziale nel 2025 (15-64 anni, definizione Eurostat)?",
    explanation:
      "Nel 2025 il 39,8\u00A0% degli occupati tra 15 e 64 anni in Svizzera lavorava a tempo parziale, la seconda quota più alta del confronto dopo i Paesi Bassi (42,2\u00A0%). La media UE era del 17,7\u00A0%. Tra le donne occupate in Svizzera la quota era del 61,3\u00A0%. È la definizione di Eurostat, che conta chi dichiara di lavorare a tempo parziale (fonte: rilevazione sulle forze di lavoro dell'UST, pubblicata da Eurostat). La definizione dell'UST conta invece tutti gli occupati dai 15 anni in su con un grado d'occupazione inferiore al 90\u00A0% e dà il 38,7\u00A0% per il 2025.",
    comparisonLabel: "Quota di occupati a tempo parziale, 15-64 anni, 2025, in % (Eurostat)",
  },
  "weekly-work-hours": {
    question:
      "Quante ore alla settimana hanno effettivamente lavorato i dipendenti a tempo pieno in Svizzera nel 2025?",
    explanation:
      "Nel 2025 i dipendenti a tempo pieno in Svizzera hanno lavorato effettivamente 40\u00A0ore e 3\u00A0minuti alla settimana (2019: 40\u00A0ore e 54\u00A0minuti), secondo la statistica del volume di lavoro dell'UST. Il grafico usa un'altra misura, l'unica disponibile per tutti i Paesi: le ore settimanali abituali degli occupati a tempo pieno (Eurostat, 2025), con la Svizzera a 43,2\u00A0ore e l'UE a 40,2.",
    comparisonLabel: "Ore settimanali abituali degli occupati a tempo pieno, 2025 (Eurostat; la risposta sono le ore effettive dei dipendenti a tempo pieno, UST)",
  },
  "purchasing-power-rank": {
    question:
      "In che posizione era la Svizzera tra i Paesi OCSE per salario medio annuo a parità di potere d'acquisto nel 2025?",
    explanation:
      "A parità di potere d'acquisto, nel 2025 il salario medio annuo in Svizzera era di 92\u202F285\u00A0dollari: secondo posto tra i 33 Paesi OCSE con un dato per il 2025, dietro al Lussemburgo (98\u202F530\u00A0dollari) e davanti agli Stati Uniti (86\u202F977\u00A0dollari). Il grafico mostra la posizione dei primi otto di questi Paesi. Per l'Islanda, quarta nel 2024, il dato del 2025 non c'è ancora.",
    comparisonLabel: "Posizione per salario medio annuo a parità di potere d'acquisto, 2025 (OCSE)",
  },
  "median-salary": {
    question:
      "Qual era il salario mediano lordo mensile in Svizzera nel 2024 (tempo pieno)?",
    explanation:
      "Nel 2024 il salario mediano lordo per un posto a tempo pieno era di 7024\u00A0franchi al mese (2022: 6788\u00A0franchi), secondo la rilevazione della struttura dei salari dell'UST. Metà dei dipendenti guadagna di più, metà di meno. Tra le grandi regioni, Zurigo era la più alta con 7502\u00A0franchi e il Ticino la più bassa con 5708\u00A0franchi.",
    comparisonLabel: "Salario mediano lordo mensile, tempo pieno, 2024, in CHF (UST)",
  },
  "gender-pay-gap": {
    question:
      "Di quale percentuale il salario medio delle donne era inferiore a quello degli uomini in Svizzera nel 2024?",
    explanation:
      "Nel 2024 le donne hanno guadagnato in media il 15,7\u00A0% in meno degli uomini nell'insieme dell'economia (2022: 16,2\u00A0%), secondo la rilevazione della struttura dei salari dell'UST. La parte non spiegata da fattori come professione, settore o formazione era il 6,5\u00A0% del salario, cioè 640\u00A0franchi al mese. Sul salario mediano la differenza era dell'8,4\u00A0%. Il grafico usa l'indicatore Eurostat per il 2024 (salario orario, senza amministrazione pubblica), con la Svizzera al 16,0\u00A0%. Da luglio 2020 i datori di lavoro con 100 o più dipendenti devono svolgere un'analisi della parità salariale.",
    comparisonLabel: "Divario salariale tra donne e uomini sul salario orario, senza amministrazione pubblica, 2024, in % (definizione Eurostat; la risposta è il dato UST per l'insieme dell'economia)",
  },
  "gini-coefficient": {
    question:
      "Qual era il coefficiente di Gini del reddito disponibile in Svizzera nel 2024 (indice di disuguaglianza, 0-100)?",
    explanation:
      "Nel 2024 il coefficiente di Gini del reddito disponibile equivalente in Svizzera era 31,0 (2023: 31,5), poco sopra la media UE di 29,4 e vicino a Francia (30,0) e Germania (29,5). Il valore 0 significa che tutti hanno lo stesso reddito, 100 che una sola persona ha tutto. Fonte: indagine SILC dell'UST, pubblicata da Eurostat.",
    comparisonLabel: "Coefficiente di Gini del reddito disponibile, 2024 (Eurostat)",
  },
  "snb-shock": {
    question:
      "Di quale percentuale è sceso l'euro rispetto al franco il 15 gennaio 2015 (tasso di riferimento BCE), quando la BNS ha abolito il cambio minimo?",
    explanation:
      "Il 15 gennaio 2015 la Banca nazionale svizzera ha abolito il cambio minimo di 1.20\u00A0franchi per euro e ha abbassato il tasso d'interesse a \u22120,75\u00A0%. Il tasso di riferimento della BCE è sceso da 1.2010 il 14 gennaio a 1.0280 il 15 gennaio: un calo del 14,4\u00A0%. Nei giorni seguenti è sceso ancora, fino a 0.9816 il 23 gennaio (\u221218,3\u00A0% rispetto al 14 gennaio).",
    comparisonLabel: "Calo dell'euro rispetto al franco in confronto al 14 gennaio 2015, in % (tassi di riferimento BCE)",
  },
  "export-gdp-share": {
    question:
      "A quale percentuale del PIL corrispondevano le esportazioni svizzere di beni e servizi nel 2025?",
    explanation:
      "Nel 2025 le esportazioni di beni e servizi corrispondevano al 78,1\u00A0% del PIL svizzero (2024: 71,2\u00A0%), secondo i dati di contabilità nazionale pubblicati dalla Banca mondiale. Le esportazioni sono contate al valore di vendita intero, il PIL solo al valore aggiunto: per questo il rapporto può superare il 100\u00A0%, come a Singapore e in Irlanda.",
    comparisonLabel: "Esportazioni di beni e servizi in % del PIL, 2025 (Banca mondiale)",
  },
  "snb-gold-reserves": {
    question:
      "Quante tonnellate d'oro possedeva la Banca nazionale svizzera a settembre 2026?",
    explanation:
      "La BNS possiede 1040\u00A0tonnellate d'oro (1039,9 nei dati del FMI per settembre 2026). Nella tabella del World Gold Council di febbraio 2026 era l'ottava riserva ufficiale, contando anche il FMI. Circa il 70\u00A0% è custodito in Svizzera, il 20\u00A0% presso la Banca d'Inghilterra e il 10\u00A0% presso la Banca del Canada. Nel 2014 il popolo ha respinto un'iniziativa che avrebbe obbligato la BNS a tenere in oro almeno il 20\u00A0% dei suoi attivi. Il grafico mostra i dati del FMI per settembre e ottobre 2026 (Russia: novembre 2025, ultimo mese presente nei dati del FMI): la riserva della Cina ora supera quella della Russia.",
    comparisonLabel: "Riserve ufficiali d'oro in tonnellate, settembre-ottobre 2026 (FMI)",
  },
  "wealth-managed": {
    question:
      "Quanto patrimonio transfrontaliero di clienti privati era gestito in Svizzera nel 2025 (miliardi di franchi)?",
    explanation:
      "Nel 2025 le banche in Svizzera gestivano 2358\u00A0miliardi di franchi di patrimoni transfrontalieri di clienti privati, secondo il Barometro bancario 2026 dell'Associazione svizzera dei banchieri, che indica la Svizzera tra le principali piazze mondiali in questo settore. Il totale dei patrimoni gestiti dalle banche in Svizzera era di 9729\u00A0miliardi di franchi a fine 2025.",
    comparisonLabel: "Patrimoni gestiti dalle banche in Svizzera, 2025, in miliardi di CHF (Associazione svizzera dei banchieri)",
  },
  "number-of-banks": {
    question:
      "Quante banche c'erano in Svizzera alla fine del 2025?",
    explanation:
      "A fine 2025 la Svizzera aveva 225 banche (2024: 230), contro 375 nel 2000 e 275 nel 2014 (BNS). Il totale del 2025 comprende 24 banche cantonali, 2 grandi banche, 58 banche regionali e casse di risparmio, il gruppo Raiffeisen (contato una volta), 37 banche borsistiche, 15 altri istituti bancari, 5 banchieri privati, 61 banche in mani straniere e 22 succursali di banche estere.",
    comparisonLabel: "Numero di banche in Svizzera a fine anno (BNS)",
  },
  "asylum-budget": {
    question:
      "Quale percentuale del preventivo federale 2026 è destinata alla migrazione (asilo, rifugiati, integrazione)?",
    explanation:
      "Il settore «Migrazione» vale circa il 4,1\u00A0% del preventivo federale 2026 (3,75\u00A0miliardi di CHF su 91,1\u00A0miliardi). La maggior parte è versata ai Cantoni per l'aiuto sociale a richiedenti l'asilo e rifugiati. Per confronto, la sicurezza assorbe l'8,6\u00A0%, formazione e ricerca il 9,9\u00A0% e i trasporti l'11,8\u00A0%.",
    comparisonLabel: "Principali settori di compito in % del preventivo federale 2026 (Amministrazione federale delle finanze)",
  },
  "public-debt-gdp": {
    question: "Qual era il debito pubblico svizzero in percentuale del PIL nel 2025 (debito lordo, definizione FMI)?",
    explanation:
      "Secondo la definizione di debito lordo del FMI, il debito di Confederazione, Cantoni, Comuni e assicurazioni sociali insieme era il 40,1\u00A0% del PIL nel 2025 (stima dell'Amministrazione federale delle finanze, settembre 2026), uno dei più bassi tra i paesi sviluppati. Secondo la definizione di Maastricht, più ristretta e usata nell'UE, era il 23,4\u00A0%. La norma costituzionale del 'freno all'indebitamento', in vigore dal 2003, impone bilanci federali in pareggio nell'arco del ciclo economico.",
    comparisonLabel: "Debito pubblico lordo in % del PIL, 2025 (AFF; altri Paesi da OECD Economic Outlook 119)",
  },
  "tax-revenue-gdp": {
    question:
      "A quale percentuale del PIL corrispondevano le entrate fiscali totali della Svizzera nel 2024?",
    explanation:
      "Nel 2024 imposte e contributi sociali corrispondevano al 27,2\u00A0% del PIL in Svizzera (dato provvisorio; 2023: 26,9\u00A0%), contro una media OCSE del 34,1\u00A0%. Fonte: OCSE, Revenue Statistics 2025. I premi dell'assicurazione malattia obbligatoria sono pagati ad assicuratori privati e non sono contati in questa cifra.",
    comparisonLabel: "Imposte e contributi sociali in % del PIL, 2024 (OCSE, Revenue Statistics 2025)",
  },
  "defense-spending": {
    question:
      "Quale percentuale del preventivo federale 2026 è destinata alla difesa militare?",
    explanation:
      "La difesa militare è circa il 7,2\u00A0% del preventivo federale 2026 (6,6\u00A0miliardi di CHF su 91,1\u00A0miliardi). L'intero settore «sicurezza», che aggiunge polizia, servizio informazioni e protezione della popolazione, è l'8,6\u00A0% (7,8\u00A0miliardi). Il grafico usa un'altra misura, l'unica disponibile per tutti i Paesi: la spesa militare in rapporto al PIL nel 2025 secondo il SIPRI, che per la Svizzera indica lo 0,8\u00A0%.",
    comparisonLabel: "Spesa militare in % del PIL, 2025 (SIPRI)",
  },
  "gdp-growth-years": {
    question:
      "In quanti dei 10 anni dal 2016 al 2025 il PIL reale della Svizzera è cresciuto?",
    explanation:
      "Il PIL reale svizzero è cresciuto in 9 dei 10 anni dal 2016 al 2025. L'unica eccezione è il 2020, quando è sceso del 2,3\u00A0%. La crescita è stata dell'1,5\u00A0% nel 2024 e dell'1,6\u00A0% nel 2025 (Ufficio federale di statistica, contabilità nazionale del 25 agosto 2026). Il confronto usa i dati Eurostat.",
    comparisonLabel: "Anni con crescita del PIL reale su dieci, 2016-2025 (Eurostat)",
  },
  "population-density": {
    question:
      "Qual è la densità di popolazione della Svizzera (abitanti per km² di superficie terrestre, 2024)?",
    explanation:
      "Nel 2024 la Svizzera contava 226 abitanti per km² di superficie terrestre, secondo Eurostat. È circa il doppio della densità di Austria o Francia e meno della metà di quella dei Paesi Bassi.",
    comparisonLabel: "Abitanti per km² di superficie terrestre, 2024 (Eurostat)",
  },
  "total-population": {
    question:
      "Quanti abitanti contava la popolazione residente permanente della Svizzera alla fine del 2025 (in milioni)?",
    explanation:
      "Alla fine del 2025 la Svizzera contava 9\u202F127\u202F100 residenti permanenti (Ufficio federale di statistica), contro 9\u202F051\u202F000 un anno prima. Nel 1950 erano 4,7\u00A0milioni. Il confronto riporta i dati Eurostat al 1° gennaio 2026.",
    comparisonLabel: "Popolazione al 1° gennaio 2026, in milioni (Eurostat)",
  },
  "urban-population": {
    question:
      "Quale percentuale della popolazione svizzera viveva in aree urbane nel 2025 (tipologia urbano/rurale dell'UST)?",
    explanation:
      "Alla fine del 2025, 7,88\u00A0milioni dei 9,13\u00A0milioni di residenti permanenti (86,3\u00A0%) vivevano in aree urbane, secondo l'Ufficio federale di statistica. La tipologia dell'UST conta i comuni intermedi tra quelli urbani; il 13,7\u00A0% viveva in aree rurali. Le fonti internazionali usano altre definizioni e danno valori diversi.",
    comparisonLabel: "Residenti permanenti per tipo di area, fine 2025, in % (UST)",
  },
  "number-municipalities": {
    question:
      "Quanti comuni contava la Svizzera al 1° gennaio 2026?",
    explanation:
      "Al 1° gennaio 2026 la Svizzera contava 2110 comuni, secondo l'elenco ufficiale dei comuni dell'Ufficio federale di statistica. Erano 2131 nel 2024 e 3021 nel 1990: il numero continua a scendere a causa delle fusioni.",
    comparisonLabel: "Numero di comuni al 1° gennaio (UST)",
  },
  "net-migration-rate": {
    question:
      "Qual è stato il saldo migratorio della Svizzera nel 2025 (per 1000 abitanti)?",
    explanation:
      "Nel 2025 il saldo migratorio della popolazione residente permanente è stato di 70\u202F400 persone, pari a 7,7 per 1000 abitanti (Ufficio federale di statistica). Il tasso era 15,7 nel 2023, quando i rifugiati ucraini sono entrati nella popolazione permanente, e 9,2 nel 2024. Il confronto usa il tasso Eurostat 2025, che include le correzioni statistiche e per la Svizzera indica 7,4.",
    comparisonLabel: "Saldo migratorio per 1000 abitanti, 2025 (Eurostat, con correzioni statistiche; la risposta è il dato UST)",
  },
  "foreign-population": {
    question:
      "Quale percentuale dei residenti permanenti in Svizzera era di nazionalità straniera alla fine del 2025?",
    explanation:
      "Alla fine del 2025 il 27,7\u00A0% dei residenti permanenti (2,53\u00A0milioni di persone) era di nazionalità straniera (Ufficio federale di statistica). I gruppi più numerosi erano italiani (346\u202F100), tedeschi (336\u202F400), portoghesi (258\u202F100) e francesi (179\u202F400). Il confronto è calcolato sui dati Eurostat al 1° gennaio 2025, quando la quota svizzera era del 27,4\u00A0%.",
    comparisonLabel: "Stranieri in % della popolazione, 1° gennaio 2025 (Eurostat; la risposta è per la fine del 2025)",
  },
  "cross-border-commuters": {
    question:
      "Quanti frontalieri (permesso G) lavoravano in Svizzera nel terzo trimestre 2026?",
    explanation:
      "Nel terzo trimestre 2026 lavoravano in Svizzera 414\u202F488 frontalieri con permesso G (Ufficio federale di statistica, dato provvisorio). La maggior parte risiedeva in Francia (241\u202F012), seguita da Italia (92\u202F509), Germania (67\u202F681) e Austria (9014).",
    comparisonLabel: "Frontalieri per Paese di residenza, 3° trimestre 2026 (UST)",
  },
  "fertility-rate": {
    question:
      "Qual è stato il tasso di fecondità totale della Svizzera nel 2025 (figli per donna)?",
    explanation:
      "Nel 2025 il tasso di fecondità totale è stato di 1,28 figli per donna (Ufficio federale di statistica), contro 1,52 nel 2021 e 1,50 nel 2000. Le madri sposate avevano in media 31,4 anni alla nascita del primo figlio. Il confronto riporta i dati Eurostat del 2024, quando il tasso svizzero era 1,29.",
    comparisonLabel: "Figli per donna, 2024 (Eurostat; la risposta è per il 2025)",
  },
  "average-marriage-age": {
    question:
      "Qual era l'età media delle donne al primo matrimonio in Svizzera nel 2025?",
    explanation:
      "Nel 2025 le donne nubili si sono sposate per la prima volta in media a 30,7 anni e gli uomini celibi a 32,4 (Ufficio federale di statistica, persone sotto i 50 anni). Nel 1990 le medie erano 26,7 e 29,1. Il confronto riporta i dati Eurostat per le donne nel 2024; Eurostat usa un metodo diverso e per la Svizzera indica 31,3.",
    comparisonLabel: "Età media delle donne al primo matrimonio, 2024 (metodo Eurostat; la risposta è il dato UST per il 2025)",
  },
  "population-over-65": {
    question:
      "Quale percentuale della popolazione svizzera aveva 65 anni o più alla fine del 2025?",
    explanation:
      "Alla fine del 2025 il 19,8\u00A0% della popolazione residente permanente aveva 65 anni o più (Ufficio federale di statistica), contro il 15,4\u00A0% nel 2000 e il 9,6\u00A0% nel 1950. Il confronto riporta i dati Eurostat al 1° gennaio 2025, quando la quota svizzera era del 19,5\u00A0%.",
    comparisonLabel: "Popolazione di 65 anni o più in %, 1° gennaio 2025 (Eurostat; la risposta è per la fine del 2025)",
  },
  "health-subsidies": {
    question:
      "Quale percentuale degli assicurati in Svizzera ha ricevuto riduzioni dei premi di cassa malati nel 2025?",
    explanation:
      "Nel 2025 2,64\u00A0milioni di persone hanno ricevuto una riduzione dei premi: il 29,1\u00A0% degli assicurati, secondo l'Ufficio federale della sanità pubblica. I sussidi hanno totalizzato 7,3\u00A0miliardi di franchi. Il premio medio mensile per gli adulti è di 465.30\u00A0franchi nel 2026.",
    comparisonLabel: "Assicurati con riduzione dei premi in Svizzera, in % (UFSP)",
  },
  "life-expectancy": {
    question:
      "Qual era la speranza di vita alla nascita in Svizzera nel 2024?",
    explanation:
      "Nel 2024 la speranza di vita alla nascita era di 84,2 anni per i due sessi insieme (Eurostat, su dati dell'Ufficio federale di statistica): 85,9 per le donne e 82,4 per gli uomini. I dati del 2025 sono 86,3 e 82,7 (pubblicati come provvisori il 18 giugno 2026; la tabella dell'UST del 24 settembre 2026 riporta gli stessi valori). Nel 1990 erano 80,8 e 74,0: il divario tra donne e uomini è sceso da 6,8 a 3,6 anni. Il confronto riporta i dati OCSE del 2023, quando la Svizzera era a 84,3.",
    comparisonLabel: "Speranza di vita alla nascita in anni, 2023 (OCSE, Health at a Glance 2025; la risposta è il dato Eurostat per il 2024)",
  },
  "hospital-beds": {
    question:
      "Quanti letti ospedalieri aveva la Svizzera ogni 1000 abitanti nel 2024?",
    explanation:
      "Nel 2024 la Svizzera aveva 4,2 letti ospedalieri ogni 1000 abitanti, secondo Eurostat. È meno della media UE (5,1) e molto meno di Germania (7,6) e Austria (6,6).",
    comparisonLabel: "Letti ospedalieri per 1000 abitanti, 2024 (Eurostat)",
  },
  "health-spending-gdp": {
    question:
      "Quale percentuale del PIL ha speso la Svizzera per la sanità nel 2024?",
    explanation:
      "Nel 2024 la Svizzera ha speso per la sanità l'11,4\u00A0% del PIL (dato provvisorio dell'Ufficio federale di statistica, ripreso dall'OCSE): 97\u00A0miliardi di franchi, pari a 10\u202F792\u00A0franchi a persona. È meno degli Stati Uniti (17,2\u00A0%) e della Germania (12,2\u00A0%) e allo stesso livello della Francia (11,3\u00A0%). Il confronto riporta i dati OCSE per il 2024.",
    comparisonLabel: "Spesa sanitaria in % del PIL, 2024 (OCSE)",
  },
  "university-graduation": {
    question:
      "Quale percentuale dei 25-34enni in Svizzera aveva un titolo di livello terziario nel 2025?",
    explanation:
      "Nel 2025 il 51\u00A0% dei 25-34enni in Svizzera aveva un titolo terziario (università o formazione professionale superiore), secondo l'OCSE. La media OCSE era del 49\u00A0%; la Corea arrivava al 71\u00A0% e l'Italia al 31\u00A0%.",
    comparisonLabel: "25-34enni con un titolo terziario, 2025, in % (OCSE)",
  },
  "apprenticeship-rate": {
    question:
      "Secondo i dati 2025 della SEFRI, quale percentuale dei giovani in Svizzera segue una formazione professionale di base (apprendistato)?",
    explanation:
      "Circa due terzi dei giovani in Svizzera seguono una formazione professionale di base, secondo la Segreteria di Stato per la formazione, la ricerca e l'innovazione (Fatti e cifre 2025). Le professioni che si possono imparare così sono circa 250.",
  },
  "education-spending-gdp": {
    question:
      "A quale percentuale del PIL corrispondeva la spesa pubblica per l'istruzione in Svizzera nel 2023?",
    explanation:
      "Nel 2023 la spesa pubblica per l'istruzione era il 5,5\u00A0% del PIL (45,5\u00A0miliardi di CHF), dopo il 5,2\u00A0% nel 2022, secondo l'Ufficio federale di statistica. La maggior parte dei fondi viene da Cantoni e Comuni (scuola dell'obbligo) e da Confederazione e Cantoni per università e formazione professionale. Il confronto usa un'altra misura: la spesa delle amministrazioni pubbliche per l'istruzione, dal livello primario al terziario, nel 2023 secondo l'OCSE, che per la Svizzera indica il 4,4\u00A0%.",
    comparisonLabel: "Spesa delle amministrazioni pubbliche per l'istruzione, dal primario al terziario, in % del PIL, 2023 (definizione OCSE; la risposta è il dato UST)",
  },
  "homeownership-rate": {
    question:
      "Quale quota delle abitazioni occupate in Svizzera era abitata dal proprietario nel 2024?",
    explanation:
      "Nel 2024 il 35,7\u00A0% delle abitazioni occupate era abitato dal proprietario (Ufficio federale di statistica, rilevazione strutturale). Il tasso era del 38,4\u00A0% nel 2015, del 36,2\u00A0% nel 2020 e del 35,9\u00A0% nel 2022. Il confronto usa un'altra misura: la quota della popolazione che vive in un'abitazione di proprietà nel 2024 secondo Eurostat, pari al 42,0\u00A0% per la Svizzera e al 68,4\u00A0% nell'UE.",
    comparisonLabel: "Popolazione che vive in un'abitazione di proprietà, 2024, in % (Eurostat; la risposta conta le abitazioni, non le persone)",
  },
  "average-rent": {
    question:
      "Qual era l'affitto netto mensile medio di un appartamento di 3 locali in Svizzera nel 2024?",
    explanation:
      "Nel 2024 un appartamento in affitto di 3 locali costava in media 1446\u00A0CHF al mese, senza spese accessorie e di riscaldamento (Ufficio federale di statistica, rilevazione strutturale). La media di tutte le abitazioni in affitto era di 1485\u00A0CHF. Il confronto mostra le medie cantonali per i 3 locali nel 2024: Zugo era il Cantone più caro (1875\u00A0CHF), il Giura il meno caro (926\u00A0CHF).",
    comparisonLabel: "Affitto netto mensile medio di un 3 locali per Cantone, 2024, in CHF (UST)",
  },
  "vacancy-rate": {
    question:
      "Quale quota delle abitazioni in Svizzera era sfitta il 1° giugno 2026?",
    explanation:
      "Il 1° giugno 2026 le abitazioni sfitte erano 45\u202F493, lo 0,93\u00A0% del parco immobiliare, case unifamiliari comprese (Ufficio federale di statistica, censimento delle abitazioni vuote). Nel 2025 il tasso era dell'1,00\u00A0%; è in calo da sei anni consecutivi. Il confronto mostra i Cantoni alla stessa data: 15 Cantoni erano sotto l'1\u00A0%, Zugo aveva il tasso più basso e il Giura il più alto.",
    comparisonLabel: "Abitazioni sfitte per Cantone, 1° giugno 2026, in % (UST)",
  },
  "violent-crime-change": {
    question:
      "Di quale percentuale è variato il numero di reati violenti registrati dalla polizia in Svizzera tra il 2012 e il 2025?",
    explanation:
      "La polizia ha registrato 46\u202F509 reati violenti nel 2012 e 49\u202F915 nel 2025, un aumento del 7,3\u00A0% (Ufficio federale di statistica, statistica criminale di polizia). Il numero è sceso a 42\u202F266 nel 2015 ed è in aumento ogni anno dal 2021. I reati violenti gravi erano 2654 nel 2025. Il confronto mostra la variazione rispetto al 2012 per altri anni. Sono numeri assoluti: nel periodo è cresciuta anche la popolazione.",
    comparisonLabel: "Reati violenti registrati dalla polizia in Svizzera, variazione rispetto al 2012, in % (UST)",
  },
  "homicide-rate": {
    question:
      "Quanti omicidi consumati ogni 100\u202F000 abitanti ha registrato la polizia in Svizzera nel 2025?",
    explanation:
      "Nel 2025 la polizia ha registrato 55 omicidi consumati, 0,6 ogni 100\u202F000 abitanti (Ufficio federale di statistica, statistica criminale di polizia). Nel 2024 erano 45; la media dal 2009 è di 48 all'anno. Nel 2025, 34 dei 55 (61,8\u00A0%) sono avvenuti nella coppia o in famiglia. Il confronto mostra i dati Eurostat sugli omicidi intenzionali nel 2024, quando la Svizzera era a 0,50.",
    comparisonLabel: "Omicidi intenzionali per 100\u202F000 abitanti, 2024 (Eurostat; la risposta è il dato UST per il 2025)",
  },
  "prison-population": {
    question:
      "Quante persone erano detenute ogni 100\u202F000 abitanti in Svizzera nel 2024?",
    explanation:
      "Secondo Eurostat, nel 2024 in Svizzera erano detenute 75,0 persone ogni 100\u202F000 abitanti. Tutti i paesi del confronto vengono dalla stessa tabella Eurostat per il 2024. L'Ufficio federale di statistica ha contato 7119 detenuti il 31 gennaio 2026, il numero più alto dal 1988, con il 97\u00A0% dei posti occupati.",
    comparisonLabel: "Detenuti per 100\u202F000 abitanti, 2024 (Eurostat)",
  },
  "burglary-rate": {
    question:
      "Quanti furti con scasso e con introduzione clandestina ogni 100\u202F000 abitanti ha registrato la polizia in Svizzera nel 2024?",
    explanation:
      "Nel 2024 la polizia ha registrato 46\u202F070 furti con scasso e con introduzione clandestina, che Eurostat riporta come 514 ogni 100\u202F000 abitanti. Nel 2025 il numero è salito dell'1,2\u00A0% a 46\u202F636, circa 128 al giorno (Ufficio federale di statistica). Nel 2012 erano 73\u202F714. Il confronto mostra i dati Eurostat per il 2024; le definizioni nazionali di furto con scasso differiscono, quindi i paesi sono confrontabili solo in modo approssimativo.",
    comparisonLabel: "Furti con scasso per 100\u202F000 abitanti, 2024 (Eurostat)",
  },
  "nuclear-electricity": {
    question:
      "Quale percentuale della produzione svizzera di elettricità veniva dal nucleare nel 2025?",
    explanation:
      "Nel 2025 le centrali nucleari hanno fornito il 27,2\u00A0% della produzione svizzera di elettricità (18,4\u00A0TWh su 67,5\u00A0TWh), sotto la media decennale del 32,0\u00A0%; era il 28,4\u00A0% nel 2024 e il 32,1\u00A0% nel 2023 (Ufficio federale dell'energia). Il confronto mostra il mix di produzione del 2025: idroelettrico 55,5\u00A0%, fotovoltaico 11,8\u00A0%. I reattori in esercizio sono quattro: Beznau 1 e 2, Gösgen e Leibstadt.",
    comparisonLabel: "Produzione lorda di elettricità in Svizzera per fonte, 2025, in % (UFE)",
  },
  "co2-per-capita": {
    question:
      "Quante tonnellate di CO2 pro capite ha emesso la Svizzera sul proprio territorio nel 2024?",
    explanation:
      "Nel 2024 la Svizzera ha emesso sul proprio territorio 3,5\u00A0tonnellate di CO2 pro capite, 4,5\u00A0tonnellate di CO2 equivalenti contando tutti i gas serra (Ufficio federale dell'ambiente, inventario dei gas serra). Nel 1990 erano 8,3\u00A0tonnellate di CO2 equivalenti. Il traffico aereo internazionale e i beni importati non sono compresi: l'impronta legata ai consumi era di circa 15\u00A0tonnellate di CO2 equivalenti pro capite nel 2023. Il confronto usa un'altra misura: i dati AIE sulla CO2 da uso di energia nel 2023, quando la Svizzera era a 3,4\u00A0tonnellate.",
    comparisonLabel: "CO2 da uso di energia pro capite, 2023, in tonnellate (AIE; la risposta è l'inventario UFAM per il 2024)",
  },
  "renewable-energy-share": {
    question:
      "Quale percentuale del consumo finale di energia in Svizzera veniva da fonti rinnovabili nel 2025?",
    explanation:
      "Nel 2025 le fonti rinnovabili hanno coperto il 30,6\u00A0% del consumo finale di energia, contro il 29,9\u00A0% del 2024 (Ufficio federale dell'energia). La quota era del 19,9\u00A0% nel 2010 ed è scesa temporaneamente al 25,7\u00A0% nel 2022. Della produzione lorda di elettricità, nel 2025 l'idroelettrico ha fornito il 55,5\u00A0% e il fotovoltaico l'11,8\u00A0%. Il confronto mostra gli anni precedenti in Svizzera.",
    comparisonLabel: "Quota rinnovabile del consumo finale di energia in Svizzera, in % (UFE)",
  },
  "recycling-rate": {
    question:
      "Quale percentuale dei rifiuti urbani svizzeri è stata riciclata nel 2024?",
    explanation:
      "Nel 2024 la Svizzera ha prodotto circa 6\u00A0milioni di tonnellate di rifiuti urbani: 3,1\u00A0milioni sono stati raccolti separatamente e riciclati (52\u00A0%) e 2,9\u00A0milioni inceneriti (Ufficio federale dell'ambiente). I tassi di riciclaggio erano del 100\u00A0% per le bottiglie di vetro, del 90\u00A0% per le lattine di alluminio, dell'85\u00A0% per carta e cartone e dell'84\u00A0% per le bottiglie in PET. Il confronto mostra il tasso di riciclaggio dei rifiuti urbani di Eurostat per il 2024, che per la Svizzera indica il 51,8\u00A0%.",
    comparisonLabel: "Tasso di riciclaggio dei rifiuti urbani, 2024, in % (Eurostat; la risposta è il dato UFAM)",
  },
  "train-punctuality": {
    question:
      "Quale percentuale dei treni viaggiatori FFS era puntuale (meno di 3\u00A0minuti di ritardo) nel 2025?",
    explanation:
      "Nel 2025 il 94,1\u00A0% dei treni viaggiatori FFS era puntuale, il valore annuo più alto comunicato dalle FFS; nel 2024 era il 93,2\u00A0%. Per le FFS un treno è puntuale se arriva con meno di 3\u00A0minuti di ritardo. La puntualità era del 93,4\u00A0% nella Svizzera romanda e del 92,1\u00A0% in Ticino. Nel 2025 le FFS hanno trasportato 1,43\u00A0milioni di viaggiatori al giorno.",
    comparisonLabel: "Treni viaggiatori FFS puntuali, in % (FFS)",
  },
  "train-track-km": {
    question:
      "Quanti chilometri di linee ferroviarie erano in esercizio in Svizzera nel 2024?",
    explanation:
      "Nel 2024 la Svizzera aveva 5307\u00A0km di linee ferroviarie secondo Eurostat; l'ultimo dato dell'Ufficio federale di statistica è di 5317\u00A0km (2020). È la lunghezza delle linee: una linea a doppio binario conta una volta sola. Tutti i paesi del confronto vengono dalla stessa tabella Eurostat per il 2024. La rete comprende la galleria di base del San Gottardo, lunga 57\u00A0km.",
    comparisonLabel: "Linee ferroviarie in km, 2024 (Eurostat)",
  },
  "average-commute": {
    question:
      "Quanti minuti durava in media il tragitto di sola andata verso il lavoro in Svizzera nel 2024?",
    explanation:
      "Nel 2024 i pendolari impiegavano in media 30,2\u00A0minuti per raggiungere il posto di lavoro, su una distanza media di 14,0\u00A0km (2022: 29,6\u00A0minuti, 13,7\u00A0km). Per il 34,6\u00A0% il tragitto durava al massimo 15\u00A0minuti, per l'8,8\u00A0% più di un'ora. Dei 3,7\u00A0milioni di pendolari, il 49,4\u00A0% usava l'auto come mezzo principale, il 17,1\u00A0% il treno e il 13,6\u00A0% bus o tram (Ufficio federale di statistica, tabelle T 11.4.4.3 e T 11.4.4.4, 2024).",
  },
  "cars-per-capita": {
    question:
      "Quante automobili erano immatricolate ogni 1000 abitanti in Svizzera nel 2025?",
    explanation:
      "Nel 2025 in Svizzera erano immatricolate 4\u202F839\u202F465 automobili, 535 ogni 1000 abitanti (Ufficio federale di statistica; il dato del 2024 è stato rivisto a 536). Le auto elettriche a batteria erano il 22,7\u00A0% delle nuove immatricolazioni nel 2025 e il 5,2\u00A0% del parco circolante (2024: 4,2\u00A0%). Il confronto mostra i dati Eurostat per il 2024, che usano un metodo leggermente diverso e per la Svizzera indicano 542.",
    comparisonLabel: "Automobili per 1000 abitanti, 2024 (metodo Eurostat; la risposta è il dato UST per il 2025)",
  },
  "ahv-funding": {
    question:
      "Secondo le prospettive finanziarie della Confederazione di luglio 2026, da quale anno l'AVS (primo pilastro) spende più di quanto incassa?",
    explanation:
      "Secondo le prospettive dell'Ufficio federale delle assicurazioni sociali del 2 luglio 2026, il risultato di ripartizione dell'AVS (entrate meno uscite, senza i redditi da investimenti) diventa negativo nel 2026. Il motivo è la 13a mensilità, versata per la prima volta nel 2026, che costa circa 4\u00A0miliardi di CHF all'anno e non è ancora finanziata. Il disavanzo dovrebbe passare da circa 1,3\u00A0miliardi di CHF nel 2026 a circa 4,9\u00A0miliardi nel 2035 (prezzi 2025).",
  },
  "poverty-rate": {
    question:
      "Quale percentuale della popolazione svizzera era povera in termini di reddito nel 2024 (tasso di povertà assoluto)?",
    explanation:
      "Nel 2024 l'8,4\u00A0% della popolazione, circa 743\u202F000 persone, era povero in termini di reddito (Ufficio federale di statistica, indagine SILC). È il tasso di povertà assoluto: reddito dell'economia domestica sotto la soglia di povertà derivata dalle norme dell'aiuto sociale, in media 2388\u00A0CHF al mese per una persona sola e 4159\u00A0CHF per due adulti con due figli. Tra gli occupati il tasso era del 4,3\u00A0%. Il tasso di rischio di povertà usato nei confronti europei è un'altra misura, relativa (reddito sotto il 60\u00A0% della mediana), e in Svizzera è circa il 16\u00A0%. Il confronto mostra il tasso assoluto svizzero negli anni precedenti.",
    comparisonLabel: "Tasso di povertà assoluto in Svizzera, in % (UST)",
  },
};

// German translations for indicator data fields
const indicatorTranslationsDE: Record<
  string,
  { name: string; shortName: string; description: string; context: string }
> = {
  "unemployment-rate-ilo": {
    name: "Arbeitslosenquote (ILO-Definition)",
    shortName: "Arbeitslosigkeit (ILO)",
    description: "Arbeitslosenquote nach ILO-Standards: Personen ohne Arbeit, die aktiv suchen und verfügbar sind, ob bei einem RAV gemeldet oder nicht (Jahresdurchschnitt)",
    context: "Diese Quote wird für internationale Vergleiche verwendet. 2025 lag sie bei 4,8\u00A0%, nach 4,3\u00A0% im Jahr 2024.",
  },
  "unemployment-rate": {
    name: "Arbeitslosenquote (SECO)",
    shortName: "Arbeitslosigkeit",
    description: "Bei den RAV (Regionale Arbeitsvermittlungszentren) registrierte Arbeitslose im Verhältnis zu den Erwerbspersonen (Jahresdurchschnitt)",
    context: "Die SECO-Quote zählt nur Personen, die bei einem RAV als arbeitslos gemeldet sind, und liegt deshalb unter der ILO-Quote (2025: 2,8\u00A0% gegenüber 4,8\u00A0%).",
  },
  "gdp-growth-rate": {
    name: "BIP-Wachstumsrate",
    shortName: "BIP-Wachstum",
    description: "Jährliche Wachstumsrate des realen BIP (zu Preisen des Vorjahres)",
    context: "Erste Schätzung des BFS für 2025, veröffentlicht am 25. August 2026. Das Wachstum 2024 wurde von 1,4\u00A0% auf 1,5\u00A0% revidiert.",
  },
  "gdp-growth": {
    name: "BIP-Wachstumsrate",
    shortName: "BIP-Wachstum",
    description: "Jährliche Wachstumsrate des realen BIP",
    context: "Die Schweiz verzeichnet trotz globaler Unsicherheiten ein stetiges Wachstum.",
  },
  "inflation-rate": {
    name: "Inflationsrate (LIK)",
    shortName: "Inflation",
    description: "Durchschnittliche Jahresteuerung gemäss Landesindex der Konsumentenpreise",
    context: "Die durchschnittliche Jahresteuerung sank von 2,8\u00A0% im Jahr 2022 auf 0,2\u00A0% im Jahr 2025.",
  },
  "average-wage": {
    name: "Medianer Monatslohn (brutto)",
    shortName: "Medianlohn",
    description: "Medianer Bruttomonatslohn für eine Vollzeitstelle, privater und öffentlicher Sektor zusammen. Die Erhebung findet alle zwei Jahre statt.",
    context: "Der Medianlohn stieg von 6788\u00A0Franken im Jahr 2022 auf 7024\u00A0Franken im Jahr 2024 (+3,5\u00A0%). Die Hälfte der Arbeitnehmenden verdient mehr, die Hälfte weniger.",
  },
  "federal-debt-gdp": {
    name: "Bundesschulden (% des BIP)",
    shortName: "Bundesschulden",
    description: "Nettoschulden des Bundes in Prozent des BIP (ohne Kantone/Gemeinden)",
    context: "Dieser Wert wird durch die Schuldenbremse gesteuert. Die Nettoschulden stiegen mit den Pandemieausgaben von 103\u00A0Mrd. CHF (2019) auf 142\u00A0Mrd. CHF (2023) und lagen Ende 2025 bei 140\u00A0Mrd. CHF.",
  },
  "public-debt": {
    name: "Staatsverschuldung (% des BIP)",
    shortName: "Staatsschulden",
    description: "Gesamte Staatsverschuldung in Prozent des BIP",
    context: "Die Schweiz hat eine der niedrigsten Schuldenquoten unter den Industrieländern.",
  },
  "housing-price-index": {
    name: "Immobilienpreisindex (Q4 2019=100)",
    shortName: "Immobilienpreise",
    description: "Offizieller Index für Einfamilienhäuser und Eigentumswohnungen, Jahresdurchschnitt (IMPI, Basis Q4 2019 = 100)",
    context: "2025 stiegen die Preise für Wohneigentum im Durchschnitt um 4,6\u00A0%, nach 1,7\u00A0% im Jahr 2024 und 2,2\u00A0% im Jahr 2023. Den Index gibt es seit 2017.",
  },
  "foreign-population": {
    name: "Ständige ausländische Wohnbevölkerung",
    shortName: "Ausländische Bevölkerung",
    description: "Anteil der ständigen Wohnbevölkerung ohne Schweizer Staatsbürgerschaft (31. Dezember)",
    context: "Ende 2025 zählte die Schweiz 9\u202F127\u202F100 ständige Einwohnerinnen und Einwohner, davon 2\u202F528\u202F100 Ausländerinnen und Ausländer. Die grössten Gruppen sind italienische, deutsche, portugiesische und französische Staatsangehörige.",
  },
  "population-total": {
    name: "Gesamtbevölkerung",
    shortName: "Bevölkerung",
    description: "Ständige Wohnbevölkerung am 31. Dezember (in Millionen)",
    context: "Ende 2025 zählte die Schweiz 9\u202F127\u202F100 ständige Einwohnerinnen und Einwohner, 0,8\u00A0% mehr als ein Jahr zuvor (9\u202F051\u202F029). Die 9-Millionen-Marke wurde im Lauf des Jahres 2024 überschritten: Ende 2023 waren es 8\u202F962\u202F258.",
  },
  "median-age": {
    name: "Medianalter",
    shortName: "Medianalter",
    description: "Medianalter der Wohnbevölkerung am 1. Januar",
    context: "Das Medianalter stieg von 31,5 Jahren im Jahr 1965 auf 42,9 im Jahr 2025. Am 1. Januar 2025 betrug es in Deutschland 45,5 Jahre, in Italien 49,1 und in der EU 44,9.",
  },
  "life-expectancy": {
    name: "Lebenserwartung bei Geburt",
    shortName: "Lebenserwartung",
    description: "Lebenserwartung bei Geburt, beide Geschlechter",
    context: "2024 betrug die Lebenserwartung bei Geburt 82,4 Jahre für Männer und 85,9 für Frauen. Zahlen des BFS für 2025: 82,7 und 86,3 (am 18. Juni 2026 als provisorisch veröffentlicht; die BFS-Tabelle vom 24. September 2026 enthält dieselben Werte). Nach dem Rückgang von 2020 (83,1) liegt der Gesamtwert seit 2023 über dem Stand von 2019 (83,8).",
  },
  "crime-rate-per-1000": {
    name: "Straftaten nach Strafgesetzbuch pro 1000 Einwohner",
    shortName: "Straftaten nach StGB",
    description: "Polizeilich registrierte Straftaten nach Schweizer Strafgesetzbuch (StGB) pro 1000 ständige Einwohner",
    context: "2025 registrierte die Polizei 554\u202F963 Straftaten nach Strafgesetzbuch, 1,5\u00A0% weniger als 2024, nach drei Jahren mit Zunahmen. Die Vermögensstraftaten gingen um 3,5\u00A0% zurück, die schweren Gewaltstraftaten nahmen um 8,1\u00A0% zu. Es gab 55 vollendete Tötungsdelikte (0,6 pro 100\u202F000 Einwohner) und 57\u202F761 Straftaten mit digitalem Tatvorgehen.",
  },
  "crime-rate": {
    name: "Kriminalitätsrate",
    shortName: "Kriminalität",
    description: "Registrierte Straftaten pro 100\u202F000 Einwohner",
    context: "Gewaltverbrechen machen nur etwa 5\u00A0% aller Straftaten aus. Die meisten betreffen Eigentum.",
  },
  "healthcare-cost": {
    name: "Gesundheitskosten (% des BIP)",
    shortName: "Gesundheitskosten",
    description: "Kosten des Gesundheitswesens in Prozent des Bruttoinlandprodukts",
    context: "2024 kostete das Gesundheitswesen 97,2\u00A0Milliarden Franken (provisorisch), 4,1\u00A0% mehr als 2023, das sind 899\u00A0Franken pro Person und Monat. Gemessen am BIP liegt die Schweiz (11,4\u00A0%) unter Deutschland (12,2\u00A0%) und Österreich (11,7\u00A0%), gleichauf mit Frankreich (11,3\u00A0%) und über Italien (8,5\u00A0%) (OECD, 2024).",
  },
  "education-spending": {
    name: "Bildungsausgaben (% des BIP)",
    shortName: "Bildung",
    description: "Öffentliche Bildungsausgaben in Prozent des BIP",
    context: "2023 gaben Bund, Kantone und Gemeinden 45,5\u00A0Milliarden Franken für die Bildung aus, 18,1\u00A0% der gesamten öffentlichen Ausgaben und 5,5\u00A0% des BIP (2022: 42,7\u00A0Milliarden Franken, 5,2\u00A0%).",
  },
  "poverty-rate": {
    name: "Armutsquote (absolut)",
    shortName: "Armutsquote",
    description: "Armutsquote (absolut): Anteil der Bevölkerung mit einem Einkommen unter der Armutsgrenze",
    context: "2024 waren 8,4\u00A0% der Bevölkerung, rund 743\u202F000 Personen, einkommensarm. Die Armutsgrenze lag bei 2388\u00A0Franken pro Monat für eine Einzelperson und bei 4159\u00A0Franken für zwei Erwachsene mit zwei Kindern. Die Armutsgefährdungsquote ist ein eigenes Mass (Einkommen unter 60\u00A0% des Medians): 16,4\u00A0%, rund 1\u202F451\u202F000 Personen. Zahlen vor 2014 sind nicht vergleichbar.",
  },
  "renewable-energy": {
    name: "Erneuerbarer Anteil am Endenergieverbrauch",
    shortName: "Erneuerbare (Endenergieverbrauch)",
    description: "Anteil erneuerbarer Energien am gesamten Endenergieverbrauch",
    context: "Der erneuerbare Anteil am Endenergieverbrauch sank 2022 auf 25,7\u00A0% und ist seither jedes Jahr gestiegen. 2025 waren 68,3\u00A0% der Netto-Stromproduktion (Produktion abzüglich des Verbrauchs der Speicherpumpen) erneuerbar. Von der Bruttoproduktion lieferte die Wasserkraft 55,5\u00A0% und die Photovoltaik 11,8\u00A0%.",
  },
};

// French translations for indicator data fields
const indicatorTranslationsFR: Record<
  string,
  { name: string; shortName: string; description: string; context: string }
> = {
  "unemployment-rate-ilo": {
    name: "Taux de chômage (définition OIT)",
    shortName: "Chômage (OIT)",
    description: "Taux de chômage selon les normes de l'OIT : personnes sans emploi, en recherche active et disponibles, inscrites ou non à un ORP (moyenne annuelle)",
    context: "C'est le taux utilisé pour les comparaisons internationales. En 2025 il était de 4,8\u202F%, contre 4,3\u202F% en 2024.",
  },
  "unemployment-rate": {
    name: "Taux de chômage (SECO)",
    shortName: "Chômage",
    description: "Chômeurs inscrits aux ORP (Offices régionaux de placement) par rapport à la population active (moyenne annuelle)",
    context: "Le taux SECO ne compte que les personnes inscrites comme chômeuses à un ORP ; il est donc plus bas que le taux OIT (2025 : 2,8\u202F% contre 4,8\u202F%).",
  },
  "gdp-growth-rate": {
    name: "Taux de croissance du PIB",
    shortName: "Croissance PIB",
    description: "Taux de croissance annuel du PIB réel (aux prix de l'année précédente)",
    context: "Première estimation de l'OFS pour 2025, publiée le 25 août 2026. La croissance de 2024 a été révisée de 1,4\u202F% à 1,5\u202F%.",
  },
  "gdp-growth": {
    name: "Taux de croissance du PIB",
    shortName: "Croissance du PIB",
    description: "Taux de croissance annuel du PIB réel",
    context: "La Suisse maintient une croissance régulière malgré les incertitudes mondiales.",
  },
  "inflation-rate": {
    name: "Taux d'inflation (IPC)",
    shortName: "Inflation",
    description: "Renchérissement annuel moyen selon l'Indice des prix à la consommation",
    context: "Le renchérissement annuel moyen est passé de 2,8\u202F% en 2022 à 0,2\u202F% en 2025.",
  },
  "average-wage": {
    name: "Salaire mensuel médian (brut)",
    shortName: "Salaire médian",
    description: "Salaire mensuel brut médian pour un poste à plein temps, secteurs privé et public ensemble. L'enquête a lieu tous les deux ans.",
    context: "Le salaire médian est passé de 6788\u00A0francs en 2022 à 7024\u00A0francs en 2024 (+3,5\u202F%). La moitié des salariés gagne plus, l'autre moitié moins.",
  },
  "federal-debt-gdp": {
    name: "Dette fédérale (% du PIB)",
    shortName: "Dette fédérale",
    description: "Dette nette de la Confédération en pourcentage du PIB (hors cantons/communes)",
    context: "Ce chiffre est géré par le 'frein à l'endettement'. La dette nette est passée de 103 Mrd CHF (2019) à 142 Mrd CHF (2023) avec les dépenses liées à la pandémie et s'élevait à 140 Mrd CHF fin 2025.",
  },
  "public-debt": {
    name: "Dette publique (% du PIB)",
    shortName: "Dette publique",
    description: "Dette publique totale en pourcentage du PIB",
    context: "La Suisse a l'un des ratios dette/PIB les plus bas parmi les pays développés.",
  },
  "housing-price-index": {
    name: "Indice des prix immobiliers (T4 2019=100)",
    shortName: "Prix immobiliers",
    description: "Indice officiel pour les maisons individuelles et les appartements en propriété, moyenne annuelle (IMPI, base T4 2019 = 100)",
    context: "En 2025 les prix des logements en propriété ont augmenté de 4,6\u202F% en moyenne, après 1,7\u202F% en 2024 et 2,2\u202F% en 2023. L'indice existe depuis 2017.",
  },
  "foreign-population": {
    name: "Population résidente étrangère permanente",
    shortName: "Population étrangère",
    description: "Pourcentage de résidents permanents sans nationalité suisse (31 décembre)",
    context: "Fin 2025 la Suisse comptait 9\u202F127\u202F100 résidents permanents, dont 2\u202F528\u202F100 étrangers. Les groupes les plus nombreux sont les Italiens, les Allemands, les Portugais et les Français.",
  },
  "population-total": {
    name: "Population totale",
    shortName: "Population",
    description: "Population résidante permanente au 31 décembre (en millions)",
    context: "Fin 2025 la Suisse comptait 9\u202F127\u202F100 résidents permanents, 0,8\u202F% de plus qu'un an plus tôt (9\u202F051\u202F029). Le seuil des 9\u00A0millions a été franchi au cours de l'année 2024 : fin 2023 ils étaient 8\u202F962\u202F258.",
  },
  "median-age": {
    name: "Âge médian",
    shortName: "Âge médian",
    description: "Âge médian de la population résidante au 1er janvier",
    context: "L'âge médian est passé de 31,5 ans en 1965 à 42,9 en 2025. Au 1er janvier 2025 il était de 45,5 ans en Allemagne, de 49,1 en Italie et de 44,9 dans l'UE.",
  },
  "life-expectancy": {
    name: "Espérance de vie à la naissance",
    shortName: "Espérance de vie",
    description: "Espérance de vie à la naissance, les deux sexes",
    context: "En 2024 l'espérance de vie à la naissance était de 82,4 ans pour les hommes et de 85,9 pour les femmes. Chiffres de l'OFS pour 2025 : 82,7 et 86,3 (publiés comme provisoires le 18 juin 2026 ; le tableau de l'OFS du 24 septembre 2026 contient les mêmes valeurs). Après la baisse de 2020 (83,1), la valeur globale dépasse depuis 2023 le niveau de 2019 (83,8).",
  },
  "crime-rate-per-1000": {
    name: "Infractions au Code pénal pour 1000 habitants",
    shortName: "Infractions au Code pénal",
    description: "Infractions au Code pénal suisse (CP) enregistrées par la police pour 1000 résidents permanents",
    context: "En 2025 la police a enregistré 554\u202F963 infractions au Code pénal, 1,5\u202F% de moins qu'en 2024, après trois années de hausse. Les infractions contre le patrimoine ont reculé de 3,5\u202F%, les infractions de violence grave ont augmenté de 8,1\u202F%. Il y a eu 55 homicides consommés (0,6 pour 100\u202F000 habitants) et 57\u202F761 infractions commises avec un mode opératoire numérique.",
  },
  "crime-rate": {
    name: "Taux de criminalité",
    shortName: "Criminalité",
    description: "Infractions pénales enregistrées pour 100\u202F000 habitants",
    context: "Les crimes violents ne représentent qu'environ 5\u202F% de toutes les infractions. La plupart concernent les biens.",
  },
  "healthcare-cost": {
    name: "Coûts de la santé (% du PIB)",
    shortName: "Coûts de la santé",
    description: "Coûts du système de santé en pourcentage du produit intérieur brut",
    context: "En 2024 le système de santé a coûté 97,2\u00A0milliards de francs (provisoire), 4,1\u202F% de plus qu'en 2023, soit 899\u00A0francs par personne et par mois. En part du PIB, la Suisse (11,4\u202F%) se situe sous l'Allemagne (12,2\u202F%) et l'Autriche (11,7\u202F%), au même niveau que la France (11,3\u202F%) et au-dessus de l'Italie (8,5\u202F%) (OCDE, 2024).",
  },
  "education-spending": {
    name: "Dépenses d'éducation (% du PIB)",
    shortName: "Éducation",
    description: "Dépenses publiques d'éducation en pourcentage du PIB",
    context: "En 2023 la Confédération, les cantons et les communes ont dépensé 45,5\u00A0milliards de francs pour l'éducation, soit 18,1\u202F% des dépenses publiques totales et 5,5\u202F% du PIB (2022 : 42,7\u00A0milliards de francs, 5,2\u202F%).",
  },
  "poverty-rate": {
    name: "Taux de pauvreté (absolue)",
    shortName: "Taux de pauvreté",
    description: "Taux de pauvreté (absolue) : part de la population dont le revenu est inférieur au seuil de pauvreté",
    context: "En 2024, 8,4\u202F% de la population, environ 743\u202F000 personnes, étaient en situation de pauvreté en termes de revenu. Le seuil de pauvreté était de 2388\u00A0francs par mois pour une personne seule et de 4159\u00A0francs pour deux adultes avec deux enfants. Le taux de risque de pauvreté est une mesure distincte (revenu inférieur à 60\u202F% de la médiane) : 16,4\u202F%, environ 1\u202F451\u202F000 personnes. Les chiffres antérieurs à 2014 ne sont pas comparables.",
  },
  "renewable-energy": {
    name: "Part renouvelable de la consommation finale d'énergie",
    shortName: "Renouvelables (consommation finale d'énergie)",
    description: "Part des énergies renouvelables dans la consommation finale totale d'énergie",
    context: "La part renouvelable de la consommation finale d'énergie est tombée à 25,7\u202F% en 2022 et augmente chaque année depuis. En 2025, 68,3\u202F% de la production nette d'électricité (production moins la consommation des pompes d'accumulation) était renouvelable. De la production brute, l'hydraulique a fourni 55,5\u202F% et le photovoltaïque 11,8\u202F%.",
  },
};

// Helper function to get localized indicator fields
export function getLocalizedIndicator(
  id: string,
  fields: {
    name: string;
    shortName: string;
    description: string;
    context?: string;
  },
  locale: Locale
): { name: string; shortName: string; description: string; context?: string } {
  if (locale === "en") return fields;
  
  const translations = locale === "de" ? indicatorTranslationsDE : locale === "fr" ? indicatorTranslationsFR : indicatorTranslationsIT;
  const t = translations[id];
  if (!t) return fields;
  return {
    name: t.name,
    shortName: t.shortName,
    description: t.description,
    context: t.context || fields.context,
  };
}

/** Language of the quiz texts on a page in `locale`: Italian has its own, the others read the English ones. */
export function quizTextLang(locale: Locale): "it" | "en" {
  return locale === "it" ? "it" : "en";
}

// Helper function to get localized question fields
export function getLocalizedQuestion(
  id: string,
  fields: { question: string; explanation: string; comparisonLabel?: string },
  locale: Locale
): { question: string; explanation: string; comparisonLabel?: string } {
  if (locale === "en") return fields;
  // For now, German and French fall back to English for quiz questions
  // (adding full German/French quiz translations would be a large undertaking)
  if (locale === "de" || locale === "fr") return fields;
  const t = questionTranslationsIT[id];
  if (!t) return fields;
  return {
    question: t.question,
    explanation: t.explanation,
    comparisonLabel: t.comparisonLabel ?? fields.comparisonLabel,
  };
}
