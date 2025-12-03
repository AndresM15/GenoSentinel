# -------------------------------------------------------------------
# ETAPA 1: Construcción (Build)
# Usamos una imagen con Maven y JDK 21 para compilar el proyecto
# -------------------------------------------------------------------
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# 1. Copiamos solo el archivo pom.xml primero (Capa de caché)
# Esto hace que Docker no vuelva a descargar las dependencias si no cambias el pom.xml
COPY pom.xml .

# 2. Descargamos las dependencias (modo offline)
RUN mvn dependency:go-offline

# 3. Copiamos el código fuente de tu proyecto
COPY src ./src

# 4. Compilamos y empaquetamos el JAR
# -DskipTests: Saltamos los tests porque en esta etapa no hay base de datos conectada
RUN mvn clean package -DskipTests

# -------------------------------------------------------------------
# ETAPA 2: Ejecución (Run)
# Usamos una imagen ligera (Alpine) solo con el JRE para correr la app
# -------------------------------------------------------------------
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copiamos el JAR generado en la etapa anterior (build) a la etapa actual
# El asterisco *.jar toma cualquier nombre que haya generado Maven
COPY --from=build /app/target/*.jar app.jar

# Exponemos el puerto 8080 (donde escucha tu Spring Boot)
EXPOSE 8080

# Definimos el comando de inicio
ENTRYPOINT ["java", "-jar", "app.jar"]