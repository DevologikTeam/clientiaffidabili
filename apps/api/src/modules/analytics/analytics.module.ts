import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsKpiService } from './analytics-kpi.service';
import { AnalyticsRedactionService } from './analytics-redaction.service';
import { AnalyticsService } from './analytics.service';
import { AnalyticsAttributionSnapshot } from './entities/analytics-attribution-snapshot.entity';
import { AnalyticsEvent } from './entities/analytics-event.entity';
import { AnalyticsKpiSnapshot } from './entities/analytics-kpi-snapshot.entity';
import { PlatformSetting } from '../settings-admin/entities/platform-setting.entity';
import { TagManagerClarityService } from './tag-manager-clarity.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnalyticsEvent, AnalyticsAttributionSnapshot, AnalyticsKpiSnapshot, PlatformSetting])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsRedactionService, AnalyticsKpiService, TagManagerClarityService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
