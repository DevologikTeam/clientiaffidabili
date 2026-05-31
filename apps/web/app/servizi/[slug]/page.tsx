import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PriceSnapshotBox } from '@/components/catalog/PriceSnapshotBox';
import { ServiceDetailPanel } from '@/components/catalog/ServiceDetailPanel';
import { Button, SectionHeader } from '@/components/ds';
import { ComplianceNotice } from '@/components/public-funnel';
import { catalogServices, getCatalogServiceBySlug } from '@/lib/catalog/catalog';
import { buildServiceMetadata } from '@/lib/seo/metadata';

export function generateStaticParams() {
  return catalogServices.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getCatalogServiceBySlug(params.slug);
  if (!service) return {};
  return buildServiceMetadata(service);
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getCatalogServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="section ca-page-hero">
          <div className="container ca-detail-grid">
            <div className="ca-stack">
              <span className="ca-eyebrow">{service.category}</span>
              <h1>{service.name}</h1>
              <p className="ca-lead">{service.description}</p>
              <div className="hero-actions">
                <Button href={`/checkout?service=${service.code}`} size="lg">{service.status === 'assisted' ? 'Richiedi verifica assistita' : 'Avvia verifica'}</Button>
                <Button href="/servizi" variant="outline" size="lg">Torna al catalogo</Button>
              </div>
            </div>
            <PriceSnapshotBox service={service} />
          </div>
        </section>

        <section className="section">
          <div className="container ca-stack">
            <SectionHeader title="Scheda servizio" description={service.promise} />
            <ServiceDetailPanel service={service} />
          </div>
        </section>

        <section className="section ca-section-muted">
          <div className="container ca-stack">
            <ComplianceNotice />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
