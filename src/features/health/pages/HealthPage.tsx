import { useHealth } from '../api'
import { LoadingState } from '@/components/LoadingState'
import { EmptyState } from '@/components/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export default function HealthPage() {
  const { data, isLoading, error, refetch, isRefetching } = useHealth()

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Health Check</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Estado de la API y conexión a PostgreSQL
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => void refetch()}
          isLoading={isRefetching}
        >
          Refrescar
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <LoadingState message="Verificando estado de la API..." />
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950/50">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠</span>
            <h3 className="font-semibold text-red-800 dark:text-red-300">
              Error al consultar la API
            </h3>
          </div>
          <p className="mt-2 text-sm text-red-700 dark:text-red-400">{String(error)}</p>
          <p className="mt-1 text-xs text-red-500 dark:text-red-500">
            Verifica que el backend esté en ejecución y que VITE_API_BASE_URL sea correcto.
          </p>
        </div>
      ) : !data ? (
        <EmptyState
          title="Sin datos"
          description="No se recibió respuesta de la API."
        />
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <dl className="grid grid-cols-2 gap-6">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </dt>
              <dd className="mt-1">
                <Badge variant="success">{data.status}</Badge>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Service
              </dt>
              <dd className="mt-1 font-mono text-sm text-slate-700 dark:text-slate-300">
                {data.service}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Database
              </dt>
              <dd className="mt-1">
                <Badge variant="success">{data.database}</Badge>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Timestamp
              </dt>
              <dd className="mt-1 font-mono text-sm text-slate-700 dark:text-slate-300">
                {new Date(data.timestamp).toLocaleString('es')}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  )
}