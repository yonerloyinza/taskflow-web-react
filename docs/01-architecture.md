# Arquitectura y Despliegue — taskflow-web-react

- **Stack:** React 19 + TypeScript + Vite + TanStack Query + React Router + Tailwind CSS + Zod + React Hook Form
- **Estrategia de Despliegue:** VPS AWS EC2 — Docker multi-etapa (node:22-alpine build, nginx:alpine serve) + Traefik HTTPS
- **API Contract:** OpenAPI 3.1 compartido (`docs/openapi.yaml`) — tipos TypeScript generados automáticamente (`openapi-typescript`), consumiendo backends taskflow-api-* (NestJS/Fastify/FastAPI/Go/C#) via `VITE_API_BASE_URL` desde `/opt/taskflow-ecosystem/.env.web`.
- **State Management:** TanStack Query v5 — server state, cache 5min, background refetch, optimistic updates para mutaciones.
- **Forms & Validation:** React Hook Form + Zod — schemas derivados del contrato, validación en cliente + servidor.
- **Routing:** React Router v7 — rutas tipadas, code splitting por feature, layout autenticado.
- **Styling:** Tailwind CSS v4 — design tokens, dark mode, responsive, componentes accesibles.
- **Build:** Vite 6 — ESBuild, code splitting, tree shaking, assets hashing, chunk optimization.
- **Serving:** Nginx Alpine — gzip/brotli, CSP headers, SPA fallback (`try_files $uri /index.html`), cache static assets 1y.
- **Health Check:** Nginx health endpoint `/health` → 200 OK.
- **Red:** Traefik termina TLS y enruta HTTPS → puerto interno 80 del contenedor (sin exponer puertos en el host).
- **CI/CD:** GitHub Actions (.github/workflows/deploy.yml) → SSH al VPS → `git pull` + `docker compose up -d --build --no-deps web-react` + `docker image prune -f` en `/opt/taskflow-ecosystem/web-react`. Build local en VPS, sin Docker Hub / ghcr.io.
- **Prohibido:** Monorepos, Redux/MobX para server state, CSS-in-JS (styled-components, emotion), Create React App, Next.js, Render, Netlify, Vercel, registros Docker externos.