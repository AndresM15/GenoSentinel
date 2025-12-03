# -------------------------------------------------------------------
# ETAPA 1: Construcción (Usamos Node.js para compilar)
# -------------------------------------------------------------------
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos los archivos de configuración
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos todo el código fuente del proyecto
COPY . .

# Compilamos la aplicación para producción
# Esto genera la carpeta 'dist/' con los archivos optimizados
RUN npm run build

# -------------------------------------------------------------------
# ETAPA 2: Servidor Web (Usamos Nginx para servir los archivos)
# -------------------------------------------------------------------
FROM nginx:alpine

# Copiamos los archivos compilados desde la Etapa 1 a la carpeta pública de Nginx
# OJO: La ruta '/app/dist/frontend/browser' depende de cómo se llame tu proyecto en angular.json.
# Si tu proyecto se llama 'genosentinel-front', ajusta la ruta. 
# Para proyectos nuevos Angular 17+, suele ser 'dist/nombre-proyecto/browser'.
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copiamos nuestra configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80 (el estándar para web)
EXPOSE 80

# Nginx se inicia automáticamente, no necesitamos CMD