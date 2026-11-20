import { Table, type Column } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  TASK_PRIORITY_BADGE_CLASSES,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_BADGE_CLASSES,
  TASK_STATUS_LABELS,
} from '@/types'
import type { Task } from '@/types'

interface TaskTableProps {
  tasks: Task[]
  isLoading?: boolean
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

const statusVariant = {
  pendiente: 'default',
  en_curso: 'info',
  hecha: 'success',
} as const

const priorityVariant = {
  baja: 'default',
  media: 'warning',
  alta: 'danger',
} as const

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function TaskTable({ tasks, isLoading, onEdit, onDelete }: TaskTableProps) {
  const columns: Column<Task>[] = [
    {
      key: 'title',
      header: 'Título',
      render: (task) => (
        <div>
          <p className="font-medium text-slate-900 dark:text-slate-100">{task.title}</p>
          {task.description && (
            <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
              {task.description}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (task) => (
        <Badge variant={statusVariant[task.status]} className={TASK_STATUS_BADGE_CLASSES[task.status]}>
          {TASK_STATUS_LABELS[task.status]}
        </Badge>
      ),
    },
    {
      key: 'priority',
      header: 'Prioridad',
      render: (task) => (
        <Badge
          variant={priorityVariant[task.priority]}
          className={TASK_PRIORITY_BADGE_CLASSES[task.priority]}
        >
          {TASK_PRIORITY_LABELS[task.priority]}
        </Badge>
      ),
    },
    {
      key: 'assignee',
      header: 'Asignado',
      render: (task) => (
        <span className="text-slate-600 dark:text-slate-300">{task.assignee}</span>
      ),
    },
    {
      key: 'dueDate',
      header: 'Fecha límite',
      render: (task) => (
        <span className="text-slate-600 dark:text-slate-300">{formatDate(task.dueDate)}</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'text-right',
      render: (task) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>
            Editar
          </Button>
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 dark:text-red-400" onClick={() => onDelete(task)}>
            Eliminar
          </Button>
        </div>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      data={tasks}
      keyExtractor={(task) => task.id}
      isLoading={isLoading}
      emptyMessage="No hay tareas que coincidan con los filtros"
    />
  )
}