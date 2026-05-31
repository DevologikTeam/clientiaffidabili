import type { SeoPageGuardrailCheck } from './seo-cms.types';

const BLOCKED_CLAIMS = [
  'rischio zero',
  'solvibilità garantita',
  'pagamento garantito',
  'cliente sicuro al 100%',
  'report infallibile',
  'garanzia assoluta',
];

export function runSeoPageGuardrails(input: {
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  bodyHtml: string;
  targetKeyword?: string;
  geoAnswerFocus?: string;
}): SeoPageGuardrailCheck[] {
  const text = `${input.title} ${input.seoTitle} ${input.seoDescription} ${input.excerpt} ${input.bodyHtml}`.toLowerCase();
  const blocked = BLOCKED_CLAIMS.filter((claim) => text.includes(claim));
  const checks: SeoPageGuardrailCheck[] = [
    {
      code: 'blocked_claims',
      label: blocked.length ? `Claim vietati: ${blocked.join(', ')}` : 'Nessun claim vietato rilevato',
      passed: blocked.length === 0,
      severity: 'blocker',
    },
    {
      code: 'seo_title_length',
      label: 'Meta title presente e contenuto',
      passed: Boolean(input.seoTitle) && input.seoTitle.length <= 70,
      severity: 'warning',
    },
    {
      code: 'seo_description_length',
      label: 'Meta description presente e controllata',
      passed: Boolean(input.seoDescription) && input.seoDescription.length <= 180,
      severity: 'warning',
    },
    {
      code: 'target_keyword',
      label: 'Keyword target dichiarata',
      passed: Boolean(input.targetKeyword),
      severity: 'warning',
    },
    {
      code: 'geo_answer_focus',
      label: 'Risposta sintetica GEO dichiarata',
      passed: Boolean(input.geoAnswerFocus),
      severity: 'warning',
    },
    {
      code: 'operational_guarantee',
      label: 'Garanzia operativa/limiti spiegati nel testo',
      passed: text.includes('garanzia operativa') || text.includes('limiti') || text.includes('cosa non può garantire'),
      severity: 'warning',
    },
  ];
  return checks;
}

export function hasBlockingSeoPageGuardrail(checks: SeoPageGuardrailCheck[]) {
  return checks.some((check) => check.severity === 'blocker' && !check.passed);
}
