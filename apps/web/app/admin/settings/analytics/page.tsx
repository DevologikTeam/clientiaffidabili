import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SectionHeader, StatCard, Alert } from '@/components/ds';
import { TagManagerSettingsPanel } from '@/components/analytics/TagManagerSettingsPanel';
import { defaultExternalTrackingConfig } from '@/lib/analytics/tag-manager-clarity-runtime';

export const metadata = {
  title: 'Analytics, Tag Manager e Clarity — Admin',
  robots: { index: false, follow: false },
};

export default function AdminAnalyticsSettingsPage() {
  return (
    <>
      <Header />
      <main className="section ca-section-muted" id="main-content" tabIndex={-1}>
        <div className="container ca-stack">
          <SectionHeader
            eyebrow="Admin settings"
            title="Tag Manager, Clarity e campaign tracking"
            description="Configura tracking esterno solo dove serve, con consenso, route denylist, event whitelist e QA anti-PII. Gli analytics interni restano la fonte primaria."
          />
          <Alert tone="warning" title="Default sicuro">
            GTM e Clarity restano disabilitati finche un admin non abilita esplicitamente i settings backend con reason e audit.
          </Alert>
          <div className="grid-3">
            <StatCard label="Consent Mode" value="denied" description="Default prudente per analytics e ads" status="Obbligatorio" tone="warning" />
            <StatCard label="Route sensibili" value="bloccate" description="Admin, dashboard, checkout, report e fatture" status="Denylist" tone="success" />
            <StatCard label="Payload eventi" value="sanitized" description="No PII, no token, no raw payload" status="QA" tone="info" />
          </div>
          <TagManagerSettingsPanel defaultConfig={defaultExternalTrackingConfig} />
        </div>
      </main>
      <Footer />
    </>
  );
}
