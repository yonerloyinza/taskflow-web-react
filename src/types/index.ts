import type { components, paths } from './api'

export type Task = components['schemas']['Task']
export type TaskStatus = components['schemas']['TaskStatus']
export type TaskPriority = components['schemas']['TaskPriority']
export type CreateTaskRequest = components['schemas']['CreateTaskRequest']
export type UpdateTaskRequest = components['schemas']['UpdateTaskRequest']
export type PaginatedTasksResponse = components['schemas']['PaginatedTasksResponse']
export type ErrorResponse = components['schemas']['ErrorResponse']

export type HealthResponse = paths['/health']['get']['responses'][200]['content']['application/json']

export type TaskListParams = NonNullable<
  paths['/tasks']['get']['parameters']['query']
>

export const TASK_STATUSES: readonly TaskStatus[] = ['pendiente', 'en_curso', 'hecha']
export const TASK_PRIORITIES: readonly TaskPriority[] = ['baja', 'media', 'alta']

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  pendiente: 'Pendiente',
  en_curso: 'En curso',
  hecha: 'Hecha',
}

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  baja: 'Baja',
  media: 'Media',
  alta: 'Alta',
}

export const TASK_STATUS_BADGE_CLASSES: Record<TaskStatus, string> = {
  pendiente: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  en_curso: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
  hecha: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300',
}

export const TASK_PRIORITY_BADGE_CLASSES: Record<TaskPriority, string> = {
  baja: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  media: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
  alta: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300',
}