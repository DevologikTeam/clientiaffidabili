import { IsObject, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  productCode!: string;

  @IsObject()
  subject!: Record<string, unknown>;
}
