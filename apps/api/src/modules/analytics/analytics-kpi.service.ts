import { Injectable } from '@nestjs/common';
import type { AnalyticsDashboardSummary } from './analytics-runtime.types';

@Injectable()
export class AnalyticsKpiService {
  buildDashboardSummary(): AnalyticsDashboardSummary {
    return {
      period: 'last_30_days_demo_snapshot',
      executiveKpis: [
        { key: 'qualified_leads', label: 'Lead qualificati', value: '—', trend: 'da collegare agli eventi reali', interpretation: 'Misura la domanda generata da guide, servizi e contatti.' },
        { key: 'checkout_completion_rate', label: 'Checkout completati', value: '—', trend: 'da collegare agli eventi reali', interpretation: 'Individua blocchi di fiducia, pagamento o profilo fiscale.' },
        { key: 'net_margin', label: 'Margine netto stimato', value: '—', trend: 'da collegare a ordini, costi provider e fee pagamento', interpretation: 'Verifica se prezzi, provider e rimborsi restano sostenibili.' },
        { key: 'operational_errors', label: 'Errori operativi', value: '—', trend: 'da Operational Error Ledger', interpretation: 'Prioritizza fix, retry, rimborsi e supporto.' },
      ],
      funnel: [
        { step: 'Visita pagina guida/servizio', visitors: 0, conversionRate: 0, blocker: 'tracking runtime non ancora collegato a eventi reali' },
        { step: 'CTA servizio o checkout', visitors: 0, conversionRate: 0 },
        { step: 'Checkout avviato', visitors: 0, conversionRate: 0 },
        { step: 'Pagamento confermato', visitors: 0, conversionRate: 0 },
        { step: 'Report consultato', visitors: 0, conversionRate: 0 },
      ],
      seoGeo: [
        { cluster: 'verificare affidabilita azienda', visits: 0, ctaRate: 0, assistedRevenueCents: 0 },
        { cluster: 'cliente non paga prevenzione', visits: 0, ctaRate: 0, assistedRevenueCents: 0 },
        { cluster: 'garanzie e limiti report', visits: 0, ctaRate: 0, assistedRevenueCents: 0 },
      ],
      errorInsights: [
        { area: 'pagamenti', count: 0, impactedOrders: 0, recommendedAction: 'Collegare payment.failed e refund.created a error ledger aggregato.' },
        { area: 'provider_openapi', count: 0, impactedOrders: 0, recommendedAction: 'Monitorare provider.request_failed senza raw payload.' },
        { area: 'openai', count: 0, impactedOrders: 0, recommendedAction: 'Misurare solo costo/stato, mai prompt o completion.' },
      ],
      guardrails: [
        'Nessuna PII negli analytics.',
        'Nessun raw payload provider/OpenAI/webhook.',
        'Gli errori dettagliati restano nell Operational Error Ledger.',
        'Gli eventi economici sono server-side e riconciliabili.',
      ],
    };
  }
}
