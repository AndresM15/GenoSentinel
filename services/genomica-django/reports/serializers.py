from rest_framework import serializers
from .models import PatientVariantReport
from catalog.serializers import GeneticVariantSerializer
from reports.api_clients import validate_patient_exists 
from rest_framework.exceptions import ValidationError 
import uuid

class PatientVariantReportSerializer(serializers.ModelSerializer):
    # Nested Serializer: Para ver los detalles de la variante en el reporte
    # read_only=True significa que al CREAR el reporte, solo envias el ID de la variante,
    # pero al LEER el reporte, verás todos los datos de la variante.
    variant_details = GeneticVariantSerializer(source='variant', read_only=True)

    class Meta:
        model = PatientVariantReport
        fields = [
            'id', 
            'patient_id', 
            'variant',          # ID para escribir (Input)
            'variant_details',  # Objeto completo para leer (Output)
            'detection_date', 
            'allele_frequency'
        ]

    def validate_patient_id(self, value):
        """
        Valida que el UUID del paciente exista consultando al Microservicio de Clínica.
        """
        # Validación de formato (UUID)
        try:
            uuid.UUID(str(value)) # Asegura que el valor es un UUID válido
        except ValueError:
            raise ValidationError("El patient_id debe ser un UUID válido.")
            
        # Validación de existencia (Llamada HTTP)
        if not validate_patient_exists(value):
            raise ValidationError(f"El paciente con ID {value} no existe en el sistema de Clínica.")
            
        return value