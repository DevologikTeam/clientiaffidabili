export const settingsAdminDesign = {
  routes: [
    '/admin/settings',
    '/admin/settings/commerce',
    '/admin/settings/payments',
    '/admin/settings/provider-openapi',
    '/admin/settings/openai',
    '/admin/settings/errors',
  ],
  commerce: {
    purchasesEnabledKey: 'commerce.purchases.enabled',
    disabledReasonKey: 'commerce.purchases.disabledReason',
    disabledUntilKey: 'commerce.purchases.disabledUntil',
  },
  providers: ['stripe', 'paypal', 'openapi', 'openai'],
  guardrails: [
    'Secrets are never rendered in clear text.',
    'Purchase kill switch is enforced server-side before payment session creation.',
    'Provider/OpenAI settings changes require reason and audit.',
    'Operational errors are redacted and linked to refunds/fixes where needed.',
    'Buyer IP is access-controlled and retention-bound.',
  ],
} as const;
