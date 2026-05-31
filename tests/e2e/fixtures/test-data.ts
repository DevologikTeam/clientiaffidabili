export const testCustomer = {
  email: process.env.LAUNCH_TEST_ACCOUNT_EMAIL ?? 'qa@clientiaffidabili.it',
  password: process.env.LAUNCH_TEST_ACCOUNT_PASSWORD ?? 'change_me_only_for_local_qa',
  companyName: 'Cliente QA Srl',
  vatNumber: 'IT00000000000',
};

export const testCompanyCheck = {
  serviceSlug: 'check-affidabilita-pro',
  serviceCode: 'COMPANY_PRO',
  targetCompany: 'Azienda Demo QA Srl',
  vatNumber: 'IT12345678901',
  reason: 'Verifica dimostrativa in ambiente sandbox',
};

export const forbiddenProductionData = [
  'Mario Rossi reale',
  'cliente vero',
  'partita iva reale non autorizzata',
];
