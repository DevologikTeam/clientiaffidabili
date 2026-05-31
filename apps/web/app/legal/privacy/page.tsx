import { Header } from '@/components/Header';
import { Card, StatusPill } from '@/components/ds';

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: 40, paddingBottom: 72 }} id="main-content" tabIndex={-1}>
        <Card variant="elevated">
          <StatusPill tone="brand" label="Legal pack" />
          <h1 style={{ color: 'var(--color-navy-900)', fontSize: 48, marginTop: 16 }}>Informativa privacy</h1>
          <p style={{ maxWidth: 820 }}>Informativa privacy placeholder. Prima del go-live va completata con ruoli privacy, basi giuridiche, retention, subfornitori e canali di esercizio diritti.</p>
          <p>Versione documento: 2026.05.30. Stato: bozza operativa, non sostituisce revisione professionale.</p>
        </Card>
      </main>
    </>
  );
}
