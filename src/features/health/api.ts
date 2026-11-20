import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { queryKeys } from '@/lib/query-keys'
import type { HealthResponse } from '@/types'

export function useHealth() {
  return useQuery<HealthResponse>({
    queryKey: queryKeys.health,
    queryFn: ({ signal }) => api.get<HealthResponse>('/health', { signal }),
    refetchInterval: 30_000,
    retry: 1,
  })
}