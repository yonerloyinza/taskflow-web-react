# Roadmap — taskflow-web-react

- [ ] **Paso 0 — Aclaración de contexto:** Verificar variables de entorno y puertos locales.
- [ ] **Paso 1 — Estructura Base e Infraestructura:** Scaffolding, TypeScript/Python estricto, seguridad (CORS, Helmet/Headers, Rate Limit) y configuración de despliegue (Render Static Site (render.yaml)).
- [ ] **Paso 2 — Persistencia y Migraciones Duales:** Configuración de ORM + migraciones reales usando `DIRECT_URL` y runtime con `DATABASE_URL`.
- [ ] **Paso 3 — Implementación del Contrato (`docs/openapi.yaml`):** Endpoints CRUD, filtros (`status`, `priority`, `assignee`), paginación, manejo de errores estándar y `GET /health`.
- [ ] **Paso 4 — Testing:** Suite de pruebas unitarias e integración verificando cumplimiento del contrato OpenAPI 3.1.
- [ ] **Paso 5 — CI/CD y Documentación:** Pipeline automatizado y `README.md` con instrucciones para alternar entre InsForge y Supabase + bitácora IA.
