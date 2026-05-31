import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { LegalDocumentLifecycleStatus, LegalDocumentType } from '../fiscal-legal.types';

@Entity('legal_document_versions')
@Index(['documentType', 'status'])
@Index(['documentType', 'version'], { unique: true })
export class LegalDocumentVersion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 48 })
  documentType!: LegalDocumentType;

  @Column({ type: 'varchar', length: 40 })
  version!: string;

  @Column({ type: 'varchar', length: 120 })
  title!: string;

  @Column({ type: 'varchar', length: 32, default: 'draft' })
  status!: LegalDocumentLifecycleStatus;

  @Column({ type: 'text' })
  contentMarkdown!: string;

  @Column({ type: 'varchar', length: 120 })
  contentHash!: string;

  @Column({ type: 'varchar', length: 220, nullable: true })
  reviewNote?: string;

  @Column({ type: 'timestamptz', nullable: true })
  publishedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
