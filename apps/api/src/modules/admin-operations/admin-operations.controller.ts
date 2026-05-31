import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AdminOperationsService } from './admin-operations.service';
import type { AdminRole, AdminWorkItemPriority, AdminWorkItemStatus, AdminWorkItemType } from './admin-operations.types';
import { ExecuteAdminActionDto } from './dto/execute-admin-action.dto';

@Controller('admin/operations')
export class AdminOperationsController {
  constructor(private readonly operations: AdminOperationsService) {}

  @Get('summary')
  summary() {
    return this.operations.summary();
  }

  @Get('work-items')
  workItems(
    @Query('status') status?: AdminWorkItemStatus,
    @Query('type') type?: AdminWorkItemType,
    @Query('priority') priority?: AdminWorkItemPriority,
  ) {
    return this.operations.workItems({ status, type, priority });
  }

  @Get('work-items/:id')
  detail(@Param('id') id: string, @Query('role') role?: AdminRole) {
    return this.operations.detail(id, role ?? 'super_admin');
  }

  @Post('work-items/:id/actions/:actionCode')
  execute(@Param('id') id: string, @Param('actionCode') actionCode: string, @Body() body: ExecuteAdminActionDto) {
    return this.operations.executeAction(id, actionCode, body);
  }

  @Get('audit')
  audit(@Query('workItemId') workItemId?: string) {
    return this.operations.auditTimeline(workItemId);
  }
}
