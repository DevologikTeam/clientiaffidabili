import type { CustomerEducationPage } from '@/lib/seo-geo/customer-education-runtime';

function guideIntentLabel(intent: CustomerEducationPage['intent']) {
  const labels: Record<CustomerEducationPage['intent'], string> = {
    problem_aware: 'capire il rischio prima di decidere',
    solution_aware: 'scegliere il controllo più adatto',
    purchase_aware: 'acquistare la verifica con consapevolezza',
    comparison: 'confrontare alternative e livello di approfondimento',
    trust_aware: 'valutare garanzie, fonti e limiti',
    informational: 'comprendere il tema prima di decidere',
  };

  return labels[intent];
}

function guideTopicLabel(cluster: CustomerEducationPage['cluster']) {
  const labels: Record<CustomerEducationPage['cluster'], string> = {
    affidabilita_azienda: 'affidabilità di clienti e aziende',
    prevenzione_insoluti: 'prevenzione insoluti e pagamenti',
    fornitori: 'fornitori, partner e continuità operativa',
    dati_operativi: 'dati di contatto e pagamento',
    garanzia_limiti: 'garanzie, fonti e limiti del report',
    credit_scoring: 'score e segnali di rischio',
    kyb_aml: 'controlli KYB, AML e compliance',
  };

  return labels[cluster];
}

export function EducationMetaStrip({ page }: { page: CustomerEducationPage }) {
  return (
    <div className="ca-education-meta" aria-label="Informazioni guida">
      <span>Per: {guideIntentLabel(page.intent)}</span>
      <span>Tema: {guideTopicLabel(page.cluster)}</span>
      <span>Aggiornata: {new Date(page.updatedAt).toLocaleDateString('it-IT')}</span>
    </div>
  );
}
