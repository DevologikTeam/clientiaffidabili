import { SeoGeoPerformanceTable } from '../../../../components/analytics/SeoGeoPerformanceTable';
import { PageHero } from '../../../../components/ds/PageHero';

export default function AdminAnalyticsSubPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero eyebrow="Admin analytics" title="SEO/GEO measurement" description="Controlla cluster, pagine e ricavi assistiti dalle guide." />
      <div className="container ca-page-stack">
        <SeoGeoPerformanceTable />
      </div>
    </main>
  );
}
