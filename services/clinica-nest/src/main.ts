import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';  // El Swagger documenta todos nuestros ENDPOINTS.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger: define la documentación de la API y la expone en la ruta /appi.
  const config = new DocumentBuilder()
    .setTitle('API Clinica')
    .setDescription('Documentación completa de la API con swagger')
    .setVersion('1.0')
    .addTag('Clinica')
    .build();
  
  const documentFactory = SwaggerModule.createDocument(app,config);   // Genera el documento OpenAPI con toda la descripción de la API.
  SwaggerModule.setup('appi',app,documentFactory)                     // Expone la documentación Swagger en la ruta /appi.

   await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
