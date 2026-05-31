import { notFound } from 'next/navigation';
import { PageHero } from '@/components/ds';
import { SeoPageAdminShell, SeoPageMetadataPanel, SeoPagePublishPanel, SeoPageRichEditor, SeoPageSeoChecklist } from '@/components/seo-cms';
import { getSeoCmsPageById } from '@/lib/seo-geo/seo-cms-runtime';

export default function EditSeoPagePage({ params }: { params: { id: string } }) {
  const page = getSeoCmsPageById(params.id);
  if (!page) return notFound();
  return (
    <SeoPageAdminShell active="/admin/seo-pages">
      <PageHero
        eyebrow="Modifica contenuto"
        title={page.title}
        description="Aggiorna contenuto, metadata e guardrail prima della pubblicazione."
      />
      <SeoPageMetadataPanel page={page} />
      <SeoPageRichEditor initialHtml={page.bodyHtml} />
      <SeoPageSeoChecklist page={page} />
      <SeoPagePublishPanel page={page} />
    </SeoPageAdminShell>
  );
}
