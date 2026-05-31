#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const failures = [];
function filePath(file) { return path.join(root, file); }
function read(file) { return fs.readFileSync(filePath(file), 'utf8'); }
function assertFile(file) {
  if (!fs.existsSync(filePath(file))) failures.push(`Missing required file: ${file}`);
}
function assertIncludes(file, token, label = token) {
  const content = read(file);
  if (!content.includes(token)) failures.push(`${file} missing ${label}`);
}
function assertNotIncludes(file, token, label = token) {
  const content = read(file);
  if (content.toLowerCase().includes(token.toLowerCase())) failures.push(`${file} contains forbidden public contact copy: ${label}`);
}

const files = [
  'apps/web/app/contatti/page.tsx',
  'apps/web/components/sales-crm/ContactCaptureForm.tsx',
  'apps/web/components/ds/Field.tsx',
  'apps/web/app/api/sales-crm/contact-messages/route.ts',
  'apps/web/app/globals.css',
  'docker-compose.yml',
  'docker-compose.coolify.yml',
  '.env.example',
  'docs/public-copy/03_CONTACT_FORM_SENIOR_UX_REVIEW.md',
  'docs/releases/0.75.3.md',
];
files.forEach(assertFile);

const form = 'apps/web/components/sales-crm/ContactCaptureForm.tsx';
for (const token of [
  'ca-contact-section',
  'ca-contact-layout',
  'ca-contact-assurance',
  'ca-contact-card',
  'ca-contact-form',
  '<fieldset',
  '<legend>',
  'name="sourceType"',
  'name="sourcePath"',
  'name="ctaId"',
  'name="privacyAccepted"',
  'value="true"',
  'Evita dati sensibili non necessari',
  'Invia richiesta',
]) assertIncludes(form, token);
for (const forbidden of ['provider email', 'area admin', 'admin prima', 'email fallisce', 'provider']) assertNotIncludes(form, forbidden);

const page = 'apps/web/app/contatti/page.tsx';
for (const token of ['searchParams', 'inviata', 'errore', 'Vedi i servizi', 'Confronta i prezzi', 'ca-contact-hero-aside']) assertIncludes(page, token);
for (const forbidden of ['admin', 'provider', 'debug', 'payload', 'workflow']) assertNotIncludes(page, forbidden);

const route = 'apps/web/app/api/sales-crm/contact-messages/route.ts';
for (const token of ['INTERNAL_API_URL', 'NEXT_PUBLIC_API_URL', '/sales-crm/contact-messages', 'NextResponse.redirect', 'privacyAccepted', 'formData.get']) assertIncludes(route, token);

const field = 'apps/web/components/ds/Field.tsx';
for (const token of ['wrapperClassName?: string', 'fieldClassName', "['ca-field'"]) assertIncludes(field, token);

const css = 'apps/web/app/globals.css';
for (const token of [
  'Contact form senior UX polish v0.75.3',
  '.ca-contact-layout',
  'max-width: 1120px',
  'width: min(100%, 720px)',
  '.ca-contact-fields-grid',
  '.ca-contact-checkbox',
  '.ca-contact-submit-row',
  '@media (max-width: 640px)',
]) assertIncludes(css, token);

for (const compose of ['docker-compose.yml', 'docker-compose.coolify.yml']) {
  assertIncludes(compose, 'INTERNAL_API_URL', 'server-side internal API url for web contact form');
}
assertIncludes('.env.example', 'INTERNAL_API_URL=http://api:3001');

const pkg = read('package.json');
for (const token of ['"version": "0.75.3"', 'qa:contact-form-design', 'node scripts/qa-contact-form-design.js']) {
  if (!pkg.includes(token)) failures.push(`package.json missing ${token}`);
}

const artifact = {
  status: failures.length ? 'failed' : 'passed',
  checkedAt: new Date().toISOString(),
  checkedFiles: files,
  failures,
};
fs.mkdirSync(filePath('artifacts/qa'), { recursive: true });
fs.writeFileSync(filePath('artifacts/qa/contact-form-design-latest.json'), JSON.stringify(artifact, null, 2));

if (failures.length) {
  console.error('Contact form design QA failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`Contact form design QA passed on ${files.length} files.`);
