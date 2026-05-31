import type { PartnerEnvironment, PartnerScope } from '../partner-portal.types';

export class CreatePartnerApiKeyDto {
  label!: string;
  environment!: PartnerEnvironment;
  scopes!: PartnerScope[];
  allowedIps?: string[];
}
