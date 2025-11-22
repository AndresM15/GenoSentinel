from rest_framework import viewsets
from .models import PatientVariantReport
from .serializers import PatientVariantReportSerializer

class PatientVariantReportViewSet(viewsets.ModelViewSet):
    queryset = PatientVariantReport.objects.all()
    serializer_class = PatientVariantReportSerializer
    # La lógica de validación de pacientes ya está en el Serializer.