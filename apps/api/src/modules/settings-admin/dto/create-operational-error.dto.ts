import type { OperationalErrorCategory, OperationalErrorSeverity } from '../settings-admin-runtime.types';

export class CreateOperationalErrorDto {
  category!: OperationalErrorCategory;
  severity: OperationalErrorSeverity = 'error';
  sourceModule!: string;
  sourceAction!: string;
  safeMessage!: string;
  technicalSummary!: string;
  redactedPayload?: Record<string, unknown>;
  linkedObjects?: Record<string, string | undefined>;
  refundRelevant?: boolean;
}
