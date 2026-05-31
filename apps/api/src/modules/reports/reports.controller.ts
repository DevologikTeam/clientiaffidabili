import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import type { ComposeReportInput } from './report-composer.types';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reports: ReportsService) {}

  @Post('compose')
  compose(@Body() body: ComposeReportInput) {
    return this.reports.compose(body);
  }

  @Get('demo/customer-snapshot')
  demo() {
    return this.reports.demoReport();
  }

  @Get('admin/queue')
  adminQueue() {
    return this.reports.adminQueue();
  }

  @Post(':id/publish-after-review')
  publishAfterReview(@Param('id') id: string, @Body() body: { reviewerUserId?: string; reason?: string }) {
    return this.reports.publishAfterReview(id, body.reviewerUserId ?? 'system-admin', body.reason ?? 'review_completed');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reports.findOne(id);
  }
}
