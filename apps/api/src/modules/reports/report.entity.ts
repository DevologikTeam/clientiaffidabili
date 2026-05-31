import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { ReportStatus, AttentionLevel } from './report-composer.types';

@Entity('reports')
@Index(['orderId'])
@Index(['checkId'])
@Index(['status'])
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  orderId!: string;

  @Column('uuid', { nullable: true })
  checkId?: string;

  @Column({ default: 'Check Affidabilità' })
  title!: string;

  @Column({ type: 'varchar', default: 'queued' })
  status!: ReportStatus;

  @Column({ default: 'company_reliability_pro_v1' })
  templateCode!: string;

  @Column({ default: '1.0.0' })
  templateVersion!: string;

  @Column({ default: '0.19.0' })
  composerVersion!: string;

  @Column({ default: 'score_v1_prudent_attention' })
  scoreModelVersion!: string;

  @Column({ type: 'varchar', default: 'not_enough_data' })
  attentionLevel!: AttentionLevel;

  @Column({ type: 'int', nullable: true })
  score?: number | null;

  @Column({ type: 'jsonb', default: {} })
  subjectSnapshot!: Record<string, unknown>;

  @Column({ type: 'jsonb', default: {} })
  dataSnapshot!: Record<string, unknown>;

  @Column({ type: 'text', default: '' })
  htmlSnapshot!: string;

  @Column({ nullable: true })
  snapshotHash?: string;

  @Column({ nullable: true })
  pdfPath?: string;

  @Column({ type: 'timestamptz', nullable: true })
  generatedAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  publishedAt?: Date;

  @Column({ nullable: true })
  reviewReason?: string;

  @Column({ nullable: true })
  reviewedByUserId?: string;

  @Column({ type: 'timestamptz', nullable: true })
  reviewedAt?: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
