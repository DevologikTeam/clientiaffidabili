import { buildPublicMetadata } from '@/lib/seo/metadata';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button, Card, Checklist, SectionHeader, StatCard, TrustNotice } from '@/components/ds';

const apiUseCases = [
  'Integrare verifiche in CRM, ERP o portali B2B',
  'Acquistare pacchetti prepagati per team o partner',
  'Ricevere aggiornamenti sullo stato report e notifiche',
  'Governare limiti, audit e chiavi per organizzazione'
];

export const metadata = buildPublicMetadata({
  title: 'API partner verifiche B2B | ClientiAffidabili.it',
  description: 'Integrazioni partner per verifiche B2B con ambiente di test, attivazione controllata, limiti, audit e uso lecito.',
  path: '/api',
  keywords: ['API verifiche aziendali', 'integrazione partner B2B', 'report affidabilità API'],
});

export default function ApiPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="section ca-page-hero">
          <div className="container ca-detail-grid">
            <div className="ca-stack">
              <SectionHeader
                eyebrow="Integrazioni partner"
                title="Integra verifiche B2B in processi partner con attivazione controllata."
                description="L’integrazione partner consente di avviare verifiche da gestionali, portali o workflow B2B, con ambiente di test, limiti e controlli sull’uso lecito."
              />
              <div className="hero-actions">
                <Button href="/servizi">Parti dal catalogo</Button>
                <Button href="/checkout?service=COMPANY_PRO" variant="outline">Avvia verifica Pro</Button>
              </div>
            </div>
            <Card variant="elevated" className="ca-api-card">
              <span className="ca-eyebrow">Partner API</span>
              <h3>Integrazione dati server-side</h3>
              <p>Le credenziali tecniche restano protette lato server. Ogni richiesta rispetta piano, limiti, finalità dichiarata e stato del report.</p>
              <Checklist items={apiUseCases} />
            </Card>
          </div>
        </section>

        <section className="section">
          <div className="container ca-stack">
            <SectionHeader title="Funzioni previste per partner" description="L’accesso partner viene attivato progressivamente dopo verifica del caso d’uso e accettazione delle condizioni operative." />
            <div className="grid-3">
              <StatCard label="API keys" value="In attivazione" description="Chiavi per organizzazione, rotazione e revoca" status="Accesso controllato" tone="warning" />
              <StatCard label="Rate limit" value="Per piano" description="Soglie giornaliere/mensili e abuso prevention" status="Controllo" tone="info" />
              <StatCard label="Audit" value="Obbligatorio" description="Acquisti, richieste, aggiornamenti e download report" status="Sempre attivo" tone="success" />
            </div>
          </div>
        </section>

        <section className="section ca-section-muted">
          <div className="container">
            <TrustNotice title="Regola di attivazione" tone="warning">
              <p>Prima dell’attivazione live vengono verificati catalogo, prezzi, limiti di piano, tracciamento delle operazioni e condizioni d’uso. L’integrazione non è un accesso libero alle fonti dati.</p>
            </TrustNotice>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
