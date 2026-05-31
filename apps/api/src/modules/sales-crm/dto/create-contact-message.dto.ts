import { IsBoolean, IsEmail, IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import type { ContactMessageSourceType } from '../sales-crm.types';

export class CreateContactMessageDto {
  @IsOptional()
  @IsIn(['contact', 'demo', 'partner', 'support', 'guide_cta'])
  sourceType?: ContactMessageSourceType;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  sourcePath?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  ctaId?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @IsEmail()
  @MaxLength(180)
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  companyName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  phone?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(4000)
  message!: string;

  @IsBoolean()
  privacyAccepted!: boolean;

  @IsOptional()
  @IsBoolean()
  marketingAccepted?: boolean;
}
