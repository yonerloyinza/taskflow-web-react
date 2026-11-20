import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { createTaskSchema, updateTaskSchema, type CreateTaskForm } from '@/lib/validation'
import { TASK_PRIORITIES, TASK_STATUSES, TASK_PRIORITY_LABELS, TASK_STATUS_LABELS } from '@/types'
import type { Task } from '@/types'

interface TaskFormProps {
  task?: Task
  onSubmit: (data: CreateTaskForm) => void
  onCancel: () => void
  isLoading?: boolean
}

function toDateTimeLocal(iso: string): string {
  const date = new Date(iso)
  const offset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

export function TaskForm({ task, onSubmit, onCancel, isLoading }: TaskFormProps) {
  const isEdit = Boolean(task)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskForm>({
    resolver: zodResolver(isEdit ? updateTaskSchema : createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'pendiente',
      priority: 'media',
      assignee: '',
      dueDate: '',
    },
  })

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description ?? '',
        status: task.status,
        priority: task.priority,
        assignee: task.assignee,
        dueDate: toDateTimeLocal(task.dueDate),
      })
    }
  }, [task, reset])

  const handleFormSubmit = (data: CreateTaskForm) => {
    const payload: CreateTaskForm = {
      ...data,
      dueDate: new Date(data.dueDate).toISOString(),
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Título *"
        placeholder="Título de la tarea"
        error={errors.title?.message}
        {...register('title')}
      />
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Descripción
        </label>
        <textarea
          placeholder="Descripción de la tarea..."
          rows={3}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.description.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Estado"
          options={TASK_STATUSES.map((s) => ({ value: s, label: TASK_STATUS_LABELS[s] }))}
          {...register('status')}
        />
        <Select
          label="Prioridad"
          options={TASK_PRIORITIES.map((p) => ({ value: p, label: TASK_PRIORITY_LABELS[p] }))}
          {...register('priority')}
        />
      </div>
      <Input
        label="Asignado *"
        placeholder="Nombre del asignado"
        error={errors.assignee?.message}
        {...register('assignee')}
      />
      <Input
        label="Fecha límite *"
        type="datetime-local"
        error={errors.dueDate?.message}
        {...register('dueDate')}
      />
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {isEdit ? 'Guardar cambios' : 'Crear tarea'}
        </Button>
      </div>
    </form>
  )
}