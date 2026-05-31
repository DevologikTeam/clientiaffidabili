import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import type { SeoSearchIntent } from '../seo-cms.types';

export class CreateSeoPageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  slug!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  seoTitle!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(220)
  seoDescription!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(220)
  excerpt!: string;

  @IsString()
  @IsNotEmpty()
  targetKeyword!: string;

  @IsIn(['informational', 'commercial', 'transactional', 'comparison', 'support'])
  searchIntent!: SeoSearchIntent;

  @IsString()
  @IsNotEmpty()
  geoAnswerFocus!: string;

  @IsString()
  @MinLength(80)
  bodyHtml!: string;

  @IsOptional()
  bodyJson?: Record<string, unknown>;
}
