import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import type { EmailSecureLinkPurpose } from '../email-notifications-runtime.types';

@Entity('email_secure_links')
@Index(['tokenHash'], { unique: true })
@Index(['purpose', 'expiresAt'])
export class EmailSecureLink {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  purpose!: EmailSecureLinkPurpose;

  @Column({ name: 'token_hash' })
  tokenHash!: string;

  @Column({ name: 'related_entity_type' })
  relatedEntityType!: string;

  @Column({ name: 'related_entity_id' })
  relatedEntityId!: string;

  @Column({ name: 'recipient_hash' })
  recipientHash!: string;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt!: Date;

  @Column({ name: 'used_at', type: 'timestamptz', nullable: true })
  usedAt?: Date;

  @Column({ name: 'revoked_at', type: 'timestamptz', nullable: true })
  revokedAt?: Date;

  @Column({ name: 'created_by', nullable: true })
  createdBy?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
