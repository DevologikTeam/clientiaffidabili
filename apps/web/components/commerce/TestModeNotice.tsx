import { Alert, Button } from '@/components/ds';
import { isCommerceTestMode } from '@/lib/runtime/commerce-mode';

type TestModeNoticeProps = {
  context?: 'public' | 'catalog' | 'pricing' | 'checkout' | 'compact';
  className?: string;
};

const copyByContext: Record<NonNullable<TestModeNoticeProps['context']>, { title: string; body: string; action?: string }> = {
  public: {
    title: 'Modalità test attiva',
    body: 'Puoi navigare servizi, prezzi e percorso di richiesta, ma gli acquisti sono disattivati: nessun pagamento e nessuna verifica reale vengono avviati.',
    action: 'Contattaci per una prova guidata',
  },
  catalog: {
    title: 'Acquisto disattivato in ambiente di test',
    body: 'Le schede sono consultabili e il percorso checkout è visibile per prova. Il pagamento resta bloccato finché la modalità live non viene abilitata.',
    action: 'Richiedi supporto',
  },
  pricing: {
    title: 'Prezzi consultabili, pagamento non attivo',
    body: 'I prezzi sono visibili per valutare il servizio. In questa configurazione di test non vengono creati ordini pagati né addebiti reali.',
    action: 'Parla con noi',
  },
  checkout: {
    title: 'Checkout in modalità test',
    body: 'Il riepilogo è visibile per controllare dati, prezzo e limiti. Il pagamento è disabilitato e non partirà nessuna verifica reale.',
    action: 'Richiedi informazioni',
  },
  compact: {
    title: 'Modalità test',
    body: 'Acquisti e verifiche reali sono disattivati in questo ambiente.',
  },
};

export function TestModeNotice({ context = 'public', className }: TestModeNoticeProps) {
  if (!isCommerceTestMode()) return null;

  const copy = copyByContext[context];

  return (
    <Alert
      title={copy.title}
      tone="warning"
      className={['ca-test-mode-notice', className ?? ''].filter(Boolean).join(' ')}
      action={copy.action ? <Button href="/contatti" variant="outline" size="sm">{copy.action}</Button> : undefined}
    >
      <p>{copy.body}</p>
    </Alert>
  );
}
