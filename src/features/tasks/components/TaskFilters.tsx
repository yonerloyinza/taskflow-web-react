import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { TASK_PRIORITIES, TASK_STATUSES, TASK_PRIORITY_LABELS, TASK_STATUS_LABELS } from '@/types'
import type { TaskFilters } from '../types'

interface TaskFiltersBarProps {
  filters: TaskFilters
  onChange: (filters: TaskFilters) => void
}

export function TaskFiltersBar({ filters, onChange }: TaskFiltersBarProps) {
  const hasFilters = Boolean(filters.status || filters.priority || filters.assignee)

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-end">
      <div className="flex-1">
        <Select
          label="Estado"
          placeholder="Todos los estados"
          value={filters.status ?? ''}
          onChange={(e) =>
            onChange({ ...filters, status: (e.target.value || undefined) as TaskFilters['status'] })
          }
          options={TASK_STATUSES.map((s) => ({ value: s, label: TASK_STATUS_LABELS[s] }))}
        />
      </div>
      <div className="flex-1">
        <Select
          label="Prioridad"
          placeholder="Todas las prioridades"
          value={filters.priority ?? ''}
          onChange={(e) =>
            onChange({ ...filters, priority: (e.target.value || undefined) as TaskFilters['priority'] })
          }
          options={TASK_PRIORITIES.map((p) => ({ value: p, label: TASK_PRIORITY_LABELS[p] }))}
        />
      </div>
      <div className="flex-1">
        <Input
          label="Asignado"
          placeholder="Filtrar por asignado..."
          value={filters.assignee ?? ''}
          onChange={(e) => onChange({ ...filters, assignee: e.target.value || undefined })}
        />
      </div>
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={() => onChange({})}>
          Limpiar
        </Button>
      )}
    </div>
  )
}