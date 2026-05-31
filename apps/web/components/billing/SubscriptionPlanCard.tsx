import { Button, Card, Checklist, StatusPill } from '@/components/ds';
import { formatEuro, type SubscriptionPlanRuntime } from '@/lib/billing/payment-providers-subscriptions-runtime';

export function SubscriptionPlanCard({ plan }: { plan: SubscriptionPlanRuntime }) {
  return (
    <Card className={plan.recommended ? 'border-slate-900 shadow-lg' : ''}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-slate-950">{plan.name}</h3>
          <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
        </div>
        {plan.recommended ? <StatusPill tone="success">Consigliato</StatusPill> : null}
      </div>
      <p className="mt-6 text-3xl font-bold text-slate-950">{formatEuro(plan.monthlyPriceCents)} <span className="text-sm font-medium text-slate-500">/ mese</span></p>
      <Checklist className="mt-5" items={[`${plan.monthlyCredits} crediti mensili`, 'Report e storico cliente', 'Rimborsi secondo policy', plan.guardrail]} />
      <Button className="mt-6" href={`/checkout?plan=${plan.code}&mode=subscription`}>Attiva piano</Button>
    </Card>
  );
}
