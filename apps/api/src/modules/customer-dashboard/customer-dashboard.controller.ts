import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CustomerDashboardService } from './customer-dashboard.service';

@Controller('customer-dashboard')
export class CustomerDashboardController {
  constructor(private readonly dashboard: CustomerDashboardService) {}

  @Get()
  snapshot(@Query('organizationId') organizationId?: string, @Query('userId') userId?: string) {
    return this.dashboard.snapshot(organizationId, userId);
  }

  @Get('summary')
  async summary(@Query('organizationId') organizationId?: string, @Query('userId') userId?: string) {
    const snapshot = await this.dashboard.snapshot(organizationId, userId);
    return snapshot.summary;
  }

  @Get('checks')
  checks(@Query('organizationId') organizationId?: string) {
    return this.dashboard.listChecks(organizationId);
  }

  @Get('checks/:id')
  checkDetail(@Param('id') id: string, @Query('organizationId') organizationId?: string) {
    return this.dashboard.getCheckDetail(id, organizationId);
  }

  @Get('invoices')
  invoices(@Query('organizationId') organizationId?: string) {
    return this.dashboard.listInvoices(organizationId);
  }

  @Get('notifications')
  notifications(@Query('organizationId') organizationId?: string, @Query('userId') userId?: string) {
    return this.dashboard.listNotifications(organizationId, userId);
  }

  @Get('support')
  supportTickets(@Query('organizationId') organizationId?: string, @Query('userId') userId?: string) {
    return this.dashboard.listSupportTickets(organizationId, userId);
  }

  @Post('support')
  createSupportTicket(@Body() body: { organizationId?: string; userId?: string; subject: string; message: string; category?: any; relatedType?: any; relatedId?: string }) {
    return this.dashboard.createSupportTicket(body);
  }
}
