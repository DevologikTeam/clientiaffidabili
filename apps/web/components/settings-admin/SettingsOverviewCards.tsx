import { Alert, StatCard } from '@/components/ds';
import { settingsAdminRuntime } from '@/lib/settings-admin/settings-admin-runtime';

export function SettingsOverviewCards() {
  return (
    <section className="ca-grid ca-grid-4">
      <StatCard label="Acquisti" value={settingsAdminRuntime.summary.purchasesEnabled ? 'Attivi' : 'Sospesi'} helper="Kill switch server-side" />
      <StatCard label="Errori critici" value={String(settingsAdminRuntime.summary.criticalErrors)} helper="Da analizzare prima di nuovi rilasci" />
      <StatCard label="Settings da verificare" value={String(settingsAdminRuntime.summary.settingsRequiringReview)} helper="Secret/provider non ancora validati" />
      <StatCard label="Errori aperti" value={String(settingsAdminRuntime.summary.openErrors)} helper="Pagamenti, provider, OpenAI, email" />
      <div className="ca-grid-span-4">
        <Alert tone="warning" title="Produzione non ancora pronta">
          {settingsAdminRuntime.summary.launchStatus}
        </Alert>
      </div>
    </section>
  );
}
