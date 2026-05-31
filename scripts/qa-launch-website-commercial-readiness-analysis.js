#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'docs/sprints/M14-A_LAUNCH_WEBSITE_SEO_GEO_COMMERCIAL_READINESS_ANALYSIS.md',
  'docs/launch-website/01_LAUNCH_WEBSITE_PRODUCT_STRATEGY.md',
  'docs/launch-website/02_SEO_GEO_COMMERCIAL_POSITIONING_ANALYSIS.md',
  'docs/launch-website/03_PAGE_INVENTORY_AND_CONTENT_MODEL_ANALYSIS.md',
  'docs/launch-website/04_COPY_VALUE_GUARANTEE_TRUST_ANALYSIS.md',
  'docs/launch-website/05_CONVERSION_TRACKING_PRIVACY_ANALYSIS.md',
  'docs/launch-website/06_SCHEMA_METADATA_SITEMAP_ANALYSIS.md',
  'docs/launch-website/07_COMPETITOR_CONTENT_GAP_ANALYSIS.md',
  'docs/launch-website/08_COMMERCIAL_READINESS_SALES_ENABLEMENT_ANALYSIS.md',
  'docs/launch-website/09_CMS_EDITORIAL_GOVERNANCE_ANALYSIS.md',
  'docs/launch-website/10_M14P_M14S_READINESS_CHECKLIST.md',
  'docs/research/M14A_LAUNCH_WEBSITE_SEO_GEO_SOURCE_NOTES.md',
  'apps/web/lib/launch-website/launch-website-analysis.ts',
  'apps/api/src/modules/launch-website/launch-website.analysis.ts',
  'docs/qa/M14-A_QA_REPORT.md',
  'docs/releases/0.45.0.md',
];

let failed = false;
for (const rel of required) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.error(`Missing required file: ${rel}`);
    failed = true;
  }
}

const sprint = fs.readFileSync(path.join(root, required[0]), 'utf8');
const mustContain = [
  'garanzia operativa',
  'privacy-safe',
  'CMS',
  'SEO/GEO',
  'M14-P',
];
for (const token of mustContain) {
  if (!sprint.toLowerCase().includes(token.toLowerCase())) {
    console.error(`Sprint doc missing token: ${token}`);
    failed = true;
  }
}

const copy = fs.readFileSync(path.join(root, 'docs/launch-website/04_COPY_VALUE_GUARANTEE_TRUST_ANALYSIS.md'), 'utf8');
for (const blocked of ['rischio zero', 'pagamento garantito', 'solvibilita']) {
  if (!copy.includes(blocked)) {
    console.error(`Copy guard missing blocked claim example: ${blocked}`);
    failed = true;
  }
}

const runtime = fs.readFileSync(path.join(root, 'apps/web/lib/launch-website/launch-website-analysis.ts'), 'utf8');
if (!runtime.includes('blockedLaunchClaims') || !runtime.includes('privacySafeEvents')) {
  console.error('Runtime analysis missing blocked claims or privacy-safe events.');
  failed = true;
}

if (failed) process.exit(1);
console.log('qa-launch-website-commercial-readiness-analysis: passed');
