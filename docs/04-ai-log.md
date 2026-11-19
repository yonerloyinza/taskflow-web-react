# Bitácora de IA — taskflow-web-react

| Paso | Qué se pidió al agente | Qué se aceptó | Qué se corrigió manualmente |
| :--- | :--- | :--- | :--- |
| Paso 0 | Inicialización de harness independiente | Estructura aislada con contrato OpenAPI 3.1 compartido | N/A |
| Paso 1 | Scaffolding Vite + React 19 + TS + Tailwind v4 + TanStack Query + Router + Zod/RHF + ESLint/Prettier/Husky | Estructura base completa con Dockerfile multi-etapa, nginx.conf, health endpoint, routing lazy, layout responsive, dark mode. Compilación en VPS AWS sin descargas locales (rsync + Docker build). URL: taskflow-react.xprad.com. Ruta VPS: /opt/taskflow-ecosystem/web-react | Corregido `#` inválido en smoke.test.tsx → `//`. Separado config de Vitest a vitest.config.ts (conflicto vite/vitest versions). Alineado vitest a 3.x para compatibilidad con Vite 6. Movido PageLoader a componente separado para resolver warning react-refresh. Actualizado ruta /opt/taskflow → /opt/taskflow-ecosystem |