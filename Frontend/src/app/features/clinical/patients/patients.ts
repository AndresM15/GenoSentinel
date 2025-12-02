import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClinicalService } from '../services/clinical';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients.html',
  styleUrl: './patients.css'
})
export class PatientsComponent implements OnInit {
  patients: any[] = [];
  isLoading = true;

  // Modelo para el formulario (coincide con tu DTO de NestJS)
  newPatient = {
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: 'Male', // Valor por defecto
    status: 'Activo'
  };

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;

  constructor(
    private clinicalService: ClinicalService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.isLoading = true;
    this.clinicalService.getPatients().subscribe({
      next: (data: any[]) => {
        this.patients = data || [];
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error('Error cargando pacientes:', err);
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  savePatient() {
    // Validamos los campos obligatorios
    if (!this.newPatient.first_name || !this.newPatient.last_name || !this.newPatient.birth_date) {
      alert('Nombre, Apellido y Fecha son obligatorios');
      return;
    }

    // --- CORRECCIÓN: PREPARAR EL PAYLOAD ---
    // Creamos un objeto SOLO con los datos que el DTO de NestJS espera.
    // Omitimos 'status' y 'id'.
    const patientPayload = {
      first_name: this.newPatient.first_name,
      last_name: this.newPatient.last_name,
      birth_date: this.newPatient.birth_date,
      gender: this.newPatient.gender
    };

    this.clinicalService.createPatient(patientPayload).subscribe({
      next: (res) => {
        alert('Paciente registrado exitosamente');
        this.loadPatients();
        
        // Limpiar el formulario
        this.newPatient = { 
            first_name: '', last_name: '', birth_date: '', 
            gender: 'Male', status: 'Activo' 
        };
        
        this.closeModalBtn.nativeElement.click();
      },
      error: (err) => {
        console.error('Error creando paciente:', err);
        // Tip de depuración: Muestra el mensaje exacto que devuelve NestJS
        // Generalmente viene en err.error.message
        const serverMessage = err.error?.message || 'Datos inválidos';
        alert('Error: ' + JSON.stringify(serverMessage));
      }
    });
  }
}