import { Card, StatusPill } from '@/components/ds';
import type { CustomerLegalAcceptanceItem, CustomerLegalDocumentItem } from '@clientiaffidabili/shared';

export function LegalAcceptancePanel({ acceptances, legalPack }: { acceptances: ReadonlyArray<CustomerLegalAcceptanceItem>; legalPack: ReadonlyArray<CustomerLegalDocumentItem> }) {
  return (
    <div className="ca-grid ca-grid--2">
      <Card>
        <span className="tag">Accettazioni</span>
        <h2 style={{ fontSize: 28, marginTop: 12 }}>Consensi e versioni accettate</h2>
        <div className="ca-stack">
          {acceptances.map((item) => (
            <div className="customer-notification" key={item.id}>
              <StatusPill tone="success" label={item.source === 'checkout' ? 'Checkout' : item.source} />
              <div><strong>{item.label}</strong><p>Versione {item.version} · {new Date(item.acceptedAt).toLocaleDateString('it-IT')}</p></div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <span className="tag">Legal pack</span>
        <h2 style={{ fontSize: 28, marginTop: 12 }}>Documenti pubblicati</h2>
        <div className="ca-stack">
          {legalPack.map((doc) => (
            <div className="customer-support-row" key={`${doc.documentType}-${doc.version}`}>
              <StatusPill tone={doc.status === 'published' ? 'success' : 'warning'} label={doc.status} />
              <div><strong>{doc.title}</strong><p>Versione {doc.version}</p></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
