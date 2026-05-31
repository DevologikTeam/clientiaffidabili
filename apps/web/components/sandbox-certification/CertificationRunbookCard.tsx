import { Card, Checklist } from '../ds';

export function CertificationRunbookCard() {
  return (
    <Card>
      <p className="ca-eyebrow">Runbook</p>
      <h2>Comandi previsti per ambiente reale</h2>
      <Checklist items={[
        'pnpm qa:sandbox-certification-development',
        'pnpm sandbox:certification:runner',
        'pnpm sandbox:certification:static-gate',
        'pnpm e2e:ci con servizi avviati',
        'docker compose build && docker compose up con healthcheck web/API',
      ]} />
      <p>Le prove provider Stripe, PayPal, Openapi, OpenAI ed email devono usare credenziali sandbox inserite come secret fuori dal repository.</p>
    </Card>
  );
}
