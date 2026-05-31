#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const files = [
  'apps/api/src/modules/sandbox-certification/sandbox-certification.adapter.ts',
  'apps/api/src/modules/sandbox-certification/sandbox-certification.service.ts',
  'apps/web/lib/sandbox-certification/sandbox-certification-runtime.ts',
];
const failures = [];
for (const file of files) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    failures.push(`Missing ${file}`);
    continue;
  }
  const text = fs.readFileSync(full, 'utf8');
  if (/sk_live_|pk_live_|PAYPAL_CLIENT_SECRET\s*=|OPENAI_API_KEY\s*=|OPENAPI_API_KEY\s*=/.test(text)) failures.push(`Secret-like value in ${file}`);
  if (file.includes('adapter') && !text.includes('redacted')) failures.push(`Adapter evidence must be redacted in ${file}`);
}

if (failures.length) {
  console.error('sandbox-certification-static-gate failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('sandbox-certification-static-gate: passed');
