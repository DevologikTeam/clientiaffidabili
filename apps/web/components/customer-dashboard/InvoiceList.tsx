import { Card, StatusPill } from '@/components/ds';
import type { CustomerDashboardInvoiceItem } from '@clientiaffidabili/shared';
import { formatEuro } from '@/lib/customer-dashboard/customer-dashboard-runtime';

export function InvoiceList({ invoices }: { invoices: ReadonlyArray<CustomerDashboardInvoiceItem> }) {
  return (
    <Card>
      <span className="tag">Fatture e pagamenti</span>
      <h1 style={{ color: 'var(--color-navy-900)', fontSize: 42, marginBottom: 8 }}>Documenti fiscali</h1>
      <p>Consulta importi, stato documento e prossima azione. La fatturazione resta separata dal pagamento.</p>
      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead><tr><th>Documento</th><th>Ordine</th><th>Stato</th><th>Totale</th><th>Azione</th></tr></thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td><strong>{invoice.label}</strong></td>
                <td>{invoice.orderId}</td>
                <td><StatusPill tone={invoice.status === 'issued' ? 'success' : 'warning'} label={invoice.status === 'issued' ? 'Emessa' : 'In preparazione'} /></td>
                <td>{formatEuro(invoice.totalAmountCents)}</td>
                <td>{invoice.nextActionLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
