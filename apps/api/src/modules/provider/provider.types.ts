import type {
  ProviderDeliveryMode,
  ProviderErrorCategory,
  ProviderName,
  ProviderNormalizedEvidenceDesign,
  ProviderRequestStatus,
  ProviderRetryPolicy,
  ProviderServiceMappingDesign,
} from '@clientiaffidabili/shared';

export interface ProviderRequestContext {
  orderId: string;
  checkId: string;
  productCode: string;
  subject: Record<string, unknown>;
  paymentConfirmedAt: string;
  legalUseConfirmed: boolean;
}

export interface ProviderValidationResult {
  ok: boolean;
  missingInputs: string[];
  messages: string[];
}

export interface ProviderCostEstimate {
  estimatedCostCents: number;
  maxAcceptedCostCents: number;
  currency: 'EUR';
  costGuardStatus: 'pass' | 'warning' | 'blocked';
  messages: string[];
}

export interface ProviderDispatchResult {
  status: ProviderRequestStatus;
  providerRequestId?: string;
  deliveryMode: ProviderDeliveryMode;
  rawPayloadVaultRequired: boolean;
  nextPollAt?: string;
}

export interface ProviderNormalizedResultDesign {
  riskLevel: 'low' | 'medium' | 'high' | 'unknown';
  summary: string;
  sourceTimestamp: string;
  evidences: ProviderNormalizedEvidenceDesign[];
  warnings: Array<{ code: string; message: string }>;
  limitations: string[];
  requiresManualReview: boolean;
}

export interface ProviderAdapter {
  readonly providerName: ProviderName;
  validateInput(mapping: ProviderServiceMappingDesign, subject: Record<string, unknown>): ProviderValidationResult;
  estimateCost(mapping: ProviderServiceMappingDesign, subject: Record<string, unknown>): ProviderCostEstimate;
  createRequest(mapping: ProviderServiceMappingDesign, context: ProviderRequestContext): Promise<ProviderDispatchResult>;
  normalize(mapping: ProviderServiceMappingDesign, providerPayload: unknown): ProviderNormalizedResultDesign;
  classifyError(error: unknown): { category: ProviderErrorCategory; retryPolicy: ProviderRetryPolicy; message: string };
}

export function buildProviderIdempotencyKey(input: {
  providerName: ProviderName;
  orderId: string;
  checkId: string;
  productCode: string;
  mappingVersion: string;
}): string {
  return `provider:${input.providerName}:order:${input.orderId}:check:${input.checkId}:product:${input.productCode}:mapping:${input.mappingVersion}`;
}
