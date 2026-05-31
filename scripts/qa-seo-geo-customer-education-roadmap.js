const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'docs/seo-geo/SEO_GEO_CUSTOMER_EDUCATION_ROADMAP_INSERT.md',
  'docs/seo-geo/SEO_GEO_COPYWRITING_DIRECTION.md',
  'docs/seo-geo/SEO_GEO_CUSTOMER_EDUCATION_COMPONENT_BLUEPRINT.md',
  'apps/web/lib/seo-geo/customer-education-roadmap.ts',
  'docs/releases/0.42.1.md',
];

const requiredTerms = [
  'M14B-A',
  'M14B-P',
  'M14B-S',
  'garanzie operative',
  "Nessun report puo'",
  'rischio zero',
  'JSON-LD',
  'sitemap',
];

for (const file of requiredFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
}

const combined = requiredFiles.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
for (const term of requiredTerms) {
  if (!combined.includes(term)) {
    console.error(`Missing required roadmap/content term: ${term}`);
    process.exit(1);
  }
}

const roadmapStatus = fs.readFileSync(path.join(root, 'docs/ROADMAP_STATUS.md'), 'utf8');
if (!roadmapStatus.includes('M14B-A SEO/GEO Customer Education Pages Analysis')) {
  console.error('ROADMAP_STATUS.md does not include M14B-A');
  process.exit(1);
}

console.log('SEO/GEO customer education roadmap QA passed.');
