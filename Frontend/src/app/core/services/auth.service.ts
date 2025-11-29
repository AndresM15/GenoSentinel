import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development'; // Asegúrate de que este archivo exista

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Apuntamos al Gateway (Spring Boot Puerto 8080)
  private apiUrl = `${environment.apiUrl}/auth`; 

  constructor(private http: HttpClient) {}

  login(credentials: {username: string, password: string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Si el login es exitoso, guardamos el JWT en el navegador
        if (response.token) {
          localStorage.setItem('token', response.token);
          console.log('Login exitoso, token guardado:', response.token);
        }
      })
    );
  }

  // Método para recuperar el token (lo usaremos luego en los interceptores)
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
  }
}