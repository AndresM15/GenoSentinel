import { Module } from '@nestjs/common';
import { PatientService } from './services/impl/patient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { PatientController } from './controllers/patient.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  providers: [PatientService],
  controllers: [PatientController]
})
export class PatientModule {}
