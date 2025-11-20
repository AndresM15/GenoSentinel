import { Module } from '@nestjs/common';
import { TumorTypeService } from './tumor-type.service';
import { TumorTypeController } from './tumor-type.controller';

@Module({
  controllers: [TumorTypeController],
  providers: [TumorTypeService],
})
export class TumorTypeModule {}
