// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { Layout } from './shared/components/layout/layout'; 
import { Dashboard } from './features/dashboard/dashboard';
import { GenesComponent } from './features/genomics/genes/genes'; // Asegúrate del nombre correcto
import { VariantsComponent } from './features/genomics/variants/variants'; // Importar componente
import { ReportsComponent } from './features/genomics/reports/reports';

export const routes: Routes = [

  // Login
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },


  // Layout Principal
  {
    path: '',
    component: Layout, 
    children: [
      { 
        path: 'dashboard', 
        component: Dashboard 
      },
      { 
        path: 'genomics/genes', 
        component: GenesComponent },

      { 
        path: 'genomics/variants', 
        component: VariantsComponent },

      { 
        path: 'genomics/reports', 
        component: ReportsComponent },
      
    ]
  },

  { path: '**', redirectTo: 'auth/login' }


];