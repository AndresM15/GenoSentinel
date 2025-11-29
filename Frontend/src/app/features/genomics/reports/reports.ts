import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ¡IMPORTANTE PARA LOS FORMULARIOS!
import { GenomicsService } from '../services/genomics';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos FormsModule
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class ReportsComponent implements OnInit {
  reports: any[] = [];
  variants: any[] = []; // Para el dropdown
  isLoading = true;

  // Modelo para el formulario
  newReport = {
    patient_id: '',
    variant: '',
    allele_frequency: ''
  };

  errorMessage: string = '';

  constructor(
    private genomicsService: GenomicsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    
    // 1. Cargar Variantes (Para que el médico pueda elegir)
    this.genomicsService.getVariants().subscribe({
      next: (data: any) => {
        this.variants = data.results || data || [];
      }
    });

    // 2. Cargar Reportes existentes
    this.genomicsService.getReports().subscribe({
      next: (data: any) => {
        this.reports = data.results || data || [];
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando reportes:', err);
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  createReport() {
    this.errorMessage = ''; // Limpiar errores previos

    // Validación simple
    if (!this.newReport.patient_id || !this.newReport.variant) {
      alert('Por favor complete todos los campos');
      return;
    }

    this.genomicsService.createReport(this.newReport).subscribe({
      next: (res) => {
        alert('¡Reporte creado exitosamente!');
        this.loadData(); // Recargar la tabla
        // Limpiar formulario
        this.newReport = { patient_id: '', variant: '', allele_frequency: '' };
      },
      error: (err) => {
        console.error('Error creando reporte:', err);
        // Aquí capturamos si el paciente no existe (400 Bad Request desde Django)
        if (err.status === 400) {
            // Django devuelve los errores en formato JSON
            this.errorMessage = JSON.stringify(err.error).replace(/["{}]/g, '');
        } else {
            this.errorMessage = 'Error al guardar. Verifique que el Paciente exista.';
        }
        this.cd.detectChanges();
      }
    });
  }
}