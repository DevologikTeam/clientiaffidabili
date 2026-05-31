export type ServiceProduct = {
  code: string;
  slug: string;
  name: string;
  category: string;
  delivery: string;
  description: string;
  useCase: string;
  price: string;
  bestFor: string[];
  requiredInputs: string[];
  reportOutput: string[];
  decisionHelp: string;
  complianceNote: string;
  providerCostHint: string;
};

export type Scenario = {
  id: string;
  title: string;
  description: string;
  primaryServiceCode: string;
  ctaLabel: string;
};

export type TrustSignal = {
  label: string;
  description: string;
};

export type FunnelStep = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PricingBundle = {
  name: string;
  audience: string;
  price: string;
  description: string;
  services: string[];
  ctaHref: string;
};

export const services: ServiceProduct[] = [
  {
    code: 'COMPANY_ESSENTIAL',
    slug: 'verifica-azienda-essenziale',
    name: 'Verifica azienda essenziale',
    category: 'Affidabilità B2B',
    delivery: 'pochi minuti',
    description: 'Controlla stato, dati principali e primo indicatore di affidabilità di un cliente o fornitore.',
    useCase: 'fare una pre-valutazione prima di preventivo, contratto o pagamento differito.',
    price: '€14,90',
    bestFor: ['Primo controllo su nuovo cliente', 'Preventivi con pagamento differito', 'Fornitori non ancora qualificati'],
    requiredInputs: ['Ragione sociale o partita IVA', 'Finalità professionale della verifica', 'Email operativa per ricevere aggiornamenti'],
    reportOutput: ['Anagrafica sintetica', 'Stato attività', 'Segnali iniziali', 'Sintesi decisionale'],
    decisionHelp: 'Aiuta a capire se procedere, chiedere dati aggiuntivi o passare a un controllo più approfondito.',
    complianceNote: 'Non sostituisce istruttoria creditizia, consulenza legale o valutazione bancaria.',
    providerCostHint: 'Nota interna rimossa dalla UI pubblica: il cliente deve vedere valore, fonti, limiti e prezzo finale prima del pagamento.'
  },
  {
    code: 'COMPANY_PRO',
    slug: 'check-affidabilita-pro',
    name: 'Check Affidabilità Pro',
    category: 'Risk intelligence',
    delivery: 'pochi minuti',
    description: 'Report più completo con scoring, segnali di rischio, dati aziendali e soggetti collegati.',
    useCase: 'decidere se spedire merce, concedere credito o attivare una collaborazione.',
    price: '€24,90',
    bestFor: ['Ordini B2B rilevanti', 'Contratti ricorrenti', 'Team commerciali e amministrativi'],
    requiredInputs: ['Partita IVA o ragione sociale', 'Importo o contesto della decisione', 'Conferma finalità professionale lecita'],
    reportOutput: ['Score sintetico', 'Segnali di rischio', 'Dati aziendali', 'Soggetti collegati', 'Prossima azione consigliata'],
    decisionHelp: 'È il controllo consigliato: trasforma più segnali in una pagina di decisione leggibile.',
    complianceNote: 'Lo score è indicativo e deve essere letto insieme alle informazioni disponibili e al contesto commerciale.',
    providerCostHint: 'Nota interna rimossa dalla UI pubblica: evidenziare cosa viene controllato, non la struttura tecnica del servizio.'
  },
  {
    code: 'KYB_COMPLIANCE',
    slug: 'kyb-compliance',
    name: 'KYB Compliance',
    category: 'Compliance',
    delivery: 'da pochi minuti',
    description: 'Verifica assetti, titolare effettivo, AML e segnali reputazionali disponibili.',
    useCase: 'controlli più sensibili su partner, fornitori strategici e clienti ad alto valore.',
    price: '€49,90',
    bestFor: ['Fornitori strategici', 'Partner commerciali', 'Clienti ad alto valore o ad alto rischio'],
    requiredInputs: ['Partita IVA o identificativo azienda', 'Motivo della verifica', 'Ruolo del richiedente'],
    reportOutput: ['Soggetti rilevanti', 'Titolare effettivo se disponibile', 'AML/PEP/sanctions dove applicabile', 'Sintesi compliance'],
    decisionHelp: 'Aiuta a decidere se proseguire, sospendere o richiedere una revisione manuale.',
    complianceNote: 'Richiede copy prudente: non promettere certificazione definitiva o assenza totale di rischio.',
    providerCostHint: 'Nota interna rimossa dalla UI pubblica: comunicare prudenza, fonti disponibili e limiti del controllo.'
  },
  {
    code: 'IBAN_CHECK',
    slug: 'verifica-iban',
    name: 'Verifica IBAN',
    category: 'Antifrode dati',
    delivery: 'tempo reale',
    description: 'Controlla IBAN, banca, BIC e raggiungibilità SEPA prima di registrare un pagamento.',
    useCase: 'ridurre errori e frodi nei dati di pagamento.',
    price: '€4,90',
    bestFor: ['Anagrafiche fornitori', 'Pagamenti amministrativi', 'Onboarding clienti o partner'],
    requiredInputs: ['IBAN', 'Finalità della verifica', 'Email operativa'],
    reportOutput: ['Validità formato', 'Banca/BIC se disponibile', 'Area SEPA', 'Esito operativo'],
    decisionHelp: 'Riduce errori prima di inserire o modificare coordinate di pagamento.',
    complianceNote: 'Non autorizza pagamenti e non certifica la titolarità economica del conto se la fonte non lo consente.',
    providerCostHint: 'Nota interna rimossa dalla UI pubblica: comunicare rapidità del controllo e limiti informativi.'
  },
  {
    code: 'EMAIL_PHONE_CHECK',
    slug: 'verifica-contatti',
    name: 'Verifica contatti',
    category: 'Antifrode dati',
    delivery: 'tempo reale',
    description: 'Valida email e numero mobile per ridurre lead falsi, bounce e onboarding sporchi.',
    useCase: 'pulire CRM e prevenire registrazioni non attendibili.',
    price: '€4,90',
    bestFor: ['CRM commerciali', 'Form lead generation', 'Primo onboarding digitale'],
    requiredInputs: ['Email o numero mobile', 'Paese se disponibile', 'Finalità operativa'],
    reportOutput: ['Formato', 'Raggiungibilità tecnica', 'Indicazioni anti-abuso', 'Esito sintetico'],
    decisionHelp: 'Aiuta a separare lead verificabili da contatti incompleti o potenzialmente rischiosi.',
    complianceNote: 'Non usare per spam, profilazione invasiva o contatti senza base lecita.',
    providerCostHint: 'Nota interna rimossa dalla UI pubblica: comunicare riduzione di errori operativi e uso lecito.'
  },
  {
    code: 'PERSON_LIGHT',
    slug: 'verifica-persona-light',
    name: 'Verifica persona light',
    category: 'Persona',
    delivery: 'pochi minuti',
    description: 'Controllo professionale su dati identificativi, codice fiscale e segnali disponibili.',
    useCase: 'verifiche consentite su soggetti fisici in contesti professionali leciti.',
    price: '€9,90',
    bestFor: ['Rapporti professionali consentiti', 'Controlli documentali minimi', 'Anagrafiche operative'],
    requiredInputs: ['Codice fiscale o dati minimi', 'Base lecita/finalità', 'Conferma uso professionale'],
    reportOutput: ['Validazione dato', 'Anagrafica se disponibile', 'Segnali consentiti', 'Limiti del controllo'],
    decisionHelp: 'Aiuta a completare un controllo documentale senza trasformarlo in investigazione consumer.',
    complianceNote: 'Da comunicare con grande prudenza: evitare toni investigativi e richieste non giustificate.',
    providerCostHint: 'Nota interna rimossa dalla UI pubblica: usare solo con finalità professionale lecita e proporzionata.'
  }
];

export const scenarios: Scenario[] = [
  {
    id: 'new-customer',
    title: 'Devo fidarmi di un nuovo cliente?',
    description: 'Controllo rapido prima di concedere pagamento differito, spedire merce o firmare un contratto.',
    primaryServiceCode: 'COMPANY_PRO',
    ctaLabel: 'Controlla un cliente'
  },
  {
    id: 'supplier',
    title: 'Sto scegliendo un fornitore importante.',
    description: 'Verifica dati aziendali, soggetti collegati e segnali che possono impattare continuità e rischio operativo.',
    primaryServiceCode: 'KYB_COMPLIANCE',
    ctaLabel: 'Verifica un fornitore'
  },
  {
    id: 'payment-data',
    title: 'Voglio evitare errori nei dati di pagamento.',
    description: 'Controlla IBAN, email o telefono prima di salvare dati in amministrazione, CRM o onboarding.',
    primaryServiceCode: 'IBAN_CHECK',
    ctaLabel: 'Verifica un dato'
  }
];

export const trustSignals: TrustSignal[] = [
  { label: 'Uso professionale', description: 'Ogni verifica richiede una finalità collegata a una decisione di lavoro reale.' },
  { label: 'Prezzo prima del pagamento', description: 'Vedi servizio scelto, cosa ricevi e importo prima di confermare l’ordine.' },
  { label: 'Fonti e limiti dichiarati', description: 'Il report indica quando è stata fatta la richiesta, quali segnali sono disponibili e cosa non può garantire.' },
  { label: 'Supporto se qualcosa non va', description: 'Se una verifica non può essere completata, trovi stato, assistenza e regole di rimborso.' }
];

export const funnelSteps: FunnelStep[] = [
  { title: 'Scegli lo scenario', description: 'Parti dal problema: cliente nuovo, fornitore, pagamento, compliance.' },
  { title: 'Conferma dati e finalità', description: 'Inserisci solo i dati necessari e conferma uso professionale lecito.' },
  { title: 'Conferma e paga in sicurezza', description: 'Prima del pagamento vedi riepilogo, prezzo, limiti principali e condizioni del servizio.' },
  { title: 'Ricevi report operativo', description: 'Esito leggibile, segnali principali, limiti e prossima azione consigliata.' }
];

export const publicFaqs: FaqItem[] = [
  {
    question: 'ClientiAffidabili.it garantisce che un cliente pagherà?',
    answer: 'No. Il servizio aiuta a leggere dati e segnali disponibili, ma non può garantire solvibilità, pagamento o assenza totale di rischio.'
  },
  {
    question: 'Posso usare il servizio per controllare chiunque?',
    answer: 'No. Le verifiche devono avere una finalità professionale lecita, proporzionata e coerente con il rapporto o la decisione da prendere.'
  },
  {
    question: 'I prezzi includono IVA e imposte?',
    answer: 'I prezzi pubblici sono indicativi del servizio. IVA, bolli, diritti o imposte eventualmente dovuti vengono mostrati prima del pagamento e in fattura.'
  },
  {
    question: 'Cosa succede se una fonte non risponde?',
    answer: 'Il report deve indicare lo stato della richiesta, eventuali tempi di evasione e la possibilità di retry o rimborso secondo regole definite.'
  }
];

export const pricingBundles: PricingBundle[] = [
  {
    name: 'Starter controllo cliente',
    audience: 'PMI e freelance B2B',
    price: '€14,90',
    description: 'Per un primo controllo su un cliente o fornitore prima di preventivo, contratto o pagamento differito.',
    services: ['Dati aziendali principali', 'Stato attività', 'Riepilogo leggibile'],
    ctaHref: '/checkout?service=COMPANY_ESSENTIAL'
  },
  {
    name: 'Affidabilità Pro',
    audience: 'Team commerciali/amministrativi',
    price: '€24,90',
    description: 'Il controllo consigliato prima di spedire, concedere credito o attivare una collaborazione ricorrente.',
    services: ['Score sintetico', 'Segnali di attenzione', 'Soggetti collegati', 'Prossima azione consigliata'],
    ctaHref: '/checkout?service=COMPANY_PRO'
  },
  {
    name: 'KYB e fornitori critici',
    audience: 'Compliance e direzione',
    price: '€49,90',
    description: 'Per controlli su fornitori strategici, partner e rapporti che richiedono maggiore prudenza.',
    services: ['Assetti e soggetti rilevanti', 'Titolare effettivo se disponibile', 'AML/PEP dove applicabile', 'Sintesi compliance'],
    ctaHref: '/checkout?service=KYB_COMPLIANCE'
  }
];

export const dashboardRows = [
  { date: 'Oggi', service: 'Check Affidabilità Pro', subject: 'ACME Italia S.p.A.', status: 'completed', risk: 'Basso' },
  { date: 'Oggi', service: 'Verifica IBAN', subject: 'IT60X0542811101000000123456', status: 'completed', risk: 'OK' },
  { date: 'Ieri', service: 'KYB Compliance', subject: 'Fornitore Beta Srl', status: 'waiting', risk: 'In elaborazione' }
];

export function getServiceByCode(code?: string) {
  return services.find((service) => service.code === code);
}

export function getServiceBySlug(slug?: string) {
  return services.find((service) => service.slug === slug);
}

export function checkoutHrefFor(serviceCode: string) {
  return `/checkout?service=${serviceCode}`;
}
