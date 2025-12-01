import uuid
from django.db import models
# Importamos el modelo de variante de la otra app
from catalog.models import GeneticVariant

class PatientVariantReport(models.Model):
    """
    Entidad: Reporte de Variantes del Paciente [cite: 47]
    Propósito: Librería de mutaciones encontradas en un paciente.
    """
    # Requerimiento: id (PK, UUID)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # PatientId (FK consultable en Microservicio Clínica)
    # No usamos ForeignKey real porque la tabla Pacientes está en otra BD (NestJS).
    # Guardamos el UUID como referencia lógica.
    patient_id = models.UUIDField(help_text="UUID del paciente (Validado vía API Clínica)")
    
    # Relación con la variante genética interna
    variant = models.ForeignKey(GeneticVariant, on_delete=models.CASCADE)
    
    detection_date = models.DateField(auto_now_add=True)
    
    # Requerimiento: allele Frequency (VAF, decimal)
    allele_frequency = models.DecimalField(
        max_digits=5, 
        decimal_places=4, 
        help_text="VAF (Variant Allele Frequency) ej: 0.1500"
    )

    def __str__(self):
        return f"Reporte {self.id} - Paciente {self.patient_id}"