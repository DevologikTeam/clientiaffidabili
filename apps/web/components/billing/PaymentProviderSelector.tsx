import { paymentProviderCopy, type PaymentProviderCode } from '@/lib/billing/payment-providers-subscriptions-runtime';
import { Card, StatusPill } from '@/components/ds';

interface Props {
  selected?: PaymentProviderCode;
}

export function PaymentProviderSelector({ selected = 'stripe' }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {(Object.keys(paymentProviderCopy) as PaymentProviderCode[]).map((provider) => {
        const item = paymentProviderCopy[provider];
        return (
          <Card key={provider} className={provider === selected ? 'ring-2 ring-slate-900' : ''}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">{item.label}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
              <StatusPill tone={provider === 'stripe' ? 'success' : provider === 'paypal' ? 'warning' : 'neutral'}>{item.status}</StatusPill>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
