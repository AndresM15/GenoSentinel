import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from './patient/patient.module';

/* isGlobal: Las variables de entorno esten disponibles en toda la aplicación o solo en un módulo
 * envFilePath: Archivo de variables de entorno
 * Async: Esperar a que termine el configModule
 * ConfigModule: Variables de entorno
*/ 

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true,envFilePath:`${process.env.NODE_ENV}.env`}),
    // Import the TypeOrmModule globally
    // It must be async, so we can inject the
    // ConfigService to access the envs
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // UseFactory is a function that returns an
      // object
      // Inject the ConfigService to access the envs
      useFactory: (configService: ConfigService) => ({
        // Type of the database
        // Access through the ConfigService
        // Default is sqlite (if no env found)
        type: configService.get<
          'mysql' | 'postgres' | 'sqlite' | 'mssql' | 'oracle'
        >('CLINICA_DB_TYPE') ?? 'sqlite',

        // Host of the database
        // Access through the ConfigService
        host: configService.get<string>('CLINICA_DB_HOST_NAME'),

        // Port of the database
        // Access through the ConfigService
        port: configService.get<number>('CLINICA_DB_PORT'),

        // Username of the database
        // Access through the ConfigService
        username: configService.get<string>('CLINICA_DATABASE_USER'),

        // Password of the database
        // Access through the ConfigService
        password: configService.get<string>('CLINICA_DATABASE_PASSWORD'),

        // Name of the database
        // Access through the ConfigService
        database: configService.get<string>('CLINICA_DATABASE_NAME'),

        // Entities to use
        // This loads all the files with the extension
        // .entity.ts or .entity.js
        // In this way, the entities are automatically
        // turned into tables in the database
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],

        // Synchronize the database
        // This will create the tables if they don't
        // exist
        // It's recommended to set this to false in
        // production
        synchronize: true,
      }),
    }),
        PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
