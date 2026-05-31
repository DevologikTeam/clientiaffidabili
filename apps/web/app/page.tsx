import { TestModeNotice } from '@/components/commerce';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button, SectionHeader, StatCard } from '@/components/ds';
import {
  CommercialProofStrip,
  JsonLd,
  LaunchFaqBlock,
  LaunchHero,
  OperationalGuarantee,
  SeoGeoGuideGrid,
  UseCaseDecisionGrid,
} from '@/components/launch-website';
import { ComplianceNotice, HowItWorks, TrustStrip } from '@/components/public-funnel';
import { faqJsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/launch-website/launch-website-runtime';
import { buildPublicMetadata } from '@/lib/seo/metadata';

export const metadata = buildPublicMetadata({
  title: 'ClientiAffidabili.it — Verifica clienti, fornitori e dati aziendali',
  description: 'Report e verifiche B2B per valutare clienti, fornitori, dati operativi e segnali di rischio prima di vendere, spedire o pagare.',
  path: '/',
  keywords: ['verifica clienti', 'affidabilità clienti', 'report aziendale', 'verifica fornitori'],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqJsonLd()} />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <LaunchHero />

        <section className="section ca-section-tight">
          <div className="container ca-stack">
            <CommercialProofStrip />
            <TestModeNotice context="public" />
            <TrustStrip />
          </div>
        </section>

        <section className="section" id="scenari">
          <div className="container ca-stack">
            <SectionHeader
              eyebrow="Quando usarlo"
              title="Parti dalla decisione che devi prendere oggi."
              description="Scegli una verifica in base al rischio concreto: un cliente nuovo, un fornitore da qualificare o un dato di pagamento da controllare prima di usarlo."
            />
            <UseCaseDecisionGrid />
          </div>
        </section>

        <section className="section ca-section-muted" id="come-funziona">
          <div className="container ca-stack">
            <SectionHeader
              eyebrow="Percorso semplice"
              title="Da un dubbio sul cliente a una decisione più sicura."
              description="Scegli cosa controllare, confermi la finalità, vedi il prezzo prima del pagamento e ricevi una sintesi leggibile con fonti, segnali e limiti."
              align="center"
            />
            <HowItWorks />
            <ComplianceNotice />
          </div>
        </section>

        <section className="section" id="garanzia-operativa">
          <div className="container ca-stack">
            <SectionHeader
              eyebrow="Fiducia e limiti"
              title="Chiarezza prima dell’acquisto, trasparenza nel report, supporto se serve."
              description="La garanzia operativa non promette risultati impossibili: promette un processo chiaro, informazioni dichiarate e condizioni comprensibili."
            />
            <OperationalGuarantee />
          </div>
        </section>

        <section className="section ca-section-muted" id="guide">
          <div className="container ca-stack">
            <SectionHeader
              eyebrow="Guide pratiche"
              title="Capire cosa controllare prima di vendere, spedire o pagare."
              description="Approfondimenti scritti per imprenditori, amministrazione, vendite e acquisti: meno sigle, più decisioni operative."
            />
            <SeoGeoGuideGrid />
            <div className="ca-center-actions">
              <Button href="/guide">Vedi tutte le guide</Button>
              <Button href="/servizi" variant="outline">Scegli una verifica</Button>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container ca-stack">
            <SectionHeader
              eyebrow="Perché scegliere ClientiAffidabili.it"
              title="Più chiarezza prima di prendere impegni con clienti e fornitori."
              description="Il valore è sapere cosa viene controllato, quanto costa, quali limiti restano e quale decisione puoi prendere con più prudenza."
            />
            <div className="grid-3">
              <StatCard label="Prima dell’ordine" value="Prezzo chiaro" description="Vedi importo, servizio e dati richiesti prima del pagamento." status="Trasparente" tone="success" />
              <StatCard label="Nel report" value="Fonti e limiti" description="Ogni esito mostra cosa è disponibile e cosa non può essere garantito." status="Prudente" tone="info" />
              <StatCard label="Dopo la richiesta" value="Supporto" description="Se la verifica non si completa, stato e assistenza sono tracciati." status="Governato" tone="warning" />
            </div>
          </div>
        </section>

        <section className="section ca-section-muted" id="faq">
          <div className="container ca-stack">
            <SectionHeader
              eyebrow="Domande frequenti"
              title="Risposte chiare prima di acquistare una verifica."
              description="Cosa puoi aspettarti, quali limiti restano e come usare correttamente i report nelle decisioni professionali."
            />
            <LaunchFaqBlock />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
