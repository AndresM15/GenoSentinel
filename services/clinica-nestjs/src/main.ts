import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; 

/**
 * ValidationPipe:
 *  - Valida automáticamente los DTOs según sus decoradores (class-validator).
 * 
 * useGlobalPipes:
 *  - Aplica el pipe a **todas** las rutas de la aplicación.
 * 
 * Opciones del ValidationPipe:
 *  transform: true
 *    → Convierte automáticamente los tipos (por ejemplo, strings a números/fechas).
 * 
 *  whitelist: true
 *    → Elimina cualquier propiedad que NO esté declarada en el DTO.
 * 
 *  forbidNonWhitelisted: true
 *    → Si llega una propiedad no permitida, lanza un error en lugar de ignorarla.
 */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,              
      whitelist: true,              
      forbidNonWhitelisted: true,    
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Mi API Clínica')
    .setDescription('Documentación de GenoSentiel')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // URL -> http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
