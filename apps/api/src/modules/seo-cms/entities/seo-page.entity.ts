import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { SeoPageStatus, SeoSearchIntent } from '../seo-cms.types';

@Entity('seo_pages')
export class SeoPage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  excerpt!: string;

  @Column({ type: 'varchar', default: 'draft' })
  status!: SeoPageStatus;

  @Column({ name: 'seo_title' })
  seoTitle!: string;

  @Column({ name: 'seo_description', type: 'text' })
  seoDescription!: string;

  @Column({ name: 'canonical_path' })
  canonicalPath!: string;

  @Column({ name: 'target_keyword' })
  targetKeyword!: string;

  @Column({ type: 'varchar', name: 'search_intent', default: 'informational' })
  searchIntent!: SeoSearchIntent;

  @Column({ name: 'geo_answer_focus', type: 'text' })
  geoAnswerFocus!: string;

  @Column({ name: 'body_html', type: 'text' })
  bodyHtml!: string;

  @Column({ name: 'body_json', type: 'jsonb', nullable: true })
  bodyJson?: Record<string, unknown>;

  @Column({ name: 'author_user_id', nullable: true })
  authorUserId?: string;

  @Column({ name: 'reviewed_by_user_id', nullable: true })
  reviewedByUserId?: string;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt?: Date;

  @Column({ name: 'archived_at', type: 'timestamp', nullable: true })
  archivedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
