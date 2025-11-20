import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { TumorTypeModule } from './tumor-type/tumor-type.module';
import { ClinicalRecordModule } from './clinical-record/clinical-record.module';

@Module({
  imports: [PatientModule, TumorTypeModule, ClinicalRecordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
