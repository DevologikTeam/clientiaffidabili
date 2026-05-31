export const partnerOpenApiBlueprint = {
  openapi: '3.1.0',
  info: {
    title: 'ClientiAffidabili.it Partner API',
    version: '1.0.0',
    description: 'Blueprint della futura OpenAPI Specification partner. La specifica completa verra generata/validata in M12-S/M13.',
  },
  servers: [
    { url: 'https://api.clientiaffidabili.it/api/partner/v1', description: 'Live' },
    { url: 'https://sandbox.clientiaffidabili.it/api/partner/v1', description: 'Sandbox' },
  ],
  security: [{ bearerApiKey: [] }],
  paths: {
    '/company-checks': {
      post: {
        summary: 'Crea una verifica azienda',
        description: 'Richiede Idempotency-Key e crediti/entitlement validi.',
      },
    },
    '/company-checks/{checkId}': {
      get: { summary: 'Legge lo stato di una verifica azienda' },
    },
    '/reports/{reportId}': {
      get: { summary: 'Legge un report pubblicato e autorizzato' },
    },
    '/usage': {
      get: { summary: 'Restituisce usage ledger aggregato' },
    },
  },
} as const;
