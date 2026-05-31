import { PageHero, SectionHeader } from '@/components/ds';
import { CreditWalletPanel } from './CreditWalletPanel';
import { PaymentProviderSelector } from './PaymentProviderSelector';
import { RefundPolicyPanel } from './RefundPolicyPanel';
import { SubscriptionPlanCard } from './SubscriptionPlanCard';
import { subscriptionPlans } from '@/lib/billing/payment-providers-subscriptions-runtime';

export function BillingPortalShell() {
  return (
    <main className="space-y-10">
      <PageHero eyebrow="Account e pagamenti" title="Abbonamenti, crediti e rimborsi sotto controllo" description="Gestisci piani, wallet crediti, provider di pagamento e richieste di rimborso con regole chiare e auditabili." />
      <section>
        <SectionHeader title="Piani in abbonamento" description="Crediti mensili limitati: nessun consumo illimitato, nessuna chiamata provider senza credito o pagamento confermato." />
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {subscriptionPlans.map((plan) => <SubscriptionPlanCard key={plan.code} plan={plan} />)}
        </div>
      </section>
      <section>
        <SectionHeader title="Wallet crediti" description="Fonte interna di verità per entitlement e verifiche prepagate." />
        <div className="mt-6"><CreditWalletPanel /></div>
      </section>
      <section>
        <SectionHeader title="Metodi di pagamento" description="Stripe first, PayPal feature-flagged, mock solo sviluppo." />
        <div className="mt-6"><PaymentProviderSelector /></div>
      </section>
      <RefundPolicyPanel />
    </main>
  );
}
