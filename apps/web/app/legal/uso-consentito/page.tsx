import { Header } from '@/components/Header';
import { Card, StatusPill } from '@/components/ds';

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: 40, paddingBottom: 72 }} id="main-content" tabIndex={-1}>
        <Card variant="elevated">
          <StatusPill tone="brand" label="Legal pack" />
          <h1 style={{ color: 'var(--color-navy-900)', fontSize: 48, marginTop: 16 }}>Uso consentito</h1>
          <p style={{ maxWidth: 820 }}>I servizi devono essere usati solo per finalita lecite e coerenti con verifica commerciale, compliance o relazione contrattuale.</p>
          <p>Versione documento: 2026.05.30. Stato: bozza operativa, non sostituisce revisione professionale.</p>
        </Card>
      </main>
    </>
  );
}
