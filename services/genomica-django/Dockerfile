FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Instalar dependencias de sistema para mysqlclient
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

# Recolectar estáticos para que Swagger se vea bien (Whitenoise)
RUN python manage.py collectstatic --noinput

EXPOSE 3000

CMD ["gunicorn", "--bind", "0.0.0.0:3000", "config.wsgi:application"]