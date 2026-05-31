import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { TrackAnalyticsEventDto } from './dto/track-analytics-event.dto';
import { TagManagerClarityService } from './tag-manager-clarity.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService, private readonly tagManagerClarity: TagManagerClarityService) {}

  @Get('public-config')
  publicConfig(@Query('pathname') pathname?: string) {
    return this.tagManagerClarity.publicConfig(pathname ?? '/');
  }

  @Post('events')
  trackEvent(@Body() body: TrackAnalyticsEventDto) {
    return this.analytics.trackEvent(body);
  }

  @Get('admin/summary')
  summary() {
    return this.analytics.summary();
  }

  @Get('admin/events')
  events(@Query('limit') limit?: string) {
    return this.analytics.adminEvents(limit ? Number(limit) : 50);
  }

  @Get('admin/funnel')
  funnel() {
    return this.analytics.funnel();
  }

  @Get('admin/seo-geo')
  seoGeo() {
    return this.analytics.seoGeo();
  }

  @Get('admin/error-insights')
  errorInsights() {
    return this.analytics.errorInsights();
  }
}
