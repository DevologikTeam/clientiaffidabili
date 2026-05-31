const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'apps/web/lib/launch-website/launch-website-runtime.ts',
  'apps/web/components/launch-website/LaunchHero.tsx',
  'apps/web/components/launch-website/OperationalGuarantee.tsx',
  'apps/web/components/launch-website/SeoGeoGuideGrid.tsx',
  'apps/web/components/launch-website/JsonLd.tsx',
  'apps/web/components/launch-website/index.ts',
  'apps/web/app/page.tsx',
  'apps/web/app/guide/page.tsx',
  'apps/web/app/guide/[slug]/page.tsx',
  'apps/web/app/garanzia-operativa/page.tsx',
  'apps/web/app/sitemap.ts',
  'apps/web/app/robots.ts',
  'docs/sprints/M14-S_LAUNCH_WEBSITE_SEO_GEO_COMMERCIAL_READINESS_DEVELOPMENT.md',
  'docs/qa/M14-S_QA_REPORT.md',
  'docs/releases/0.47.0.md',
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Missing required M14-S file: ${file}`);
  }
}

const runtime = fs.readFileSync(path.join(root, 'apps/web/lib/launch-website/launch-website-runtime.ts'), 'utf8');
for (const token of ['buildLaunchSitemapEntries', 'organizationJsonLd', 'websiteJsonLd', 'faqJsonLd', 'trackLaunchEvent', 'publicPublishedGuides']) {
  if (!runtime.includes(token)) throw new Error(`Runtime missing token: ${token}`);
}

const home = fs.readFileSync(path.join(root, 'apps/web/app/page.tsx'), 'utf8');
for (const token of ['LaunchHero', 'OperationalGuarantee', 'SeoGeoGuideGrid', 'JsonLd', 'faqJsonLd']) {
  if (!home.includes(token)) throw new Error(`Home missing launch token: ${token}`);
}

const robots = fs.readFileSync(path.join(root, 'apps/web/app/robots.ts'), 'utf8');
if (!robots.includes("disallow: '/'")) throw new Error('robots.ts must block non-production crawling');
if (!robots.includes('/admin/') || !robots.includes('/dashboard/')) throw new Error('robots.ts must disallow admin/dashboard in production');

const sitemap = fs.readFileSync(path.join(root, 'apps/web/app/sitemap.ts'), 'utf8');
if (!sitemap.includes('buildLaunchSitemapEntries')) throw new Error('sitemap.ts must use buildLaunchSitemapEntries');

const css = fs.readFileSync(path.join(root, 'apps/web/app/globals.css'), 'utf8');
if (!css.includes('Launch Website v0.47.0')) throw new Error('Missing launch CSS marker');

console.log('qa-launch-website-commercial-readiness-development passed');
