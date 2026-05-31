import { IsEmail, IsObject, IsOptional, IsString } from 'class-validator';

export class QueueEmailEventDto {
  @IsString()
  eventKey!: string;

  @IsEmail()
  recipientEmail!: string;

  @IsOptional()
  @IsString()
  recipientName?: string;

  @IsObject()
  variables!: Record<string, string | number | boolean | null | undefined>;

  @IsOptional()
  @IsObject()
  relatedEntities?: Record<string, string | undefined>;

  @IsOptional()
  @IsString()
  idempotencyKey?: string;
}
