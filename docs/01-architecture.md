# Arquitectura y Despliegue — taskflow-web-react

- **Stack:** React 19 + TypeScript + Vite + Tailwind CSS
- **Estrategia de Despliegue:** Render Static Site (render.yaml)
- **Base de Datos Cloud Dual:** PostgreSQL estándar alternable entre InsForge Cloud y Supabase Cloud mediante variables de entorno (`DATABASE_URL` para pooler y `DIRECT_URL` para migraciones).
- **Resiliencia:** Endpoint `GET /health` verificando conexión real a PostgreSQL, reintentos con backoff exponencial al iniciar y Graceful Shutdown.
