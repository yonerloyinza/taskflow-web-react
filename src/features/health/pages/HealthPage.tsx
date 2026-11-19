import { useQuery } from '@tanstack/react-query'

interface HealthResponse {
  status: 'ok'
  service: string
  database: 'up'
  timestamp: string
}

export default function HealthPage() {
  const { data, isLoading, error } = useQuery<HealthResponse>({
    queryKey: ['health'],
    queryFn: async () => {
      const res = await fetch('/api/health')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json() as Promise<HealthResponse>
    },
    refetchInterval: 30_000,
    retry: 1,
  })

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Health Check</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Estado de la API y conexión a PostgreSQL
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        {isLoading && (
          <div className="flex items-center gap-3 text-slate-500">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
            Verificando...
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-950/50 dark:text-red-300">
            <p className="font-semibold">Error al consultar la API</p>
            <p className="mt-1 text-sm">{String(error)}</p>
          </div>
        )}

        {data && (
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </dt>
              <dd className="mt-1 font-mono text-sm">
                <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-green-700 dark:bg-green-950/50 dark:text-green-300">
                  {data.status}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Service
              </dt>
              <dd className="mt-1 font-mono text-sm">{data.service}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Database
              </dt>
              <dd className="mt-1 font-mono text-sm">
                <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-green-700 dark:bg-green-950/50 dark:text-green-300">
                  {data.database}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Timestamp
              </dt>
              <dd className="mt-1 font-mono text-sm">{data.timestamp}</dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  )
}