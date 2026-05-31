import { Button, Card, StatCard, StatusPill } from '@/components/ds';
import type { CustomerDashboardSummarySnapshot } from '@clientiaffidabili/shared';

export function DashboardStatusHero({ summary }: { summary: CustomerDashboardSummarySnapshot }) {
  return (
    <Card variant="elevated" className="customer-hero-card">
      <div className="customer-hero-card__content">
        <div>
          <StatusPill tone="brand" label="Area cliente" />
          <h1 style={{ color: 'var(--color-navy-900)', fontSize: 48, marginBottom: 12 }}>Le tue verifiche</h1>
          <p style={{ maxWidth: 720 }}>Controlla report pronti, verifiche in corso, fatture e richieste di supporto da una cabina di regia semplice e sicura.</p>
        </div>
        <Button href={summary.nextBestAction.href}>{summary.nextBestAction.ctaLabel}</Button>
      </div>
      <div className="ca-grid ca-grid--4 customer-stat-grid">
        <StatCard label="Report pronti" value={String(summary.readyReports)} description="Consultabili adesso" tone="success" status="Disponibili" />
        <StatCard label="In lavorazione" value={String(summary.pendingChecks)} description="Nessuna azione richiesta" tone="info" status="In corso" />
        <StatCard label="Azioni richieste" value={String(summary.actionRequired)} description="Da gestire" tone={summary.actionRequired ? 'warning' : 'success'} status={summary.actionRequired ? 'Attenzione' : 'Ok'} />
        <StatCard label="Notifiche" value={String(summary.unreadNotifications)} description="Non lette" tone={summary.unreadNotifications ? 'warning' : 'neutral'} status="Aggiornamenti" />
      </div>
    </Card>
  );
}
