import { IsObject, IsOptional, IsString } from 'class-validator';
import type { BillingProfileInput } from '@clientiaffidabili/shared';

export class CreateCheckoutSessionDto {
  @IsString()
  orderId!: string;

  @IsOptional()
  @IsObject()
  billingProfile?: BillingProfileInput;
}
