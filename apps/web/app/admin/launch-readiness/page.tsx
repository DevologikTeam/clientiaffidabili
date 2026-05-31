import { launchReadinessChecks, criticalJourneys } from '@/lib/launch-readiness/production-qa-runtime';

function badge(status: string) {
  return status === 'passed' ? 'Pronto' : status === 'blocked' ? 'Bloccato' : 'Da certificare';
}

export default function LaunchReadinessAdminPage() {
  return (
    <main className="section ca-section-muted" id="main-content" tabIndex={-1}>
      <div className="container ca-stack">
        <div className="ca-card">
          <p className="eyebrow">Production QA</p>
          <h1>Launch readiness gate</h1>
          <p>
            Questa pagina non dichiara la produzione pronta: mostra cosa deve essere certificato con build reale,
            test browser, smoke Docker/Coolify, sicurezza, rollback e prove sandbox provider/pagamenti.
          </p>
        </div>

        <section className="ca-card">
          <p className="eyebrow">Sandbox certification</p>
          <h2>Provider, pagamenti, email e rollback</h2>
          <p>Apri la console M19-S per avviare runner mock-first, verificare blocker RC, waiver auditati ed evidenze redatte.</p>
          <a className="ca-button ca-button--primary ca-button--md" href="/admin/launch-readiness/sandbox-certification">Apri sandbox certification</a>
        </section>


        <section className="ca-card">
          <p className="eyebrow">RC hardening</p>
          <h2>Release Candidate command center</h2>
          <p>Apri il command center M21-S per vedere gate P0, evidence bundle, waiver feature-off, sign-off e prove reali mancanti prima della RC.</p>
          <a className="ca-button ca-button--secondary ca-button--md" href="/admin/launch-readiness/rc-hardening">Apri RC hardening</a>
        </section>

        <section className="grid-3">
          {launchReadinessChecks.map((check) => (
            <article className="ca-card" key={check.id}>
              <p className="eyebrow">{badge(check.status)}</p>
              <h2>{check.label}</h2>
              <p>{check.evidence}</p>
              <small>{check.requiredForGoLive ? 'Obbligatorio per go-live' : 'Consigliato'}</small>
            </article>
          ))}
        </section>

        <section className="ca-card">
          <p className="eyebrow">Critical journeys</p>
          <h2>Percorsi P0/P1 da eseguire in Playwright</h2>
          <ul>
            {criticalJourneys.map((journey) => <li key={journey}>{journey}</li>)}
          </ul>
        </section>
      </div>
    </main>
  );
}
