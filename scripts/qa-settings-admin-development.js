#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'apps/api/src/modules/settings-admin/settings-admin.module.ts',
  'apps/api/src/modules/settings-admin/settings-admin.service.ts',
  'apps/api/src/modules/settings-admin/settings-admin.controller.ts',
  'apps/api/src/modules/settings-admin/entities/platform-setting.entity.ts',
  'apps/api/src/modules/settings-admin/entities/platform-setting-audit.entity.ts',
  'apps/api/src/modules/settings-admin/entities/operational-error-event.entity.ts',
  'apps/api/src/modules/settings-admin/entities/purchase-ip-audit.entity.ts',
  'apps/web/app/admin/settings/page.tsx',
  'apps/web/components/settings-admin/SettingsOverviewCards.tsx',
  'apps/web/components/settings-admin/OperationalErrorLedgerTable.tsx',
  'docs/sprints/M15B-S_PLATFORM_SETTINGS_BOOTSTRAP_ADMIN_OPERATIONAL_ERROR_LEDGER_DEVELOPMENT.md',
  'docs/releases/0.56.0.md',
];

const requiredPatterns = [
  ['apps/api/src/app.module.ts', /SettingsAdminModule/],
  ['apps/api/src/app.module.ts', /PlatformSetting/],
  ['apps/api/src/modules/billing/billing.service.ts', /assertPurchasesEnabled/],
  ['apps/api/src/modules/billing/billing.service.ts', /recordBuyerIpAudit/],
  ['apps/api/src/modules/billing/billing.service.ts', /recordOperationalError/],
  ['apps/api/src/modules/settings-admin/settings-admin.service.ts', /bootstrapAdmin/],
  ['apps/api/src/modules/settings-admin/settings-admin.service.ts', /secret_write_only/],
  ['apps/api/src/modules/settings-admin/settings-admin.service.ts', /openai\.apiKey/],
  ['apps/api/src/modules/settings-admin/settings-admin.service.ts', /purchases\.enabled/],
  ['apps/web/app/admin/settings/page.tsx', /OperationalErrorLedgerTable/],
  ['apps/web/app/admin/settings/page.tsx', /PurchaseKillSwitchPanel/],
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(process.cwd(), file)));
const patternFailures = requiredPatterns.filter(([file, pattern]) => {
  const full = path.join(process.cwd(), file);
  return !fs.existsSync(full) || !pattern.test(fs.readFileSync(full, 'utf8'));
});

if (missing.length || patternFailures.length) {
  console.error('Settings admin development QA failed.');
  for (const file of missing) console.error(`Missing file: ${file}`);
  for (const [file, pattern] of patternFailures) console.error(`Pattern not found in ${file}: ${pattern}`);
  process.exit(1);
}

console.log('Settings admin development QA passed.');
