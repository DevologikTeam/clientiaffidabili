import { AnalyticsGuardrailPanel } from '../../../components/analytics/AnalyticsGuardrailPanel';
import { AnalyticsKpiGrid } from '../../../components/analytics/AnalyticsKpiGrid';
import { ConversionFunnelPanel } from '../../../components/analytics/ConversionFunnelPanel';
import { ErrorInsightsPanel } from '../../../components/analytics/ErrorInsightsPanel';
import { SeoGeoPerformanceTable } from '../../../components/analytics/SeoGeoPerformanceTable';
import { PageHero } from '../../../components/ds/PageHero';

export default function AdminAnalyticsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Admin analytics"
        title="Growth intelligence privacy-safe"
        description="Misura funnel, SEO/GEO, ricavi, margini ed errori operativi senza esporre dati personali, raw payload o informazioni sensibili."
      />
      <div className="container ca-page-stack">
        <AnalyticsGuardrailPanel />
        <AnalyticsKpiGrid />
        <div className="ca-grid ca-grid--2">
          <ConversionFunnelPanel />
          <ErrorInsightsPanel />
        </div>
        <SeoGeoPerformanceTable />
      </div>
    </main>
  );
}
