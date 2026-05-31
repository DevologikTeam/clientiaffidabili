import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSeoPageDto } from './dto/create-seo-page.dto';
import { PublishSeoPageDto } from './dto/publish-seo-page.dto';
import { UpdateSeoPageDto } from './dto/update-seo-page.dto';
import { SeoCmsService } from './seo-cms.service';

@Controller('seo-cms')
export class SeoCmsController {
  constructor(private readonly seoCms: SeoCmsService) {}

  @Get('admin/pages')
  adminPages() {
    return this.seoCms.listAdminPages();
  }

  @Get('admin/pages/:id')
  adminPage(@Param('id') id: string) {
    return this.seoCms.getAdminPage(id);
  }

  @Post('admin/pages')
  createPage(@Body() dto: CreateSeoPageDto) {
    return this.seoCms.createPage(dto);
  }

  @Patch('admin/pages/:id')
  updatePage(@Param('id') id: string, @Body() dto: UpdateSeoPageDto) {
    return this.seoCms.updatePage(id, dto);
  }

  @Post('admin/pages/:id/publish')
  publishPage(@Param('id') id: string, @Body() dto: PublishSeoPageDto) {
    return this.seoCms.publishPage(id, dto);
  }

  @Post('admin/pages/:id/archive')
  archivePage(@Param('id') id: string, @Body('reason') reason: string) {
    return this.seoCms.archivePage(id, reason);
  }

  @Get('public/pages/:slug')
  publicPage(@Param('slug') slug: string) {
    return this.seoCms.getPublicPage(slug);
  }
}
