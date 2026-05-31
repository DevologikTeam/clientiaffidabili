import { Button, Card } from '@/components/ds';
import { publicPublishedGuides } from '@/lib/launch-website/launch-website-runtime';

export function SeoGeoGuideGrid() {
  if (publicPublishedGuides.length === 0) {
    return (
      <Card>
        <h3>Guide in preparazione</h3>
        <p>Le pagine SEO/GEO saranno pubblicate dal CMS solo dopo review editoriale, controllo claim e verifica metadata.</p>
      </Card>
    );
  }

  return (
    <div className="grid-3">
      {publicPublishedGuides.map((guide) => (
        <Card key={guide.slug} variant="interactive" className="ca-guide-preview">
          <span className="ca-eyebrow">Intento: {guide.intent}</span>
          <h3>{guide.title}</h3>
          <p>{guide.excerpt}</p>
          <small>Keyword: {guide.keyword}</small>
          <Button href={guide.href} variant="ghost">Leggi la guida</Button>
        </Card>
      ))}
    </div>
  );
}
