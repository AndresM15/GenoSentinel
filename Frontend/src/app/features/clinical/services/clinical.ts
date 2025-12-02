import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinicalService {
  // Apuntamos al Gateway (8080) -> Ruta de Clínica
  private apiUrl = `${environment.apiUrl}/api/v1/clinical`;

  constructor(private http: HttpClient) {}

  // --- PACIENTES ---

  // GET: Obtener todos
  getPatients(): Observable<any[]> {
    // Ajusta la ruta según tu Controller de NestJS ('patient/find-patient')
    return this.http.get<any[]>(`${this.apiUrl}/patient/find-patient`);
  }

  // POST: Crear paciente
  createPatient(patient: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/patient/create-patient`, patient);
  }

  // PUT: Actualizar (Opcional por ahora)
  updatePatient(id: string, patient: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/patient/update-patient/${id}`, patient);
  }
}