import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { buildPublicMetadata } from '@/lib/seo/metadata';
import { PageHero } from '@/components/ds';
import { ContactCaptureForm } from '@/components/sales-crm/ContactCaptureForm';

export const metadata = buildPublicMetadata({
  title: 'Contatti | ClientiAffidabili.it',
  description: 'Richiedi informazioni su report di affidabilita, verifiche aziendali, abbonamenti e supporto operativo.',
  path: '/contatti',
  keywords: ['contatti ClientiAffidabili.it', 'supporto verifiche aziendali'],
});

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="ca-page" id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Contatti"
        title="Parliamo della verifica piu adatta al tuo caso"
        description="Spiega il tuo scenario: clienti nuovi, fornitori, pagamenti dilazionati, controlli KYB o uso API. Il team potra leggere la richiesta dall'admin anche se l'invio email fallisce."
      />
      <ContactCaptureForm />
    </main>
      <Footer />
    </>
  );
}
