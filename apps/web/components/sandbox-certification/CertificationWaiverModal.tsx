import { Card, Field } from '../ds';

export function CertificationWaiverModal() {
  return (
    <Card>
      <p className="ca-eyebrow">Waiver controllato</p>
      <h2>Anteprima waiver auditato</h2>
      <p>Il waiver non certifica lo scenario: permette di continuare solo se la funzione resta disabilitata e la decisione e registrata.</p>
      <div className="ca-grid ca-grid-2">
        <Field label="Scenario" name="waiverScenario" defaultValue="paypal-payment-success" readOnly />
        <Field label="Feature flag disabilitato" name="waiverFlag" defaultValue="payments.paypal.enabled = false" readOnly />
        <Field label="Motivazione obbligatoria" name="waiverReason" as="textarea" defaultValue="PayPal resta disabilitato fino alla certificazione sandbox reale." readOnly />
      </div>
    </Card>
  );
}
