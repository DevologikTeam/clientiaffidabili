import { Card } from '@/components/ds';
import type { EducationFaq } from '@/lib/seo-geo/customer-education-runtime';

export function EducationFaqBlock({ items }: { items: ReadonlyArray<EducationFaq> }) {
  return (
    <section className="ca-education-block" id="faq">
      <h2>Domande frequenti</h2>
      <div className="ca-education-faq">
        {items.map((faq) => (
          <Card key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
