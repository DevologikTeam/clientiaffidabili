import { Card, StatCard } from '@/components/ds';
import { salesCrmRuntime } from '@/lib/sales-crm/sales-crm-runtime';

export function AdminCrmSummary() {
  return (
    <div className="ca-grid ca-grid--4">
      <StatCard label="Messaggi nuovi" value={String(salesCrmRuntime.summary.newMessages)} description="Da qualificare in inbox" />
      <StatCard label="Lead aperti" value={String(salesCrmRuntime.summary.openLeads)} description="Pipeline commerciale" />
      <StatCard label="Ticket aperti" value={String(salesCrmRuntime.summary.openTickets)} description="Supporto e anomalie" />
      <StatCard label="Email fallite" value={String(salesCrmRuntime.summary.failedEmailDeliveries)} description="Da verificare" tone="warning" />
    </div>
  );
}

export function CrmGuardrailsCard() {
  return (
    <Card>
      <p className="ca-eyebrow">Guardrail operativi</p>
      <h2>Regole CRM/supporto</h2>
      <ul className="ca-checklist">
        {salesCrmRuntime.guardrails.map((item) => (
          <li key={item}><span aria-hidden="true">✓</span>{item}</li>
        ))}
      </ul>
    </Card>
  );
}
