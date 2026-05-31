export class RegisterAccountDto {
  email!: string;
  password!: string;
  fullName!: string;
  accountLegalName!: string;
  vatNumber?: string;
  taxCode?: string;
  billingEmail?: string;
  acceptTermsVersion!: string;
  acceptPrivacyVersion!: string;
  ipAddress?: string;
  userAgent?: string;
}
