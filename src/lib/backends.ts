export interface Backend {
  id: string
  name: string
  shortName: string
  proxyPath: string
  container: string
  host: string
}

export const BACKENDS: Backend[] = [
  {
    id: 'nestjs',
    name: 'NestJS',
    shortName: 'NestJS',
    proxyPath: '/api/nestjs',
    container: 'taskflow-api-nestjs',
    host: 'taskflow-api-nest.xprad.com',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    shortName: 'FastAPI',
    proxyPath: '/api/fastapi',
    container: 'taskflow-api-fastapi',
    host: 'taskflow-api-fastapi.xprad.com',
  },
  {
    id: 'go',
    name: 'Go',
    shortName: 'Go',
    proxyPath: '/api/go',
    container: 'taskflow-api-go',
    host: 'taskflow-api-go.xprad.com',
  },
  {
    id: 'springboot',
    name: 'Spring Boot',
    shortName: 'Spring',
    proxyPath: '/api/springboot',
    container: 'taskflow-api-springboot',
    host: 'taskflow-api-springboot.xprad.com',
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    shortName: 'Kotlin',
    proxyPath: '/api/kotlin',
    container: 'taskflow-api-kotlin',
    host: 'taskflow-api-kotlin.xprad.com',
  },
  {
    id: 'dotnet',
    name: '.NET',
    shortName: '.NET',
    proxyPath: '/api/dotnet',
    container: 'taskflow-api-dotnet',
    host: 'taskflow-api-dotnet.xprad.com',
  },
  {
    id: 'rust',
    name: 'Rust',
    shortName: 'Rust',
    proxyPath: '/api/rust',
    container: 'taskflow-api-rust',
    host: 'taskflow-api-rust.xprad.com',
  },
  {
    id: 'fastify',
    name: 'Fastify',
    shortName: 'Fastify',
    proxyPath: '/api/fastify',
    container: 'taskflow-api-fastify',
    host: 'taskflow-api-fastify.xprad.com',
  },
]

export const DEFAULT_BACKEND_ID = 'nestjs'

export function getBackendById(id: string): Backend {
  return BACKENDS.find((b) => b.id === id) ?? BACKENDS[0]
}