import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UpdateContactMessageStatusDto } from './dto/update-contact-message-status.dto';
import { SalesCrmService } from './sales-crm.service';

@Controller('admin/sales-crm')
export class SalesCrmAdminController {
  constructor(private readonly salesCrm: SalesCrmService) {}

  @Get('summary')
  summary() {
    return this.salesCrm.summary();
  }

  @Get('inbox')
  inbox() {
    return this.salesCrm.inbox();
  }

  @Get('leads')
  leads() {
    return this.salesCrm.leadsList();
  }

  @Get('tickets')
  tickets() {
    return this.salesCrm.ticketsList();
  }

  @Patch('inbox/:id/status')
  updateContactStatus(@Param('id') id: string, @Body() body: UpdateContactMessageStatusDto) {
    return this.salesCrm.updateContactStatus(id, body);
  }

  @Post('inbox/:id/create-lead')
  createLead(@Param('id') id: string) {
    return this.salesCrm.createLeadFromContact(id);
  }

  @Post('inbox/:id/create-ticket')
  createTicket(@Param('id') id: string) {
    return this.salesCrm.createTicketFromContact(id);
  }
}
