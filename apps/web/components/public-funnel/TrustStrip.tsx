import { trustSignals } from '@/lib/content';

export function TrustStrip() {
  return (
    <section className="ca-trust-strip" aria-label="Garanzie operative del servizio">
      {trustSignals.map((signal) => (
        <article key={signal.label}>
          <strong>{signal.label}</strong>
          <p>{signal.description}</p>
        </article>
      ))}
    </section>
  );
}
