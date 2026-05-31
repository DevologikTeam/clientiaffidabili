import { ErrorInsightsPanel } from '../../../../components/analytics/ErrorInsightsPanel';
import { PageHero } from '../../../../components/ds/PageHero';

export default function AdminAnalyticsSubPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero eyebrow="Admin analytics" title="Error insights" description="Aggrega errori operativi senza raw payload o PII." />
      <div className="container ca-page-stack">
        <ErrorInsightsPanel />
      </div>
    </main>
  );
}
