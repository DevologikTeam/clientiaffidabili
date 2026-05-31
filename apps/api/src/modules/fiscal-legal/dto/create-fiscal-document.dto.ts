import type { FiscalDocumentType } from '../fiscal-legal.types';

export class CreateFiscalDocumentDto {
  organizationId!: string;
  orderId?: string;
  paymentId?: string;
  refundRequestId?: string;
  taxProfileId?: string;
  documentType!: FiscalDocumentType;
  taxableAmountCents!: number;
  vatAmountCents!: number;
  totalAmountCents!: number;
  lineItems?: Array<{ label: string; quantity: number; unitNetCents: number; vatRate: number; totalGrossCents: number }>;
  customerVisibleNote?: string;
}
