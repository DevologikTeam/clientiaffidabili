import { publicFaqs } from '@/lib/content';

export function PublicFAQ() {
  return (
    <div className="ca-public-faq">
      {publicFaqs.map((faq) => (
        <details key={faq.question}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
