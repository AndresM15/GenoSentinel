from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from rest_framework.routers import DefaultRouter # <--- Necesario para las URLs
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Importar las Vistas de tus aplicaciones
from catalog.views import GeneViewSet, GeneticVariantViewSet
from reports.views import PatientVariantReportViewSet


# --- Swagger/OpenAPI configuration (Sin cambios) ---
schema_view = get_schema_view(
    openapi.Info(
      title="GenoSentinel API",
      default_version='v1',
      description="API documentation for GenoSentinel microservice",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@genosentinel.local"),
      license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


# --- CONFIGURACIÓN DEL ROUTER PRINCIPAL ---
router = DefaultRouter()
# Registrar los ViewSets: El router genera las 5 URLs CRUD para cada uno
router.register(r'genes', GeneViewSet, basename='gene')
router.register(r'variants', GeneticVariantViewSet, basename='variant')
router.register(r'reports', PatientVariantReportViewSet, basename='report')


urlpatterns = [
    path('admin/', admin.site.urls),

    # --- RUTAS DE LA API ---
    # Todas las rutas inician con /api/v1/ (ej: /api/v1/genes/)
    path('api/v1/', include(router.urls)),

    # --- RUTAS DE DOCUMENTACIÓN ---
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]