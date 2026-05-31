import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminOperationsController } from './admin-operations.controller';
import { AdminOperationsService } from './admin-operations.service';
import { AdminActionAudit } from './entities/admin-action-audit.entity';
import { AdminWorkItem } from './entities/admin-work-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminWorkItem, AdminActionAudit])],
  controllers: [AdminOperationsController],
  providers: [AdminOperationsService],
  exports: [AdminOperationsService],
})
export class AdminOperationsModule {}
