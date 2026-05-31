export class PartnerCompanyCheckDto {
  serviceCode!: string;
  subject!: {
    vatNumber?: string;
    taxId?: string;
    companyName?: string;
  };
  metadata?: {
    externalCustomerId?: string;
    externalOrderId?: string;
  };
}
