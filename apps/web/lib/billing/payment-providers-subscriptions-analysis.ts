export const paymentProvidersSubscriptionAnalysisView = {
  sprint: 'M4B-A',
  version: '0.26.0',
  title: 'Payment Providers & Subscriptions Analysis',
  recommendation: 'Stripe first, PayPal feature-flagged, internal credit/entitlement ledger as source of truth.',
  cards: [
    {
      title: 'Stripe first',
      body: 'Use Stripe Checkout/Billing for one-shot payments and subscription rollout with hosted checkout and signed webhooks.',
    },
    {
      title: 'PayPal as second provider',
      body: 'Add PayPal for trust and conversion after sandbox, webhook and reconciliation tests are complete.',
    },
    {
      title: 'Credits before provider calls',
      body: 'Every paid data request must reserve credits or be tied to a confirmed paid order before Openapi/provider execution.',
    },
    {
      title: 'No unlimited plans',
      body: 'Recurring plans include credits, discounts or monitoring limits, never unlimited access to paid provider services.',
    },
  ],
  nextSprint: 'M4B-P Payment Providers & Subscriptions Design',
};
