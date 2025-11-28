import { Module } from '@nestjs/common';
import { PatientService } from './services/patient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { PatientController } from './controllers/patient.controller';

/**
 * PatientModule:
 * - Registra la entidad Patient para TypeORM.
 * - Expone el servicio y controlador de pacientes.
 * - Maneja toda la lógica relacionada con pacientes.
 */

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  providers: [PatientService],
  controllers: [PatientController]
})
export class PatientModule {}
