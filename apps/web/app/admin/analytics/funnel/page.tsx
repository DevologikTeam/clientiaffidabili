import { ConversionFunnelPanel } from '../../../../components/analytics/ConversionFunnelPanel';
import { PageHero } from '../../../../components/ds/PageHero';

export default function AdminAnalyticsSubPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero eyebrow="Admin analytics" title="Funnel conversione" description="Analizza passaggi da contenuto pubblico a report consultato." />
      <div className="container ca-page-stack">
        <ConversionFunnelPanel />
      </div>
    </main>
  );
}
