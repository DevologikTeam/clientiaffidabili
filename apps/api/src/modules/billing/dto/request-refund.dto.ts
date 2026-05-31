export class RequestRefundDto {
  paymentId!: string;
  amountCents!: number;
  reason!: string;
  idempotencyKey?: string;
}
