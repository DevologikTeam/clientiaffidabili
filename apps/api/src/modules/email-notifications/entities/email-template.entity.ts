import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { EmailCategory, EmailPriority, EmailTemplateStatus } from '../email-notifications-runtime.types';

@Entity('email_templates')
@Index(['templateKey', 'version'], { unique: true })
@Index(['category', 'status'])
export class EmailTemplate {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'template_key' })
  templateKey!: string;

  @Column({ default: 1 })
  version!: number;

  @Column({ type: 'varchar' })
  category!: EmailCategory;

  @Column({ type: 'varchar', default: 'active' })
  status!: EmailTemplateStatus;

  @Column({ type: 'varchar', default: 'normal' })
  priority!: EmailPriority;

  @Column()
  subject!: string;

  @Column()
  preheader!: string;

  @Column({ name: 'html_body', type: 'text' })
  htmlBody!: string;

  @Column({ name: 'text_body', type: 'text' })
  textBody!: string;

  @Column({ name: 'allowed_variables', type: 'jsonb', default: [] })
  allowedVariables!: string[];

  @Column({ name: 'requires_secure_link', default: false })
  requiresSecureLink!: boolean;

  @Column({ name: 'pdf_attachment_allowed', default: false })
  pdfAttachmentAllowed!: boolean;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy?: string;

  @Column({ name: 'updated_reason', type: 'text', nullable: true })
  updatedReason?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
