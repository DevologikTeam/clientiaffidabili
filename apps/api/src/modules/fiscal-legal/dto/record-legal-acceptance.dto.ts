import type { LegalAcceptanceSnapshot } from '../fiscal-legal.types';

export class RecordLegalAcceptanceDto {
  organizationId!: string;
  userId?: string;
  orderId?: string;
  checkoutSessionId?: string;
  source?: 'checkout' | 'account' | 'admin_import' | 'api';
  acceptanceSnapshot!: LegalAcceptanceSnapshot;
}
