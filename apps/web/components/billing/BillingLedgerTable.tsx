import { Card, DataTable, StatusPill } from '@/components/ds';

const rows = [
  ['payment_succeeded', 'Ordine CA-2026-001', '€ 24,90', 'Completato'],
  ['subscription_created', 'Piano Pro', '€ 79,00', 'Attivo'],
  ['refund_requested', 'Richiesta RF-001', '-€ 24,90', 'Review'],
  ['dispute_opened', 'PayPal/Stripe dispute', '€ 0,00', 'Bloccato'],
];

export function BillingLedgerTable() {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-slate-950">Ledger economico</h3>
      <p className="mt-2 text-sm text-slate-600">Vista admin sintetica: ogni evento economico resta append-only e riconciliabile.</p>
      <div className="mt-5">
        <DataTable columns={["Evento", "Riferimento", "Importo", "Stato"]} rows={rows.map(([event, ref, amount, status]) => [event, ref, amount, <StatusPill key={event} tone={status === 'Bloccato' ? 'danger' : status === 'Review' ? 'warning' : 'success'}>{status}</StatusPill>])} />
      </div>
    </Card>
  );
}
