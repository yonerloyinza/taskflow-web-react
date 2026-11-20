export interface Backend {
  id: string
  name: string
  shortName: string
  proxyPath: string
}

export const BACKENDS: Backend[] = [
  {
    id: 'nestjs',
    name: 'NestJS',
    shortName: 'Nest',
    proxyPath: '/api/nestjs',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    shortName: 'FastAPI',
    proxyPath: '/api/fastapi',
  },
]

export const DEFAULT_BACKEND_ID = 'nestjs'

export function getBackendById(id: string): Backend {
  return BACKENDS.find((b) => b.id === id) ?? BACKENDS[0]
}