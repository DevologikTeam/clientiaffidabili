import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  Alert,
  Badge,
  Button,
  Card,
  DataTable,
  EmptyState,
  Field,
  KeyValueList,
  PageHero,
  PriceCard,
  ProgressBar,
  SectionHeader,
  StatCard,
  StatusPill,
  Stepper,
  TrustNotice
} from '@/components/ds';
import { legalMicrocopy } from '@/lib/design-system/copy';

const swatches = [
  { name: 'Trust Navy 950', value: '#082E48' },
  { name: 'Trust Navy 900', value: '#0B3C5D' },
  { name: 'Trust Blue 600', value: '#328CC1' },
  { name: 'Trust Gold 500', value: '#E6AF2E' },
  { name: 'Slate 950', value: '#1D2731' },
  { name: 'Slate 600', value: '#475569' },
  { name: 'Slate 100', value: '#F1F5F9' },
  { name: 'Success 600', value: '#059669' }
];

const rows = [
  { component: 'Button', status: 'Implementato', rule: 'Varianti primary, secondary, outline, ghost, danger' },
  { component: 'Field', status: 'Implementato', rule: 'Label, help text, error e aria-invalid' },
  { component: 'Stepper', status: 'Implementato', rule: 'Stati testuali done/current/blocked/todo' },
  { component: 'DataTable', status: 'Implementato', rule: 'Caption obbligatoria e fallback empty' }
];

export default function DesignSystemPage() {
  return (
    <div className="ca-page-shell">
      <Header />
      <PageHero
        eyebrow="Internal design system"
        title="ClientiAffidabili.it UI kit v0.4.0"
        description="Implementazione iniziale dei componenti riutilizzabili, pensata per rendere coerenti landing, catalogo, checkout, dashboard e report. Questa route resta interna/demo."
        actions={
          <>
            <Button href="/prezzi" size="lg">Vedi servizi MVP</Button>
            <Button href="/dashboard" variant="outline" size="lg">Apri dashboard demo</Button>
          </>
        }
        aside={
          <div className="ca-stack">
            <StatCard label="Componenti DS" value="16" description="Prima libreria riutilizzabile" status="M1-S completato" tone="success" icon="✓" />
            <ProgressBar label="Copertura UI foundation" value={68} helpText="Base pronta per sprint funnel e catalogo." />
          </div>
        }
      />
      <main className="section" id="main-content" tabIndex={-1}>
        <div className="container ca-stack ca-stack--lg">
          <section className="ca-stack" aria-labelledby="tokens-title">
            <SectionHeader
              eyebrow="01"
              title="Token colore"
              description="Palette derivata dal logo reale: autorevolezza navy, azione blu, accenti controllati e stati semantici."
            />
            <div className="ca-swatch-grid">
              {swatches.map((swatch) => (
                <div className="ca-swatch" key={swatch.value}>
                  <div className="ca-swatch__color" style={{ background: swatch.value }} />
                  <div className="ca-swatch__body">
                    <strong>{swatch.name}</strong>
                    <code>{swatch.value}</code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="ca-stack" aria-labelledby="buttons-title">
            <SectionHeader eyebrow="02" title="Bottoni e CTA" description="Una sola CTA primaria dominante per schermata; le altre azioni restano secondarie o contestuali." />
            <Card>
              <div className="hero-actions" style={{ margin: 0 }}>
                <Button>Avvia questa verifica</Button>
                <Button variant="secondary">Apri report</Button>
                <Button variant="outline">Scarica report PDF</Button>
                <Button variant="ghost">Leggi i limiti</Button>
                <Button variant="danger">Annulla richiesta</Button>
              </div>
            </Card>
          </section>

          <section className="ca-stack" aria-labelledby="states-title">
            <SectionHeader eyebrow="03" title="Badge, stati e alert" description="Ogni stato deve essere leggibile anche senza colore: label testuale sempre presente." />
            <Card className="ca-stack">
              <div className="hero-actions" style={{ margin: 0 }}>
                <Badge tone="brand">Affidabilità B2B</Badge>
                <Badge tone="info">Tempo reale</Badge>
                <StatusPill tone="success" label="Verifica completata" />
                <StatusPill tone="warning" label="Monitoraggio consigliato" />
                <StatusPill tone="danger" label="Dato da correggere" />
              </div>
              <Alert title="Uso lecito richiesto" tone="warning">
                <p>{legalMicrocopy.checkoutPurpose}</p>
              </Alert>
            </Card>
          </section>

          <section className="ca-ds-spec-grid" aria-labelledby="forms-title">
            <Card>
              <SectionHeader eyebrow="04" title="Form field" description="Label obbligatoria, help text e errore contestuale." />
              <div className="ca-stack">
                <Field label="Partita IVA o codice fiscale" helpText="Inserisci il dato del soggetto da verificare." placeholder="IT00000000000" />
                <Field label="Email referente" placeholder="nome@azienda.it" error="Inserisci un indirizzo email valido." />
              </div>
            </Card>
            <Card>
              <SectionHeader eyebrow="05" title="Trust notice" description="Da usare in checkout, report e verifiche sensibili." />
              <TrustNotice title="Trasparenza prima del pagamento" tone="info">
                <p>Il cliente deve vedere prezzo, finalità, tempi, dati richiesti e limiti prima di pagare.</p>
              </TrustNotice>
            </Card>
          </section>

          <section className="ca-stack" aria-labelledby="process-title">
            <SectionHeader eyebrow="06" title="Stepper operativo" description="Ogni flusso deve chiarire cosa è stato fatto, cosa manca e cosa succede dopo." />
            <Stepper
              items={[
                { label: 'Dati inseriti', description: 'Partita IVA validata localmente.', state: 'done' },
                { label: 'Finalità confermata', description: 'Uso lecito dichiarato dal cliente.', state: 'current' },
                { label: 'Checkout', description: 'Pagamento non ancora completato.', state: 'todo' },
                { label: 'Report', description: 'Disponibile dopo evasione provider.', state: 'todo' }
              ]}
            />
          </section>

          <section className="ca-stack" aria-labelledby="pricing-title">
            <SectionHeader eyebrow="07" title="Pricing card" description="Prezzo, tempi, inclusioni e CTA devono essere chiari prima del checkout." />
            <div className="ca-grid ca-grid--3">
              <PriceCard
                title="Verifica azienda essenziale"
                category="Affidabilità B2B"
                description="Controlla stato, dati principali e primo indicatore operativo prima di procedere."
                price="€14,90"
                delivery="pochi minuti"
                includes={['Dati principali', 'Esito sintetico', 'Report scaricabile']}
                ctaLabel="Avvia questa verifica"
                href="/checkout"
              />
              <PriceCard
                title="Check Affidabilità Pro"
                category="Risk intelligence"
                description="Report più completo per clienti, fornitori e pagamenti differiti."
                price="€24,90"
                delivery="pochi minuti"
                includes={['Scoring operativo', 'Segnali di rischio', 'Soggetti collegati']}
                ctaLabel="Avvia questa verifica"
                href="/checkout"
              />
              <PriceCard
                title="KYB Compliance"
                category="Compliance"
                description="Verifica assetti e segnali AML quando il rapporto è più sensibile."
                price="€49,90"
                delivery="da pochi minuti"
                includes={['Titolare effettivo', 'AML/PEP dove disponibile', 'Limiti e fonti']}
                ctaLabel="Avvia questa verifica"
                href="/checkout"
              />
            </div>
          </section>

          <section className="ca-stack" aria-labelledby="data-title">
            <SectionHeader eyebrow="08" title="Dati, KPI ed empty state" description="Dashboard e report devono usare gli stessi componenti base, non varianti isolate." />
            <div className="grid-3">
              <StatCard label="Verifiche" value="128" description="Mese corrente demo" status="Trend positivo" tone="success" icon="↗" />
              <StatCard label="In elaborazione" value="3" description="Richiedono attesa provider" status="Controlla più tardi" tone="warning" icon="…" />
              <StatCard label="Report" value="91" description="Scaricati dal team" status="Archivio attivo" tone="info" icon="↓" />
            </div>
            <DataTable
              caption="Matrice componenti implementati"
              rows={rows}
              columns={[
                { key: 'component', label: 'Componente', render: (row: any) => <strong>{row.component}</strong> },
                { key: 'status', label: 'Stato', render: (row: any) => <StatusPill label={row.status} tone="success" /> },
                { key: 'rule', label: 'Regola', render: (row: any) => row.rule }
              ]}
            />
            <EmptyState
              title="Nessuna verifica ancora avviata"
              description="Questo stato sarà usato quando un nuovo cliente entra in dashboard senza storico. La CTA deve suggerire la prima azione sicura."
              actionLabel="Avvia la prima verifica"
              actionHref="/servizi"
              icon="✓"
            />
            <KeyValueList
              items={[
                { label: 'Release UI', value: '0.4.0' },
                { label: 'Sprint', value: 'M1-S Design System Implementation' },
                { label: 'Uso', value: 'Base per funnel, catalogo, checkout e dashboard' }
              ]}
            />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
