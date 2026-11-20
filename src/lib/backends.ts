export interface Backend {
  id: string
  name: string
  shortName: string
  baseUrl: string
}

export const BACKENDS: Backend[] = [
  {
    id: 'nestjs',
    name: 'NestJS',
    shortName: 'Nest',
    baseUrl: 'https://taskflow-api-n.xprad.com',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    shortName: 'FastAPI',
    baseUrl: 'https://taskflow-api-fastapi.xprad.com',
  },
]

export const DEFAULT_BACKEND_ID = 'nestjs'

export function getBackendById(id: string): Backend {
  return BACKENDS.find((b) => b.id === id) ?? BACKENDS[0]
}