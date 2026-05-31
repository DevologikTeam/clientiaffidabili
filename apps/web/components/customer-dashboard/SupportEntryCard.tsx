import { Card, Field, Button, StatusPill } from '@/components/ds';
import type { CustomerDashboardSupportTicketItem } from '@clientiaffidabili/shared';

export function SupportEntryCard({ tickets }: { tickets: ReadonlyArray<CustomerDashboardSupportTicketItem> }) {
  return (
    <div className="ca-grid ca-grid--2">
      <Card>
        <StatusPill tone="brand" label="Supporto" />
        <h1 style={{ color: 'var(--color-navy-900)', fontSize: 42, marginBottom: 8 }}>Hai bisogno di aiuto?</h1>
        <p>Apri una richiesta collegata a ordine, verifica, report o fattura. Il team avrà subito il contesto corretto.</p>
        <form className="form">
          <Field label="Oggetto" name="subject" placeholder="Es. chiarimento su una verifica" />
          <Field label="Messaggio" name="message" placeholder="Descrivi in modo sintetico cosa vuoi chiarire" as="textarea" />
          <Button type="button">Prepara richiesta</Button>
        </form>
      </Card>
      <Card>
        <span className="tag">Richieste recenti</span>
        <div className="ca-stack" style={{ marginTop: 18 }}>
          {tickets.map((ticket) => (
            <div className="customer-support-row" key={ticket.id}>
              <StatusPill tone={ticket.status === 'resolved' ? 'success' : 'info'} label={ticket.status === 'in_review' ? 'In verifica' : ticket.status} />
              <div><strong>{ticket.subject}</strong><p>Priorità {ticket.priority}</p></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
