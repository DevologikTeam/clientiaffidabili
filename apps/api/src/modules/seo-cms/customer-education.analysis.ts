export interface CustomerEducationPublishRisk {
  code: string;
  severity: 'blocker' | 'warning';
  description: string;
  remediation: string;
}

export const customerEducationPublishRisks: CustomerEducationPublishRisk[] = [
  {
    code: 'MISSING_LIMITS_BLOCK',
    severity: 'blocker',
    description: 'La pagina non spiega cosa il report non puo garantire.',
    remediation: 'Aggiungere un blocco Cosa non puoi sapere con certezza.',
  },
  {
    code: 'FORBIDDEN_CLAIM',
    severity: 'blocker',
    description: 'Il contenuto contiene claim come rischio zero o pagamento garantito.',
    remediation: 'Riscrivere il claim come supporto decisionale prudente.',
  },
  {
    code: 'MISSING_OPERATIONAL_GUARANTEE',
    severity: 'blocker',
    description: 'La pagina non distingue garanzia operativa da garanzia sul comportamento futuro.',
    remediation: 'Aggiungere il blocco garanzia operativa con limiti.',
  },
  {
    code: 'WEAK_SEARCH_INTENT',
    severity: 'warning',
    description: 'Intento di ricerca non abbastanza specifico.',
    remediation: 'Definire primary intent, audience e CTA prima della pubblicazione.',
  },
];

export const customerEducationMvpTopics = [
  'verificare-affidabilita-azienda',
  'cliente-non-paga-come-prevenire',
  'garanzie-limiti-report-affidabilita',
  'visura-camerale-vs-report-affidabilita',
  'controllo-fornitore-prima-di-acquisto',
];
