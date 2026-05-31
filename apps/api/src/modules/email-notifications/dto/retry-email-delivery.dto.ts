import { IsString, MinLength } from 'class-validator';

export class RetryEmailDeliveryDto {
  @IsString()
  @MinLength(8)
  reason!: string;
}
