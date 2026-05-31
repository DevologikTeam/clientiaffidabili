const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'docs/sprints/M2-A_PUBLIC_FUNNEL_ANALYSIS.md',
  'docs/marketing/01_PUBLIC_FUNNEL_AUDIT.md',
  'docs/marketing/02_POSITIONING_AND_SEGMENTATION.md',
  'docs/marketing/03_CONVERSION_ARCHITECTURE_ANALYSIS.md',
  'docs/marketing/04_LANDING_INFORMATION_ARCHITECTURE.md',
  'docs/marketing/05_TRUST_COMPLIANCE_SIGNALS.md',
  'docs/marketing/06_CHECKOUT_ENTRY_ANALYSIS.md',
  'docs/marketing/07_SEO_GEO_CONTENT_ANALYSIS.md',
  'docs/content/PUBLIC_FUNNEL_COPY_BRIEF.md',
  'docs/research/COMPETITOR_NOTES_M2A.md',
  'docs/qa/PUBLIC_FUNNEL_ANALYSIS_QA_MATRIX.md',
  'docs/releases/0.5.0.md'
];

const requiredTerms = [
  'Segmenti prioritari',
  'Jobs-to-be-done',
  'CTA hierarchy',
  'Messaggi vietati',
  'Competitor insight',
  'Funnel KPI',
  'Gate superati'
];

let failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing file: ${file}`);
}

const sprintFile = path.join(root, 'docs/sprints/M2-A_PUBLIC_FUNNEL_ANALYSIS.md');
if (fs.existsSync(sprintFile)) {
  const content = fs.readFileSync(sprintFile, 'utf8');
  for (const term of requiredTerms) {
    if (!content.includes(term)) failures.push(`Sprint analysis missing section/term: ${term}`);
  }
  const forbiddenClaims = ['zero rischio', '100%', 'garantiamo che il cliente pagherà'];
  for (const claim of forbiddenClaims) {
    if (!content.toLowerCase().includes(claim)) {
      failures.push(`Sprint analysis should explicitly list forbidden claim/example: ${claim}`);
    }
  }
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (!/^0\.([5-9]|[1-9][0-9]+)\.0$/.test(packageJson.version)) failures.push('Root package version should be 0.5.0 or later compatible release');
if (!packageJson.scripts['qa:public-funnel-analysis']) failures.push('Missing qa:public-funnel-analysis script');

if (failures.length) {
  console.error('Public funnel analysis QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Public funnel analysis QA passed. Strategy, funnel, copy, trust, checkout and SEO analysis docs are present.');
