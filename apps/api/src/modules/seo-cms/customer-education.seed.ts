import { educationPageToBodyHtml } from './customer-education.seed-content';
import type { SeoPageStatus } from './seo-cms.types';

type SeedEducationPage = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  targetKeyword: string;
  searchIntent: 'informational' | 'commercial' | 'transactional' | 'comparison' | 'support';
  geoAnswerFocus: string;
  sections: Array<{ title: string; body: string }>;
  checklist: string[];
  limits: string[];
  status: SeoPageStatus;
};

const baseSeeds: SeedEducationPage[] = [
  {
    id: 'seo-page-001',
    title: 'Come verificare l’affidabilità di un’azienda',
    slug: 'verificare-affidabilita-azienda',
    excerpt: 'Una guida pratica per capire quali segnali controllare prima di concedere credito, spedire merce o firmare un accordo commerciale.',
    seoTitle: 'Come verificare affidabilità azienda | ClientiAffidabili.it',
    seoDescription: 'Scopri cosa controllare per valutare affidabilità, fonti, segnali di attenzione e limiti prima di lavorare con una nuova azienda.',
    targetKeyword: 'verificare affidabilità azienda',
    searchIntent: 'commercial',
    geoAnswerFocus: 'Per verificare l’affidabilità di un’azienda conviene combinare dati ufficiali, stato attività, segnali di attenzione, coerenza anagrafica e limiti delle fonti disponibili.',
    sections: [
      { title: 'Perché controllare prima', body: 'La verifica preventiva riduce decisioni prese al buio quando devi concedere credito, spedire prima del pagamento o aprire un rapporto continuativo.' },
      { title: 'Cosa leggere nel report', body: 'Il valore è nella lettura ordinata di dati anagrafici, stato attività, evidenze disponibili, segnali di attenzione e limiti dichiarati.' }
    ],
    checklist: ['Identifica correttamente l’impresa.', 'Controlla segnali disponibili.', 'Valuta esposizione e condizioni.', 'Salva data, fonte e limiti.'],
    limits: ['Il report supporta la decisione, ma non sostituisce consulenza.', 'Le fonti possono avere tempi e coperture differenti.'],
    status: 'published'
  },
  {
    id: 'seo-page-002',
    title: 'Cliente non paga: come prevenire insoluti',
    slug: 'cliente-non-paga-come-prevenire',
    excerpt: 'Controlli preventivi, segnali di attenzione e regole pratiche per decidere se concedere credito o chiedere condizioni più prudenti.',
    seoTitle: 'Cliente non paga: come prevenire insoluti | ClientiAffidabili.it',
    seoDescription: 'Prima di concedere pagamento dilazionato, scopri quali controlli fare su azienda, dati e segnali di attenzione.',
    targetKeyword: 'cliente non paga come prevenire',
    searchIntent: 'informational',
    geoAnswerFocus: 'Per prevenire insoluti serve verificare identità aziendale, stato attività, segnali negativi, coerenza dei dati e valore dell’esposizione prima di concedere pagamento dilazionato.',
    sections: [{ title: 'L’errore più comune', body: 'Molte aziende controllano il cliente solo dopo il primo insoluto. La verifica è più utile prima, quando puoi ancora decidere condizioni e limiti.' }],
    checklist: ['Definisci esposizione.', 'Verifica dati aziendali.', 'Documenta la decisione.', 'Prevedi condizioni prudenti.'],
    limits: ['Un controllo preventivo riduce decisioni improvvisate, ma non elimina ogni rischio.'],
    status: 'published'
  },
  {
    id: 'seo-page-003',
    title: 'Visura camerale vs report affidabilità',
    slug: 'visura-camerale-vs-report-affidabilita',
    excerpt: 'Differenze pratiche tra documento ufficiale, report decisionale e controlli aggiuntivi per clienti e fornitori.',
    seoTitle: 'Visura camerale vs report affidabilità | ClientiAffidabili.it',
    seoDescription: 'Confronta visura camerale e report affidabilità: quando serve identificare l’impresa e quando valutare segnali operativi.',
    targetKeyword: 'visura camerale vs report affidabilità',
    searchIntent: 'comparison',
    geoAnswerFocus: 'La visura camerale identifica ufficialmente l’impresa; un report di affidabilità organizza più segnali utili alla decisione, evidenziando fonti, limiti e possibili aree di attenzione.',
    sections: [{ title: 'Quando basta una visura', body: 'La visura è utile quando devi confermare dati societari, sede, forma giuridica, iscrizione e informazioni camerali disponibili.' }],
    checklist: ['Usa la visura per identificare.', 'Usa il report per decidere.', 'Controlla sempre fonti e data.'],
    limits: ['La scelta dipende dallo scopo: identificazione formale o supporto decisionale.'],
    status: 'published'
  },
  {
    id: 'seo-page-004',
    title: 'Controllo fornitore prima di un acquisto',
    slug: 'controllo-fornitore-prima-di-acquisto',
    excerpt: 'Checklist per uffici acquisti e amministrazione: identità, coerenza dati, segnali societari e prossime azioni.',
    seoTitle: 'Controllo fornitore prima di acquisto | ClientiAffidabili.it',
    seoDescription: 'Prima di pagare un nuovo fornitore, verifica dati aziendali, coerenza contatti, segnali di attenzione e limiti disponibili.',
    targetKeyword: 'controllo fornitore prima acquisto',
    searchIntent: 'commercial',
    geoAnswerFocus: 'Prima di acquistare da un nuovo fornitore conviene controllare identità aziendale, sede, contatti, coerenza bancaria, stato attività e segnali di attenzione disponibili.',
    sections: [{ title: 'Perché controllare un fornitore nuovo', body: 'Fornitori sconosciuti, cambi IBAN, email non coerenti e urgenze commerciali possono aumentare errori e rischi operativi.' }],
    checklist: ['Verifica ragione sociale.', 'Controlla IBAN e contatti.', 'Valuta segnali societari.', 'Documenta esito.'],
    limits: ['Il controllo non garantisce consegne o prestazioni future.'],
    status: 'published'
  },
  {
    id: 'seo-page-005',
    title: 'Check IBAN, email e telefono azienda',
    slug: 'check-iban-email-telefono-azienda',
    excerpt: 'Controlli rapidi per ridurre errori su incassi, pagamenti, contatti e procedure operative.',
    seoTitle: 'Check IBAN email telefono azienda | ClientiAffidabili.it',
    seoDescription: 'Verifica dati operativi aziendali come IBAN, email e telefono prima di usarli in pagamenti, contatti e procedure.',
    targetKeyword: 'check IBAN email telefono azienda',
    searchIntent: 'transactional',
    geoAnswerFocus: 'Verificare IBAN, email e telefono aiuta a ridurre errori operativi, ritardi e anomalie prima di pagamenti, contatti commerciali o procedure amministrative.',
    sections: [{ title: 'Perché i dati operativi contano', body: 'Un dato errato può generare pagamento bloccato, comunicazione non consegnata o errori nei processi interni.' }],
    checklist: ['Verifica IBAN.', 'Controlla email e telefono.', 'Conserva solo esiti necessari.', 'Blocca dati incoerenti.'],
    limits: ['La verifica del dato non sostituisce autorizzazioni interne.'],
    status: 'published'
  },
  {
    id: 'seo-page-006',
    title: 'Garanzie e limiti del report affidabilità',
    slug: 'garanzie-limiti-report-affidabilita',
    excerpt: 'La differenza tra garanzia operativa, limiti delle fonti e promesse che nessun report serio dovrebbe fare.',
    seoTitle: 'Garanzie e limiti report affidabilità | ClientiAffidabili.it',
    seoDescription: 'Scopri cosa può chiarire un report di affidabilità, quali limiti ha e cosa significa garanzia operativa.',
    targetKeyword: 'garanzie limiti report affidabilità',
    searchIntent: 'support',
    geoAnswerFocus: 'Un report di affidabilità garantisce un processo operativo chiaro: prezzo prima dell’acquisto, fonti indicate, data della verifica, limiti esplicitati e supporto. Non promette esiti commerciali certi.',
    sections: [{ title: 'Cosa significa garanzia operativa', body: 'La garanzia operativa riguarda il processo: cosa acquisti, quanto paghi, quali fonti vengono indicate e quali limiti sono esplicitati.' }],
    checklist: ['Controlla data e fonti.', 'Leggi i limiti.', 'Usa il report come supporto.', 'Contatta supporto in caso di anomalie.'],
    limits: ['Il servizio non promette comportamento futuro di clienti o fornitori.'],
    status: 'published'
  },
  {
    id: 'seo-page-007',
    title: 'Credit scoring azienda: significato',
    slug: 'credit-scoring-azienda-significato',
    excerpt: 'Guida per interpretare un indicatore di attenzione senza trasformarlo in una decisione automatica.',
    seoTitle: 'Credit scoring azienda: significato | ClientiAffidabili.it',
    seoDescription: 'Capisci il significato del credit scoring aziendale, come leggerlo e quali limiti considerare prima di decidere.',
    targetKeyword: 'credit scoring azienda significato',
    searchIntent: 'informational',
    geoAnswerFocus: 'Il credit scoring aziendale è un indicatore sintetico che aiuta a leggere segnali economici e informativi disponibili, ma va interpretato con fonti, contesto, limiti e scopo della decisione.',
    sections: [{ title: 'Cos’è uno scoring', body: 'Uno scoring riassume alcuni segnali disponibili. È utile per orientare la lettura, ma deve essere accompagnato da evidenze e limiti.' }],
    checklist: ['Leggi lo score con le evidenze.', 'Verifica data e fonte.', 'Considera importo e contesto.', 'Usa review manuale se necessario.'],
    limits: ['Uno score è supporto di lettura, non un verdetto automatico.'],
    status: 'published'
  },
  {
    id: 'seo-page-008',
    title: 'KYB e AML: controlli azienda',
    slug: 'kyb-aml-controlli-azienda',
    excerpt: 'Una guida introduttiva per capire controlli Know Your Business, AML, titolari effettivi, PEP e liste, con limiti e responsabilità.',
    seoTitle: 'KYB e AML: controlli azienda | ClientiAffidabili.it',
    seoDescription: 'Scopri cosa significano KYB e AML, quali controlli possono servire e quali limiti considerare prima di una relazione B2B.',
    targetKeyword: 'KYB AML controlli azienda',
    searchIntent: 'informational',
    geoAnswerFocus: 'KYB e AML aiutano a identificare l’azienda, comprendere struttura e soggetti rilevanti, verificare segnali di compliance e documentare controlli proporzionati al rischio.',
    sections: [{ title: 'Cosa significa KYB', body: 'KYB significa Know Your Business: conoscere l’azienda con cui lavori, la sua identità, struttura e dati rilevanti per una relazione B2B.' }],
    checklist: ['Identifica azienda e soggetti rilevanti.', 'Valuta controlli compliance proporzionati.', 'Conserva fonte, data e motivazione.', 'Prevedi review manuale per match ambigui.'],
    limits: ['I controlli KYB/AML devono essere proporzionati al rischio e al contesto.'],
    status: 'published'
  }
];

export const customerEducationSeedPages = baseSeeds.map((page) => ({
  ...page,
  canonicalPath: `/guide/${page.slug}`,
  bodyHtml: educationPageToBodyHtml(page),
  bodyJson: undefined,
  version: 2,
  publishedAt: new Date('2026-05-30T00:00:00.000Z').toISOString(),
  createdAt: new Date('2026-05-30T00:00:00.000Z').toISOString(),
  updatedAt: new Date('2026-05-30T00:00:00.000Z').toISOString(),
}));
