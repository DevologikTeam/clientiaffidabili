const fs = require('fs');
const path = require('path');
const root = process.cwd();
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8'); }
function fail(message) { console.error(`QA failed: ${message}`); process.exit(1); }
const service = read('apps/api/src/modules/admin-operations/admin-operations.service.ts');
if (service.includes('private readonly workItems: Repository<AdminWorkItem>')) fail('repository name still collides with workItems() method');
if (!service.includes('private readonly workItemRepo: Repository<AdminWorkItem>')) fail('workItemRepo repository rename missing');
if (!service.includes('async workItems(')) fail('public workItems() service method missing');
if (service.includes('this.workItems.find') || service.includes('this.workItems.save') || service.includes('this.workItems.create')) fail('stale this.workItems repository access remains');
const checks = read('apps/api/src/modules/checks/checks.service.ts');
if (!checks.includes('result.normalizedResult as unknown as Record<string, unknown>')) fail('normalizedResult JSONB cast missing');
const runtime = read('apps/api/src/modules/provider/provider-runtime.service.ts');
if (runtime.includes('estimateCost(mapping, input.subject)')) fail('stale estimateCost(mapping, subject) call remains');
const adapter = read('apps/api/src/modules/provider/openapi-adapter.service.ts');
if (!adapter.includes('estimateCost(mapping: ProviderServiceMappingDesign, _subject?: Record<string, unknown>)')) fail('OpenapiAdapterService estimateCost optional subject signature missing');
const report = read('apps/api/src/modules/reports/report-composer.service.ts');
if (!report.includes('subject as unknown as Record<string, unknown>')) fail('ReportSubjectSnapshot safe cast missing');
console.log('QA passed: API Docker build TypeScript fix 2026-05-30');
