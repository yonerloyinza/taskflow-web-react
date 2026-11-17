# AGENTS.md — Gobernanza de taskflow-web-react

## 1. Contexto del Repositorio
- **Proyecto:** `taskflow-web-react`
- **Stack:** React 19 + TypeScript + Vite + Tailwind CSS
- **Despliegue:** Render Static Site (render.yaml)
- **Contrato Maestro:** `docs/openapi.yaml` (OpenAPI 3.1)

## 2. Reglas de Ejecución (Human-in-the-Loop)
1. **Un solo paso a la vez:** Prohibido implementar múltiples pasos sin aprobación explícita.
2. **Plan Previo:** Antes de tocar archivos, muestra: objetivo, archivos exactos, comandos y mensaje de Conventional Commit.
3. **Auto-verificación:** Ejecuta linter, build y tests del paso antes de entregar y muestra la salida real.
4. **Parada obligatoria:** Detente tras verificar, indica al usuario cómo probarlo y espera su visto bueno.
5. **Commit Atómico:** Tras aprobación, actualiza `docs/03-roadmap.md` y `docs/04-ai-log.md`, y ejecuta `git add` + `git commit` con Conventional Commits.

## 3. Reglas Arquitectónicas
- **Contract-First:** Respeta al 100% las rutas, DTOs, filtros (`status`, `priority`, `assignee`), paginación y formato de errores de `docs/openapi.yaml`.
- **Vendor-Agnostic DB:** Cero SDKs propietarios de InsForge o Supabase; conexión pura vía `DATABASE_URL` y `DIRECT_URL`.
