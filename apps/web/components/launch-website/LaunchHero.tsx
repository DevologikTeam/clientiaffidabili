import { Button, Card, Checklist } from '@/components/ds';

export function LaunchHero() {
  return (
    <section className="ca-launch-hero">
      <div className="container ca-launch-hero__grid">
        <div className="ca-stack">
          <span className="ca-eyebrow ca-eyebrow--light">Verifiche per decisioni commerciali più sicure</span>
          <h1>Controlla clienti e fornitori prima di esporti a un rischio.</h1>
          <p>
            Report leggibili, prezzi chiari e fonti dichiarate per decidere se vendere, spedire, concedere credito,
            pagare un fornitore o chiedere maggiori garanzie.
          </p>
          <div className="hero-actions">
            <Button href="/servizi" size="lg">Scegli una verifica</Button>
            <Button href="/garanzia-operativa" variant="outline" size="lg">Vedi garanzie e limiti</Button>
          </div>
        </div>
        <Card variant="elevated" className="ca-launch-hero-card">
          <span className="ca-eyebrow">Cosa ricevi</span>
          <h2>Una sintesi chiara prima di prendere impegni.</h2>
          <Checklist
            items={[
              'Prezzo e totale visibili prima del pagamento',
              'Fonti, data richiesta e limiti espliciti',
              'Segnali di attenzione spiegati in modo leggibile',
              'Supporto se la verifica non può essere completata',
            ]}
          />
          <Button href="/prezzi" fullWidth>Confronta servizi e prezzi</Button>
        </Card>
      </div>
    </section>
  );
}
