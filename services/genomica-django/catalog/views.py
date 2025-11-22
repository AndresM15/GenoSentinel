from rest_framework import viewsets
from .models import Gene, GeneticVariant
from .serializers import GeneSerializer, GeneticVariantSerializer

class GeneViewSet(viewsets.ModelViewSet):
    queryset = Gene.objects.all()
    serializer_class = GeneSerializer
    # Permite al equipo de Genómica catalogar genes
    
class GeneticVariantViewSet(viewsets.ModelViewSet):
    queryset = GeneticVariant.objects.all()
    serializer_class = GeneticVariantSerializer
    # Permite al equipo de Genómica catalogar variantes