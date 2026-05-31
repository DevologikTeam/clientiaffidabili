import { Card } from '@/components/ds';
import { launchFaqs } from '@/lib/launch-website/launch-website-runtime';

export function LaunchFaqBlock() {
  return (
    <div className="ca-launch-faq">
      {launchFaqs.map((faq) => (
        <Card key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </Card>
      ))}
    </div>
  );
}
