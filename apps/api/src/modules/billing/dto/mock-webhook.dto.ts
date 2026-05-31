import { IsOptional, IsString } from 'class-validator';

export class MockWebhookDto {
  @IsString()
  orderId!: string;

  @IsOptional()
  @IsString()
  externalId?: string;
}
