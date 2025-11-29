import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Asegúrate de que esta ruta sea correcta según donde creaste tu carpeta environments
import { environment } from '../../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class GenomicsService {
  // Apuntamos al Gateway (Spring Boot 8080)
  // La ruta final es: http://localhost:8080/api/v1/genomics
  private apiUrl = `${environment.apiUrl}/api/v1/genomics`;

  constructor(private http: HttpClient) {}

  // --- MÉTODOS PARA GENES ---
  
  // Obtener lista de genes (GET)
  getGenes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/genes/`);
  }

  // Crear un gen (POST)
  createGene(gene: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/genes/`, gene);
  }

  // Eliminar un gen (DELETE)
  deleteGene(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/genes/${id}/`);
  }

  // --- MÉTODOS PARA VARIANTES (Lo usaremos luego) ---
  getVariants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/variants/`);
  }

  getReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reports/`);
  }

  createReport(report: any): Observable<any> {
    // El backend espera: { patient_id, variant, allele_frequency }
    return this.http.post<any>(`${this.apiUrl}/reports/`, report);
  }

  createVariant(variant: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/variants/`, variant);
  }

}