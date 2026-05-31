import { Module } from '@nestjs/common';
import { SeoCmsController } from './seo-cms.controller';
import { SeoCmsService } from './seo-cms.service';

@Module({
  controllers: [SeoCmsController],
  providers: [SeoCmsService],
  exports: [SeoCmsService],
})
export class SeoCmsModule {}
