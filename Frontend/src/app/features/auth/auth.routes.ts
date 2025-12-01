// src/app/features/auth/auth.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';

export const AUTH_ROUTES: Routes = [
  // La ruta /auth/login cargará este componente
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  }
];