import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { createHash } from 'crypto';
import { CreateSeoPageDto } from './dto/create-seo-page.dto';
import { PublishSeoPageDto } from './dto/publish-seo-page.dto';
import { UpdateSeoPageDto } from './dto/update-seo-page.dto';
import { hasBlockingSeoPageGuardrail, runSeoPageGuardrails } from './seo-cms.guardrails';
import type { SeoPageStatus } from './seo-cms.types';
import { customerEducationSeedPages } from './customer-education.seed';

type RuntimeSeoPage = CreateSeoPageDto & {
  id: string;
  status: SeoPageStatus;
  canonicalPath: string;
  version: number;
  publishedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
};

const seedPages: RuntimeSeoPage[] = customerEducationSeedPages as RuntimeSeoPage[];

@Injectable()
export class SeoCmsService {
  private pages = [...seedPages];

  listAdminPages() {
    return this.pages.map((page) => ({
      id: page.id,
      slug: page.slug,
      title: page.title,
      status: page.status,
      targetKeyword: page.targetKeyword,
      searchIntent: page.searchIntent,
      version: page.version,
      updatedAt: page.updatedAt,
      publishedAt: page.publishedAt,
      guardrails: runSeoPageGuardrails(page),
    }));
  }

  getAdminPage(id: string) {
    const page = this.pages.find((item) => item.id === id);
    if (!page) throw new NotFoundException('SEO page not found');
    return { ...page, guardrails: runSeoPageGuardrails(page) };
  }

  getPublicPage(slug: string) {
    const page = this.pages.find((item) => item.slug === slug && item.status === 'published');
    if (!page) throw new NotFoundException('Published page not found');
    return page;
  }

  createPage(dto: CreateSeoPageDto) {
    if (this.pages.some((page) => page.slug === dto.slug)) {
      throw new BadRequestException('Slug already exists');
    }
    const checks = runSeoPageGuardrails(dto);
    if (hasBlockingSeoPageGuardrail(checks)) {
      throw new BadRequestException({ message: 'Blocked by SEO/GEO guardrails', checks });
    }
    const now = new Date().toISOString();
    const page: RuntimeSeoPage = {
      ...dto,
      id: `seo-page-${String(this.pages.length + 1).padStart(3, '0')}`,
      status: 'draft',
      canonicalPath: `/guide/${dto.slug}`,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.pages.unshift(page);
    return { ...page, guardrails: checks };
  }

  updatePage(id: string, dto: UpdateSeoPageDto) {
    const page = this.pages.find((item) => item.id === id);
    if (!page) throw new NotFoundException('SEO page not found');
    const updated = { ...page, ...dto, updatedAt: new Date().toISOString() };
    const checks = runSeoPageGuardrails(updated);
    if (hasBlockingSeoPageGuardrail(checks)) {
      throw new BadRequestException({ message: 'Blocked by SEO/GEO guardrails', checks });
    }
    Object.assign(page, updated, { version: page.version + 1 });
    return { ...page, guardrails: checks };
  }

  publishPage(id: string, dto: PublishSeoPageDto) {
    const page = this.pages.find((item) => item.id === id);
    if (!page) throw new NotFoundException('SEO page not found');
    const checks = runSeoPageGuardrails(page);
    if (hasBlockingSeoPageGuardrail(checks)) {
      throw new BadRequestException({ message: 'Blocked by SEO/GEO guardrails', checks });
    }
    page.status = 'published';
    page.publishedAt = new Date().toISOString();
    page.updatedAt = page.publishedAt;
    page.version += 1;
    return {
      ...page,
      snapshotHash: createHash('sha256').update(`${page.slug}:${page.version}:${dto.reason}`).digest('hex'),
      guardrails: checks,
    };
  }

  archivePage(id: string, reason: string) {
    if (!reason || reason.length < 12) throw new BadRequestException('Archive reason is required');
    const page = this.pages.find((item) => item.id === id);
    if (!page) throw new NotFoundException('SEO page not found');
    page.status = 'archived';
    page.archivedAt = new Date().toISOString();
    page.updatedAt = page.archivedAt;
    return page;
  }
}
