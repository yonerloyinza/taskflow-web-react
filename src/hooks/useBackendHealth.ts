import { useQuery } from '@tanstack/react-query'
import { getBackendById } from '@/lib/backends'

export type HealthStatus = 'checking' | 'up' | 'down'

interface BackendHealthResult {
  status: HealthStatus
  latencyMs: number | null
}

export function useBackendHealth(backendId: string): BackendHealthResult {
  const backend = getBackendById(backendId)

  const { data, isFetching, isError } = useQuery({
    queryKey: ['backend-health', backend.id],
    queryFn: async ({ signal }) => {
      const start = performance.now()
      const res = await fetch(`${backend.proxyPath}/health`, { signal })
      const elapsed = Math.round(performance.now() - start)
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }
      return { ok: true as const, latencyMs: elapsed }
    },
    staleTime: 30_000,
    retry: 0,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  })

  if (isFetching && !data) {
    return { status: 'checking', latencyMs: null }
  }

  if (isError || !data?.ok) {
    return { status: 'down', latencyMs: null }
  }

  return { status: 'up', latencyMs: data.latencyMs }
}