import type { ErrorResponse } from '@/types'
import { getBackendById } from './backends'

const STORAGE_KEY = 'taskflow-backend'

function getBaseUrl(): string {
  if (typeof window === 'undefined') {
    return import.meta.env['VITE_API_BASE_URL'] ?? '/api'
  }
  const backendId = localStorage.getItem(STORAGE_KEY)
  const backend = getBackendById(backendId ?? '')
  return backend.baseUrl
}

function getBaseUrlSync(): string {
  return getBaseUrl()
}

export class ApiError extends Error {
  readonly statusCode: number
  readonly error: string
  readonly payload: ErrorResponse | null

  constructor(message: string, statusCode: number, error: string, payload: ErrorResponse | null) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.error = error
    this.payload = payload
  }
}

function buildUrl(path: string, query?: Record<string, string | number | undefined>): string {
  const url = `${getBaseUrlSync()}${path}`
  if (!query) return url
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== '') {
      params.set(key, String(value))
    }
  }
  const qs = params.toString()
  return qs ? `${url}?${qs}` : url
}

export interface RequestOptions {
  query?: Record<string, string | number | undefined>
  signal?: AbortSignal
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit & RequestOptions = {},
): Promise<T> {
  const { query, signal, ...rest } = init
  const url = buildUrl(path, query)

  const res = await fetch(url, {
    ...rest,
    signal,
    headers: {
      ...(rest.body ? { 'Content-Type': 'application/json' } : {}),
      ...rest.headers,
    },
  })

  if (res.status === 204) {
    return undefined as T
  }

  const contentType = res.headers.get('content-type') ?? ''
  const isJson = contentType.includes('application/json')

  if (!res.ok) {
    let payload: ErrorResponse | null = null
    if (isJson) {
      payload = (await res.json().catch(() => null)) as ErrorResponse | null
    }
    const message =
      (Array.isArray(payload?.message) ? payload!.message.join(', ') : payload?.message) ??
      res.statusText ??
      `HTTP ${res.status}`
    const error = payload?.error ?? 'Error'
    throw new ApiError(message, res.status, error, payload)
  }

  if (!isJson) {
    return undefined as T
  }

  return (await res.json()) as T
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body: unknown, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: 'POST', body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(path: string, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: 'DELETE' }),
}