import { Button, Card, StatusPill } from '@/components/ds';
import type { CustomerFiscalDocumentItem } from '@clientiaffidabili/shared';
import { fiscalStatusTone, formatEuro } from '@/lib/fiscal-legal/fiscal-legal-runtime';

export function FiscalDocumentTable({ documents }: { documents: ReadonlyArray<CustomerFiscalDocumentItem> }) {
  return (
    <Card>
      <span className="tag">Documenti fiscali</span>
      <h2 style={{ fontSize: 30, marginTop: 12 }}>Fatture, ricevute e note credito</h2>
      <p>Ogni documento conserva lo snapshot fiscale usato al momento dell'emissione.</p>
      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead><tr><th>Documento</th><th>Ordine</th><th>Stato</th><th>Totale</th><th>Azione</th></tr></thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td><strong>{doc.label}</strong><br /><span style={{ color: 'var(--color-slate-600)' }}>{doc.documentType}</span></td>
                <td>{doc.orderId ?? '—'}</td>
                <td><StatusPill tone={fiscalStatusTone(doc.status)} label={doc.statusLabel} /></td>
                <td>{formatEuro(doc.totalAmountCents)}</td>
                <td>{doc.downloadUrl ? <Button href={doc.downloadUrl} variant="outline">Scarica</Button> : doc.nextActionLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
