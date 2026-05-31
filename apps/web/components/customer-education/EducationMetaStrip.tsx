import type { CustomerEducationPage } from '@/lib/seo-geo/customer-education-runtime';

export function EducationMetaStrip({ page }: { page: CustomerEducationPage }) {
  return (
    <div className="ca-education-meta" aria-label="Informazioni guida">
      <span>Intento: {page.intent.replace('_', ' ')}</span>
      <span>Cluster: {page.cluster.replace('_', ' ')}</span>
      <span>Keyword: {page.targetKeyword}</span>
      <span>Aggiornata: {new Date(page.updatedAt).toLocaleDateString('it-IT')}</span>
    </div>
  );
}
