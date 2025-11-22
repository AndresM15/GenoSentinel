from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from catalog.views import GeneViewSet, GeneticVariantViewSet
from reports.views import PatientVariantReportViewSet

# Configuración de Swagger
schema_view = get_schema_view(
   openapi.Info(
      title="GenoSentinel - Microservicio Genómica API",
      default_version='v1',
      description="API para la gestión de Genes, Variantes y Reportes de Pacientes oncológicos.",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@breazelabs.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   # Aquí se deben agregar los permisos en el momento de unir los ter microservicios de auth y clínica
   # permission_classes=(permissions.AllowAny,), 
)

# 1. Definir los Routers 
router = DefaultRouter()
router.register(r'genes', GeneViewSet)
router.register(r'variants', GeneticVariantViewSet)
router.register(r'reports', PatientVariantReportViewSet)

# 2. Definir las Rutas
urlpatterns = [
    # Admin de Django (útil para debug)
    path('admin/', admin.site.urls),
    
    # Rutas de la API (Toda la lógica de catalog y reports)
    path('api/v1/', include(router.urls)),
    
    # Rutas de Swagger/OpenAPI
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]