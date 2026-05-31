import { Body, Controller, Headers, Ip, Post } from '@nestjs/common';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { SalesCrmService } from './sales-crm.service';

@Controller('sales-crm')
export class SalesCrmController {
  constructor(private readonly salesCrm: SalesCrmService) {}

  @Post('contact-messages')
  createContactMessage(
    @Body() body: CreateContactMessageDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent?: string,
  ) {
    return this.salesCrm.createContactMessage(body, { ipAddress, userAgent });
  }
}
