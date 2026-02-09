# EcoArmario Live Dashboard System

Sistema integral para live shopping con dashboards en tiempo real, CRM y gamificación.

## 🚀 Características

- **Dashboard Live (TV)**: Vista optimizada para TV con ranking de compradoras y métricas en tiempo real.
- **Admin Dashboard**: Panel de control para gerencia con alertas y reportes.
- **CRM**: Gestión de clientes, historial de compras y segmentación.
- **Gamificación**: Ruletas de premios y badges automáticos para compradoras.
- **Formulario Público**: Registro de clientes con geolocalización.
- **Backend Robusto**: FastAPI + Google Sheets integración.

## 🛠️ Tecnologías

- **Frontend**: React 18, Vite, TailwindCSS, Framer Motion.
- **Backend**: Python 3.11, FastAPI, Pandas, GSpread.
- **Infraestructura**: Docker, Docker Compose.

## 📦 Instalación y Despliegue

### Requisitos Previos
- Docker y Docker Compose instalados.
- ID de Google Sheet público (configurado en `.env`).

### Pasos

1.  **Clonar el repositorio**
    ```bash
    git clone <repo-url>
    cd ecoarmario-dashboard
    ```

2.  **Configurar Variables de Entorno**
    El archivo `backend/.env` se crea automáticamente, pero puedes editarlo:
    ```env
    GOOGLE_SHEET_ID=1SpzOG6_YPWUkmyFIAbmXM-6mapiIIfMTKoJrWu1FcXk
    JWT_SECRET_KEY=tu_secreto_aqui
    ```
    
    El archivo `frontend/.env` (o variables de build en Dockerfile):
    ```env
    VITE_API_URL=https://apieco.atleia.lat
    VITE_WS_URL=wss://apieco.atleia.lat
    ```
    *(Para local: http://localhost:8099 y ws://localhost:8099)*

3.  **Ejecutar con Docker Compose**
    ```bash
    docker-compose up --build -d
    ```

4.  **Acceder a la Aplicación**
    - **Frontend**: http://localhost:3001
    - **Backend API**: http://localhost:8099/docs

## 📂 Estructura del Proyecto

```
ecoarmario-dashboard/
├── backend/            # FastAPI App
│   ├── app/
│   │   ├── api/        # Endpoints
│   │   ├── core/       # Configuración
│   │   ├── services/   # Lógica de Negocio y Sheets
│   │   └── main.py     # Entry point
├── frontend/           # React App
│   ├── src/
│   │   ├── components/ # Componentes (Live, Admin, Layout)
│   │   ├── context/    # WebSocket Context
│   │   ├── pages/      # Vistas principales
│   │   └── services/   # API Client
└── docker-compose.yml  # Orquestación
```

## 🔐 Credenciales por Defecto (Mock)

El sistema de autenticación está preparado para JWT.
- **Admin**: admin@ecoarmario.com / Admin2026!

## 🔄 Flujo de Datos

1.  El sistema hace polling al Google Sheet cada 10 segundos (o usa Webhook).
2.  Procesa los datos para cruzar "Prendas" con "Pagos".
3.  Calcula rankings y badges.
4.  Emite actualizaciones vía WebSocket al Frontend.

---
Desarrollado para EcoArmario.
