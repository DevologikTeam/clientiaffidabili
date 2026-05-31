import { Alert, Card } from '@/components/ds';

export function PurchaseKillSwitchPanel() {
  return (
    <Card>
      <p className="ca-eyebrow">Kill switch acquisti</p>
      <h2>Sospendi nuovi acquisti senza bloccare gli ordini gia pagati</h2>
      <p>
        Il controllo deve essere applicato lato backend prima della creazione della sessione checkout,
        del pacchetto crediti, dell'abbonamento e delle chiamate partner a consumo.
      </p>
      <Alert tone="info" title="Regola operativa">
        Ogni modifica richiede una motivazione. Il cliente vede un messaggio chiaro, mentre admin mantiene audit completo.
      </Alert>
    </Card>
  );
}
