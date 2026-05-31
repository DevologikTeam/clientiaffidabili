import { Header } from '@/components/Header';
import { Card, StatusPill } from '@/components/ds';

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: 40, paddingBottom: 72 }} id="main-content" tabIndex={-1}>
        <Card variant="elevated">
          <StatusPill tone="brand" label="Legal pack" />
          <h1 style={{ color: 'var(--color-navy-900)', fontSize: 48, marginTop: 16 }}>Limiti dei report</h1>
          <p style={{ maxWidth: 820 }}>I report sono strumenti di supporto decisionale e non garantiscono solvibilita, pagamento o assenza di rischio.</p>
          <p>Versione documento: 2026.05.30. Stato: bozza operativa, non sostituisce revisione professionale.</p>
        </Card>
      </main>
    </>
  );
}
