import { Alert, Card, KeyValueList } from '@/components/ds';

export function PaymentStatusPanel({ mode = 'pending' }: { mode?: 'pending' | 'success' | 'cancel' }) {
  if (mode === 'success') {
    return (
      <Alert title="Pagamento ricevuto" tone="success">
        <p>Il pagamento è stato confermato. Ora la verifica può essere avviata in modo controllato e il report verrà preparato appena disponibili gli esiti.</p>
      </Alert>
    );
  }
  if (mode === 'cancel') {
    return (
      <Alert title="Checkout annullato" tone="warning">
        <p>Nessun pagamento e nessuna verifica sono stati avviati. Puoi tornare al checkout e creare una nuova richiesta quando vuoi.</p>
      </Alert>
    );
  }
  return (
    <Card>
      <span className="ca-eyebrow">Stato pagamento</span>
      <h2>Pagamento protetto pronto</h2>
      <KeyValueList
        items={[
          { label: 'Modalità', value: 'sessione di pagamento ospitata' },
          { label: 'Dati carta', value: 'non salvati nel database' },
          { label: 'Conferma ordine', value: 'richiesta prima dell’avvio verifica' },
          { label: 'Fonti dati', value: 'consultate solo dopo pagamento confermato' },
        ]}
      />
    </Card>
  );
}
