// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 1. IMPORTAR ESTAS HERRAMIENTAS DE HTTP
import { 
  provideHttpClient, 
  withFetch, 
  withInterceptorsFromDi,  // Necesario para interceptores basados en Clases
  HTTP_INTERCEPTORS        // El token de inyección
} from '@angular/common/http';

// 2. IMPORTAR TU INTERCEPTOR (Ajusta la ruta si es necesario)
import { JwtInterceptor } from './core/interceptors/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    // 3. CONFIGURAR HTTP CLIENT
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi() // Habilita el uso de la inyección de dependencias para interceptores
    ),

    // 4. REGISTRAR EL INTERCEPTOR
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true // Permite tener múltiples interceptores si fuera necesario
    }
  ]
};