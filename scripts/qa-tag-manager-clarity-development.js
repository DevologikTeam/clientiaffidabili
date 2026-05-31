const fs = require('fs');
const path = require('path');

const root = process.cwd();
const mustExist = [
  'apps/api/src/modules/analytics/tag-manager-clarity.service.ts',
  'apps/api/src/modules/analytics/analytics.controller.ts',
  'apps/api/src/modules/analytics/analytics.module.ts',
  'apps/api/src/modules/settings-admin/settings-admin.service.ts',
  'apps/api/src/modules/settings-admin/settings-admin-runtime.types.ts',
  'apps/web/lib/analytics/tag-manager-clarity-runtime.ts',
  'apps/web/components/analytics/ExternalTrackingProvider.tsx',
  'apps/web/components/analytics/TagManagerSettingsPanel.tsx',
  'apps/web/app/admin/settings/analytics/page.tsx',
  'apps/web/app/layout.tsx',
  'docs/sprints/M16B-S_TAG_MANAGER_CLARITY_DEVELOPMENT.md'
];

const fail = (message) => { console.error(`[qa-tag-manager-clarity-development] ${message}`); process.exit(1); };
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

for (const file of mustExist) {
  if (!fs.existsSync(path.join(root, file))) fail(`Missing required file: ${file}`);
}

const service = read('apps/api/src/modules/analytics/tag-manager-clarity.service.ts');
if (!service.includes('publicConfig')) fail('Backend publicConfig method missing.');
if (!service.includes('GTM_ID_PATTERN')) fail('GTM validation pattern missing.');
if (!service.includes('CLARITY_ID_PATTERN')) fail('Clarity validation pattern missing.');
if (!service.includes('blockedRoutePrefixes')) fail('Blocked route policy missing in backend service.');

const controller = read('apps/api/src/modules/analytics/analytics.controller.ts');
if (!controller.includes("@Get('public-config')")) fail('GET /analytics/public-config endpoint missing.');

const settings = read('apps/api/src/modules/settings-admin/settings-admin.service.ts');
for (const needle of ['externalTags.enabled', 'gtm.containerId', 'clarity.projectId', 'consent.defaultMode', 'clarity.blockedRoutePrefixes']) {
  if (!settings.includes(needle)) fail(`Missing analytics setting: ${needle}`);
}

const runtime = read('apps/web/lib/analytics/tag-manager-clarity-runtime.ts');
for (const needle of ['sanitizeCampaignPayload', 'pushCampaignEvent', 'defaultExternalTrackingConfig', 'analytics_storage', 'ad_personalization']) {
  if (!runtime.includes(needle)) fail(`Missing runtime helper/policy: ${needle}`);
}
if (!runtime.includes("analytics_storage: 'denied'")) fail('Consent default must be denied.');
if (!runtime.includes('/admin') || !runtime.includes('/checkout') || !runtime.includes('/dashboard')) fail('Sensitive route denylist missing.');

const provider = read('apps/web/components/analytics/ExternalTrackingProvider.tsx');
if (!provider.includes('googletagmanager.com/gtm.js')) fail('GTM loader missing.');
if (!provider.includes('clarity.ms/tag')) fail('Clarity loader missing.');
if (!provider.includes("window.gtag('consent', 'default'")) fail('Consent bridge missing.');
if (!provider.includes('pushCampaignEvent')) fail('Page view event tagging missing.');

const layout = read('apps/web/app/layout.tsx');
if (!layout.includes('ExternalTrackingProvider')) fail('Root layout does not include ExternalTrackingProvider.');

const allSource = mustExist.map(read).join('\n')
  .replace(/GTM-\[A-Z0-9\]\+/g, '')
  .replace(/GTM-XXXXXXX/g, '')
  .replace(/clarity\.ms\/tag'\+i/g, '');
const hardcodedIds = [/GTM-[A-Z0-9]{6,}/, /clarity\.ms\/tag\/[a-zA-Z0-9_-]{6,}/];
for (const pattern of hardcodedIds) {
  if (pattern.test(allSource)) fail(`Potential hardcoded tracking ID detected: ${pattern}`);
}

console.log('[qa-tag-manager-clarity-development] passed');
