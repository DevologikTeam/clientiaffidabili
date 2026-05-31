import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd, OperationalGuarantee } from '@/components/launch-website';
import { Button, Card, SectionHeader, TrustNotice } from '@/components/ds';
import { breadcrumbJsonLd } from '@/lib/launch-website/launch-website-runtime';
import { buildPublicMetadata } from '@/lib/seo/metadata';

export const metadata = buildPublicMetadata({
  title: 'Garanzia operativa report affidabilità | ClientiAffidabili.it',
  description: 'Cosa garantisce ClientiAffidabili.it: prezzo chiaro, fonti, limiti, supporto e rimborsi governati dallo stato del servizio.',
  path: '/garanzia-operativa',
  keywords: ['garanzia operativa report', 'limiti verifica aziendale', 'rimborso report affidabilità'],
});

export default function GaranziaOperativaPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Garanzia operativa', path: '/garanzia-operativa' }])} />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="section ca-page-hero">
          <div className="container ca-stack">
            <SectionHeader
              eyebrow="Fiducia e limiti"
              title="La garanzia giusta per un servizio di decision-support."
              description="ClientiAffidabili.it deve essere chiaro prima dell'acquisto: cosa controlla, cosa consegna, quali limiti restano e quando puoi chiedere supporto." 
            />
            <OperationalGuarantee />
          </div>
        </section>

        <section className="section ca-section-muted">
          <div className="container ca-stack">
            <SectionHeader
              eyebrow="Policy rimborso"
              title="Rimborso e assistenza dipendono dallo stato del servizio."
              description="La regola evita doppie esposizioni: pagamento, avvio della verifica, generazione report, pubblicazione e download hanno stati separati e auditabili." 
            />
            <div className="grid-3">
              <Card><h3>Verifica non avviata</h3><p>Rimborso possibile se il servizio non è ancora stato consumato sulle fonti dati.</p></Card>
              <Card><h3>Report in review</h3><p>Serve valutazione interna se i dati sono incompleti, ambigui o richiedono controllo manuale.</p></Card>
              <Card><h3>Report pubblicato</h3><p>Il rimborso e normalmente bloccato o gestito come eccezione tracciata con reason obbligatoria.</p></Card>
            </div>
            <TrustNotice title="Claim prudente" tone="warning">
              Il report non sostituisce consulenza legale, fiscale o finanziaria e non garantisce eventi futuri. Aiuta a prendere decisioni piu informate.
            </TrustNotice>
            <div className="ca-center-actions">
              <Button href="/prezzi">Confronta prezzi</Button>
              <Button href="/legal/rimborsi" variant="outline">Leggi policy rimborsi</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
