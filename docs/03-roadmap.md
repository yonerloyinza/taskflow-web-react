# Roadmap — taskflow-web-react

- [x] **Paso 0 — Aclaración de contexto:** Verificar variables de entorno (`VITE_API_BASE_URL`), puertos locales, contrato OpenAPI accesible.
- [x] **Paso 1 — Estructura Base e Infraestructura:** Scaffolding Vite + React 19 + TS estricto, Tailwind v4, ESLint (oxlint), Prettier, Husky, TanStack Query provider, React Router, Zod + React Hook Form setup.
- [x] **Paso 2 — Generación de Tipos y API Client:** `openapi-typescript` → tipos desde `docs/openapi.yaml`, cliente API tipado (fetch wrapper + TanStack Query hooks), enums/status/priority sincronizados.
- [x] **Paso 3 — UI Core & Layout:** Design system (Button, Input, Select, Modal, Table, Pagination, Toast), Layout principal (Header, Sidebar, Footer), Dark mode toggle, Responsive breakpoints.
- [x] **Paso 4 — Feature: Tasks CRUD:** Lista paginada con filtros (status, priority, assignee), Crear tarea (Modal + Form), Editar tarea (Inline/Modal), Eliminar (Confirmación), Optimistic updates, Error handling UI (ErrorResponse toast).
- [x] **Paso 5 — Health & Observability:** Página Health check, Error Boundary global, Loading states, Empty states, Accessibility (ARIA, focus management).
- [x] **Paso 6a — Documentación y Docker:** AGENTS.md actualizado, docs/01-architecture.md, Dockerfile multi-etapa (node:22-alpine → nginx:alpine) para VPS AWS + Traefik, nginx.conf con SPA fallback + security headers.
- [x] **Paso 6b — CI/CD VPS:** GitHub Actions deploy.yml → SSH → `git pull` + `docker compose up -d --build --no-deps web-react` + `docker image prune -f` en `/opt/taskflow-ecosystem/web-react`. Variables en `/opt/taskflow-ecosystem/.env.web`. Sin Render, sin registros Docker externos.