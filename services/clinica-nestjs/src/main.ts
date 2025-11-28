import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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
  app.useGlobalPipes(new ValidationPipe({
    transform: true,              
    whitelist: true,              
    forbidNonWhitelisted: true    
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
