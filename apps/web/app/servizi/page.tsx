import { buildPublicMetadata } from '@/lib/seo/metadata';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { CatalogServiceCard } from '@/components/catalog/CatalogServiceCard';
import { Button, SectionHeader } from '@/components/ds';
import { ComplianceNotice, ScenarioCard, TrustStrip } from '@/components/public-funnel';
import { scenarios } from '@/lib/content';
import { getPublishedCatalogServices, scenarioLabels } from '@/lib/catalog/catalog';

const scenarioTitles: Record<string, string> = {
  'new-customer': 'Verifiche su clienti e aziende da valutare',
  supplier: 'Verifiche su fornitori, partner e compliance',
  'payment-data': 'Controlli su dati di pagamento e contatto',
};

const scenarioDescriptions: Record<string, string> = {
  'new-customer': 'Per decidere se inviare un preventivo, spedire merce, concedere pagamento differito o chiedere maggiori garanzie.',
  supplier: 'Per qualificare fornitori e partner prima di affidare incarichi, acquistare o avviare rapporti sensibili.',
  'payment-data': 'Per ridurre errori su IBAN, email e telefono prima di usarli in amministrazione, CRM o onboarding.',
};

export const metadata = buildPublicMetadata({
  title: 'Servizi per verificare clienti, fornitori e dati | ClientiAffidabili.it',
  description: 'Scegli verifiche aziendali e controlli operativi con prezzo, tempi, dati richiesti, report e limiti visibili prima dell’acquisto.',
  path: '/servizi',
  keywords: ['catalogo verifiche B2B', 'verifica clienti', 'verifica fornitori', 'controllo IBAN'],
});

export default function ServiziPage() {
  const services = getPublishedCatalogServices();
  const categories = Array.from(new Set(services.map((service) => service.category)));
  const scenarioGroups = Array.from(new Set(services.map((service) => service.scenario)));

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="section ca-page-hero">
          <div className="container ca-stack">
            <SectionHeader
              eyebrow="Servizi disponibili"
              title="Scegli cosa controllare prima di vendere, spedire o pagare."
              description="Ogni scheda mostra prezzo, tempi indicativi, dati richiesti, cosa ricevi e limiti principali prima dell’acquisto."
            />
            <div className="ca-category-strip" aria-label="Categorie disponibili">
              {categories.map((category) => <span key={category}>{category}</span>)}
            </div>
            <TrustStrip />
          </div>
        </section>

        <section className="section ca-section-muted">
          <div className="container ca-stack">
            <SectionHeader
              eyebrow="Scelta guidata"
              title="Che decisione devi prendere?"
              description="Parti dal problema: cliente, fornitore o dato operativo. Ti portiamo al controllo più adatto senza costringerti a interpretare sigle tecniche."
            />
            <div className="grid-3">
              {scenarios.map((scenario) => <ScenarioCard key={scenario.id} scenario={scenario} />)}
            </div>
          </div>
        </section>

        {scenarioGroups.map((scenario) => (
          <section className="section" key={scenario}>
            <div className="container ca-stack">
              <SectionHeader
                eyebrow={scenarioLabels[scenario]}
                title={scenarioTitles[scenario] ?? `Servizi per ${scenarioLabels[scenario].toLowerCase()}`}
                description={scenarioDescriptions[scenario] ?? 'Schede con prezzo, tempi, dati richiesti, report e limiti principali prima dell’acquisto.'}
              />
              <div className="grid-3">
                {services.filter((service) => service.scenario === scenario).map((service) => <CatalogServiceCard key={service.code} service={service} />)}
              </div>
            </div>
          </section>
        ))}

        <section className="section ca-section-muted">
          <div className="container ca-stack">
            <ComplianceNotice />
            <div className="ca-center-actions">
              <Button href="/prezzi">Confronta i prezzi</Button>
              <Button href="/garanzia-operativa" variant="outline">Vedi garanzie e limiti</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
