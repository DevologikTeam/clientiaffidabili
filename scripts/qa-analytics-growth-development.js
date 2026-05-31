const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'apps/api/src/modules/analytics/analytics.module.ts',
  'apps/api/src/modules/analytics/analytics.controller.ts',
  'apps/api/src/modules/analytics/analytics.service.ts',
  'apps/api/src/modules/analytics/analytics-redaction.service.ts',
  'apps/api/src/modules/analytics/analytics-kpi.service.ts',
  'apps/api/src/modules/analytics/entities/analytics-event.entity.ts',
  'apps/api/src/modules/analytics/entities/analytics-attribution-snapshot.entity.ts',
  'apps/api/src/modules/analytics/entities/analytics-kpi-snapshot.entity.ts',
  'apps/api/src/modules/analytics/dto/track-analytics-event.dto.ts',
  'apps/web/lib/analytics/analytics-growth-runtime.ts',
  'apps/web/app/admin/analytics/page.tsx',
  'apps/web/components/analytics/AnalyticsKpiGrid.tsx',
  'docs/sprints/M16-S_ANALYTICS_ATTRIBUTION_GROWTH_INTELLIGENCE_DEVELOPMENT.md',
  'docs/releases/0.59.0.md',
];

for (const file of required) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
}

const runtime = fs.readFileSync(path.join(root, 'apps/web/lib/analytics/analytics-growth-runtime.ts'), 'utf8');
const forbiddenRuntimePhrases = ['recipientEmail', 'cardData', 'rawProviderPayload', 'openAiPrompt', 'plainIpAddress'];
for (const phrase of forbiddenRuntimePhrases) {
  if (runtime.includes(phrase)) {
    console.error(`Forbidden analytics runtime phrase found: ${phrase}`);
    process.exit(1);
  }
}

const service = fs.readFileSync(path.join(root, 'apps/api/src/modules/analytics/analytics.service.ts'), 'utf8');
for (const expected of ['assertNoForbiddenPayloadKeys', 'sanitizePayload', 'serverAuthoritative']) {
  if (!service.includes(expected)) {
    console.error(`Analytics service missing guardrail: ${expected}`);
    process.exit(1);
  }
}

console.log('qa-analytics-growth-development passed');
