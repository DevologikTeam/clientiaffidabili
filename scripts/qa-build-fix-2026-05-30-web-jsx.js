#!/usr/bin/env node
const fs = require('fs');
const file = 'apps/web/components/partner-portal/DeveloperQuickstart.tsx';
const src = fs.readFileSync(file, 'utf8');
const required = [
  "partnerPortalRuntime.docs.headers.join('\\n')",
  'export function DeveloperQuickstart()',
  '<Card>',
  '</Card>',
];
const missing = required.filter((token) => !src.includes(token));
const brokenPatterns = [
  /join\('\s*\n\s*'\)/,
  /<pre>\{partnerPortalRuntime\.docs\.headers\.join\('\s*\n/s,
];
const broken = brokenPatterns.filter((pattern) => pattern.test(src));
if (missing.length || broken.length) {
  console.error('DeveloperQuickstart build fix QA failed.');
  if (missing.length) console.error('Missing tokens:', missing);
  if (broken.length) console.error('Broken newline string literal pattern detected.');
  process.exit(1);
}
console.log('DeveloperQuickstart web JSX build fix QA passed.');
