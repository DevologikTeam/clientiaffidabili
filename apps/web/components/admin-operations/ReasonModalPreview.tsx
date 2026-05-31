import { Card, TrustNotice } from '@/components/ds';

export function ReasonModalPreview() {
  return (
    <Card>
      <p className="ca-eyebrow">Reason modal</p>
      <h3>Motivazione obbligatoria</h3>
      <p>Ogni azione sensibile richiede una motivazione leggibile, categoria, conferma guardrail e anteprima audit.</p>
      <div className="form">
        <label className="field" htmlFor="admin-reason">
          <span>Motivazione</span>
          <textarea id="admin-reason" rows={3} placeholder="Es. Retry consentito perché la chiamata precedente non ha generato costo provider e usa la stessa idempotency key." />
          <small>Minimo 8 caratteri. Evitare testi come ok, test, fix.</small>
        </label>
        <label className="field" htmlFor="admin-reason-category">
          <span>Categoria</span>
          <select id="admin-reason-category" defaultValue="provider_error">
            <option value="provider_error">Errore provider</option>
            <option value="billing_reconciliation">Riconciliazione billing</option>
            <option value="compliance_review">Review compliance</option>
            <option value="customer_request">Richiesta cliente</option>
          </select>
        </label>
        <TrustNotice tone="info" title="Anteprima audit">
          L'audit salverà azione, attore, ruolo, motivazione e contesto redatto. Nessun raw payload verrà mostrato.
        </TrustNotice>
      </div>
    </Card>
  );
}
