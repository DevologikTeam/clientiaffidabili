import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { buildPublicMetadata } from '@/lib/seo/metadata';
import { Button, PageHero } from '@/components/ds';
import { ContactCaptureForm } from '@/components/sales-crm/ContactCaptureForm';

export const metadata = buildPublicMetadata({
  title: 'Contatti | ClientiAffidabili.it',
  description: 'Parla con ClientiAffidabili.it per scegliere la verifica piu adatta prima di valutare clienti, fornitori, pagamenti e rapporti commerciali.',
  path: '/contatti',
  keywords: ['contatti ClientiAffidabili.it', 'supporto verifiche aziendali', 'richiesta verifica cliente fornitore'],
});

type ContactPageProps = {
  searchParams?: {
    inviata?: string;
    errore?: string;
  };
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const sent = searchParams?.inviata === '1';
  const failed = searchParams?.errore === '1';

  return (
    <>
      <Header />
      <main className="ca-page" id="main-content" tabIndex={-1}>
        <PageHero
          eyebrow="Contatti"
          title="Hai un dubbio prima di verificare un cliente o un fornitore?"
          description="Scrivici il contesto: ti aiutiamo a capire quale controllo scegliere, cosa aspettarti dal report e quali limiti considerare prima di procedere."
          actions={
            <>
              <Button href="/servizi">Vedi i servizi</Button>
              <Button href="/prezzi" variant="outline">Confronta i prezzi</Button>
            </>
          }
          aside={
            <div className="ca-contact-hero-aside">
              <strong>Quando scriverci</strong>
              <ul>
                <li>devi decidere se concedere credito o spedire;</li>
                <li>vuoi valutare un fornitore prima di pagarlo;</li>
                <li>non sai quale verifica acquistare.</li>
              </ul>
            </div>
          }
        />
        {sent ? (
          <section className="ca-contact-feedback ca-contact-feedback--success" aria-live="polite">
            <div className="container">
              <strong>Richiesta ricevuta.</strong>
              <span>Ti ricontatteremo con le indicazioni utili per scegliere il controllo più adatto.</span>
            </div>
          </section>
        ) : null}
        {failed ? (
          <section className="ca-contact-feedback ca-contact-feedback--warning" aria-live="polite">
            <div className="container">
              <strong>Invio non riuscito.</strong>
              <span>Riprova tra poco o scrivi indicando il tipo di verifica di cui hai bisogno.</span>
            </div>
          </section>
        ) : null}
        <ContactCaptureForm />
      </main>
      <Footer />
    </>
  );
}
