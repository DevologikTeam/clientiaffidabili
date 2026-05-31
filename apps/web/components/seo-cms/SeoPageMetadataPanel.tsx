import type { SeoCmsPage } from '@/lib/seo-geo/seo-cms-runtime';

export function SeoPageMetadataPanel({ page }: { page: SeoCmsPage }) {
  return (
    <div className="card ca-stack">
      <div>
        <h3>Metadata SEO/GEO</h3>
        <p>Questi dati saranno usati per title, description, preview, intenti e answer blocks.</p>
      </div>
      <div className="form-row">
        <label className="field">Titolo pagina<input defaultValue={page.title} /></label>
        <label className="field">Slug<input defaultValue={page.slug} /></label>
      </div>
      <label className="field">Meta title<input defaultValue={page.seoTitle} /></label>
      <label className="field">Meta description<textarea rows={3} defaultValue={page.seoDescription} /></label>
      <div className="form-row">
        <label className="field">Keyword target<input defaultValue={page.targetKeyword} /></label>
        <label className="field">Intento ricerca
          <select defaultValue={page.searchIntent}>
            <option value="informational">Informational</option>
            <option value="commercial">Commercial</option>
            <option value="transactional">Transactional</option>
            <option value="comparison">Comparison</option>
            <option value="support">Support</option>
          </select>
        </label>
      </div>
      <label className="field">Risposta breve GEO<textarea rows={3} defaultValue={page.geoAnswerFocus} /></label>
      <label className="field">Excerpt<textarea rows={3} defaultValue={page.excerpt} /></label>
    </div>
  );
}
