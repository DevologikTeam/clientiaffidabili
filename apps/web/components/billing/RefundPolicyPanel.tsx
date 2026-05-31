import { Card, DataTable } from '@/components/ds';
import { refundPolicyRows } from '@/lib/billing/payment-providers-subscriptions-runtime';

export function RefundPolicyPanel() {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-slate-950">Policy rimborsi</h3>
      <p className="mt-2 text-sm text-slate-600">Ogni rimborso usa ledger append-only, reason obbligatoria e blocchi anti doppio rimborso.</p>
      <div className="mt-5">
        <DataTable
          columns={["Scenario", "Esito", "Regola operativa"]}
          rows={refundPolicyRows.map(([scenario, outcome, rule]) => [scenario, outcome, rule])}
        />
      </div>
    </Card>
  );
}
