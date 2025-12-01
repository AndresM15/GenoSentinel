from rest_framework import serializers
from .models import Gene, GeneticVariant

class GeneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gene
        fields = '__all__'

class GeneticVariantSerializer(serializers.ModelSerializer):
    
    gene_symbol = serializers.CharField(source='gene.symbol', read_only=True)

    class Meta:
        model = GeneticVariant
        fields = '__all__'