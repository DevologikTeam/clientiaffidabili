import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import type { ContactMessageStatus } from '../sales-crm.types';

export class UpdateContactMessageStatusDto {
  @IsIn(['new', 'triage', 'linked_to_lead', 'linked_to_ticket', 'spam', 'archived'])
  status!: ContactMessageStatus;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  reason?: string;
}
