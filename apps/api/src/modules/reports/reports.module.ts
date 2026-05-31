import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderRequest } from '../provider/entities/provider-request.entity';
import { Report } from './report.entity';
import { ReportComposerService } from './report-composer.service';
import { ReportScoreService } from './report-score.service';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([Report, ProviderRequest])],
  controllers: [ReportsController],
  providers: [ReportsService, ReportComposerService, ReportScoreService],
  exports: [ReportsService, ReportComposerService],
})
export class ReportsModule {}
