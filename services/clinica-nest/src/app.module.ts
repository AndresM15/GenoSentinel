/* El app.module es el punto de entrada de nuestra aplicación NestJS, 
  donde se registran los Modules, Controllers y services principales.*/

import { Module } from '@nestjs/common'
import { Patient } from './patient/entities/patient.entity'
import { TypeOrmModule } from '@nestjs/typeorm' // Módulo que conecta NestJS con TypeORM para manejar la base de datos (uso ORM).
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PatientModule } from './patient/patient.module'
import { TumorTypeModule } from './tumor-type/tumor-type.module'
import { ClinicalRecordModule } from './clinical-record/clinical-record.module'


@Module({
  imports: [
    TypeOrmModule.forRoot({            // Configura la conexión de la base de datos (MYSQL) con el ORM.
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'morita2005',
      database: 'clinicadb',
      entities: [Patient],
      synchronize: true                // Solo en desarrollo
    }),
    PatientModule, 
    TumorTypeModule,
    ClinicalRecordModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
