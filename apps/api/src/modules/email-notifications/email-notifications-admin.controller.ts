import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EmailNotificationsService } from './email-notifications.service';
import { RetryEmailDeliveryDto } from './dto/retry-email-delivery.dto';
import type { EmailDeliveryStatus } from './email-notifications-runtime.types';

@Controller('admin/email-notifications')
export class EmailNotificationsAdminController {
  constructor(private readonly emails: EmailNotificationsService) {}

  @Get('overview')
  overview() {
    return this.emails.overview();
  }

  @Get('deliveries')
  deliveries(@Query('status') status?: EmailDeliveryStatus) {
    return this.emails.deliveries(status);
  }

  @Get('events')
  events() {
    return this.emails.events();
  }

  @Get('templates')
  templates() {
    return this.emails.templates();
  }

  @Get('suppressions')
  suppressions() {
    return this.emails.suppressions();
  }

  @Post('deliveries/:id/retry')
  retry(@Param('id') id: string, @Body() body: RetryEmailDeliveryDto) {
    return this.emails.retryDelivery(id, body.reason);
  }

  @Post('suppressions')
  suppress(@Body() body: { email: string; reason: 'bounce' | 'complaint' | 'manual' | 'unsubscribe' | 'security_hold'; note?: string }) {
    return this.emails.suppressRecipient({ ...body, createdBy: 'admin' });
  }
}
