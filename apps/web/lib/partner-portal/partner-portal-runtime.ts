export type PartnerPortalStatus = 'draft_profile' | 'sandbox_enabled' | 'sandbox_testing' | 'live_review_requested' | 'live_changes_required' | 'live_approved' | 'live_suspended';

export const partnerPortalRuntime = {
  summary: {
    partnerAccountId: 'partner_demo',
    legalName: 'Partner Sandbox Demo Srl',
    status: 'sandbox_testing' as PartnerPortalStatus,
    statusLabel: 'Sandbox in test',
    canAccessSandbox: true,
    canAccessLive: false,
    creditsAvailable: '€ 120,00',
    nextAction: {
      label: 'Completa test webhook e richiedi go-live',
      href: '/dashboard/partner/go-live',
      reason: 'La produzione richiede review operations e accettazione termini API.',
    },
  },
  apiKeys: [
    { id: 'pak_1', label: 'Sandbox CRM', prefix: 'ca_sbox_8f3...', environment: 'sandbox', scopes: ['checks:company.create', 'usage:read'], lastUsedAt: '2026-05-30T09:00:00Z', status: 'active' },
  ],
  usage: [
    { id: 'use_1', date: '2026-05-30', service: 'Check Affidabilità Pro', environment: 'sandbox', amount: '€ 0,00', status: 'sandbox' },
    { id: 'use_2', date: '2026-05-30', service: 'Webhook test', environment: 'sandbox', amount: '€ 0,00', status: 'completed' },
  ],
  webhooks: [
    { id: 'pwe_1', url: 'https://partner.example/webhooks/clientiaffidabili', events: ['check.completed', 'report.ready'], status: 'ok', lastDelivery: 'simulata' },
  ],
  goLiveChecklist: [
    { label: 'Profilo aziendale completato', done: true },
    { label: 'API key sandbox creata', done: true },
    { label: 'Webhook firmato testato', done: true },
    { label: 'Uso dichiarato validato', done: false },
    { label: 'Accettazione termini API', done: false },
    { label: 'Review operations', done: false },
  ],
  docs: {
    basePath: '/api/partner/v1',
    headers: ['Authorization: Bearer ca_sbox_...', 'Idempotency-Key: uuid-v4', 'Content-Type: application/json'],
    endpoints: ['POST /company-checks', 'GET /company-checks/{checkId}', 'GET /reports/{reportId}', 'GET /usage', 'POST /webhooks/test'],
  },
};

export const adminPartnerRuntime = {
  summary: { pendingLiveReviews: 2, sandboxPartners: 8, livePartners: 0, suspendedPartners: 0 },
  partners: [
    { id: 'partner_demo', legalName: 'Partner Sandbox Demo Srl', status: 'sandbox_testing', tier: 'starter', usage: '12 test sandbox', nextAction: 'Valutare richiesta live', risk: 'medium' },
    { id: 'partner_agency', legalName: 'Agency Verifiche B2B', status: 'live_review_requested', tier: 'agency', usage: '48 test sandbox', nextAction: 'Review compliance', risk: 'high' },
  ],
};
