import { Locale } from "./translations";

// Italian translations for indicator data fields
const indicatorTranslationsIT: Record<
  string,
  { name: string; shortName: string; description: string; context: string }
> = {
  "unemployment-rate": {
    name: "Tasso di disoccupazione",
    shortName: "Disoccupazione",
    description:
      "Tasso di disoccupazione registrato in percentuale della forza lavoro",
    context:
      "La Svizzera ha uno dei tassi di disoccupazione più bassi d'Europa. La media UE si aggira intorno al 6%.",
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
    description:
      "Tasso d'inflazione annuale basato sull'Indice dei prezzi al consumo",
    context:
      "L'inflazione svizzera resta ben al di sotto della media europea di circa il 2,5%.",
  },
  "average-wage": {
    name: "Salario mensile mediano (lordo)",
    shortName: "Salario mediano",
    description:
      "Salario mensile lordo mediano in tutti i settori",
    context:
      "La Svizzera ha uno dei salari nominali più alti al mondo, ma anche il costo della vita è elevato.",
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
    name: "Indice dei prezzi immobiliari (2015=100)",
    shortName: "Prezzi immobiliari",
    description:
      "Indice dei prezzi degli immobili residenziali (2015 = 100)",
    context:
      "I prezzi degli immobili svizzeri sono aumentati costantemente, ma la crescita è rallentata dal 2022.",
  },
  "foreign-population": {
    name: "Popolazione residente straniera",
    shortName: "Residenti stranieri",
    description:
      "Percentuale di residenti permanenti senza cittadinanza svizzera",
    context:
      "Circa il 40% dei residenti stranieri proviene da paesi UE/AELS. Italia, Germania e Portogallo sono le nazionalità principali.",
  },
  "population-total": {
    name: "Popolazione totale",
    shortName: "Popolazione",
    description:
      "Popolazione residente permanente totale della Svizzera",
    context:
      "La crescita demografica è trainata principalmente dall'immigrazione. La crescita naturale contribuisce in misura minore.",
  },
  "median-age": {
    name: "Età mediana",
    shortName: "Età mediana",
    description: "Età mediana della popolazione svizzera",
    context:
      "La popolazione svizzera sta invecchiando, con conseguenze per il sistema pensionistico e la sanità.",
  },
  "life-expectancy": {
    name: "Aspettativa di vita alla nascita",
    shortName: "Aspettativa di vita",
    description:
      "Aspettativa di vita media alla nascita (entrambi i sessi combinati)",
    context:
      "La Svizzera si colloca tra i primi 5 paesi al mondo per aspettativa di vita.",
  },
  "crime-rate": {
    name: "Tasso di criminalità",
    shortName: "Criminalità",
    description:
      "Reati penali registrati ogni 100'000 abitanti",
    context:
      "I reati violenti rappresentano solo circa il 5% di tutti i reati. La maggior parte riguarda il patrimonio.",
  },
  "healthcare-cost": {
    name: "Premio medio dell'assicurazione sanitaria",
    shortName: "Premio sanitario",
    description:
      "Premio mensile medio dell'assicurazione sanitaria (copertura di base)",
    context:
      "Circa il 25% della popolazione riceve sussidi per i premi. I premi variano da cantone a cantone.",
  },
  "education-spending": {
    name: "Spesa per l'istruzione (% del PIL)",
    shortName: "Istruzione",
    description:
      "Spesa pubblica per l'istruzione in percentuale del PIL",
    context:
      "La Svizzera investe molto nella formazione professionale: circa il 60% dei giovani sceglie un apprendistato.",
  },
  "poverty-rate": {
    name: "Tasso di rischio di povertà",
    shortName: "Tasso di povertà",
    description:
      "Percentuale della popolazione con un reddito inferiore al 60% della mediana",
    context:
      "Sebbene la Svizzera abbia un tasso di povertà basso rispetto alla media UE (circa il 16%), la povertà esiste.",
  },
  "renewable-energy": {
    name: "Quota di energia rinnovabile",
    shortName: "Rinnovabili",
    description:
      "Quota di energia rinnovabile sul consumo energetico totale",
    context:
      "L'energia idroelettrica domina le rinnovabili svizzere (circa il 60% dell'elettricità). Il solare è in più rapida crescita.",
  },
};

// Italian translations for quiz question fields
const questionTranslationsIT: Record<
  string,
  { question: string; explanation: string }
> = {
  "unemployment-rate": {
    question: "Qual è l'attuale tasso di disoccupazione in Svizzera?",
    explanation:
      "Con il 2,3%, la Svizzera ha uno dei tassi di disoccupazione più bassi d'Europa. La media UE si aggira intorno al 6%. Il mercato del lavoro è molto competitivo, con molti settori che soffrono di carenza di manodopera, in particolare sanità, ristorazione e tecnologia.",
  },
  "youth-unemployment": {
    question:
      "Qual è il tasso di disoccupazione giovanile (15-24 anni) in Svizzera?",
    explanation:
      "La disoccupazione giovanile è superiore al tasso generale, all'8,2%, ma resta tra le più basse d'Europa. Il sistema di formazione duale (apprendistato) aiuta i giovani a inserirsi nel mondo del lavoro: due terzi dei giovani scelgono la formazione professionale.",
  },
  "labor-participation": {
    question:
      "Qual è il tasso di partecipazione alla forza lavoro in Svizzera?",
    explanation:
      "La Svizzera ha uno dei tassi di partecipazione alla forza lavoro più alti al mondo, con l'84%. Questo include un'elevata partecipazione femminile (79%), anche se molte donne lavorano a tempo parziale. Il mercato del lavoro solido e un carico fiscale relativamente contenuto incoraggiano la partecipazione.",
  },
  "part-time-rate": {
    question:
      "Quale percentuale di lavoratori svizzeri lavora a tempo parziale?",
    explanation:
      "Il 38% dei lavoratori svizzeri lavora a tempo parziale, una delle percentuali più alte d'Europa. Questo è particolarmente diffuso tra le donne (59% a tempo parziale) e riflette sia scelte personali sia considerazioni legate alla custodia dei figli. Il lavoro a tempo parziale è ben tutelato e spesso include prestazioni proporzionali.",
  },
  "weekly-work-hours": {
    question:
      "Qual è la media settimanale di ore lavorative in Svizzera?",
    explanation:
      "Con 41,1 ore settimanali, la Svizzera supera la media UE (37,5 ore). Tuttavia, la produttività è elevata: i lavoratori producono di più per ora rispetto alla maggior parte dei paesi, il che consente salari competitivi.",
  },
  "purchasing-power-rank": {
    question:
      "In quale posizione si colloca la Svizzera per potere d'acquisto (salari corretti)?",
    explanation:
      "Sebbene la Svizzera abbia i salari lordi più alti al mondo, quando si tiene conto del costo della vita (parità di potere d'acquisto) si colloca circa al 4° posto. Gli alti costi dell'alloggio e dei premi assicurativi sanitari riducono significativamente il potere d'acquisto reale rispetto ai salari nominali.",
  },
  "median-salary": {
    question:
      "Qual è il salario mensile lordo mediano in Svizzera (tempo pieno)?",
    explanation:
      "Il salario lordo mediano è di 6'788 CHF al mese (dati 2022). Ciò significa che metà dei lavoratori guadagna di più e metà di meno. Al netto delle deduzioni per le assicurazioni sociali (circa il 13%) e delle imposte (variabili per cantone), il reddito netto è in genere il 70-80% del lordo.",
  },
  "gender-pay-gap": {
    question: "Qual è il divario salariale di genere in Svizzera?",
    explanation:
      "Le donne guadagnano in media il 10,8% in meno degli uomini a parità di lavoro (divario non spiegato). Il divario totale è più ampio (circa il 18%) se si includono tutti i fattori. I progressi sono stati lenti, ma la legge sulla parità salariale del 2020 impone alle aziende con più di 100 dipendenti di effettuare analisi salariali.",
  },
  "gini-coefficient": {
    question:
      "Qual è il coefficiente di Gini della Svizzera (indice di disuguaglianza dei redditi, 0-100)?",
    explanation:
      "Il coefficiente di Gini della Svizzera, pari a 32,8, indica una disuguaglianza dei redditi moderata, simile a quella di Germania e Francia. Il sistema fiscale progressivo e i trasferimenti sociali contribuiscono a ridurre la disuguaglianza. La disuguaglianza patrimoniale è più elevata di quella dei redditi.",
  },
  "snb-shock": {
    question:
      "Di quanto è sceso il tasso EUR/CHF il 15 gennaio 2015 (shock BNS)?",
    explanation:
      "Il 15 gennaio 2015, la Banca nazionale svizzera ha improvvisamente rimosso il tasso minimo EUR/CHF, causando un apprezzamento del franco del 20% in pochi minuti. Questo 'Frankenshock' ha colpito significativamente gli esportatori e il turismo, dimostrando che anche il franco svizzero può subire una forte volatilità.",
  },
  "export-gdp-share": {
    question: "Quale percentuale del PIL svizzero proviene dalle esportazioni?",
    explanation:
      "Le esportazioni rappresentano circa il 76% del PIL, rendendo la Svizzera una delle economie più dipendenti dal commercio estero. Le principali esportazioni sono prodotti farmaceutici (35%), macchinari e orologi (20%) e prodotti chimici (15%). L'UE è il maggiore partner commerciale (45% delle esportazioni).",
  },
  "snb-gold-reserves": {
    question:
      "Quante tonnellate d'oro detiene la Banca nazionale svizzera?",
    explanation:
      "La BNS detiene circa 1'040 tonnellate d'oro, risultando uno dei maggiori detentori al mondo pro capite. Nel 2014 un referendum che proponeva di imporre una copertura aurea del 20% per il franco è stato respinto (77% di no). L'oro è custodito in Svizzera, nel Regno Unito e in Canada.",
  },
  "wealth-managed": {
    question:
      "Quale quota della ricchezza privata mondiale transfrontaliera gestisce la Svizzera?",
    explanation:
      "La Svizzera gestisce circa il 27% della ricchezza privata transfrontaliera mondiale (circa 2'400 miliardi di CHF), confermandosi leader globale nella gestione patrimoniale. Questa quota è diminuita dal 50% e oltre degli anni 2000 a causa della crescente concorrenza e della pressione sul segreto bancario.",
  },
  "number-of-banks": {
    question: "Quante banche operano in Svizzera?",
    explanation:
      "La Svizzera conta circa 235 banche (2023), in calo rispetto alle oltre 400 del 2000 a causa del consolidamento e della pressione normativa. Queste comprendono 24 banche cantonali, 2 grandi banche (UBS, dopo la fusione con CS), 60 banche estere e numerose banche private e regionali.",
  },
  "asylum-budget": {
    question:
      "Quale percentuale del bilancio federale è destinata all'asilo e ai rifugiati?",
    explanation:
      "I costi per l'asilo rappresentano circa lo 0,9% del bilancio federale (circa 700 milioni di CHF su un totale di 78 miliardi di CHF). Per confronto, la difesa assorbe il 6,2%, l'istruzione l'8,1% e i trasporti l'11,3%.",
  },
  "public-debt-gdp": {
    question: "Qual è il debito pubblico svizzero in percentuale del PIL?",
    explanation:
      "Il debito pubblico svizzero è circa il 38% del PIL, uno dei più bassi tra i paesi sviluppati. La norma costituzionale del 'freno all'indebitamento', in vigore dal 2003, impone bilanci in pareggio nell'arco del ciclo economico, impedendo deficit strutturali.",
  },
  "tax-revenue-gdp": {
    question:
      "Qual è il gettito fiscale totale della Svizzera in percentuale del PIL?",
    explanation:
      "Con il 27% del PIL, la Svizzera ha uno dei carichi fiscali più bassi tra i paesi OCSE. Ciò è dovuto a imposte sul reddito relativamente basse (soprattutto cantonali), all'assenza di imposta di successione nella maggior parte dei cantoni e ad aliquote competitive per le imprese. Tuttavia, l'assicurazione sanitaria obbligatoria aumenta il carico effettivo.",
  },
  "defense-spending": {
    question:
      "Quale percentuale del bilancio federale svizzero è destinata alla difesa?",
    explanation:
      "La spesa per la difesa è circa il 6,2% del bilancio federale (circa 5 miliardi di CHF all'anno), ovvero circa lo 0,7% del PIL. Questo è inferiore alla soglia del 2% del PIL raccomandata dalla NATO. Esistono piani per aumentare la spesa all'1% del PIL entro il 2030 in seguito ai cambiamenti geopolitici.",
  },
  "gdp-growth-years": {
    question:
      "In quanti degli ultimi 10 anni la Svizzera ha registrato una crescita positiva del PIL?",
    explanation:
      "La Svizzera ha avuto una crescita positiva del PIL in 9 degli ultimi 10 anni. L'unica eccezione è stata il 2020 (COVID-19). L'economia si è dimostrata notevolmente resiliente attraverso lo shock del franco del 2015, la Brexit e la crisi energetica.",
  },
  "population-density": {
    question:
      "Qual è la densità di popolazione della Svizzera (abitanti per km²)?",
    explanation:
      "La Svizzera ha 220 abitanti per km². Tuttavia, il 60% del territorio è costituito dalle Alpi. L'Altopiano abitabile è più densamente popolato, paragonabile alle regioni urbane dei paesi confinanti.",
  },
  "total-population": {
    question: "Qual è la popolazione totale della Svizzera (in milioni)?",
    explanation:
      "La popolazione svizzera ha raggiunto 8,9 milioni nel 2024 ed è in costante crescita grazie all'immigrazione. La popolazione è raddoppiata dal 1950 (4,7 milioni). Le proiezioni indicano 10 milioni entro il 2040 se le tendenze attuali si mantengono.",
  },
  "urban-population": {
    question:
      "Quale percentuale della popolazione svizzera vive in aree urbane?",
    explanation:
      "Circa il 74% dei residenti svizzeri vive in aree urbane, sebbene la Svizzera non abbia megalopoli. L'agglomerazione più grande (Zurigo) conta 1,4 milioni di abitanti. Il paese mantiene una struttura policentrica con diverse città di medie dimensioni.",
  },
  "number-municipalities": {
    question: "Quanti comuni (Gemeinden) ha la Svizzera?",
    explanation:
      "La Svizzera ha 2'131 comuni (2024), in calo rispetto agli oltre 3'200 del 1850 a causa delle fusioni in corso. Il più piccolo (Corippo, TI) ha circa 9 abitanti; il più grande (Zurigo) ne ha 430'000. Le fusioni comunali continuano per migliorare l'efficienza.",
  },
  "net-migration-rate": {
    question:
      "Qual è il tasso di migrazione netta annuo della Svizzera (per 1'000 abitanti)?",
    explanation:
      "La migrazione netta è relativamente stabile dal 2015, con una media di 50'000-70'000 persone all'anno (7-8 per 1'000). Circa il 60% degli immigrati proviene da paesi UE/AELS, principalmente per lavoro. Questo tasso è simile a quello di altri paesi ricchi come Canada e Australia.",
  },
  "foreign-population": {
    question:
      "Quale percentuale dei residenti permanenti in Svizzera è di nazionalità straniera?",
    explanation:
      "Il 26% dei residenti permanenti (2,3 milioni di persone) è di nazionalità straniera, una delle percentuali più alte d'Europa. I gruppi più numerosi sono italiani (320'000), tedeschi (315'000), portoghesi (260'000) e francesi (145'000). Molti sono residenti di lunga data.",
  },
  "cross-border-commuters": {
    question:
      "Quanti frontalieri lavorano in Svizzera ogni giorno?",
    explanation:
      "Circa 390'000 lavoratori frontalieri ('Grenzgänger') fanno il pendolare quotidianamente verso la Svizzera dalla Francia (210'000), dall'Italia (90'000), dalla Germania (65'000) e dall'Austria (8'000). Contribuiscono in modo significativo all'economia, soprattutto a Ginevra, Basilea e in Ticino.",
  },
  "fertility-rate": {
    question:
      "Qual è il tasso di fecondità totale della Svizzera (figli per donna)?",
    explanation:
      "Il tasso di fecondità svizzero di 1,39 è inferiore al livello di sostituzione di 2,1, similmente alla maggior parte dei paesi europei. È rimasto stabile dal 2000. Senza l'immigrazione, la popolazione diminuirebbe. L'età media delle madri al primo figlio è di 31 anni.",
  },
  "average-marriage-age": {
    question:
      "Qual è l'età media al primo matrimonio in Svizzera?",
    explanation:
      "L'età media al primo matrimonio è di 32,5 anni (uomini: 33,5, donne: 31,5), in aumento rispetto ai 28 anni del 1990. Circa il 40% delle coppie sceglie la convivenza senza matrimonio. Il matrimonio tra persone dello stesso sesso è stato legalizzato nel 2022 dopo un referendum.",
  },
  "population-over-65": {
    question:
      "Quale percentuale della popolazione svizzera ha più di 65 anni?",
    explanation:
      "Il 19,4% della popolazione (1,7 milioni di persone) ha più di 65 anni e si prevede che raggiunga il 26% entro il 2050. Questo invecchiamento demografico ha conseguenze per il sistema pensionistico (AVS), i costi sanitari e l'offerta di lavoro. L'aspettativa di vita è di 84 anni.",
  },
  "health-subsidies": {
    question:
      "Quale percentuale della popolazione svizzera riceve sussidi per l'assicurazione sanitaria?",
    explanation:
      "Circa il 26% della popolazione svizzera riceve la riduzione dei premi (Prämienverbilligung). Il premio medio è di 359 CHF al mese, ma i sussidi possono coprire fino al 100% per le famiglie a basso reddito. Circa l'8% riceve una copertura completa, mentre il 18% riceve sussidi parziali.",
  },
  "life-expectancy": {
    question: "Qual è l'aspettativa di vita alla nascita in Svizzera?",
    explanation:
      "L'aspettativa di vita in Svizzera è di 84 anni (donne: 85,7, uomini: 82,3), tra le più alte al mondo. Ciò riflette un sistema sanitario di qualità, elevati standard di vita e uno stile di vita sano. Il divario tra uomini e donne si è ridotto nel corso dei decenni.",
  },
  "hospital-beds": {
    question:
      "Quanti posti letto ospedalieri ha la Svizzera ogni 1'000 abitanti?",
    explanation:
      "La Svizzera ha 4,5 posti letto ogni 1'000 abitanti, leggermente al di sopra della media UE. Il paese dispone di circa 280 ospedali, con capacità variabile per cantone. Zurigo e Berna hanno il maggior numero di posti letto; i cantoni rurali si affidano spesso agli ospedali regionali.",
  },
  "health-spending-gdp": {
    question:
      "Quale percentuale del PIL la Svizzera spende per la sanità?",
    explanation:
      "La Svizzera destina l'11,3% del PIL alla sanità, una delle percentuali più alte al mondo dopo gli USA. Ciò equivale a circa 8'000 CHF per persona all'anno. Il sistema garantisce una copertura universale, ma i costi continuano a crescere più rapidamente dei redditi.",
  },
  "university-graduation": {
    question:
      "Quale percentuale di giovani adulti (25-34 anni) possiede un titolo di studio terziario?",
    explanation:
      "Il 53% dei 25-34enni possiede un'istruzione terziaria (universitaria o professionale superiore), al di sopra della media OCSE. La Svizzera valorizza sia il percorso accademico sia quello professionale: circa il 66% dei giovani sceglie l'apprendistato, che è molto rispettato.",
  },
  "apprenticeship-rate": {
    question:
      "Quale percentuale di giovani svizzeri sceglie la formazione professionale (apprendistato)?",
    explanation:
      "Circa il 66% dei giovani svizzeri sceglie il percorso di formazione professionale ('Berufslehre'), che combina lavoro pratico e formazione scolastica. Questo 'sistema duale' è considerato un fattore chiave per la bassa disoccupazione giovanile. Oltre 230 professioni offrono programmi di apprendistato.",
  },
  "education-spending-gdp": {
    question:
      "Quale percentuale del PIL la Svizzera spende per l'istruzione?",
    explanation:
      "La Svizzera spende circa il 5,0% del PIL per l'istruzione, vicino alla media OCSE. La maggior parte dei finanziamenti proviene dai cantoni (scuola primaria e secondaria) e dal governo federale (università, formazione professionale). La spesa per studente è tra le più alte al mondo.",
  },
  "homeownership-rate": {
    question:
      "Qual è il tasso di proprietà immobiliare in Svizzera?",
    explanation:
      "Il tasso di proprietà immobiliare in Svizzera si aggira intorno al 36-38%, uno dei più bassi d'Europa. Ciò è dovuto in gran parte a un mercato dell'affitto solido e ben regolamentato, con tutele per gli inquilini. Il tasso è rimasto stabile per decenni e riflette preferenze culturali tanto quanto questioni di accessibilità economica.",
  },
  "average-rent": {
    question:
      "Qual è l'affitto mensile medio per un appartamento di 3 locali in Svizzera?",
    explanation:
      "L'affitto medio per un appartamento di 3 locali è di circa 1'450 CHF al mese a livello nazionale, ma varia enormemente: Zurigo/Ginevra (circa 2'000 CHF e oltre) contro aree rurali (circa 1'000 CHF). Esiste un controllo degli affitti tramite il sistema del 'tasso ipotecario di riferimento'. Circa il 60% degli svizzeri vive in affitto.",
  },
  "vacancy-rate": {
    question: "Qual è il tasso di sfitto in Svizzera?",
    explanation:
      "Il tasso di sfitto è solo dell'1,15%, a indicare un mercato immobiliare teso. È aumentato rispetto ai minimi storici dello 0,5% nel 2014 ma resta basso rispetto agli standard internazionali. La carenza è più acuta a Zurigo, Ginevra e Losanna.",
  },
  "violent-crime-change": {
    question:
      "Di quanto è variata la criminalità violenta in Svizzera dal 2012?",
    explanation:
      "La criminalità violenta in Svizzera è diminuita di circa il 18% dal 2012. Sebbene alcune categorie come la criminalità informatica siano aumentate, i tassi complessivi di criminalità restano bassi rispetto agli standard internazionali. La Svizzera ha uno dei tassi di omicidio più bassi d'Europa, pari a 0,5 ogni 100'000 abitanti.",
  },
  "homicide-rate": {
    question:
      "Qual è il tasso di omicidio in Svizzera (ogni 100'000 abitanti)?",
    explanation:
      "Il tasso di omicidio in Svizzera è di 0,5 ogni 100'000 abitanti, tra i più bassi al mondo. Si verificano circa 40-50 omicidi all'anno. Nonostante l'elevata diffusione di armi da fuoco (per il servizio militare), gli omicidi con armi da fuoco sono rari. La maggior parte degli omicidi avviene in ambito domestico.",
  },
  "prison-population": {
    question:
      "Qual è il tasso di detenzione in Svizzera (ogni 100'000 abitanti)?",
    explanation:
      "La Svizzera ha 77 detenuti ogni 100'000 abitanti, un tasso relativamente basso rispetto agli standard internazionali. Il sistema penitenziario privilegia la riabilitazione. Circa il 70% dei detenuti è di nazionalità straniera, il che riflette sia la prossimità delle frontiere sia l'espulsione dopo l'esecuzione della pena.",
  },
  "burglary-rate": {
    question:
      "Quanti furti con scasso si verificano ogni 100'000 abitanti all'anno in Svizzera?",
    explanation:
      "La Svizzera registra circa 280 furti con scasso ogni 100'000 abitanti, un dato in significativo calo rispetto ai 450 e oltre del 2012. La diminuzione è attribuita a migliori misure di sicurezza e alla cooperazione di polizia transfrontaliera. I cantoni di confine tendono ad avere tassi più elevati.",
  },
  "nuclear-electricity": {
    question:
      "Quale percentuale dell'elettricità svizzera proviene dall'energia nucleare?",
    explanation:
      "Il nucleare fornisce circa il 32% dell'elettricità svizzera, mentre l'energia idroelettrica domina con il 62%. Nel 2017 la Svizzera ha votato per l'uscita dal nucleare: non verranno costruite nuove centrali. I 4 reattori rimanenti resteranno in funzione fino a fine vita.",
  },
  "co2-per-capita": {
    question:
      "Quali sono le emissioni di CO2 pro capite della Svizzera (tonnellate all'anno)?",
    explanation:
      "La Svizzera emette 4,2 tonnellate di CO2 pro capite, al di sotto della media UE grazie all'energia idroelettrica e nucleare. Tuttavia, questo dato esclude le emissioni dei beni importati e dell'aviazione. Includendo le emissioni basate sui consumi, la cifra si avvicina a 12 tonnellate.",
  },
  "renewable-energy-share": {
    question:
      "Quale percentuale del consumo energetico totale della Svizzera proviene da fonti rinnovabili?",
    explanation:
      "Circa il 30% dell'energia totale della Svizzera proviene da fonti rinnovabili, prevalentemente dall'energia idroelettrica (60% dell'elettricità). Il solare e l'eolico sono in crescita ma restano marginali. Nota: l'elettricità è rinnovabile al 76%, ma il riscaldamento e i trasporti dipendono ancora molto dai combustibili fossili.",
  },
  "recycling-rate": {
    question: "Qual è il tasso di riciclaggio in Svizzera?",
    explanation:
      "La Svizzera ricicla circa il 53% dei propri rifiuti, tra le percentuali più alte al mondo. Il sistema si basa molto sulla partecipazione dei cittadini: il riciclaggio è volontario ma ampiamente praticato. Le raccolte differenziate per vetro (94% riciclato), carta (82%), PET (82%) e alluminio (91%) hanno grande successo.",
  },
  "train-punctuality": {
    question:
      "Quale percentuale dei treni FFS arriva entro 3 minuti dall'orario previsto?",
    explanation:
      "Le Ferrovie federali svizzere (FFS) raggiungono il 92,5% di puntualità (entro 3 minuti), un risultato eccellente rispetto agli standard internazionali. Lo Shinkansen giapponese raggiunge il 99%. I ritardi si verificano soprattutto nelle ore di punta e in caso di maltempo.",
  },
  "train-track-km": {
    question: "Quanti chilometri di binari ferroviari ha la Svizzera?",
    explanation:
      "La Svizzera dispone di 5'384 km di binari ferroviari, una delle reti più dense in rapporto alla superficie al mondo. La rete include la celebre Galleria di base del San Gottardo (57 km, il tunnel ferroviario più lungo del mondo) e trasporta 1,3 milioni di passeggeri al giorno.",
  },
  "average-commute": {
    question:
      "Qual è il tempo medio di pendolarismo in Svizzera (solo andata, in minuti)?",
    explanation:
      "Il tempo medio di pendolarismo è di 31 minuti per tragitto. Circa il 52% si sposta in auto, il 31% con i trasporti pubblici e il 15% a piedi o in bicicletta. I tempi di percorrenza sono aumentati perché le persone vivono più lontano dal lavoro, in parte grazie all'eccellente rete di trasporti pubblici.",
  },
  "cars-per-capita": {
    question: "Quante automobili ci sono ogni 1'000 abitanti in Svizzera?",
    explanation:
      "La Svizzera conta circa 550 automobili ogni 1'000 abitanti, in linea con Germania e Austria. Nonostante un eccellente sistema di trasporti pubblici, il tasso di motorizzazione resta elevato. I veicoli elettrici sono in rapida crescita e hanno raggiunto il 25% delle nuove immatricolazioni nel 2023.",
  },
  "ahv-funding": {
    question:
      "Fino a quale anno l'AVS (primo pilastro) è finanziata secondo le attuali proiezioni?",
    explanation:
      "L'AVS è finanziata almeno fino al 2032 dopo la riforma del 2022 (AVS21). Il sistema svizzero a tre pilastri (AVS + cassa pensione + risparmio privato) garantisce una sicurezza pensionistica diversificata. La riforma del 2022 ha innalzato l'età di pensionamento delle donne a 65 anni e aumentato il finanziamento tramite IVA.",
  },
  "poverty-rate": {
    question:
      "Quale percentuale della popolazione svizzera vive al di sotto della soglia di povertà?",
    explanation:
      "Circa l'8,2% della popolazione svizzera (oltre 700'000 persone) è a rischio di povertà. Le categorie più colpite sono genitori soli, donne anziane e persone senza formazione post-obbligatoria. Questo dato è inferiore alla media UE del 16%.",
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
  const t = indicatorTranslationsIT[id];
  if (!t) return fields;
  return {
    name: t.name,
    shortName: t.shortName,
    description: t.description,
    context: t.context || fields.context,
  };
}

// Helper function to get localized question fields
export function getLocalizedQuestion(
  id: string,
  fields: { question: string; explanation: string },
  locale: Locale
): { question: string; explanation: string } {
  if (locale === "en") return fields;
  const t = questionTranslationsIT[id];
  if (!t) return fields;
  return {
    question: t.question,
    explanation: t.explanation,
  };
}
