import Link from 'next/link';
import { Badge, Button } from '@/components/ds';
import type { SeoCmsPage } from '@/lib/seo-geo/seo-cms-runtime';

const toneByStatus = {
  draft: 'neutral',
  review: 'warning',
  published: 'success',
  archived: 'danger',
} as const;

export function SeoPageListTable({ pages }: { pages: ReadonlyArray<SeoCmsPage> }) {
  return (
    <div className="card">
      <div className="ca-table-head">
        <div>
          <h3>Contenuti gestiti</h3>
          <p>Gestisci guide SEO/GEO, bozze, pubblicazioni e metadata.</p>
        </div>
        <Button href="/admin/seo-pages/nuova">Crea pagina</Button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Pagina</th>
            <th>Intento</th>
            <th>Stato</th>
            <th>Keyword</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={page.id}>
              <td>
                <strong>{page.title}</strong>
                <div className="ca-muted">/guide/{page.slug}</div>
              </td>
              <td>{page.searchIntent}</td>
              <td><Badge tone={toneByStatus[page.status]}>{page.status}</Badge></td>
              <td>{page.targetKeyword}</td>
              <td>
                <Link className="btn btn-outline" href={`/admin/seo-pages/${page.id}`}>Modifica</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
