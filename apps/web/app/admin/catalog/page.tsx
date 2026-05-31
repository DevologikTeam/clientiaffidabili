import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Badge, Card, KeyValueList, SectionHeader, TrustNotice } from '@/components/ds';
import { catalogServices, calculateSnapshot } from '@/lib/catalog/catalog';

function guardTone(priceNetCents: number, costBand: string) {
  if (costBand.includes('più elevato')) return 'warning';
  if (priceNetCents < 600) return 'info';
  return 'success';
}

export default function AdminCatalogPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="section ca-page-hero">
          <div className="container ca-stack">
            <SectionHeader
              eyebrow="Admin catalog preview"
              title="Catalogo interno con guardrail prezzo e stato pubblicazione."
              description="Questa pagina è una preview statica per lo sprint M3-S: in produzione sarà protetta da RBAC Super Admin/Operations."
            />
            <TrustNotice title="Non esporre costi provider al pubblico" tone="warning">
              <p>I costi provider, riserve e motivazioni margine restano interni. Nel pubblico si mostra valore, prezzo, tempi e limiti.</p>
            </TrustNotice>
          </div>
        </section>
        <section className="section">
          <div className="container ca-stack">
            {catalogServices.map((service) => {
              const snapshot = calculateSnapshot(service);
              return (
                <Card key={service.code} className="ca-admin-catalog-row">
                  <div>
                    <Badge tone={guardTone(service.priceNetCents, service.providerInternalCostBand)}>{service.status}</Badge>
                    <h3>{service.name}</h3>
                    <p>{service.providerInternalCostBand}</p>
                  </div>
                  <KeyValueList
                    items={[
                      { label: 'Codice', value: service.code },
                      { label: 'Prezzo netto', value: snapshot.unitNet },
                      { label: 'Totale indicativo', value: snapshot.total },
                      { label: 'Rischio', value: service.riskLevel },
                    ]}
                  />
                </Card>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
