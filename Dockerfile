# Backend build stage
FROM python:3.9-slim AS backend-build

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend .

# Frontend build stage
FROM node:14 AS frontend-build

WORKDIR /app

# Install frontend dependencies
COPY frontend/package*.json .
RUN npm ci

# Copy frontend code and build
COPY frontend .
RUN npm run build

# Final stage
FROM python:3.9-slim

WORKDIR /app

# Copy backend from backend-build stage
COPY --from=backend-build /app /app
COPY --from=backend-build /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=backend-build /usr/local/bin /usr/local/bin

# Copy frontend build from frontend-build stage
COPY --from=frontend-build /app/build /app/frontend/build

# Install production dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=podcast_marketing.settings

# Expose port
EXPOSE 8000

# Run the application
CMD ["gunicorn", "podcast_marketing.wsgi:application", "--bind", "0.0.0.0:8000"]