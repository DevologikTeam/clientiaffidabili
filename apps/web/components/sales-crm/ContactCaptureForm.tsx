import { Button, Card, Field, TrustNotice } from '@/components/ds';

const contactReasons = [
  { value: 'contatto-verifica-cliente', label: 'Voglio controllare un nuovo cliente' },
  { value: 'contatto-fornitore-partner', label: 'Devo valutare un fornitore o partner' },
  { value: 'contatto-dato-operativo', label: 'Mi serve una verifica su IBAN, email o telefono' },
  { value: 'contatto-api-team', label: 'Vorrei capire piani, team o API partner' },
  { value: 'contatto-supporto-altro', label: 'Ho una domanda diversa' },
];

const responseSteps = [
  'leggiamo il contesto e individuiamo la verifica più adatta;',
  'ti indichiamo prezzo, tempi e limiti prima di procedere;',
  'se serve, ti aiutiamo a scegliere tra servizio singolo, pacchetto o supporto partner.',
];

export function ContactCaptureForm() {
  return (
    <section className="ca-contact-section" aria-labelledby="contact-form-title">
      <div className="container ca-contact-layout">
        <aside className="ca-contact-assurance" aria-label="Cosa succede dopo l'invio">
          <p className="ca-eyebrow">Prima di procedere</p>
          <h2>Ti aiutiamo a scegliere il controllo giusto, senza farti acquistare al buio.</h2>
          <p>
            Usa questo spazio per raccontarci la decisione che devi prendere. Ti risponderemo con un’indicazione chiara su servizio consigliato, informazioni disponibili e limiti da considerare.
          </p>
          <div className="ca-contact-response-card">
            <strong>Cosa ricevi in risposta</strong>
            <ol>
              {responseSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <TrustNotice title="Uso responsabile delle verifiche" tone="warning" className="ca-contact-notice">
            Le verifiche aiutano a prendere decisioni più prudenti, ma non sostituiscono consulenza legale, istruttoria bancaria o una garanzia di pagamento.
          </TrustNotice>
        </aside>

        <Card variant="elevated" className="ca-contact-card">
          <div className="ca-contact-card__head">
            <p className="ca-eyebrow">Richiesta guidata</p>
            <h2 id="contact-form-title">Raccontaci cosa vuoi verificare</h2>
            <p>
              Compila i dati essenziali. Bastano poche informazioni: ci aiutano a capire se serve una verifica cliente, fornitore, dato operativo o una soluzione per team.
            </p>
          </div>

          <form className="ca-contact-form" action="/api/sales-crm/contact-messages" method="post">
            <input type="hidden" name="sourceType" value="contact" />
            <input type="hidden" name="sourcePath" value="/contatti" />

            <fieldset className="ca-contact-fieldset">
              <legend>Dati per ricontattarti</legend>
              <div className="ca-contact-fields-grid">
                <Field label="Nome e cognome" name="name" placeholder="Mario Rossi" autoComplete="name" required />
                <Field label="Email di lavoro" name="email" type="email" placeholder="mario@azienda.it" autoComplete="email" required />
                <Field label="Azienda" name="companyName" placeholder="Rossi S.r.l." autoComplete="organization" />
                <Field label="Telefono" name="phone" type="tel" placeholder="+39 ..." autoComplete="tel" />
              </div>
            </fieldset>

            <fieldset className="ca-contact-fieldset">
              <legend>Scenario da valutare</legend>
              <label className="ca-field" htmlFor="contact-reason">
                <span>Motivo della richiesta</span>
                <select id="contact-reason" name="ctaId" defaultValue="contatto-verifica-cliente" required>
                  {contactReasons.map((reason) => (
                    <option key={reason.value} value={reason.value}>{reason.label}</option>
                  ))}
                </select>
                <small className="ca-field__help">Serve solo per indirizzare la richiesta alla risposta più utile.</small>
              </label>
              <Field
                label="Cosa devi decidere?"
                name="message"
                as="textarea"
                rows={5}
                wrapperClassName="ca-contact-field--full"
                placeholder="Esempio: devo concedere pagamento dilazionato a un nuovo cliente e vorrei capire quale controllo fare prima di procedere."
                helpText="Evita dati sensibili non necessari. Puoi indicare settore, urgenza, importo indicativo o tipo di rapporto commerciale."
                required
              />
            </fieldset>

            <label className="ca-contact-checkbox">
              <input name="privacyAccepted" type="checkbox" value="true" required />
              <span>Ho letto l’informativa privacy e autorizzo il trattamento della richiesta.</span>
            </label>

            <div className="ca-contact-submit-row">
              <Button type="submit" size="lg">Invia richiesta</Button>
              <p>Rispondiamo appena possibile. Se è urgente, indica anche il numero di telefono.</p>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
