import { BillingProfileForm, CheckoutLegalConfirmation, CheckoutOrderSummary, PaymentStatusPanel } from '@/components/billing';
import { TestModeNotice } from '@/components/commerce';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Alert, Button, Card, Field, SectionHeader, Stepper, TrustNotice } from '@/components/ds';
import { checkoutSteps } from '@/lib/billing/checkout';
import { getCatalogServiceByCode, catalogServices } from '@/lib/catalog/catalog';
import { isCommerceTestMode } from '@/lib/runtime/commerce-mode';

const getServiceByCode = getCatalogServiceByCode;

type CheckoutPageProps = {
  searchParams: {
    service?: string;
    product?: string;
  };
};

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const selectedCode = searchParams.service ?? searchParams.product;
  const product = getServiceByCode(selectedCode) ?? catalogServices.find((service) => service.code === 'COMPANY_PRO') ?? catalogServices[0];
  const assisted = product.status === 'assisted';
  const testMode = isCommerceTestMode();
  const subjectHelp = product.scenario === 'payment-data'
    ? 'Inserisci solo il dato operativo richiesto dal servizio scelto, ad esempio IBAN, email o numero di telefono.'
    : 'Inserisci ragione sociale o partita IVA del soggetto da verificare.';

  return (
    <>
      <Header />
      <main className="section ca-section-muted" id="main-content" tabIndex={-1}>
        <div className="container ca-stack ca-stack--lg">
          <SectionHeader
            eyebrow="Checkout protetto"
            title={assisted ? 'Richiedi una verifica assistita.' : 'Conferma dati, fatturazione e pagamento.'}
            description="Il checkout mostra servizio, dati richiesti, totale indicativo, limiti e conferme prima del pagamento. Nessun dato carta viene salvato su ClientiAffidabili.it."
          />
          <Stepper steps={checkoutSteps.map((step) => step.label)} currentStep={assisted ? 3 : 4} />
          <TestModeNotice context="checkout" />
          <div className="ca-error-summary" role="status" aria-live="polite">
            <strong>Prima di procedere controlla questi punti:</strong>
            <ul>
              <li>Il dato inserito deve essere necessario alla verifica scelta.</li>
              <li>La finalità deve essere professionale, lecita e proporzionata.</li>
              <li>Il totale viene confermato prima del pagamento.</li>
            </ul>
          </div>
          <div className="ca-detail-grid">
            <section className="ca-stack" aria-labelledby="checkout-form-title">
              <Card>
                <form className="form">
                  <h2 id="checkout-form-title">Dati necessari alla verifica</h2>
                  <fieldset className="ca-stack ca-stack-sm">
                    <legend className="ca-fieldset-legend">1. Verifica richiesta</legend>
                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="subject-type">Tipo dato da verificare</label>
                        <select id="subject-type" name="subjectType" defaultValue={product.scenario === 'payment-data' ? 'data' : 'company'} aria-describedby="subject-type-help">
                          <option value="company">Azienda</option>
                          <option value="person">Persona in contesto professionale consentito</option>
                          <option value="data">Dato operativo</option>
                        </select>
                        <p id="subject-type-help" className="ca-field__help">Serve a mostrare solo i campi coerenti con il servizio scelto.</p>
                      </div>
                      <Field label="Servizio scelto" name="selectedService" value={product.name} readOnly helpText="Puoi tornare al catalogo se vuoi scegliere un servizio diverso." />
                    </div>
                    <Field
                      label="Dato da verificare"
                      name="verificationSubject"
                      placeholder={product.scenario === 'payment-data' ? 'Es. IBAN, email o telefono' : 'Es. Rossi Srl / 01234567890'}
                      helpText={subjectHelp}
                      required
                    />
                  </fieldset>

                  <BillingProfileForm />

                  <CheckoutLegalConfirmation />

                  <Alert title={assisted ? 'Verifica assistita' : 'Pagamento protetto'} tone={assisted ? 'warning' : 'info'}>
                    <p>
                      {assisted
                        ? 'Questo servizio richiede controllo manuale prima dell’evasione. Riceverai una conferma con tempi e prossima azione.'
                        : 'Dopo il pagamento confermato, la richiesta viene registrata e la verifica viene avviata secondo i limiti indicati nel servizio.'}
                    </p>
                  </Alert>
                  {testMode ? (
                    <div className="ca-checkout-test-actions">
                      <Button size="lg" disabled>Pagamento disabilitato in modalità test</Button>
                      <Button href="/contatti" variant="outline" size="lg">Richiedi supporto per una prova</Button>
                    </div>
                  ) : (
                    <Button href={assisted ? '/dashboard' : '/checkout/success'} size="lg">
                      {assisted ? 'Invia richiesta assistita' : 'Procedi al pagamento protetto'}
                    </Button>
                  )}
                </form>
              </Card>
            </section>

            <aside className="ca-stack" aria-label="Riepilogo checkout">
              <CheckoutOrderSummary service={product} />
              <PaymentStatusPanel />
              <TrustNotice title="Nota importante" tone="warning">
                <p>Il report fotografa le fonti disponibili al momento della richiesta e non costituisce garanzia assoluta. Prezzo e condizioni vengono confermati prima del pagamento.</p>
              </TrustNotice>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
