import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd, SeoGeoGuideGrid } from '@/components/launch-website';
import { Button, SectionHeader, TrustNotice } from '@/components/ds';
import { breadcrumbJsonLd } from '@/lib/launch-website/launch-website-runtime';
import { buildPublicMetadata } from '@/lib/seo/metadata';

export const metadata = buildPublicMetadata({
  title: 'Guide affidabilità clienti e fornitori | ClientiAffidabili.it',
  description: 'Guide pratiche per capire come verificare affidabilità, limiti dei report, controlli KYB/AML e dati operativi prima di una decisione B2B.',
  path: '/guide',
  keywords: ['guide affidabilità clienti', 'verifica fornitori', 'report aziendale', 'KYB'],
});

export default function GuideIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Guide', path: '/guide' }])} />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="section ca-page-hero">
          <div className="container ca-stack">
            <SectionHeader
              eyebrow="Guide pratiche"
              title="Approfondimenti pratici per decidere con piu chiarezza."
              description="Ogni guida deve spiegare un problema reale, rispondere subito alla domanda principale, indicare limiti e collegare il lettore alla verifica piu adatta." 
            />
            <TrustNotice title="Contenuti revisionati" tone="info">
              Le guide pubblicate sono revisionate periodicamente, spiegano limiti e collegano il lettore alla verifica più adatta.
            </TrustNotice>
          </div>
        </section>
        <section className="section">
          <div className="container ca-stack">
            <SeoGeoGuideGrid />
            <div className="ca-center-actions">
              <Button href="/servizi">Scegli una verifica</Button>
              <Button href="/garanzia-operativa" variant="outline">Leggi garanzia operativa</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
