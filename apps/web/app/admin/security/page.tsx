import { Alert, Checklist, PageHero, TrustNotice } from '@/components/ds';
import { SecurityControlGrid, SecurityGateTable } from '@/components/security';
import { productionGateRuntimeChecks, productionHardeningNextActions, securityRuntimeControls } from '@/lib/security/security-hardening-runtime';

export default function AdminSecurityPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Sicurezza e produzione"
        title="Production gate"
        description="Controlla cosa è implementato, cosa blocca il go-live e quali evidenze servono prima di attivare provider, pagamenti reali e produzione."
      />
      <section className="container ca-section ca-stack">
        <Alert tone="warning" title="Produzione ancora bloccata">
          I controlli runtime sono stati scaffoldati, ma il go-live richiede build reale, test cross-account, webhook sandbox e restore drill documentato.
        </Alert>
        <SecurityControlGrid controls={securityRuntimeControls} />
        <SecurityGateTable checks={productionGateRuntimeChecks} />
        <h2>Prossime azioni obbligatorie</h2>
        <Checklist items={productionHardeningNextActions} />
        <TrustNotice tone="info" title="Guardrail permanente">
          ENABLE_PROVIDER_CALLS, ENABLE_CHECKOUT, ENABLE_STRIPE_PAYMENTS, ENABLE_PAYPAL e ENABLE_SUBSCRIPTIONS devono restare disattivati finché i gate P0 non sono verificati con evidenze reali.
        </TrustNotice>
      </section>
    </main>
  );
}
