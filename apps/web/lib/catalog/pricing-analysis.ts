export type CatalogAnalysisItem = {
  code: string;
  publicName: string;
  family: string;
  phase: 'MVP' | 'MVP core' | 'MVP add-on' | 'MVP controllato' | 'Post-MVP';
  publicPriceNet: number;
  targetProviderCostMin: number;
  targetProviderCostMax: number;
  suggestedProviderEndpoints: string[];
  marginTarget: string;
  riskLevel: 'low' | 'low-medium' | 'medium' | 'high';
  publicPromise: string;
  internalNotes: string;
};

export const catalogPricingAnalysis: CatalogAnalysisItem[] = [
  {
    "code": "COMPANY_ESSENTIAL",
    "publicName": "Verifica azienda essenziale",
    "family": "Affidabilità B2B",
    "phase": "MVP",
    "publicPriceNet": 14.9,
    "targetProviderCostMin": 0.12,
    "targetProviderCostMax": 0.25,
    "suggestedProviderEndpoints": [
      "Company Start - Italia",
      "Company Search - Italia",
      "PEC Imprese - Italia",
      "European VAT",
      "Codice Destinatario (SdI Code) - Italia",
      "Indirizzo Sede Legale - Italia"
    ],
    "marginTarget": ">= 80% al netto di fee checkout e costi operativi",
    "riskLevel": "low",
    "publicPromise": "Dati aziendali principali e sintesi operativa per decidere il prossimo passo.",
    "internalNotes": "Prodotto entry ad alta marginalità. Evitare di trasformarlo in visura camerale low-cost: vendere la sintesi decisionale, non il dato grezzo."
  },
  {
    "code": "COMPANY_PRO",
    "publicName": "Check Affidabilità Pro",
    "family": "Risk intelligence",
    "phase": "MVP core",
    "publicPriceNet": 24.9,
    "targetProviderCostMin": 1.3,
    "targetProviderCostMax": 2.2,
    "suggestedProviderEndpoints": [
      "Company Full - Italia",
      "Credit Scoring Advanced - Italia",
      "Negatività Impresa - Italia",
      "Stakeholders Company - Italia",
      "Elenco Soci - Italia",
      "Visura Protesti Società"
    ],
    "marginTarget": ">= 70% anche con retry controllati",
    "riskLevel": "medium",
    "publicPromise": "Report chiaro con score, segnali di rischio, soggetti collegati e prossima azione consigliata.",
    "internalNotes": "Prodotto hero. Non includere Bilancio Imprese nel prezzo base se non necessario; usarlo come add-on per proteggere margine."
  },
  {
    "code": "COMPANY_PRO_PLUS",
    "publicName": "Affidabilità Pro + Bilancio",
    "family": "Risk intelligence",
    "phase": "MVP add-on",
    "publicPriceNet": 34.9,
    "targetProviderCostMin": 4.8,
    "targetProviderCostMax": 7.0,
    "suggestedProviderEndpoints": [
      "Company Full - Italia",
      "Credit Scoring Advanced - Italia",
      "Negatività Impresa - Italia",
      "Bilancio Imprese Italiane",
      "Visura Protesti Società"
    ],
    "marginTarget": ">= 55% perché il costo provider sale",
    "riskLevel": "medium",
    "publicPromise": "Approfondimento per decisioni B2B più rilevanti, con bilancio se disponibile.",
    "internalNotes": "Da proporre quando importo ordine/contratto supera soglia configurabile."
  },
  {
    "code": "KYB_COMPLIANCE",
    "publicName": "KYB Compliance",
    "family": "Compliance",
    "phase": "MVP controllato",
    "publicPriceNet": 49.9,
    "targetProviderCostMin": 2.0,
    "targetProviderCostMax": 4.5,
    "suggestedProviderEndpoints": [
      "Company Full - Italia",
      "Titolare Effettivo",
      "Antiriciclaggio (AML) - Italia",
      "Stakeholders Company - Italia",
      "PEP/Sanctions/Adverse Media dove applicabile"
    ],
    "marginTarget": ">= 70% con revisione copy/compliance",
    "riskLevel": "high",
    "publicPromise": "Sintesi KYB prudente per partner, fornitori strategici e onboarding B2B sensibile.",
    "internalNotes": "Richiedere finalità e base lecita. Nessun claim 'azienda sicura' o 'assenza rischio'."
  },
  {
    "code": "IBAN_CHECK",
    "publicName": "Verifica IBAN",
    "family": "Antifrode dati",
    "phase": "MVP",
    "publicPriceNet": 4.9,
    "targetProviderCostMin": 0.09,
    "targetProviderCostMax": 0.2,
    "suggestedProviderEndpoints": [
      "IBAN Start"
    ],
    "marginTarget": ">= 80%",
    "riskLevel": "low",
    "publicPromise": "Controllo operativo per ridurre errori prima di registrare coordinate di pagamento.",
    "internalNotes": "Entry product perfetto per amministrazioni e fornitori. Non dichiarare titolarità conto se il provider non la certifica."
  },
  {
    "code": "CONTACT_CHECK",
    "publicName": "Verifica email e telefono",
    "family": "Antifrode dati",
    "phase": "MVP",
    "publicPriceNet": 4.9,
    "targetProviderCostMin": 0.02,
    "targetProviderCostMax": 0.12,
    "suggestedProviderEndpoints": [
      "Verifica Email Advanced",
      "Verifica Numero Cellulare Advanced"
    ],
    "marginTarget": ">= 80%",
    "riskLevel": "low-medium",
    "publicPromise": "Riduce lead falsi, bounce e onboarding con dati incompleti.",
    "internalNotes": "Da vendere come qualità dati, non come profilazione."
  },
  {
    "code": "SUPPLIER_MONITORING",
    "publicName": "Monitoraggio fornitore",
    "family": "Monitoring",
    "phase": "Post-MVP",
    "publicPriceNet": 9.9,
    "targetProviderCostMin": 0.1,
    "targetProviderCostMax": 1.5,
    "suggestedProviderEndpoints": [
      "Monitoraggio Company",
      "Monitoraggio Credit Scoring Top - Italia"
    ],
    "marginTarget": ">= 65% su ricorrenza",
    "riskLevel": "medium",
    "publicPromise": "Avvisi su variazioni rilevanti di aziende già controllate.",
    "internalNotes": "Da attivare dopo catalogo e billing perché richiede job scheduler, notifiche e gestione rinnovi."
  }
];

export const pricingGuardrails = {
  minimumGrossMarginRatio: 0.55,
  defaultTargetGrossMarginRatio: 0.70,
  highRiskRequiresManualReview: true,
  belowCostPublicationBlocked: true,
  providerCostMustBePrivate: true,
  publicPricesAreNetOfVat: true,
  legalTaxesAndDutiesMustBeShownSeparately: true
};
