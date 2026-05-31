import { Body, Controller, Post } from '@nestjs/common';
import { ChecksService } from './checks.service';

@Controller('checks')
export class ChecksController {
  constructor(private readonly checks: ChecksService) {}

  @Post()
  create(@Body('orderId') orderId: string) {
    return this.checks.createFromPaidOrder(orderId);
  }
}
