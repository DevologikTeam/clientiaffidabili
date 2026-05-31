export type CopilotSurface = 'cms' | 'support' | 'error-ledger' | 'admin-operations' | 'reports' | 'qa-release';

export interface CopilotSurfaceAnalysis {
  surface: CopilotSurface;
  title: string;
  primaryBenefit: string;
  allowedActions: string[];
  blockedActions: string[];
  emptyState: string;
}

export const copilotSurfaceAnalysis: CopilotSurfaceAnalysis[] = [
  {
    surface: 'cms',
    title: 'CMS SEO/GEO',
    primaryBenefit: 'Velocizzare bozze, FAQ e meta copy senza pubblicare automaticamente.',
    allowedActions: ['Suggerisci title', 'Suggerisci meta description', 'Controlla claim', 'Genera FAQ'],
    blockedActions: ['Pubblicare senza approvazione', 'Cambiare prezzo servizio', 'Promettere rischio zero'],
    emptyState: 'OpenAI e\' disabilitato o il caso d\'uso CMS non e\' autorizzato.'
  },
  {
    surface: 'support',
    title: 'Supporto clienti',
    primaryBenefit: 'Riassumere ticket e preparare bozze risposta da approvare.',
    allowedActions: ['Riassumi ticket', 'Suggerisci risposta', 'Estrai prossima azione'],
    blockedActions: ['Inviare email senza review', 'Promettere rimborso', 'Citare dati sensibili non necessari'],
    emptyState: 'Nessun messaggio selezionato o redaction non completata.'
  },
  {
    surface: 'error-ledger',
    title: 'Error ledger',
    primaryBenefit: 'Raggruppare errori e spiegare possibili cause operative.',
    allowedActions: ['Riassumi errore', 'Suggerisci causa probabile', 'Prepara nota tecnica'],
    blockedActions: ['Rimborsare automaticamente', 'Ritentare provider automaticamente', 'Mostrare raw payload'],
    emptyState: 'Seleziona un errore operativo per generare una sintesi.'
  },
  {
    surface: 'admin-operations',
    title: 'Admin operations',
    primaryBenefit: 'Spiegare timeline e stati complessi a un operatore.',
    allowedActions: ['Spiega stato', 'Suggerisci azione sicura', 'Crea nota interna'],
    blockedActions: ['Cambiare settings', 'Attivare provider', 'Disabilitare checkout'],
    emptyState: 'Nessun work item selezionato.'
  },
  {
    surface: 'reports',
    title: 'Report note assistant',
    primaryBenefit: 'Migliorare chiarezza di note interne prudenti.',
    allowedActions: ['Rendi piu\' chiara una nota', 'Controlla tono', 'Controlla claim vietati'],
    blockedActions: ['Decidere affidabilita\'', 'Pubblicare report', 'Garantire solvibilita\''],
    emptyState: 'Use case ad alto rischio: disabilitato di default.'
  },
  {
    surface: 'qa-release',
    title: 'QA e release',
    primaryBenefit: 'Riassumere risultati test e prossime azioni senza saltare gate.',
    allowedActions: ['Riassumi QA', 'Elenca blocchi', 'Suggerisci prossima verifica'],
    blockedActions: ['Dichiarare production-ready', 'Saltare E2E', 'Saltare security gate'],
    emptyState: 'Carica o seleziona un report QA.'
  }
];

export const openAiCopilotAnalysisSummary = {
  version: '0.60.0',
  sprint: 'M17-A OpenAI Assisted Operations & Content Copilot Analysis',
  defaultEnabled: false,
  publicChatbot: false,
  automaticSensitiveActions: false,
  requiredApprovalPattern: 'AI propone -> Admin verifica -> Admin approva -> Sistema audita'
};
