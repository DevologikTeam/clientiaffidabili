import type { PartnerEnvironment } from '../partner-portal.types';

export class CreatePartnerWebhookDto {
  environment!: PartnerEnvironment;
  url!: string;
  events!: string[];
}
