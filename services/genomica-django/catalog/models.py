import uuid
from django.db import models

class Gene(models.Model):
    """
    Entidad: Gen de Interés (Gene) [cite: 44]
    Propósito: Catálogo de genes relevantes en oncología.
    """
    # Usamos AutoField (ID ) por defecto para catálogos simples.
    symbol = models.CharField(max_length=50, unique=True, help_text="Ej: BRCA1")
    full_name = models.CharField(max_length=255, help_text="Nombre completo del gen")
    function_summary = models.TextField(help_text="Resumen de la función del gen")

    def __str__(self):
        return self.symbol

class GeneticVariant(models.Model):
    """
    Entidad: Variante Genética (GeneticVariant) [cite: 47]
    Propósito: Registro de una mutación específica.
    """
    # Requerimiento: id (PK, UUID)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Relación: Un gen tiene muchas variantes
    gene = models.ForeignKey(Gene, on_delete=models.CASCADE, related_name='variants')
    
    chromosome = models.CharField(max_length=10, help_text="Ej: chr17")
    position = models.BigIntegerField(help_text="Posición genómica")
    reference_base = models.CharField(max_length=255, help_text="Ej: A")
    alternate_base = models.CharField(max_length=255, help_text="Ej: G")
    
    # Campo Impact 
    impact = models.CharField(max_length=50, help_text="Consecuencia de la variante")

    def __str__(self):
        return f"{self.gene.symbol}: {self.chromosome}:{self.position} ({self.reference_base}>{self.alternate_base})"