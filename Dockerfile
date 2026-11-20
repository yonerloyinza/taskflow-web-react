# syntax=docker/dockerfile:1

# ==========================================
# Etapa 1: Build — node:22-alpine
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar manifests primero (cache layer)
COPY package.json ./

# Instalar dependencias (incluye devDeps para build)
# Nota: usa npm install (no npm ci) porque aún no hay package-lock.json.
# Una vez generado el lockfile, se puede migrar a npm ci para builds reproducibles.
RUN npm install

# Copiar código fuente
COPY tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html ./
COPY src ./src
COPY public ./public

# Build de producción
RUN npm run build

# ==========================================
# Etapa 2: Serve — nginx:alpine
# ==========================================
FROM nginx:alpine AS runner

# Labels
LABEL org.opencontainers.image.title="taskflow-web-react" \
      org.opencontainers.image.description="TaskFlow web frontend — React 19 + Vite + TanStack Query" \
      org.opencontainers.image.version="1.0.0"

# Config de nginx con SPA fallback + security headers + health
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar build estático
COPY --from=builder /app/dist /usr/share/nginx/html

# Puerto interno (Traefik enruta HTTPS -> 80)
EXPOSE 80

# Healthcheck (wget disponible en nginx:alpine)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/health || exit 1

CMD ["nginx", "-g", "daemon off;"]