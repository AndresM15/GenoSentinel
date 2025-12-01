import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router'; // IMPORTANTE
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule], // AGREGAR AQUÍ
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

  // 3. Inyectamos el servicio de Auth y el Router en el constructor
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // 4. Esta es la función que llamará el botón
  logout() {
    // Borramos el token del localStorage
    this.authService.logout();
    
    // Redirigimos al usuario a la pantalla de login
    this.router.navigate(['/auth/login']);
  }
}