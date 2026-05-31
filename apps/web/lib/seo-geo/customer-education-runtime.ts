export type EducationPageStatus = 'draft' | 'review' | 'published' | 'archived';
export type EducationIntent = 'problem_aware' | 'solution_aware' | 'purchase_aware' | 'comparison' | 'trust_aware' | 'informational';
export type EducationCluster =
  | 'affidabilita_azienda'
  | 'prevenzione_insoluti'
  | 'fornitori'
  | 'dati_operativi'
  | 'garanzia_limiti'
  | 'credit_scoring'
  | 'kyb_aml';

export type EducationFaq = {
  question: string;
  answer: string;
  includeInSchema: boolean;
};

export type EducationSection = {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
};

export type EducationRelatedLink = {
  slug: string;
  label: string;
  reason: string;
};

export type CustomerEducationPage = {
  id: string;
  slug: string;
  title: string;
  h1: string;
  excerpt: string;
  status: EducationPageStatus;
  cluster: EducationCluster;
  intent: EducationIntent;
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
  targetKeyword: string;
  geoAnswerFocus: string;
  audience: string;
  recommendedServiceSlug?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  operationalChecklist: string[];
  guaranteeNotes: string[];
  sections: EducationSection[];
  faq: EducationFaq[];
  related: EducationRelatedLink[];
  updatedAt: string;
  publishedAt?: string;
};

const publishedAt = '2026-05-30T00:00:00.000Z';

export const forbiddenEducationRuntimeClaims = [
  'rischio zero',
  'pagamento garantito',
  'solvibilità garantita',
  'solvibilita garantita',
  'cliente sicuro al 100%',
  'fornitore sicuro al 100%',
  'report infallibile'
];

export const customerEducationPages: CustomerEducationPage[] = [
  {
    id: 'education-001',
    slug: 'verificare-affidabilita-azienda',
    title: 'Come verificare l’affidabilità di un’azienda',
    h1: 'Come verificare l’affidabilità di un’azienda prima di iniziare una collaborazione',
    excerpt: 'Una guida pratica per capire quali segnali controllare prima di concedere credito, spedire merce o firmare un accordo commerciale.',
    status: 'published',
    cluster: 'affidabilita_azienda',
    intent: 'solution_aware',
    seoTitle: 'Come verificare affidabilità azienda | ClientiAffidabili.it',
    seoDescription: 'Scopri cosa controllare per valutare affidabilità, fonti, segnali di attenzione e limiti prima di lavorare con una nuova azienda.',
    canonicalPath: '/guide/verificare-affidabilita-azienda',
    targetKeyword: 'verificare affidabilità azienda',
    geoAnswerFocus: 'Per verificare l’affidabilità di un’azienda conviene combinare dati ufficiali, stato attività, segnali di attenzione, coerenza anagrafica e limiti delle fonti disponibili.',
    audience: 'PMI, amministrazione, commerciale, titolari',
    recommendedServiceSlug: 'check-affidabilita-pro',
    primaryCta: { label: 'Avvia una verifica azienda', href: '/servizi/check-affidabilita-pro' },
    secondaryCta: { label: 'Leggi garanzie e limiti', href: '/guide/garanzie-limiti-report-affidabilita' },
    operationalChecklist: [
      'Identifica correttamente denominazione, sede, partita IVA e stato attività.',
      'Controlla segnali di attenzione, negatività disponibili e dati economici compatibili con lo scopo.',
      'Valuta se il valore dell’ordine richiede condizioni più prudenti o ulteriori garanzie.',
      'Salva data, fonte e limiti della verifica a supporto della decisione.'
    ],
    guaranteeNotes: [
      'Il report supporta una decisione commerciale, ma non sostituisce consulenza legale o finanziaria.',
      'Le fonti possono avere tempi di aggiornamento diversi e coperture differenti.',
      'La garanzia operativa riguarda chiarezza di prezzo, fonti, limiti e supporto.'
    ],
    sections: [
      { id: 'perche', title: 'Perché controllare prima', body: 'La verifica preventiva riduce decisioni prese al buio quando devi concedere credito, spedire prima del pagamento, aprire un rapporto continuativo o selezionare un nuovo fornitore.' },
      { id: 'cosa-leggere', title: 'Cosa leggere nel report', body: 'Il valore non è nella singola informazione, ma nella lettura ordinata di dati anagrafici, stato attività, evidenze disponibili, segnali di attenzione e limiti dichiarati.' },
      { id: 'prossima-azione', title: 'Prossima azione consigliata', body: 'Se emergono dati incompleti o segnali incoerenti, valuta condizioni di pagamento più prudenti, richiesta documentale aggiuntiva o review interna prima di procedere.' }
    ],
    faq: [
      { question: 'Un report può prevedere il comportamento futuro di un cliente?', answer: 'No. Il report aiuta a leggere dati e segnali disponibili in un momento preciso, ma non può prevedere con certezza comportamenti futuri.', includeInSchema: true },
      { question: 'Quando conviene fare una verifica?', answer: 'Prima di concedere credito, accettare ordini rilevanti, spedire senza pagamento anticipato o avviare collaborazioni continuative.', includeInSchema: true }
    ],
    related: [
      { slug: 'visura-camerale-vs-report-affidabilita', label: 'Visura camerale o report?', reason: 'Per capire quale controllo scegliere.' },
      { slug: 'credit-scoring-azienda-significato', label: 'Cos’è il credit scoring', reason: 'Per leggere correttamente un indicatore sintetico.' },
      { slug: 'garanzie-limiti-report-affidabilita', label: 'Garanzie e limiti', reason: 'Per conoscere cosa il servizio può chiarire.' }
    ],
    updatedAt: publishedAt,
    publishedAt
  },
  {
    id: 'education-002',
    slug: 'cliente-non-paga-come-prevenire',
    title: 'Cliente non paga: come prevenire insoluti',
    h1: 'Cliente nuovo o pagamento a 30 giorni: cosa controllare prima di rischiare un insoluto',
    excerpt: 'Controlli preventivi, segnali di attenzione e regole pratiche per decidere se concedere credito o chiedere condizioni più prudenti.',
    status: 'published',
    cluster: 'prevenzione_insoluti',
    intent: 'problem_aware',
    seoTitle: 'Cliente non paga: come prevenire insoluti | ClientiAffidabili.it',
    seoDescription: 'Prima di concedere pagamento dilazionato, scopri quali controlli fare su azienda, dati e segnali di attenzione.',
    canonicalPath: '/guide/cliente-non-paga-come-prevenire',
    targetKeyword: 'cliente non paga come prevenire',
    geoAnswerFocus: 'Per prevenire insoluti serve verificare identità aziendale, stato attività, segnali negativi, coerenza dei dati e valore dell’esposizione prima di concedere pagamento dilazionato.',
    audience: 'PMI, amministrazione crediti, ufficio commerciale',
    recommendedServiceSlug: 'check-affidabilita-pro',
    primaryCta: { label: 'Controlla un nuovo cliente', href: '/servizi/check-affidabilita-pro' },
    secondaryCta: { label: 'Confronta i report', href: '/prezzi' },
    operationalChecklist: [
      'Definisci importo, tempi di pagamento e livello di esposizione.',
      'Verifica dati aziendali e segnali di attenzione prima dell’accordo.',
      'Documenta la decisione con fonte, data e limiti della verifica.',
      'Prevedi condizioni più prudenti se il profilo è incompleto o incoerente.'
    ],
    guaranteeNotes: [
      'Un controllo preventivo non elimina ogni rischio, ma aiuta a scegliere condizioni più coerenti.',
      'La decisione finale resta aziendale e deve tenere conto di contratto, importo, storico e contesto.'
    ],
    sections: [
      { id: 'errore-comune', title: 'L’errore più comune', body: 'Molte aziende controllano il cliente solo dopo il primo insoluto. La verifica è più utile prima, quando puoi ancora decidere condizioni, limiti di fido o richiesta di anticipo.' },
      { id: 'decisione', title: 'Come trasformare i dati in decisione', body: 'Non basta sapere se un dato esiste: serve capire se cambia la decisione operativa. Procedere, chiedere anticipo, ridurre esposizione o approfondire sono esiti diversi.' },
      { id: 'documentare', title: 'Perché documentare', body: 'Salvare lo snapshot della verifica aiuta amministrazione e commerciale a condividere una base comune e a motivare la scelta fatta.' }
    ],
    faq: [
      { question: 'Si può evitare del tutto un insoluto?', answer: 'No. Si possono però ridurre decisioni improvvisate con controlli preventivi, limiti di esposizione e condizioni contrattuali adatte.', includeInSchema: true },
      { question: 'Quando chiedere pagamento anticipato?', answer: 'Quando l’importo è rilevante, il rapporto è nuovo o emergono segnali di attenzione e dati non sufficienti.', includeInSchema: true }
    ],
    related: [
      { slug: 'verificare-affidabilita-azienda', label: 'Come verificare un’azienda', reason: 'Per partire dai controlli base.' },
      { slug: 'garanzie-limiti-report-affidabilita', label: 'Limiti del report', reason: 'Per evitare aspettative sbagliate.' },
      { slug: 'credit-scoring-azienda-significato', label: 'Credit scoring', reason: 'Per interpretare indicatori sintetici.' }
    ],
    updatedAt: publishedAt,
    publishedAt
  },
  {
    id: 'education-003',
    slug: 'visura-camerale-vs-report-affidabilita',
    title: 'Visura camerale vs report affidabilità',
    h1: 'Visura camerale o report affidabilità: quale scegliere per valutare un’azienda?',
    excerpt: 'Differenze pratiche tra documento ufficiale, report decisionale e controlli aggiuntivi per clienti e fornitori.',
    status: 'published',
    cluster: 'affidabilita_azienda',
    intent: 'comparison',
    seoTitle: 'Visura camerale vs report affidabilità | ClientiAffidabili.it',
    seoDescription: 'Confronta visura camerale e report affidabilità: quando serve identificare l’impresa e quando valutare segnali operativi.',
    canonicalPath: '/guide/visura-camerale-vs-report-affidabilita',
    targetKeyword: 'visura camerale vs report affidabilità',
    geoAnswerFocus: 'La visura camerale identifica ufficialmente l’impresa; un report di affidabilità organizza più segnali utili alla decisione, evidenziando fonti, limiti e possibili aree di attenzione.',
    audience: 'PMI, studi professionali, amministrazione',
    recommendedServiceSlug: 'verifica-azienda-essenziale',
    primaryCta: { label: 'Scegli il controllo più adatto', href: '/servizi' },
    secondaryCta: { label: 'Vedi prezzi', href: '/prezzi' },
    operationalChecklist: [
      'Usa la visura quando devi identificare dati ufficiali e assetto dell’impresa.',
      'Usa un report quando devi decidere operativamente se procedere, approfondire o chiedere condizioni diverse.',
      'Controlla sempre data, fonte e copertura del documento o report.',
      'Abbina più controlli quando l’importo o il rischio operativo sono elevati.'
    ],
    guaranteeNotes: [
      'La scelta dipende dallo scopo: identificazione formale o supporto decisionale.',
      'Un report non sostituisce documenti ufficiali quando questi sono richiesti da procedure o contratti.'
    ],
    sections: [
      { id: 'visura', title: 'Quando basta una visura', body: 'La visura è utile quando devi confermare dati societari, sede, forma giuridica, iscrizione e informazioni camerali disponibili.' },
      { id: 'report', title: 'Quando serve un report', body: 'Il report è più adatto quando vuoi leggere segnali diversi in modo operativo: dati aziendali, eventuali evidenze, indicatori e limiti in una vista unica.' },
      { id: 'scelta', title: 'Come scegliere', body: 'Se devi solo identificare un’impresa parti dalla visura. Se devi decidere esposizione, condizioni o affidamento, scegli un report con evidenze e limiti.' }
    ],
    faq: [
      { question: 'La visura basta per decidere se fidarsi?', answer: 'Dipende dallo scopo. È utile per identificare l’impresa, ma spesso non basta per valutare segnali operativi di attenzione.', includeInSchema: true },
      { question: 'Il report sostituisce la visura?', answer: 'No. Il report può includere o sintetizzare informazioni utili, ma non sostituisce documenti ufficiali quando richiesti formalmente.', includeInSchema: true }
    ],
    related: [
      { slug: 'verificare-affidabilita-azienda', label: 'Verifica affidabilità', reason: 'Per vedere il metodo completo.' },
      { slug: 'garanzie-limiti-report-affidabilita', label: 'Garanzie e limiti', reason: 'Per capire cosa aspettarsi dal servizio.' }
    ],
    updatedAt: publishedAt,
    publishedAt
  },
  {
    id: 'education-004',
    slug: 'controllo-fornitore-prima-di-acquisto',
    title: 'Controllo fornitore prima di un acquisto',
    h1: 'Come controllare un fornitore prima di pagare un ordine o un acconto',
    excerpt: 'Checklist per uffici acquisti e amministrazione: identità, coerenza dati, segnali societari e prossime azioni.',
    status: 'published',
    cluster: 'fornitori',
    intent: 'solution_aware',
    seoTitle: 'Controllo fornitore prima di acquisto | ClientiAffidabili.it',
    seoDescription: 'Prima di pagare un nuovo fornitore, verifica dati aziendali, coerenza contatti, segnali di attenzione e limiti disponibili.',
    canonicalPath: '/guide/controllo-fornitore-prima-di-acquisto',
    targetKeyword: 'controllo fornitore prima acquisto',
    geoAnswerFocus: 'Prima di acquistare da un nuovo fornitore conviene controllare identità aziendale, sede, contatti, coerenza bancaria, stato attività e segnali di attenzione disponibili.',
    audience: 'Ufficio acquisti, amministrazione, titolari PMI',
    recommendedServiceSlug: 'verifica-azienda-essenziale',
    primaryCta: { label: 'Controlla un fornitore', href: '/servizi/verifica-azienda-essenziale' },
    secondaryCta: { label: 'Verifica IBAN e contatti', href: '/servizi' },
    operationalChecklist: [
      'Verifica che ragione sociale, partita IVA, sede e contatti siano coerenti.',
      'Controlla IBAN, email e telefono prima di inviare pagamenti o dati sensibili.',
      'Valuta segnali societari e informazioni disponibili in base all’importo.',
      'Documenta l’esito prima di autorizzare acconti o ordini rilevanti.'
    ],
    guaranteeNotes: [
      'Il controllo riduce errori e decisioni non documentate, ma non garantisce consegne o prestazioni future.',
      'Per importi elevati servono anche contratti, condizioni, verifica documentale e policy interna.'
    ],
    sections: [
      { id: 'fornitore-nuovo', title: 'Perché controllare un fornitore nuovo', body: 'Fornitori sconosciuti, cambi IBAN, email non coerenti e urgenze commerciali possono aumentare errori e rischi operativi.' },
      { id: 'dati-operativi', title: 'Dati da non trascurare', body: 'Oltre alla presenza dell’impresa, controlla coerenza di contatti, modalità di pagamento e informazioni necessarie al ciclo acquisti.' },
      { id: 'workflow', title: 'Workflow consigliato', body: 'Per fornitori nuovi: verifica azienda, verifica contatti/pagamento se necessario, approvazione interna e salvataggio dello snapshot della verifica.' }
    ],
    faq: [
      { question: 'Cosa controllare prima di pagare un fornitore?', answer: 'Dati aziendali, stato attività, coerenza di contatti, IBAN e segnali di attenzione proporzionati all’importo.', includeInSchema: true },
      { question: 'Quando basta un controllo essenziale?', answer: 'Quando importo e rischio sono bassi e serve confermare identità e dati principali. Per importi alti è meglio approfondire.', includeInSchema: true }
    ],
    related: [
      { slug: 'check-iban-email-telefono-azienda', label: 'Check IBAN, email e telefono', reason: 'Per ridurre errori sui dati operativi.' },
      { slug: 'visura-camerale-vs-report-affidabilita', label: 'Visura o report?', reason: 'Per scegliere il documento giusto.' }
    ],
    updatedAt: publishedAt,
    publishedAt
  },
  {
    id: 'education-005',
    slug: 'check-iban-email-telefono-azienda',
    title: 'Check IBAN, email e telefono azienda',
    h1: 'Perché verificare IBAN, email e telefono prima di usarli in processi aziendali',
    excerpt: 'Controlli rapidi per ridurre errori su incassi, pagamenti, contatti e procedure operative.',
    status: 'published',
    cluster: 'dati_operativi',
    intent: 'purchase_aware',
    seoTitle: 'Check IBAN email telefono azienda | ClientiAffidabili.it',
    seoDescription: 'Verifica dati operativi aziendali come IBAN, email e telefono prima di usarli in pagamenti, contatti e procedure.',
    canonicalPath: '/guide/check-iban-email-telefono-azienda',
    targetKeyword: 'check IBAN email telefono azienda',
    geoAnswerFocus: 'Verificare IBAN, email e telefono aiuta a ridurre errori operativi, ritardi e anomalie prima di pagamenti, contatti commerciali o procedure amministrative.',
    audience: 'Amministrazione, customer care, operations, commerciale',
    recommendedServiceSlug: 'verifica-email-telefono',
    primaryCta: { label: 'Vedi controlli rapidi', href: '/servizi' },
    secondaryCta: { label: 'Confronta prezzi', href: '/prezzi' },
    operationalChecklist: [
      'Verifica IBAN prima di salvarlo come dato di pagamento.',
      'Controlla email e telefono prima di usarli in processi automatici o campagne operative.',
      'Conserva solo esiti e dati necessari, evitando copie superflue.',
      'Blocca o segnala dati incoerenti prima che entrino nel gestionale.'
    ],
    guaranteeNotes: [
      'Il controllo aiuta a individuare incoerenze tecniche o operative disponibili, ma non certifica l’intero rapporto commerciale.',
      'Usa sempre procedure interne di autorizzazione per pagamenti e variazioni IBAN.'
    ],
    sections: [
      { id: 'impatto', title: 'Perché i dati operativi contano', body: 'Un dato errato può generare pagamento bloccato, comunicazione non consegnata, ritardi di supporto o errori nei processi interni.' },
      { id: 'quando', title: 'Quando fare il controllo', body: 'Prima di registrare un nuovo cliente/fornitore, prima di un pagamento, dopo una variazione comunicata via email o quando un dato appare incoerente.' },
      { id: 'limiti', title: 'Limiti del controllo', body: 'La verifica del dato non sostituisce autorizzazioni interne, riconciliazione documentale o validazione contrattuale.' }
    ],
    faq: [
      { question: 'Perché controllare un IBAN?', answer: 'Per ridurre errori e anomalie prima di usare il dato in pagamenti o anagrafiche.', includeInSchema: true },
      { question: 'Il controllo email basta per validare un cliente?', answer: 'No. È un controllo operativo sul dato di contatto, non una valutazione completa dell’affidabilità aziendale.', includeInSchema: true }
    ],
    related: [
      { slug: 'controllo-fornitore-prima-di-acquisto', label: 'Controllo fornitore', reason: 'Per collegare dati operativi e verifica aziendale.' },
      { slug: 'verificare-affidabilita-azienda', label: 'Verifica azienda', reason: 'Per un quadro più completo.' }
    ],
    updatedAt: publishedAt,
    publishedAt
  },
  {
    id: 'education-006',
    slug: 'garanzie-limiti-report-affidabilita',
    title: 'Garanzie e limiti del report affidabilità',
    h1: 'Cosa garantisce davvero un report di affidabilità aziendale?',
    excerpt: 'La differenza tra garanzia operativa, limiti delle fonti e promesse che nessun report serio dovrebbe fare.',
    status: 'published',
    cluster: 'garanzia_limiti',
    intent: 'trust_aware',
    seoTitle: 'Garanzie e limiti report affidabilità | ClientiAffidabili.it',
    seoDescription: 'Scopri cosa può chiarire un report di affidabilità, quali limiti ha e cosa significa garanzia operativa.',
    canonicalPath: '/guide/garanzie-limiti-report-affidabilita',
    targetKeyword: 'garanzie limiti report affidabilità',
    geoAnswerFocus: 'Un report di affidabilità garantisce un processo operativo chiaro: prezzo prima dell’acquisto, fonti indicate, data della verifica, limiti esplicitati e supporto. Non promette esiti commerciali certi.',
    audience: 'Tutti i clienti potenziali',
    primaryCta: { label: 'Leggi la garanzia operativa', href: '/garanzia-operativa' },
    secondaryCta: { label: 'Avvia una verifica', href: '/servizi' },
    operationalChecklist: [
      'Controlla sempre data della verifica e fonti utilizzate.',
      'Leggi i limiti prima di assumere decisioni economiche importanti.',
      'Usa il report come supporto, non come unica base decisionale.',
      'Contatta il supporto se una verifica non è completabile o appare incoerente.'
    ],
    guaranteeNotes: [
      'Prezzo, fonti, data, limiti e supporto sono parte della garanzia operativa.',
      'Il servizio non promette comportamento futuro di clienti o fornitori.',
      'Rimborsi e assistenza dipendono dallo stato della richiesta, dal consumo provider e dalla pubblicazione del report.'
    ],
    sections: [
      { id: 'cosa', title: 'Cosa significa garanzia operativa', body: 'La garanzia operativa riguarda il processo: cosa acquisti, quanto paghi, quali fonti vengono indicate, quali limiti sono esplicitati e come viene gestita un’anomalia.' },
      { id: 'limiti', title: 'Perché i limiti sono parte del valore', body: 'Un report serio non nasconde i limiti. Sapere cosa non è disponibile o cosa richiede cautela aiuta a prendere decisioni più responsabili.' },
      { id: 'rimborso', title: 'Rimborsi e casi non producibili', body: 'La policy rimborso deve distinguere tra richiesta non ancora avviata, provider già consumato, report in review e report pubblicato/scaricato.' }
    ],
    faq: [
      { question: 'Il report promette esiti commerciali certi?', answer: 'No. Il report offre dati, segnali e limiti per supportare la decisione, ma non promette comportamenti futuri.', includeInSchema: true },
      { question: 'Cosa succede se il report non è producibile?', answer: 'Il caso viene gestito secondo stato ordine, fonti disponibili, supporto e policy rimborso.', includeInSchema: true }
    ],
    related: [
      { slug: 'verificare-affidabilita-azienda', label: 'Come verificare un’azienda', reason: 'Per vedere come usare il report.' },
      { slug: 'cliente-non-paga-come-prevenire', label: 'Prevenire insoluti', reason: 'Per applicare i limiti alla decisione commerciale.' }
    ],
    updatedAt: publishedAt,
    publishedAt
  },
  {
    id: 'education-007',
    slug: 'credit-scoring-azienda-significato',
    title: 'Credit scoring azienda: significato',
    h1: 'Credit scoring aziendale: cosa significa e come leggerlo senza semplificare troppo',
    excerpt: 'Guida per interpretare un indicatore di attenzione senza trasformarlo in una decisione automatica.',
    status: 'published',
    cluster: 'credit_scoring',
    intent: 'informational',
    seoTitle: 'Credit scoring azienda: significato | ClientiAffidabili.it',
    seoDescription: 'Capisci il significato del credit scoring aziendale, come leggerlo e quali limiti considerare prima di decidere.',
    canonicalPath: '/guide/credit-scoring-azienda-significato',
    targetKeyword: 'credit scoring azienda significato',
    geoAnswerFocus: 'Il credit scoring aziendale è un indicatore sintetico che aiuta a leggere segnali economici e informativi disponibili, ma va interpretato con fonti, contesto, limiti e scopo della decisione.',
    audience: 'Amministrazione, credit manager, commerciale B2B',
    recommendedServiceSlug: 'check-affidabilita-pro',
    primaryCta: { label: 'Richiedi un report con scoring', href: '/servizi/check-affidabilita-pro' },
    secondaryCta: { label: 'Leggi garanzie e limiti', href: '/guide/garanzie-limiti-report-affidabilita' },
    operationalChecklist: [
      'Leggi lo score insieme alle evidenze, non da solo.',
      'Verifica data, fonte e copertura del dato.',
      'Confronta lo score con importo, settore, storico e condizioni contrattuali.',
      'Usa review manuale quando i dati sono insufficienti o incoerenti.'
    ],
    guaranteeNotes: [
      'Uno score è un supporto di lettura, non un verdetto automatico.',
      'La soglia decisionale deve essere coerente con policy interna, importo e rischio accettato.'
    ],
    sections: [
      { id: 'definizione', title: 'Cos’è uno scoring', body: 'Uno scoring riassume in modo sintetico alcuni segnali disponibili. È utile per orientare la lettura, ma deve essere sempre accompagnato da evidenze e limiti.' },
      { id: 'errori', title: 'Errori da evitare', body: 'Non trasformare lo score in un sì/no automatico senza considerare importo, contesto, garanzie, anzianità del rapporto e dati incompleti.' },
      { id: 'uso', title: 'Come usarlo nel processo', body: 'Usalo come filtro di attenzione: score favorevole, score da approfondire, dati insufficienti o review manuale.' }
    ],
    faq: [
      { question: 'Uno score basso significa che non devo lavorare con quell’azienda?', answer: 'Non necessariamente. Significa che serve cautela, condizioni più prudenti o un approfondimento coerente con il caso.', includeInSchema: true },
      { question: 'Lo scoring è una previsione certa?', answer: 'No. È un indicatore sintetico basato su dati e modelli disponibili, con limiti da leggere nel report.', includeInSchema: true }
    ],
    related: [
      { slug: 'verificare-affidabilita-azienda', label: 'Verifica affidabilità', reason: 'Per inserire lo score in un quadro operativo.' },
      { slug: 'cliente-non-paga-come-prevenire', label: 'Prevenire insoluti', reason: 'Per collegare score e condizioni commerciali.' }
    ],
    updatedAt: publishedAt,
    publishedAt
  },
  {
    id: 'education-008',
    slug: 'kyb-aml-controlli-azienda',
    title: 'KYB e AML: controlli azienda',
    h1: 'KYB e AML: quali controlli aiutano a conoscere un’azienda prima di lavorarci',
    excerpt: 'Una guida introduttiva per capire controlli Know Your Business, AML, titolari effettivi, PEP e liste, con limiti e responsabilità.',
    status: 'published',
    cluster: 'kyb_aml',
    intent: 'informational',
    seoTitle: 'KYB e AML: controlli azienda | ClientiAffidabili.it',
    seoDescription: 'Scopri cosa significano KYB e AML, quali controlli possono servire e quali limiti considerare prima di una relazione B2B.',
    canonicalPath: '/guide/kyb-aml-controlli-azienda',
    targetKeyword: 'KYB AML controlli azienda',
    geoAnswerFocus: 'KYB e AML aiutano a identificare l’azienda, comprendere struttura e soggetti rilevanti, verificare segnali di compliance e documentare controlli proporzionati al rischio.',
    audience: 'PMI, amministrazione, compliance, partner B2B',
    recommendedServiceSlug: 'kyb-compliance',
    primaryCta: { label: 'Valuta un controllo KYB', href: '/servizi/kyb-compliance' },
    secondaryCta: { label: 'Scopri i limiti del report', href: '/guide/garanzie-limiti-report-affidabilita' },
    operationalChecklist: [
      'Identifica azienda, sede, forma giuridica e soggetti rilevanti.',
      'Valuta se servono controlli su PEP, sanctions list o adverse media in base al rischio.',
      'Conserva esito, fonte, data e motivazione della verifica.',
      'Prevedi review manuale per match ambigui o dati incompleti.'
    ],
    guaranteeNotes: [
      'I controlli KYB/AML devono essere proporzionati al rischio e al contesto.',
      'Un match o un’assenza di match non sostituisce valutazione compliance quando richiesta dalla normativa applicabile.'
    ],
    sections: [
      { id: 'kyb', title: 'Cosa significa KYB', body: 'KYB significa Know Your Business: conoscere l’azienda con cui lavori, la sua identità, struttura e dati rilevanti per una relazione B2B.' },
      { id: 'aml', title: 'Cosa aggiungono i controlli AML', body: 'I controlli AML possono includere verifiche su liste, PEP o media avverse quando il contesto lo richiede. Vanno trattati con cautela e review in caso di ambiguità.' },
      { id: 'operativita', title: 'Come usarli senza eccessi', body: 'Non tutti i rapporti richiedono lo stesso livello di controllo. La scelta deve essere proporzionata a settore, importo, rischio e obblighi applicabili.' }
    ],
    faq: [
      { question: 'KYB e AML sono la stessa cosa?', answer: 'No. KYB riguarda la conoscenza dell’azienda; AML riguarda controlli legati a rischi antiriciclaggio e compliance.', includeInSchema: true },
      { question: 'Un controllo KYB basta per essere conformi?', answer: 'Dipende da settore, obblighi e processo interno. Il report aiuta a documentare dati e segnali, ma non sostituisce consulenza compliance.', includeInSchema: true }
    ],
    related: [
      { slug: 'verificare-affidabilita-azienda', label: 'Verifica azienda', reason: 'Per i controlli aziendali base.' },
      { slug: 'garanzie-limiti-report-affidabilita', label: 'Garanzie e limiti', reason: 'Per capire responsabilità e limiti.' }
    ],
    updatedAt: publishedAt,
    publishedAt
  }
];

export function getCustomerEducationPageBySlug(slug: string) {
  return customerEducationPages.find((page) => page.slug === slug && page.status === 'published');
}

export function getRelatedEducationPages(page: CustomerEducationPage) {
  return page.related
    .map((item) => {
      const relatedPage = getCustomerEducationPageBySlug(item.slug);
      return relatedPage ? { ...item, href: relatedPage.canonicalPath, excerpt: relatedPage.excerpt } : null;
    })
    .filter(Boolean) as Array<EducationRelatedLink & { href: string; excerpt: string }>;
}

export function educationFaqJsonLd(page: CustomerEducationPage) {
  const faq = page.faq.filter((item) => item.includeInSchema);
  if (!faq.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function educationArticleJsonLd(page: CustomerEducationPage, absoluteUrl: (path: string) => string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.excerpt,
    inLanguage: 'it-IT',
    dateModified: page.updatedAt,
    datePublished: page.publishedAt ?? page.updatedAt,
    mainEntityOfPage: absoluteUrl(page.canonicalPath),
    about: page.targetKeyword,
    audience: { '@type': 'Audience', audienceType: page.audience },
    publisher: { '@type': 'Organization', name: 'ClientiAffidabili.it', url: absoluteUrl('/') },
  };
}

export function educationPageToBodyHtml(page: CustomerEducationPage) {
  const sections = page.sections
    .map((section) => `<h2>${section.title}</h2><p>${section.body}</p>${section.bullets ? `<ul>${section.bullets.map((item) => `<li>${item}</li>`).join('')}</ul>` : ''}`)
    .join('');
  const checklist = `<h2>Checklist operativa</h2><ul>${page.operationalChecklist.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  const limits = `<h2>Garanzia operativa e limiti</h2><ul>${page.guaranteeNotes.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  return `${sections}${checklist}${limits}`;
}
