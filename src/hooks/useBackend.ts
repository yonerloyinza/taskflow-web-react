import { useCallback, useEffect, useState } from 'react'
import { BACKENDS, DEFAULT_BACKEND_ID, getBackendById, type Backend } from '@/lib/backends'

const STORAGE_KEY = 'taskflow-backend'

function getInitialBackendId(): string {
  if (typeof window === 'undefined') return DEFAULT_BACKEND_ID
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && BACKENDS.some((b) => b.id === stored)) return stored
  return DEFAULT_BACKEND_ID
}

export function useBackend() {
  const [backendId, setBackendId] = useState<string>(getInitialBackendId)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, backendId)
  }, [backendId])

  const backend: Backend = getBackendById(backendId)

  const setBackend = useCallback((id: string) => {
    setBackendId(id)
  }, [])

  return { backend, backendId, setBackend, backends: BACKENDS }
}