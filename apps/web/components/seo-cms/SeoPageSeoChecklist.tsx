import { Alert, Checklist } from '@/components/ds';
import { evaluateSeoCmsPage, type SeoCmsPage } from '@/lib/seo-geo/seo-cms-runtime';

export function SeoPageSeoChecklist({ page }: { page: SeoCmsPage }) {
  const checks = evaluateSeoCmsPage(page);
  const blockers = checks.filter((check) => check.severity === 'blocker' && !check.passed);
  return (
    <div className="card ca-stack">
      <div>
        <h3>Checklist SEO/GEO e claim</h3>
        <p>Prima di pubblicare, controlla qualità, limiti e promesse commerciali.</p>
      </div>
      {blockers.length ? (
        <Alert tone="danger" title="Pubblicazione bloccata">
          Sono presenti claim vietati o contenuti non compatibili con i guardrail commerciali.
        </Alert>
      ) : (
        <Alert tone="success" title="Nessun blocco critico">
          La pagina può andare in review. La pubblicazione finale richiede comunque controllo umano.
        </Alert>
      )}
      <Checklist items={checks.map((check) => ({ label: check.label, done: check.passed }))} />
    </div>
  );
}
