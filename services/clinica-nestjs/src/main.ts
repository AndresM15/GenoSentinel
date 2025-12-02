import * as dotenv from 'dotenv';
dotenv.config();
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('--- DEBUG ENV ---');
  console.log('DB_TYPE:', process.env.CLINICA_DB_TYPE);
  console.log('DB_HOST:', process.env.CLINICA_DB_HOST_NAME);
  console.log('-----------------');

  // 1. CONFIGURACIÓN DEL PREFIJO GLOBAL
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,              
      whitelist: true,              
      forbidNonWhitelisted: true,    
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('GenoSentinel - Clínica API')
    .setDescription('Microservicio de Gestión de Pacientes')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); 

  
  // 2. CAMBIO DE PUERTO: 3001
  await app.listen(process.env.PORT ?? 3001);
  console.log(`Microservicio Clínica corriendo en: http://localhost:3001/api/v1`);
  console.log(`Swagger disponible en: http://localhost:3001/swagger`);
}
bootstrap();