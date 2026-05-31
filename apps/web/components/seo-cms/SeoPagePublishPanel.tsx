import { Badge, Button, TrustNotice } from '@/components/ds';
import type { SeoCmsPage } from '@/lib/seo-geo/seo-cms-runtime';

const toneByStatus = {
  draft: 'neutral',
  review: 'warning',
  published: 'success',
  archived: 'danger',
} as const;

export function SeoPagePublishPanel({ page }: { page: SeoCmsPage }) {
  return (
    <div className="card ca-stack">
      <div className="ca-table-head">
        <div>
          <h3>Pubblicazione</h3>
          <p>Stato, versioning e azioni sicure della pagina.</p>
        </div>
        <Badge tone={toneByStatus[page.status]}>{page.status}</Badge>
      </div>
      <div className="ca-grid ca-grid--3">
        <div><strong>Versione</strong><p>{page.version}</p></div>
        <div><strong>Canonical</strong><p>{page.canonicalPath}</p></div>
        <div><strong>Aggiornata</strong><p>{page.updatedAt}</p></div>
      </div>
      <div className="hero-actions">
        <Button variant="outline">Salva bozza</Button>
        <Button variant="secondary">Invia in review</Button>
        <Button>Pubblica con reason</Button>
      </div>
      <TrustNotice tone="warning" title="Reason obbligatoria">
        Pubblicazione, archiviazione e modifica di slug pubblicato devono essere auditati con motivazione.
      </TrustNotice>
    </div>
  );
}
