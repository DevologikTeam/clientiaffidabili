export type CatalogPublicationStatus = 'draft' | 'review' | 'published' | 'paused' | 'assisted' | 'archived';
export type CatalogRiskLevel = 'low' | 'low-medium' | 'medium' | 'high';
export type PriceGuardStatus = 'pass' | 'warning' | 'blocked' | 'override_requested' | 'override_approved';

export type CatalogBlueprintItem = {
  code: string;
  slug: string;
  publicName: string;
  category: string;
  scenario: 'new-client' | 'supplier' | 'payment-data' | 'partner-compliance';
  status: CatalogPublicationStatus;
  riskLevel: CatalogRiskLevel;
  publicPriceNet: number;
  vatRate: number;
  estimatedDelivery: string;
  publicPromise: string;
  requiredInputs: string[];
  reportOutputs: string[];
  limits: string[];
  primaryCta: string;
  admin: {
    providerCostEstimatedMin: number;
    providerCostEstimatedMax: number;
    checkoutFeeReserve: number;
    supportReserve: number;
    retryReserve: number;
    targetGrossMarginRatio: number;
    minimumGrossMarginRatio: number;
    providerEndpoints: string[];
    requiresComplianceReview: boolean;
    requiresLegalPurposeConfirmation: boolean;
  };
};

export const catalogBlueprintItems: CatalogBlueprintItem[] = [
  {
    code: 'COMPANY_ESSENTIAL',
    slug: 'verifica-azienda-essenziale',
    publicName: 'Verifica azienda essenziale',
    category: 'Affidabilità B2B',
    scenario: 'new-client',
    status: 'published',
    riskLevel: 'low',
    publicPriceNet: 14.9,
    vatRate: 22,
    estimatedDelivery: 'pochi minuti',
    publicPromise: "Controlla i dati principali di un'azienda prima di procedere.",
    requiredInputs: ['Partita IVA o ragione sociale', 'Finalità professionale della verifica'],
    reportOutputs: ['Dati identificativi', 'Stato attività', 'Sintesi operativa', 'Limiti del report'],
    limits: ['Non garantisce pagamento o assenza di rischio', 'Non sostituisce istruttoria creditizia'],
    primaryCta: 'Avvia verifica essenziale',
    admin: {
      providerCostEstimatedMin: 0.12,
      providerCostEstimatedMax: 0.25,
      checkoutFeeReserve: 0.55,
      supportReserve: 0.3,
      retryReserve: 0.15,
      targetGrossMarginRatio: 0.7,
      minimumGrossMarginRatio: 0.55,
      providerEndpoints: ['Company Start - Italia', 'Company Search - Italia', 'PEC Imprese - Italia', 'European VAT'],
      requiresComplianceReview: false,
      requiresLegalPurposeConfirmation: true
    }
  },
  {
    code: 'COMPANY_PRO',
    slug: 'check-affidabilita-pro',
    publicName: 'Check Affidabilità Pro',
    category: 'Risk intelligence',
    scenario: 'new-client',
    status: 'published',
    riskLevel: 'medium',
    publicPriceNet: 24.9,
    vatRate: 22,
    estimatedDelivery: 'pochi minuti',
    publicPromise: 'Raccogli segnali utili prima di vendere, spedire o concedere credito.',
    requiredInputs: ['Partita IVA o ragione sociale', 'Contesto della decisione', 'Finalità professionale lecita'],
    reportOutputs: ['Score sintetico', 'Segnali disponibili', 'Soggetti collegati', 'Prossima azione consigliata'],
    limits: ['Lo score è indicativo', 'Non garantisce solvibilità o pagamento'],
    primaryCta: 'Avvia Check Pro',
    admin: {
      providerCostEstimatedMin: 1.2,
      providerCostEstimatedMax: 2.2,
      checkoutFeeReserve: 0.75,
      supportReserve: 0.5,
      retryReserve: 0.25,
      targetGrossMarginRatio: 0.7,
      minimumGrossMarginRatio: 0.55,
      providerEndpoints: ['Company Full - Italia', 'Credit Scoring Advanced - Italia', 'Negatività Impresa - Italia', 'Stakeholders Company - Italia'],
      requiresComplianceReview: true,
      requiresLegalPurposeConfirmation: true
    }
  },
  {
    code: 'COMPANY_PRO_BALANCE',
    slug: 'affidabilita-pro-bilancio',
    publicName: 'Affidabilità Pro + Bilancio',
    category: 'Risk intelligence',
    scenario: 'new-client',
    status: 'published',
    riskLevel: 'medium',
    publicPriceNet: 34.9,
    vatRate: 22,
    estimatedDelivery: 'da pochi minuti, se disponibile',
    publicPromise: 'Aggiungi un approfondimento economico-finanziario quando la decisione pesa di più.',
    requiredInputs: ['Partita IVA o ragione sociale', 'Contesto economico della decisione', 'Finalità professionale lecita'],
    reportOutputs: ['Output Check Pro', 'Bilancio disponibile', 'Nota interpretativa prudente'],
    limits: ['Disponibilità dipendente dalle fonti', 'Non sostituisce analisi finanziaria professionale'],
    primaryCta: 'Avvia Pro + Bilancio',
    admin: {
      providerCostEstimatedMin: 4.5,
      providerCostEstimatedMax: 7,
      checkoutFeeReserve: 0.95,
      supportReserve: 0.75,
      retryReserve: 0.3,
      targetGrossMarginRatio: 0.7,
      minimumGrossMarginRatio: 0.55,
      providerEndpoints: ['Company Full - Italia', 'Credit Scoring Advanced - Italia', 'Bilancio Imprese Italiane'],
      requiresComplianceReview: true,
      requiresLegalPurposeConfirmation: true
    }
  },
  {
    code: 'KYB_COMPLIANCE',
    slug: 'kyb-compliance',
    publicName: 'KYB Compliance',
    category: 'Compliance partner',
    scenario: 'partner-compliance',
    status: 'published',
    riskLevel: 'high',
    publicPriceNet: 49.9,
    vatRate: 22,
    estimatedDelivery: 'pochi minuti / variabile in base alle fonti',
    publicPromise: 'Controllo più prudente su assetti, soggetti rilevanti e segnali compliance.',
    requiredInputs: ['Partita IVA o ragione sociale', 'Motivo del controllo', 'Conferma uso professionale lecito'],
    reportOutputs: ['Assetti societari', 'Soggetti rilevanti', 'Segnali AML/PEP/Sanctions quando disponibili', 'Limiti e fonti'],
    limits: ['Non sostituisce adeguata verifica regolamentata', 'Può richiedere revisione manuale in casi sensibili'],
    primaryCta: 'Avvia controllo KYB',
    admin: {
      providerCostEstimatedMin: 2.5,
      providerCostEstimatedMax: 4.5,
      checkoutFeeReserve: 1.15,
      supportReserve: 1.0,
      retryReserve: 0.35,
      targetGrossMarginRatio: 0.7,
      minimumGrossMarginRatio: 0.55,
      providerEndpoints: ['Titolare Effettivo', 'Antiriciclaggio (AML) - Italia', 'Verifica Persone Esposte Politicamente (PEP)', 'Verifica Sanctions List'],
      requiresComplianceReview: true,
      requiresLegalPurposeConfirmation: true
    }
  },
  {
    code: 'IBAN_CHECK',
    slug: 'verifica-iban',
    publicName: 'Verifica IBAN',
    category: 'Antifrode dati',
    scenario: 'payment-data',
    status: 'published',
    riskLevel: 'low-medium',
    publicPriceNet: 4.9,
    vatRate: 22,
    estimatedDelivery: 'pochi secondi',
    publicPromise: 'Riduci errori prima di registrare o aggiornare dati di pagamento.',
    requiredInputs: ['IBAN', 'Finalità professionale della verifica'],
    reportOutputs: ['Validità tecnica', 'Area SEPA', 'Banca/BIC se disponibile', 'Esito operativo'],
    limits: ['Non conferma sempre titolarità del conto', 'Non sostituisce controlli bancari interni'],
    primaryCta: 'Verifica IBAN',
    admin: {
      providerCostEstimatedMin: 0.08,
      providerCostEstimatedMax: 0.2,
      checkoutFeeReserve: 0.35,
      supportReserve: 0.15,
      retryReserve: 0.1,
      targetGrossMarginRatio: 0.7,
      minimumGrossMarginRatio: 0.55,
      providerEndpoints: ['IBAN Start'],
      requiresComplianceReview: false,
      requiresLegalPurposeConfirmation: true
    }
  },
  {
    code: 'CONTACT_CHECK',
    slug: 'verifica-email-telefono',
    publicName: 'Verifica email e telefono',
    category: 'Antifrode dati',
    scenario: 'payment-data',
    status: 'published',
    riskLevel: 'low-medium',
    publicPriceNet: 4.9,
    vatRate: 22,
    estimatedDelivery: 'pochi secondi',
    publicPromise: 'Migliora qualità dati prima di usare contatti in CRM, onboarding o amministrazione.',
    requiredInputs: ['Email o numero di telefono', 'Finalità professionale della verifica'],
    reportOutputs: ['Validità tecnica', 'Raggiungibilità quando disponibile', 'Esito operativo'],
    limits: ['Non usare per profilazione non autorizzata', 'Non garantisce risposta o identità della persona'],
    primaryCta: 'Controlla contatti',
    admin: {
      providerCostEstimatedMin: 0.02,
      providerCostEstimatedMax: 0.12,
      checkoutFeeReserve: 0.35,
      supportReserve: 0.15,
      retryReserve: 0.1,
      targetGrossMarginRatio: 0.7,
      minimumGrossMarginRatio: 0.55,
      providerEndpoints: ['Verifica Email Advanced', 'Verifica Numero Cellulare Advanced'],
      requiresComplianceReview: true,
      requiresLegalPurposeConfirmation: true
    }
  }
];

export function estimatePriceGuardStatus(item: CatalogBlueprintItem): PriceGuardStatus {
  const estimatedCost =
    item.admin.providerCostEstimatedMax +
    item.admin.checkoutFeeReserve +
    item.admin.supportReserve +
    item.admin.retryReserve;
  const marginRatio = (item.publicPriceNet - estimatedCost) / item.publicPriceNet;

  if (!Number.isFinite(marginRatio) || item.publicPriceNet <= 0) return 'blocked';
  if (marginRatio < item.admin.minimumGrossMarginRatio) return 'blocked';
  if (marginRatio < item.admin.targetGrossMarginRatio) return 'warning';
  if (item.riskLevel === 'high' && !item.admin.requiresComplianceReview) return 'blocked';
  return 'pass';
}

export const catalogBundleBlueprint = [
  {
    code: 'BUNDLE_ESSENTIAL_TO_PRO',
    trigger: 'Nuovo cliente, pagamento differito o importo superiore a 1000 euro',
    fromProduct: 'COMPANY_ESSENTIAL',
    suggestedProduct: 'COMPANY_PRO',
    publicCopy: 'Per questa decisione potrebbe essere utile un controllo più completo con segnali e sintesi operativa.'
  },
  {
    code: 'BUNDLE_PRO_BALANCE',
    trigger: 'Contratto o ordine di valore superiore a 5000 euro',
    fromProduct: 'COMPANY_PRO',
    suggestedProduct: 'COMPANY_PRO_BALANCE',
    publicCopy: 'Se la decisione ha un valore economico rilevante, puoi aggiungere un approfondimento di bilancio quando disponibile.'
  },
  {
    code: 'BUNDLE_PAYMENT_DATA',
    trigger: 'Aggiornamento anagrafica fornitore o dati di pagamento',
    fromProduct: 'IBAN_CHECK',
    suggestedProduct: 'CONTACT_CHECK',
    publicCopy: 'Puoi controllare anche email e telefono per ridurre errori in CRM e amministrazione.'
  }
] as const;
