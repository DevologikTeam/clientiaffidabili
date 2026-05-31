const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'apps/web/lib/seo-geo/customer-education-runtime.ts',
  'apps/web/lib/seo-geo/seo-cms-runtime.ts',
  'apps/web/components/customer-education/GeoAnswerBox.tsx',
  'apps/web/components/customer-education/EducationGuideBody.tsx',
  'apps/web/components/customer-education/EducationFaqBlock.tsx',
  'apps/web/components/customer-education/EducationRelatedGuides.tsx',
  'apps/web/components/customer-education/EducationSidebarCta.tsx',
  'apps/web/app/guide/[slug]/page.tsx',
  'apps/api/src/modules/seo-cms/customer-education.seed.ts',
  'docs/sprints/M14B-S_SEO_GEO_CUSTOMER_EDUCATION_PAGES_DEVELOPMENT.md',
  'docs/releases/0.50.0.md'
];

const expectedSlugs = [
  'verificare-affidabilita-azienda',
  'cliente-non-paga-come-prevenire',
  'visura-camerale-vs-report-affidabilita',
  'controllo-fornitore-prima-di-acquisto',
  'check-iban-email-telefono-azienda',
  'garanzie-limiti-report-affidabilita',
  'credit-scoring-azienda-significato',
  'kyb-aml-controlli-azienda'
];

const forbiddenClaims = [
  'rischio zero',
  'pagamento garantito',
  'solvibilità garantita',
  'solvibilita garantita',
  'cliente sicuro al 100%',
  'report infallibile'
];

const fail = (message) => {
  console.error(`QA failed: ${message}`);
  process.exit(1);
};

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) fail(`missing ${file}`);
}

const runtime = fs.readFileSync(path.join(root, 'apps/web/lib/seo-geo/customer-education-runtime.ts'), 'utf8');
for (const slug of expectedSlugs) {
  if (!runtime.includes(slug)) fail(`missing guide slug ${slug}`);
}
const publishedMatches = runtime.match(/status: 'published'/g) || [];
if (publishedMatches.length < 8) fail('expected at least 8 published education pages');
for (const claim of forbiddenClaims) {
  const escaped = claim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(?<!forbiddenEducationRuntimeClaims[\\s\\S]{0,200})${escaped}`, 'i');
  // More robust simple content check: allow the claim only in the guardrail array line, not elsewhere.
  const occurrences = runtime.toLowerCase().split(claim.toLowerCase()).length - 1;
  const allowedInGuardrail = runtime.includes(`'${claim}'`) ? 1 : 0;
  if (occurrences > allowedInGuardrail) fail(`forbidden claim appears in runtime content: ${claim}`);
}

const guidePage = fs.readFileSync(path.join(root, 'apps/web/app/guide/[slug]/page.tsx'), 'utf8');
['educationArticleJsonLd', 'educationFaqJsonLd', 'breadcrumbJsonLd', 'EducationGuideBody', 'EducationSidebarCta'].forEach((needle) => {
  if (!guidePage.includes(needle)) fail(`guide page missing ${needle}`);
});

const seed = fs.readFileSync(path.join(root, 'apps/api/src/modules/seo-cms/customer-education.seed.ts'), 'utf8');
for (const slug of expectedSlugs) {
  if (!seed.includes(slug)) fail(`backend seed missing slug ${slug}`);
}

console.log('QA passed: M14B-S customer education pages development');
