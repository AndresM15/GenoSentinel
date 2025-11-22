import requests
import os
import uuid

# Leemos la URL base del microservicio de Clínica desde el entorno.
# Usamos un valor por defecto para el desarrollo local (localhost:3001)
# En K8s, esta variable será 'http://clinica-nest:3000'
CLINICA_BASE_URL = os.environ.get('CLINICA_BASE_URL', 'http://localhost:3001/api/v1') 
# Nota: Asumo el puerto 3001 para NestJS en local, distinto al 3000 de Django/Spring.

def validate_patient_exists(patient_id: uuid.UUID) -> bool:
    """
    Consulta al Microservicio de Clínica para verificar si un paciente existe.
    Esto sustituye al JOIN en la base de datos.
    """
    endpoint = f"{CLINICA_BASE_URL}/patients/{patient_id}"
    headers = {
        # TODO: En la implementación real, deberías incluir el token JWT 
        # emitido por el Microservicio de Autenticación aquí.
        # 'Authorization': 'Bearer <token>'
    }

    try:
        # Petición GET para obtener los datos del paciente.
        response = requests.get(endpoint, headers=headers)
        
        if response.status_code == 200:
            # El paciente existe y fue encontrado.
            return True
        elif response.status_code == 404:
            # El paciente no existe.
            return False
        else:
            # Otro error HTTP (500, 403, etc.)
            print(f"Error al consultar Clínica: {response.status_code} - {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        # Manejo de error si el Microservicio de Clínica no está encendido 
        print(f"ERROR: No se pudo conectar al Microservicio Clínica en {CLINICA_BASE_URL}. Asumiendo validación True para continuar el desarrollo.")
        # En desarrollo, podemos asumir True temporalmente para que tu frontend/Postman funcione
        # Pero en producción, esto debe ser un False.
        return True # ¡CAMBIAR A FALSE EN PRODUCCIÓN!
    except Exception as e:
        print(f"Error inesperado en la validación: {e}")
        return False