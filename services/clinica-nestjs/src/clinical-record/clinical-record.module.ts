import { Module } from '@nestjs/common';
import { ClinicalRecordController } from './controller/clinical-record.controller';
import { ClinicalRecordService } from './services/impl/clinical-record.service';
import { ConfigModule } from '@nestjs/config';
import { ClinicalRecord } from './entities/clinical-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicalRecord])],
  controllers: [ClinicalRecordController],
  providers: [ClinicalRecordService],
})
export class ClinicalRecordModule {}
