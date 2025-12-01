import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenomicsService } from '../services/genomics';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-variants',
  standalone: true,
  imports: [CommonModule, FormsModule], // 1. Importante para la tabla
  templateUrl: './variants.html',
  styleUrl: './variants.css'
})
export class VariantsComponent implements OnInit {
  variants: any[] = [];
  genes: any[] = [];
  isLoading = true;

  newVariant = {
    gene: '', // ID del gen
    chromosome: '',
    position: null,
    reference_base: '',
    alternate_base: '',
    impact: 'Missense'
  };

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;

  constructor(
    private genomicsService: GenomicsService,
    private cd: ChangeDetectorRef // 2. Para forzar la actualización si es necesario
  ) {}

  ngOnInit(): void {
    this.loadVariants();
    this.loadGenesForDropdown();
  }

  loadVariants() {
    this.isLoading = true;
    this.genomicsService.getVariants().subscribe({
      next: (data: any) => {
        // Django devuelve paginación { count: ..., results: [...] }
        // Usamos data.results si existe, o data si es array directo
        this.variants = data.results || data || []; 
        
        this.isLoading = false;
        console.log('Variantes cargadas:', this.variants);
        
        // 3. Forzar actualización de vista
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando variantes:', err);
        this.isLoading = false;
        this.variants = [];
        this.cd.detectChanges();
      }
    });
  }

  loadGenesForDropdown() {
    this.genomicsService.getGenes().subscribe({
      next: (data: any) => {
        this.genes = data.results || data || [];
      }
    });
  }

  saveVariant() {
    if (!this.newVariant.gene || !this.newVariant.chromosome || !this.newVariant.position) {
      alert('Complete los campos obligatorios');
      return;
    }

    this.genomicsService.createVariant(this.newVariant).subscribe({
      next: (res) => {
        alert('Variante creada exitosamente');
        this.loadVariants(); // Recargar tabla
        
        // Limpiar formulario
        this.newVariant = { 
            gene: '', chromosome: '', position: null, 
            reference_base: '', alternate_base: '', impact: 'Missense' 
        };
        
        // Cerrar modal automáticamente
        this.closeModalBtn.nativeElement.click();
      },
      error: (err) => {
        console.error('Error guardando variante:', err);
        alert('Error al guardar. Verifique los datos.');
      }
    });
  }


}