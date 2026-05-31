import { IsBoolean, IsIn, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';
import type { AnalyticsConsentState, AnalyticsEventCategory, AnalyticsEventOrigin, AnalyticsSafeEventPayload } from '../analytics-runtime.types';

const categories: AnalyticsEventCategory[] = [
  'public_funnel',
  'seo_geo',
  'checkout_billing',
  'provider_openai',
  'report_dashboard',
  'crm_support',
  'email_notifications',
  'partner_api',
  'admin_operations',
];

const origins: AnalyticsEventOrigin[] = ['client', 'server', 'admin', 'webhook', 'partner_api'];
const consentStates: AnalyticsConsentState[] = ['necessary_only', 'analytics_granted', 'marketing_granted', 'unknown'];

export class TrackAnalyticsEventDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsIn(categories)
  category!: AnalyticsEventCategory;

  @IsIn(origins)
  origin!: AnalyticsEventOrigin;

  @IsOptional()
  @IsIn(consentStates)
  consentState?: AnalyticsConsentState;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  routeTemplate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  contentCluster?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  attributionSnapshotId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  accountId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  orderId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  errorLedgerId?: string;

  @IsOptional()
  @IsBoolean()
  serverAuthoritative?: boolean;

  @IsObject()
  payload!: AnalyticsSafeEventPayload;
}
