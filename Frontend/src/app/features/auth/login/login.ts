import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necesario para los inputs [(ngModel)]
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos FormsModule aquí
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  // Modelo de datos para el formulario
  credentials = {
    username: '',
    password: ''
  };
  
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        // Si todo sale bien
        if (response.token) {
          // (Opcional) Guardar token si no lo hace el servicio
          localStorage.setItem('token', response.token); 
      }
        this.router.navigate(['/dashboard']);
        
      },
      error: (err) => {
        console.error('Error de login', err);
        this.errorMessage = 'Credenciales inválidas o error de servidor.';
      }
    });
  }
}