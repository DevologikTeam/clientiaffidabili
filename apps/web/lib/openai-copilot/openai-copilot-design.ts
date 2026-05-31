export const openaiCopilotDesign = {
  version: '0.61.0',
  title: 'OpenAI Assisted Operations & Content Copilot',
  principle: 'AI propone, admin verifica, admin approva, sistema audita.',
  routes: {
    dashboard: '/admin/openai-copilot',
    prompts: '/admin/openai-copilot/prompts',
    usage: '/admin/openai-copilot/usage',
    errors: '/admin/openai-copilot/errors',
  },
  useCases: [
    {
      key: 'cms_seo_suggestion',
      label: 'CMS SEO/GEO Copilot',
      description: 'Suggerisce title, meta, FAQ e GEO answer box come bozze da revisionare.',
      requiresApproval: true,
    },
    {
      key: 'support_reply_draft',
      label: 'Support Reply Assistant',
      description: 'Riassume ticket e prepara bozze risposta, senza invio automatico.',
      requiresApproval: true,
    },
    {
      key: 'error_ledger_summary',
      label: 'Error Ledger Assistant',
      description: 'Sintetizza errori e suggerisce prossime azioni sicure.',
      requiresApproval: false,
    },
  ],
  forbiddenActions: [
    'refund_user',
    'publish_content',
    'change_price',
    'change_settings',
    'call_openapi_provider',
    'send_customer_email',
  ],
  bannedClaims: ['rischio zero', 'pagamento garantito', 'solvibilita garantita', 'cliente sicuro al 100%'],
};
