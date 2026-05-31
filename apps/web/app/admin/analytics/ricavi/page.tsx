import { AnalyticsKpiGrid } from '../../../../components/analytics/AnalyticsKpiGrid';
import { Alert } from '../../../../components/ds/Alert';
import { PageHero } from '../../../../components/ds/PageHero';

export default function AdminAnalyticsRevenuePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero eyebrow="Admin analytics" title="Ricavi e marginalità" description="Vista iniziale per ricavi, costi provider, fee pagamento, rimborsi e margini netti." />
      <div className="container ca-page-stack">
        <Alert title="Dati economici server-side" tone="warning">
          I KPI economici devono arrivare da ordini, pagamenti, provider cost ledger e refund ledger. Non usare eventi client-side come fonte di verita economica.
        </Alert>
        <AnalyticsKpiGrid />
      </div>
    </main>
  );
}
