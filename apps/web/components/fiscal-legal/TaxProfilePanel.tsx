import { Button, Card, StatusPill } from '@/components/ds';
import type { CustomerTaxProfileCardSnapshot } from '@clientiaffidabili/shared';
import { fiscalStatusTone } from '@/lib/fiscal-legal/fiscal-legal-runtime';

export function TaxProfilePanel({ profile }: { profile: CustomerTaxProfileCardSnapshot }) {
  return (
    <Card variant="elevated">
      <div className="section-head" style={{ alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <StatusPill tone={fiscalStatusTone(profile.status)} label={profile.statusLabel} />
          <h1 style={{ color: 'var(--color-navy-900)', fontSize: 42, marginTop: 14 }}>Profilo fiscale</h1>
          <p>I dati vengono salvati come snapshot negli ordini e nei documenti fiscali. Le modifiche non alterano documenti gia emessi.</p>
        </div>
        <Button type="button" variant="outline">Aggiorna dati</Button>
      </div>
      <dl className="ca-kv-list">
        <div><dt>Ragione sociale</dt><dd>{profile.legalName}</dd></div>
        <div><dt>Partita IVA</dt><dd>{profile.vatNumber ?? 'Non indicata'}</dd></div>
        <div><dt>Codice fiscale</dt><dd>{profile.taxCode ?? 'Non indicato'}</dd></div>
        <div><dt>PEC / SDI</dt><dd>{profile.pec ?? 'PEC non indicata'} · {profile.sdiCode ?? 'SDI non indicato'}</dd></div>
        <div><dt>Indirizzo</dt><dd>{profile.address}</dd></div>
        <div><dt>Prossima azione</dt><dd>{profile.nextActionLabel}</dd></div>
      </dl>
    </Card>
  );
}
