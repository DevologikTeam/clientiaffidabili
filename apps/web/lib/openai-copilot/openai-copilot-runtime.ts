export type OpenaiUseCase = 'cms_seo_suggestion' | 'support_reply_draft' | 'error_ledger_summary' | 'admin_operations_explain' | 'release_qa_summary';

export type OpenaiDraftStatus = 'needs_review' | 'approved' | 'applied' | 'discarded' | 'blocked';

export const openaiCopilotRuntime = {
  status: {
    enabled: false,
    mode: 'mock-first',
    policy: 'AI propone → Admin verifica → Admin approva → Sistema audita',
    budgetLabel: 'Budget e use case sono governati da Admin Settings',
  },
  useCases: [
    { code: 'cms_seo_suggestion', label: 'CMS SEO/GEO', description: 'Suggerisce title, meta, FAQ e risposta GEO senza pubblicare automaticamente.' },
    { code: 'support_reply_draft', label: 'Supporto clienti', description: 'Riassume richieste e prepara bozze risposta da approvare.' },
    { code: 'error_ledger_summary', label: 'Error ledger', description: 'Sintetizza errori e possibili azioni sicure senza eseguirle.' },
    { code: 'admin_operations_explain', label: 'Admin operations', description: 'Spiega stati, blocchi e prossima azione sicura.' },
    { code: 'release_qa_summary', label: 'QA release', description: 'Riassume test, regressioni e rischi prima della release.' },
  ] as Array<{ code: OpenaiUseCase; label: string; description: string }>,
  sampleDrafts: [
    { id: 'draft_seo_001', status: 'needs_review' as OpenaiDraftStatus, title: 'Suggerimento meta per guida affidabilità', useCase: 'cms_seo_suggestion' as OpenaiUseCase },
    { id: 'draft_support_001', status: 'needs_review' as OpenaiDraftStatus, title: 'Bozza risposta su report in lavorazione', useCase: 'support_reply_draft' as OpenaiUseCase },
  ],
  guardrails: [
    'OpenAI disabilitato di default',
    'Nessuna pubblicazione automatica',
    'Nessun rimborso o modifica settings automatica',
    'Redaction obbligatoria prima della richiesta',
    'Output sempre bozza approvabile/scartabile',
  ],
};
