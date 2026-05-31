import { IsEmail, IsIn, IsOptional, IsString, Length } from 'class-validator';

export class UpsertBillingProfileDto {
  @IsIn(['company', 'professional'])
  type!: 'company' | 'professional';

  @IsString()
  @Length(2, 180)
  businessName!: string;

  @IsOptional()
  @IsString()
  vatNumber?: string;

  @IsOptional()
  @IsString()
  taxId?: string;

  @IsString()
  country!: string;

  @IsString()
  addressLine1!: string;

  @IsString()
  city!: string;

  @IsString()
  postalCode!: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  sdiCode?: string;

  @IsOptional()
  @IsString()
  pec?: string;
}
