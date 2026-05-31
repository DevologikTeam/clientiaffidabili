import { Button, Card, Field, TrustNotice } from '@/components/ds';

export function ContactCaptureForm() {
  return (
    <Card>
      <p className="ca-eyebrow">Parla con noi</p>
      <h2>Richiedi informazioni su verifiche e report</h2>
      <p>Il messaggio viene salvato in modo sicuro nell'area admin prima del tentativo di invio email, cosi non viene perso se il provider email ha problemi.</p>
      <form className="ca-form" action="/api/sales-crm/contact-messages" method="post">
        <Field label="Nome e cognome" name="name" placeholder="Mario Rossi" required />
        <Field label="Email" name="email" type="email" placeholder="mario@azienda.it" required />
        <Field label="Azienda" name="companyName" placeholder="Rossi SRL" />
        <Field label="Telefono" name="phone" placeholder="+39 ..." />
        <Field label="Messaggio" name="message" as="textarea" rows={6} placeholder="Descrivi il tipo di verifica o il problema da risolvere." required />
        <label className="ca-checkbox">
          <input name="privacyAccepted" type="checkbox" required />
          <span>Accetto la privacy policy e autorizzo il trattamento della richiesta.</span>
        </label>
        <Button type="submit">Invia richiesta</Button>
      </form>
      <TrustNotice title="Garanzia operativa">
        Salviamo la richiesta anche se l'email non parte, cosi il team puo leggerla e gestirla dall'admin.
      </TrustNotice>
    </Card>
  );
}
