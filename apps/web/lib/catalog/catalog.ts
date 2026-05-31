export type CatalogScenario = 'new-client' | 'supplier' | 'payment-data' | 'partner-compliance';
export type CatalogStatus = 'published' | 'assisted' | 'paused';
export type CatalogRiskLevel = 'low' | 'low-medium' | 'medium' | 'high';

export type CatalogService = {
  code: string;
  slug: string;
  name: string;
  category: string;
  scenario: CatalogScenario;
  status: CatalogStatus;
  riskLevel: CatalogRiskLevel;
  delivery: string;
  priceNetCents: number;
  vatRate: number;
  recommended?: boolean;
  description: string;
  promise: string;
  bestFor: string[];
  requiredInputs: string[];
  reportOutputs: string[];
  limits: string[];
  nextAction: string;
  providerInternalCostBand: string;
};

export function formatEuro(cents: number) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

export function calculateSnapshot(service: CatalogService) {
  const vatCents = Math.round(service.priceNetCents * (service.vatRate / 100));
  return {
    unitNet: formatEuro(service.priceNetCents),
    vat: formatEuro(vatCents),
    total: formatEuro(service.priceNetCents + vatCents),
    vatCents,
    totalCents: service.priceNetCents + vatCents,
  };
}

export const catalogServices: CatalogService[] = [
  {
    code: 'COMPANY_ESSENTIAL',
    slug: 'verifica-azienda-essenziale',
    name: 'Verifica azienda essenziale',
    category: 'Affidabilità B2B',
    scenario: 'new-client',
    status: 'published',
    riskLevel: 'low',
    delivery: 'pochi minuti',
    priceNetCents: 1490,
    vatRate: 22,
    description: "Controlla stato, dati principali e primo indicatore operativo prima di iniziare un rapporto B2B.",
    promise: "Dati aziendali principali e sintesi operativa per decidere il prossimo passo.",
    bestFor: ['Nuovo cliente B2B', 'Prima fornitura', 'Preventivo o ordine non ancora consolidato'],
    requiredInputs: ['Partita IVA o ragione sociale', 'Finalità professionale della verifica'],
    reportOutputs: ['Dati identificativi', 'Stato attività', 'Sintesi operativa', 'Limiti del report'],
    limits: ['Non garantisce pagamento o assenza di rischio', 'Non sostituisce istruttoria creditizia'],
    nextAction: 'Usalo come primo controllo prima di passare a Check Pro.',
    providerInternalCostBand: 'Costo provider stimato basso; margine target alto se il report resta sintetico.',
  },
  {
    code: 'COMPANY_PRO',
    slug: 'check-affidabilita-pro',
    name: 'Check Affidabilità Pro',
    category: 'Risk intelligence',
    scenario: 'new-client',
    status: 'published',
    riskLevel: 'medium',
    delivery: 'pochi minuti',
    priceNetCents: 2490,
    vatRate: 22,
    recommended: true,
    description: 'Report decisionale con scoring, segnali disponibili, soggetti collegati e prossima azione consigliata.',
    promise: 'Raccogli segnali utili prima di vendere, spedire o concedere credito.',
    bestFor: ['Ordini B2B rilevanti', 'Pagamento differito', 'Team commerciali e amministrativi'],
    requiredInputs: ['Partita IVA o ragione sociale', 'Contesto della decisione', 'Finalità professionale lecita'],
    reportOutputs: ['Score sintetico', 'Segnali disponibili', 'Soggetti collegati', 'Prossima azione consigliata'],
    limits: ['Lo score è indicativo', 'Non garantisce solvibilità o pagamento'],
    nextAction: 'Servizio hero: proponilo come scelta consigliata nel funnel.',
    providerInternalCostBand: 'Costo provider medio/basso; proteggere prezzo e non includere bilancio nel base.',
  },
  {
    code: 'COMPANY_PRO_BALANCE',
    slug: 'affidabilita-pro-bilancio',
    name: 'Affidabilità Pro + Bilancio',
    category: 'Risk intelligence',
    scenario: 'new-client',
    status: 'published',
    riskLevel: 'medium',
    delivery: 'da pochi minuti, se disponibile',
    priceNetCents: 3490,
    vatRate: 22,
    description: 'Approfondimento economico-finanziario per decisioni B2B più rilevanti, con bilancio se disponibile.',
    promise: 'Aggiungi un approfondimento quando importo, continuità o esposizione rendono la decisione più importante.',
    bestFor: ['Contratti più importanti', 'Forniture ricorrenti', 'Richieste di credito commerciale'],
    requiredInputs: ['Partita IVA o ragione sociale', 'Contesto economico della decisione', 'Finalità professionale lecita'],
    reportOutputs: ['Report Pro', 'Bilancio se disponibile', 'Sintesi economica', 'Limiti fonte'],
    limits: ['Bilancio disponibile solo se presente nella fonte', 'Non sostituisce consulenza finanziaria'],
    nextAction: 'Proponilo come upsell quando il valore della decisione è alto.',
    providerInternalCostBand: 'Costo provider più elevato; margine da monitorare con price guard.',
  },
  {
    code: 'KYB_COMPLIANCE',
    slug: 'kyb-compliance',
    name: 'KYB Compliance',
    category: 'Compliance',
    scenario: 'partner-compliance',
    status: 'assisted',
    riskLevel: 'high',
    delivery: 'da pochi minuti',
    priceNetCents: 4990,
    vatRate: 22,
    description: 'Verifica assetti, titolare effettivo, AML e segnali reputazionali disponibili per partner e fornitori strategici.',
    promise: 'Sintesi KYB prudente per onboarding B2B sensibile e controlli su fornitori critici.',
    bestFor: ['Fornitori strategici', 'Partner commerciali', 'Clienti ad alto valore o ad alto rischio'],
    requiredInputs: ['Partita IVA o identificativo azienda', 'Motivo della verifica', 'Ruolo del richiedente'],
    reportOutputs: ['Soggetti rilevanti', 'Titolare effettivo se disponibile', 'AML/PEP/sanctions dove applicabile', 'Sintesi compliance'],
    limits: ['Non certifica assenza totale di rischio', 'Può richiedere revisione manuale o documenti aggiuntivi'],
    nextAction: 'Mantenerlo assistito finché compliance e provider mapping non sono certificati.',
    providerInternalCostBand: 'Costo variabile e rischio alto; checkout diretto solo dopo review legale/compliance.',
  },
  {
    code: 'IBAN_CHECK',
    slug: 'verifica-iban',
    name: 'Verifica IBAN',
    category: 'Antifrode dati',
    scenario: 'payment-data',
    status: 'published',
    riskLevel: 'low',
    delivery: 'tempo reale',
    priceNetCents: 490,
    vatRate: 22,
    description: 'Controlla IBAN, banca, BIC e raggiungibilità SEPA prima di registrare o modificare coordinate di pagamento.',
    promise: 'Riduci errori operativi prima di salvare dati di pagamento.',
    bestFor: ['Anagrafiche fornitori', 'Pagamenti amministrativi', 'Onboarding clienti o partner'],
    requiredInputs: ['IBAN', 'Finalità della verifica', 'Email operativa'],
    reportOutputs: ['Validità formato', 'Banca/BIC se disponibile', 'Area SEPA', 'Esito operativo'],
    limits: ['Non autorizza pagamenti', 'Non certifica la titolarità economica del conto se la fonte non lo consente'],
    nextAction: 'Ottimo entry product e add-on dei controlli aziendali.',
    providerInternalCostBand: 'Costo basso; utile per acquisizione e upsell.',
  },
  {
    code: 'CONTACT_CHECK',
    slug: 'verifica-contatti',
    name: 'Verifica email e telefono',
    category: 'Antifrode dati',
    scenario: 'payment-data',
    status: 'published',
    riskLevel: 'low-medium',
    delivery: 'tempo reale',
    priceNetCents: 490,
    vatRate: 22,
    description: 'Valida email e numero mobile per ridurre lead falsi, bounce e onboarding con dati incompleti.',
    promise: 'Migliora la qualità dei dati prima di attivare CRM, onboarding o comunicazioni operative.',
    bestFor: ['CRM commerciali', 'Form lead generation', 'Primo onboarding digitale'],
    requiredInputs: ['Email o numero mobile', 'Paese se disponibile', 'Finalità operativa'],
    reportOutputs: ['Formato', 'Raggiungibilità tecnica', 'Indicazioni anti-abuso', 'Esito sintetico'],
    limits: ['Non usare per spam o profilazione invasiva', 'La verifica tecnica non equivale a consenso marketing'],
    nextAction: 'Usalo come prodotto volume o come controllo incluso nei pacchetti.',
    providerInternalCostBand: 'Costo molto basso; attenzione al valore percepito se venduto singolarmente.',
  },
];

export const scenarioLabels: Record<CatalogScenario, string> = {
  'new-client': 'Nuovo cliente',
  supplier: 'Fornitore',
  'payment-data': 'Dati pagamento e contatto',
  'partner-compliance': 'Partner e compliance',
};

export function getCatalogServiceByCode(code?: string) {
  return catalogServices.find((service) => service.code === code);
}

export function getCatalogServiceBySlug(slug?: string) {
  return catalogServices.find((service) => service.slug === slug);
}

export function getPublishedCatalogServices() {
  return catalogServices.filter((service) => service.status === 'published' || service.status === 'assisted');
}
