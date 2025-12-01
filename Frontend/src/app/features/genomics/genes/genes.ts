import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngFor
import { GenomicsService } from '../services/genomics';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-genes',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './genes.html',
  styleUrl: './genes.css'
})
export class GenesComponent implements OnInit {
  genes: any[] = [];
  isLoading = true;

  newGene = {
    symbol: '',
    full_name: '',
    function_summary: ''
  };

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;

  constructor(
    private genomicsService: GenomicsService,
    private cd: ChangeDetectorRef
    )  {}

  ngOnInit(): void {
    this.loadGenes();
  }

  loadGenes() {
    this.isLoading = true;
    this.genomicsService.getGenes().subscribe({
      next: (data: any) => {
        // Asignamos datos
        this.genes = data.results || [];
        this.isLoading = false;
        this.cd.detectChanges();
        console.log('Genes actualizados en vista:', this.genes);
        
        // 3. ¡LA SOLUCIÓN MÁGICA!
        // Forzamos a Angular a detectar los cambios y pintar la tabla
        this.cd.detectChanges(); 
      },
      error: (err) => {
        console.error('Error cargando genes:', err);
        this.isLoading = false;
        this.cd.detectChanges(); 
      }
    });
  }

  saveGene() {
    if (!this.newGene.symbol || !this.newGene.full_name) {
      alert('El símbolo y el nombre son obligatorios');
      return;
    }

    this.genomicsService.createGene(this.newGene).subscribe({
      next: (res) => {
        alert('Gen creado exitosamente');
        
        // Recargar la tabla para ver el nuevo dato
        this.loadGenes();
        
        // Limpiar el formulario
        this.newGene = { symbol: '', full_name: '', function_summary: '' };
        
        // Opcional: Cerrar el modal programáticamente (lo haremos manual por ahora)
        this.closeModalBtn.nativeElement.click();
      },
      error: (err) => {
        console.error('Error creando gen:', err);
        alert('Error al guardar el gen.');
      }
    });
  }
}