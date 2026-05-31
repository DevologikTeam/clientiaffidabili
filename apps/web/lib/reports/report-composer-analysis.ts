export type PublicReportAttention = 'attenzione-bassa' | 'attenzione-media' | 'attenzione-alta' | 'dati-insufficienti' | 'revisione-richiesta';

export interface ReportComposerUxPrinciple {
  code: string;
  title: string;
  description: string;
  aboveTheFold: boolean;
}

export interface ReportCopyPattern {
  attention: PublicReportAttention;
  headline: string;
  body: string;
  nextAction: string;
}

export const reportComposerUxPrinciples: ReportComposerUxPrinciple[] = [
  {
    code: 'decision_first',
    title: 'Decisione prima dei dettagli',
    description: 'Il report deve chiarire subito livello di attenzione, motivo e prossima azione.',
    aboveTheFold: true,
  },
  {
    code: 'evidence_backed',
    title: 'Ogni segnale ha una fonte',
    description: 'Segnali e sintesi devono rimandare a fonti, timestamp e limiti.',
    aboveTheFold: false,
  },
  {
    code: 'plain_language',
    title: 'Linguaggio leggibile',
    description: 'Niente payload, endpoint o termini provider nella vista cliente.',
    aboveTheFold: true,
  },
  {
    code: 'no_absolute_claims',
    title: 'Nessuna promessa assoluta',
    description: 'Il report supporta decisioni, non garantisce pagamenti o assenza di rischio.',
    aboveTheFold: false,
  },
];

export const reportCopyPatterns: ReportCopyPattern[] = [
  {
    attention: 'attenzione-bassa',
    headline: 'Non emergono segnali critici tra le informazioni disponibili',
    body: 'Il profilo appare coerente rispetto alle fonti consultate per questa verifica.',
    nextAction: 'Procedi con cautela standard e conserva il report come supporto alla decisione.',
  },
  {
    attention: 'attenzione-media',
    headline: 'Sono presenti elementi da approfondire',
    body: 'Alcuni segnali richiedono una verifica aggiuntiva prima di procedere.',
    nextAction: 'Richiedi documentazione integrativa o valuta condizioni di pagamento più prudenti.',
  },
  {
    attention: 'attenzione-alta',
    headline: 'Sono presenti segnali che richiedono cautela rafforzata',
    body: 'Prima di procedere, verifica i dettagli con il tuo consulente o richiedi una review assistita.',
    nextAction: 'Non procedere automaticamente: approfondisci le evidenze e valuta garanzie aggiuntive.',
  },
  {
    attention: 'dati-insufficienti',
    headline: 'Le fonti disponibili non consentono una sintesi completa',
    body: 'L’assenza di dati non equivale automaticamente ad assenza di criticità.',
    nextAction: 'Valuta una verifica avanzata o richiedi informazioni aggiuntive al soggetto.',
  },
];
