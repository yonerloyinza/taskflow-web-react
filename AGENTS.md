# AGENTS.md — Gobernanza de taskflow-web-react

## 1. Contexto del Repositorio
- **Proyecto:** `taskflow-web-react`
- **Stack:** React 19 + TypeScript + Vite + TanStack Query + React Router + Tailwind CSS + Zod + React Hook Form
- **Despliegue:** VPS AWS EC2 — Docker multi-etapa (node:22-alpine build, nginx:alpine serve) + Traefik HTTPS
- **API Contrato:** `docs/openapi.yaml` (OpenAPI 3.1) — consumido por backend taskflow-api-* (NestJS/Fastify/FastAPI/Go/C#)
- **Ecosistema:** Polyrepo TaskFlow (frontend React, sin monorepo)
- **Variables de Entorno:** Cargadas desde `/opt/taskflow-ecosystem/.env.web` en el VPS (`VITE_API_BASE_URL`)

## 2. Reglas de Ejecución (Human-in-the-Loop)
1. **Un solo paso a la vez:** Prohibido implementar múltiples pasos sin aprobación explícita.
2. **Plan Previo:** Antes de tocar archivos, muestra: objetivo, archivos exactos, comandos y mensaje de Conventional Commit.
3. **Auto-verificación:** Ejecuta linter, build y tests del paso antes de entregar y muestra la salida real.
4. **Parada obligatoria:** Detente tras verificar, indica al usuario cómo probarlo y espera su visto bueno.
5. **Commit Atómico:** Tras aprobación, actualiza `docs/03-roadmap.md` y `docs/04-ai-log.md`, y ejecuta `git add` + `git commit` con Conventional Commits.

## 3. Reglas Arquitectónicas
- **Contract-First:** Tipos TypeScript generados desde `docs/openapi.yaml` (openapi-typescript) — rutas, DTOs, enums, paginación, errores sincronizados 100%.
- **State Management:** TanStack Query (React Query) para server state — cache, invalidation, optimistic updates.
- **Forms & Validation:** React Hook Form + Zod (schemas derivados del contrato OpenAPI).
- **Routing:** React Router v7 — rutas tipadas, lazy loading por feature.
- **Styling:** Tailwind CSS v4 — design system consistente, dark mode ready.
- **Build:** Vite — producción optimizada, code splitting, assets hashed.
- **Serving:** Nginx + SPA fallback — gzip/brotli, cache headers, security headers.
- **Despliegue VPS AWS:** Dockerfile multi-etapa (node:22-alpine build → nginx:alpine serve). Traefik enruta HTTPS → puerto interno 80 (sin exponer puertos en host).
- **CI/CD Local Build:** GitHub Actions (.github/workflows/deploy.yml) → SSH al VPS → `git pull` + `docker compose up -d --build --no-deps web-react` + `docker image prune -f` en `/opt/taskflow-ecosystem/web-react`. Sin Docker Hub / ghcr.io.
- **Prohibido:** Monorepos, Redux/MobX para server state, CSS-in-JS, Create React App, Render, Netlify, Vercel, registros Docker externos.