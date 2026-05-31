import { IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import type { SeoPageStatus, SeoSearchIntent } from '../seo-cms.types';

export class UpdateSeoPageDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  seoTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(220)
  seoDescription?: string;

  @IsOptional()
  @IsString()
  @MaxLength(220)
  excerpt?: string;

  @IsOptional()
  @IsString()
  targetKeyword?: string;

  @IsOptional()
  @IsIn(['informational', 'commercial', 'transactional', 'comparison', 'support'])
  searchIntent?: SeoSearchIntent;

  @IsOptional()
  @IsString()
  geoAnswerFocus?: string;

  @IsOptional()
  @IsString()
  @MinLength(80)
  bodyHtml?: string;

  @IsOptional()
  bodyJson?: Record<string, unknown>;

  @IsOptional()
  @IsIn(['draft', 'review', 'published', 'archived'])
  status?: SeoPageStatus;

  @IsOptional()
  @IsString()
  changeReason?: string;
}
