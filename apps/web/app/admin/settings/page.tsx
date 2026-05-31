import { PageHero } from '@/components/ds';
import { OperationalErrorLedgerTable } from '@/components/settings-admin/OperationalErrorLedgerTable';
import { PurchaseKillSwitchPanel } from '@/components/settings-admin/PurchaseKillSwitchPanel';
import { SettingsNamespaceGrid } from '@/components/settings-admin/SettingsNamespaceGrid';
import { SettingsOverviewCards } from '@/components/settings-admin/SettingsOverviewCards';
import { SettingsTable } from '@/components/settings-admin/SettingsTable';

export default function AdminSettingsPage() {
  return (
    <main className="ca-page" id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Admin settings"
        title="Configurazione piattaforma, acquisti, provider e error ledger"
        description="Gestisci impostazioni sensibili da admin senza esporre segreti, con audit, reason obbligatoria e tracciamento degli errori operativi."
      />
      <SettingsOverviewCards />
      <PurchaseKillSwitchPanel />
      <SettingsNamespaceGrid />
      <section className="ca-section">
        <h2>Settings operativi</h2>
        <SettingsTable />
      </section>
      <section className="ca-section">
        <h2>Error ledger</h2>
        <OperationalErrorLedgerTable />
      </section>
    </main>
  );
}
