const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'docs/sprints/M2-P_PUBLIC_FUNNEL_DESIGN.md',
  'docs/marketing/08_PUBLIC_FUNNEL_WIREFRAMES.md',
  'docs/marketing/09_PAGE_BY_PAGE_BLUEPRINT.md',
  'docs/marketing/10_CONVERSION_COMPONENT_BLUEPRINT.md',
  'docs/content/PUBLIC_FUNNEL_FINAL_COPY.md',
  'docs/design/13_PUBLIC_FUNNEL_UI_SPEC.md',
  'docs/analytics/PUBLIC_FUNNEL_EVENTS.md',
  'docs/qa/PUBLIC_FUNNEL_DESIGN_QA_MATRIX.md',
  'docs/releases/0.6.0.md',
  'apps/web/lib/public-funnel/blueprint.ts'
];

const requiredTerms = [
  'ScenarioCard',
  'ReportPreview',
  'CheckoutEntryCard',
  'legal_purpose_confirmed',
  'Verifica clienti, aziende e segnali di affidabilità',
  'prezzo',
  'tempi',
  'fonti',
  'limiti',
  'uso professionale lecito'
];

let failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing file: ${file}`);
}

const sprintFile = path.join(root, 'docs/sprints/M2-P_PUBLIC_FUNNEL_DESIGN.md');
if (fs.existsSync(sprintFile)) {
  const content = fs.readFileSync(sprintFile, 'utf8');
  for (const term of requiredTerms) {
    if (!content.includes(term)) failures.push(`Sprint design missing term: ${term}`);
  }
}

const copyFile = path.join(root, 'docs/content/PUBLIC_FUNNEL_FINAL_COPY.md');
if (fs.existsSync(copyFile)) {
  const copy = fs.readFileSync(copyFile, 'utf8').toLowerCase();
  const riskyStandaloneClaims = ['rischio zero.', 'pagamento garantito.', 'cliente affidabile al 100%.'];
  for (const claim of riskyStandaloneClaims) {
    if (copy.includes(claim)) failures.push(`Public copy contains risky standalone claim: ${claim}`);
  }
  if (!copy.includes('non possono garantire')) failures.push('Copy must explicitly state reports cannot guarantee outcomes.');
  if (!copy.includes('uso professionale')) failures.push('Copy must communicate professional use.');
}

const blueprintFile = path.join(root, 'apps/web/lib/public-funnel/blueprint.ts');
if (fs.existsSync(blueprintFile)) {
  const blueprint = fs.readFileSync(blueprintFile, 'utf8');
  for (const exportName of ['publicHero', 'trustStripItems', 'publicScenarios', 'publicFaq', 'forbiddenPublicClaims']) {
    if (!blueprint.includes(`export const ${exportName}`)) failures.push(`Missing export in public funnel blueprint: ${exportName}`);
  }
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (!/^0\.([6-9]|[1-9][0-9]+)\.0$/.test(packageJson.version)) failures.push('Root package version should be 0.6.0 or later compatible release');
if (!packageJson.scripts['qa:public-funnel-design']) failures.push('Missing qa:public-funnel-design script');
if (!packageJson.scripts['release:check'] || !packageJson.scripts['release:check'].includes('qa:public-funnel-design')) {
  failures.push('release:check does not include qa:public-funnel-design');
}

if (failures.length) {
  console.error('Public funnel design QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Public funnel design QA passed. Wireframes, page blueprints, conversion components, copy, analytics and UI specs are present.');
