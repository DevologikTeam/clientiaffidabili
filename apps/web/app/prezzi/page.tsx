import { buildPublicMetadata } from '@/lib/seo/metadata';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PricingComparison } from '@/components/catalog/PricingComparison';
import { Button, Card, Checklist, SectionHeader, TrustNotice } from '@/components/ds';
import { calculateSnapshot, getPublishedCatalogServices } from '@/lib/catalog/catalog';
import { pricingBundles } from '@/lib/content';

export const metadata = buildPublicMetadata({
  title: 'Prezzi verifiche aziendali | ClientiAffidabili.it',
  description: 'Listino dei servizi ClientiAffidabili.it con prezzi netti, totale indicativo, tempi, report e limiti visibili prima dell’acquisto.',
  path: '/prezzi',
  keywords: ['prezzi verifiche aziendali', 'report affidabilità azienda', 'listino verifiche B2B'],
});

export default function PrezziPage() {
  const services = getPublishedCatalogServices();

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="section ca-page-hero">
          <div className="container ca-stack">
            <SectionHeader
              eyebrow="Prezzi trasparenti"
              title="Sai quanto costa la verifica prima di confermare l’ordine."
              description="Ogni servizio mostra prezzo netto, totale indicativo con IVA, tempi, cosa ricevi e limiti principali. Nessun costo nascosto nel percorso di acquisto."
            />
            <TrustNotice title="Regola di trasparenza" tone="info">
              <p>Il prezzo netto è visibile nelle schede. Prima del pagamento il riepilogo indica IVA, eventuali imposte o diritti applicabili e totale dell’ordine.</p>
            </TrustNotice>
          </div>
        </section>

        <section className="section">
          <div className="container ca-stack">
            <SectionHeader title="Scegli in base alla decisione" description="Tre opzioni semplici: primo controllo, verifica consigliata o controllo più prudente su fornitori e partner sensibili." />
            <div className="grid-3">
              {pricingBundles.map((bundle) => (
                <Card key={bundle.name} variant="interactive" className="ca-pricing-bundle">
                  <span className="ca-eyebrow">{bundle.audience}</span>
                  <h3>{bundle.name}</h3>
                  <p>{bundle.description}</p>
                  <div className="ca-pricing-bundle__price">{bundle.price}</div>
                  <Checklist items={bundle.services} />
                  <Button href={bundle.ctaHref} fullWidth>Avvia verifica</Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section ca-section-muted">
          <div className="container ca-stack">
            <SectionHeader title="Listino singoli servizi" description="Confronta prezzo, tempi e totale indicativo prima di scegliere il controllo più adatto." />
            <PricingComparison services={services} />
          </div>
        </section>

        <section className="section">
          <div className="container ca-stack">
            <SectionHeader title="Totale indicativo prima del pagamento" description="Esempi calcolati sui servizi pubblicati. Il riepilogo finale viene confermato nel checkout." />
            <div className="grid-3">
              {services.slice(0, 3).map((service) => {
                const snapshot = calculateSnapshot(service);
                return (
                  <Card key={service.code}>
                    <span className="ca-eyebrow">{service.name}</span>
                    <h3>{snapshot.unitNet} netto</h3>
                    <p>Totale indicativo: <strong>{snapshot.total}</strong>, IVA inclusa salvo regole fiscali specifiche.</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
