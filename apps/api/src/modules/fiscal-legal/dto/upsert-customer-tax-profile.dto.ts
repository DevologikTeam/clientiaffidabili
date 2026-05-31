import type { TaxProfileType } from '../fiscal-legal.types';

export class UpsertCustomerTaxProfileDto {
  organizationId!: string;
  userId?: string;
  profileType!: TaxProfileType;
  legalName!: string;
  vatNumber?: string;
  taxCode?: string;
  pec?: string;
  sdiCode?: string;
  email!: string;
  country!: string;
  addressLine1!: string;
  postalCode!: string;
  city!: string;
  province?: string;
}
