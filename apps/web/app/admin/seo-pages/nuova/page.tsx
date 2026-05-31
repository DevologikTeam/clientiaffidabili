import { PageHero } from '@/components/ds';
import { SeoPageAdminShell, SeoPageMetadataPanel, SeoPagePublishPanel, SeoPageRichEditor, SeoPageSeoChecklist } from '@/components/seo-cms';
import { newSeoPageTemplate } from '@/lib/seo-geo/seo-cms-runtime';

export default function NewSeoPagePage() {
  return (
    <SeoPageAdminShell active="/admin/seo-pages/nuova">
      <PageHero
        eyebrow="Nuova guida"
        title="Crea una pagina SEO/GEO"
        description="Parti da una struttura sicura: problema, valore del servizio, limiti, garanzia operativa e prossima azione."
      />
      <SeoPageMetadataPanel page={newSeoPageTemplate} />
      <SeoPageRichEditor initialHtml={newSeoPageTemplate.bodyHtml} />
      <SeoPageSeoChecklist page={newSeoPageTemplate} />
      <SeoPagePublishPanel page={newSeoPageTemplate} />
    </SeoPageAdminShell>
  );
}
