import { Module } from '@nestjs/common';
import { ClinicalRecordController } from './controller/clinical-record.controller';
import { ClinicalRecordService } from './services/clinical-record.service';
import { ConfigModule } from '@nestjs/config';
import { ClinicalRecord } from './entities/clinical-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Módulo de ClinicalRecord.
 * Registra la entidad, el controlador y el servicio necesarios
 * para manejar los historiales clínicos dentro de la aplicación.
 */

@Module({
  imports: [TypeOrmModule.forFeature([ClinicalRecord])],
  controllers: [ClinicalRecordController],
  providers: [ClinicalRecordService],
})
export class ClinicalRecordModule {}
