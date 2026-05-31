import { Button, Card } from '@/components/ds';
import { publicPublishedGuides } from '@/lib/launch-website/launch-website-runtime';

function guideAudienceLabel(intent: string) {
  const normalized = intent.replace('_', ' ').toLowerCase();
  if (normalized.includes('commercial')) return 'Per scegliere con più prudenza';
  if (normalized.includes('transactional')) return 'Guida all’acquisto corretto';
  if (normalized.includes('informational')) return 'Spiegazione semplice';
  return 'Guida pratica';
}

export function SeoGeoGuideGrid() {
  if (publicPublishedGuides.length === 0) {
    return (
      <Card>
        <h3>Guide in preparazione</h3>
        <p>Stiamo preparando guide pratiche per aiutarti a capire quando verificare un cliente, un fornitore o un dato prima di prendere impegni.</p>
      </Card>
    );
  }

  return (
    <div className="grid-3">
      {publicPublishedGuides.map((guide) => (
        <Card key={guide.slug} variant="interactive" className="ca-guide-preview">
          <span className="ca-eyebrow">{guideAudienceLabel(guide.intent)}</span>
          <h3>{guide.title}</h3>
          <p>{guide.excerpt}</p>
          <small>Utile prima di decidere se procedere, chiedere garanzie o fare un controllo più approfondito.</small>
          <Button href={guide.href} variant="ghost">Leggi la guida</Button>
        </Card>
      ))}
    </div>
  );
}
