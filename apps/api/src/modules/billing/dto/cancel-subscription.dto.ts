export class CancelSubscriptionDto {
  subscriptionId!: string;
  cancelMode!: 'cancel_now' | 'cancel_at_period_end';
  reason!: string;
  idempotencyKey?: string;
}
