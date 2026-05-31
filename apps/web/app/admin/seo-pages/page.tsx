import { Alert, PageHero, StatCard } from '@/components/ds';
import { SeoPageAdminShell, SeoPageListTable } from '@/components/seo-cms';
import { seoCmsPages } from '@/lib/seo-geo/seo-cms-runtime';

export default function AdminSeoPagesPage() {
  const published = seoCmsPages.filter((page) => page.status === 'published').length;
  const drafts = seoCmsPages.filter((page) => page.status === 'draft').length;
  return (
    <SeoPageAdminShell active="/admin/seo-pages">
      <PageHero
        eyebrow="CMS SEO/GEO"
        title="Pagine educative editabili"
        description="Gestisci guide pubbliche, pagine di valore, garanzie operative e contenuti pensati per SEO e AI discovery senza perdere controllo su claim e compliance."
      />
      <div className="ca-grid ca-grid--3">
        <StatCard label="Pubblicate" value={String(published)} status="visibili" tone="success" />
        <StatCard label="Bozze" value={String(drafts)} status="da completare" tone="warning" />
        <StatCard label="Editor" value="Tiptap" status="React controlled" tone="info" />
      </div>
      <Alert tone="info" title="Nuova capability">
        Da questa versione le pagine SEO/GEO non sono più solo file statici: possono essere create e gestite da admin con editor e metadata.
      </Alert>
      <SeoPageListTable pages={seoCmsPages} />
    </SeoPageAdminShell>
  );
}
