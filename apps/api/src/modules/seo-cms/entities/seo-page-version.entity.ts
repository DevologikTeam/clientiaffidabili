import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('seo_page_versions')
export class SeoPageVersion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'page_id' })
  pageId!: string;

  @Column({ name: 'version_number' })
  versionNumber!: number;

  @Column({ name: 'snapshot_hash' })
  snapshotHash!: string;

  @Column({ name: 'change_reason', type: 'text' })
  changeReason!: string;

  @Column({ name: 'body_html_snapshot', type: 'text' })
  bodyHtmlSnapshot!: string;

  @Column({ name: 'seo_snapshot', type: 'jsonb' })
  seoSnapshot!: Record<string, unknown>;

  @Column({ name: 'created_by_user_id', nullable: true })
  createdByUserId?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
