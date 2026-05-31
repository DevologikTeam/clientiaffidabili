import { Body, Controller, Post } from '@nestjs/common';
import { EmailNotificationsService } from './email-notifications.service';
import { QueueEmailEventDto } from './dto/queue-email-event.dto';

@Controller('email-notifications')
export class EmailNotificationsController {
  constructor(private readonly emails: EmailNotificationsService) {}

  @Post('events')
  queue(@Body() body: QueueEmailEventDto) {
    return this.emails.queue({
      eventKey: body.eventKey,
      recipientEmail: body.recipientEmail,
      recipientName: body.recipientName,
      variables: body.variables,
      relatedEntities: body.relatedEntities,
      idempotencyKey: body.idempotencyKey,
      requestedBy: 'system'
    });
  }
}
