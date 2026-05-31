const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const required = [
  'apps/api/src/modules/customer-dashboard/customer-dashboard.module.ts',
  'apps/api/src/modules/customer-dashboard/customer-dashboard.controller.ts',
  'apps/api/src/modules/customer-dashboard/customer-dashboard.service.ts',
  'apps/api/src/modules/customer-dashboard/entities/customer-notification.entity.ts',
  'apps/api/src/modules/customer-dashboard/entities/customer-task.entity.ts',
  'apps/api/src/modules/customer-dashboard/entities/support-ticket.entity.ts',
  'apps/web/lib/customer-dashboard/customer-dashboard-runtime.ts',
  'apps/web/components/customer-dashboard/CustomerShell.tsx',
  'apps/web/components/customer-dashboard/DashboardStatusHero.tsx',
  'apps/web/components/customer-dashboard/NextBestActionCard.tsx',
  'apps/web/components/customer-dashboard/CheckList.tsx',
  'apps/web/components/customer-dashboard/CheckTimeline.tsx',
  'apps/web/components/customer-dashboard/ReportAccessCard.tsx',
  'apps/web/components/customer-dashboard/InvoiceList.tsx',
  'apps/web/components/customer-dashboard/NotificationList.tsx',
  'apps/web/components/customer-dashboard/SupportEntryCard.tsx',
  'apps/web/app/dashboard/page.tsx',
  'apps/web/app/dashboard/verifiche/page.tsx',
  'apps/web/app/dashboard/verifiche/[id]/page.tsx',
  'apps/web/app/dashboard/fatture/page.tsx',
  'apps/web/app/dashboard/supporto/page.tsx',
  'docs/sprints/M7-S_CUSTOMER_DASHBOARD_DEVELOPMENT.md',
  'docs/customer-dashboard/17_CUSTOMER_DASHBOARD_IMPLEMENTATION_NOTES.md',
  'docs/customer-dashboard/18_CUSTOMER_DASHBOARD_API_IMPLEMENTATION.md',
  'docs/customer-dashboard/19_CUSTOMER_DASHBOARD_UI_IMPLEMENTATION.md',
  'docs/customer-dashboard/20_CUSTOMER_DASHBOARD_SECURITY_QA_GUARDRAILS.md',
  'docs/qa/M7-S_QA_REPORT.md',
  'docs/releases/0.22.0.md',
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing M7-S files:', missing.join('\n'));
  process.exit(1);
}

const controller = fs.readFileSync(path.join(root, 'apps/api/src/modules/customer-dashboard/customer-dashboard.controller.ts'), 'utf8');
for (const endpoint of ['summary', 'checks', 'invoices', 'notifications', 'support']) {
  if (!controller.includes(endpoint)) {
    console.error(`Missing endpoint marker: ${endpoint}`);
    process.exit(1);
  }
}

const uiFiles = [
  'apps/web/app/dashboard/page.tsx',
  'apps/web/app/dashboard/verifiche/page.tsx',
  'apps/web/app/dashboard/verifiche/[id]/page.tsx',
  'apps/web/app/dashboard/fatture/page.tsx',
  'apps/web/app/dashboard/supporto/page.tsx',
  'apps/web/components/customer-dashboard/CustomerShell.tsx',
  'apps/web/components/customer-dashboard/DashboardStatusHero.tsx',
  'apps/web/components/customer-dashboard/CheckList.tsx',
  'apps/web/components/customer-dashboard/ReportAccessCard.tsx',
  'apps/web/components/customer-dashboard/SupportEntryCard.tsx',
];
const forbidden = ['raw payload', 'webhook', 'idempotency', 'provider retry', 'vault', 'stack trace'];
for (const file of uiFiles) {
  const content = fs.readFileSync(path.join(root, file), 'utf8').toLowerCase();
  for (const word of forbidden) {
    if (content.includes(word)) {
      console.error(`Forbidden customer-facing term "${word}" found in ${file}`);
      process.exit(1);
    }
  }
}

console.log('M7-S Customer Dashboard Development QA passed');
