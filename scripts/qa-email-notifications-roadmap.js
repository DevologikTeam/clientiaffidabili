const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'docs/roadmap/ROADMAP_TO_RC.md',
  'docs/email-notifications/01_CUSTOMER_TECHNICAL_EMAIL_ROADMAP_INSERT.md',
  'docs/email-notifications/02_EMAIL_EVENT_INVENTORY.md',
  'docs/email-notifications/03_REMEMBER_ME_PASSWORD_RESET_SECURITY_EMAILS.md',
  'docs/email-notifications/04_PURCHASE_PAYMENT_REPORT_PDF_EMAILS.md',
  'docs/email-notifications/05_EMAIL_DELIVERY_LEDGER_WEBHOOKS_ERROR_HANDLING.md',
  'docs/email-notifications/06_TECHNICAL_EMAIL_COPY_DECK.md',
  'docs/email-notifications/07_M18_READINESS_CHECKLIST.md',
  'docs/releases/0.57.1.md'
];

const requiredTerms = [
  'M18-A',
  'M18-P',
  'M18-S',
  'auth_welcome_verify_email',
  'auth_password_reset_requested',
  'auth_remember_me_enabled',
  'payment_succeeded',
  'report_ready',
  'report_pdf_ready',
  'EmailDelivery',
  'EmailSuppression',
  'Operational Error Ledger',
  'SPF',
  'DKIM',
  'DMARC'
];

const allText = [];
for (const file of requiredFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    throw new Error(`Missing required file: ${file}`);
  }
  const content = fs.readFileSync(full, 'utf8');
  if (content.trim().length < 250) {
    throw new Error(`File too short: ${file}`);
  }
  allText.push(content);
}

const joined = allText.join('\n');
for (const term of requiredTerms) {
  if (!joined.includes(term)) {
    throw new Error(`Missing required term: ${term}`);
  }
}

const forbidden = ['rischio zero garantito', 'pagamento garantito al 100%', 'solvibilita garantita'];
for (const phrase of forbidden) {
  if (joined.toLowerCase().includes(phrase)) {
    throw new Error(`Forbidden claim found: ${phrase}`);
  }
}

console.log('qa-email-notifications-roadmap passed');
