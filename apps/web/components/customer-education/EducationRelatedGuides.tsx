import { Button, Card } from '@/components/ds';
import type { CustomerEducationPage } from '@/lib/seo-geo/customer-education-runtime';
import { getRelatedEducationPages } from '@/lib/seo-geo/customer-education-runtime';

export function EducationRelatedGuides({ page }: { page: CustomerEducationPage }) {
  const related = getRelatedEducationPages(page);
  if (!related.length) return null;
  return (
    <section className="ca-education-block" id="guide-correlate">
      <h2>Guide correlate</h2>
      <div className="grid-3">
        {related.map((item) => (
          <Card key={item.slug} variant="interactive">
            <h3>{item.label}</h3>
            <p>{item.reason}</p>
            <small>{item.excerpt}</small>
            <Button href={item.href} variant="ghost">Leggi la guida</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
