import { Badge, Card, KeyValueList, ProgressBar, StatusPill } from '@/components/ds';

export function ReportPreview() {
  return (
    <Card variant="elevated" className="ca-report-preview">
      <div className="ca-report-preview__header">
        <div>
          <Badge tone="brand">Preview report</Badge>
          <h3>Cliente Demo S.r.l.</h3>
        </div>
        <StatusPill label="Rischio basso" tone="success" />
      </div>
      <div className="ca-report-preview__score" aria-label="Score dimostrativo 82 su 100">
        <strong>82</strong>
        <span>/100</span>
      </div>
      <ProgressBar label="Completezza dati" value={82} helpText="Preview dimostrativa: nessun dato reale viene generato nella landing." />
      <KeyValueList
        items={[
          { label: 'Stato azienda', value: 'Attiva' },
          { label: 'Segnali critici', value: 'Nessun blocco immediato' },
          { label: 'Prossima azione', value: 'Procedere con monitoraggio se il rapporto è ricorrente' }
        ]}
      />
      <p className="ca-muted-note">Il report reale deve sempre indicare fonti consultate, data richiesta, limiti e significato operativo dell’esito.</p>
    </Card>
  );
}
