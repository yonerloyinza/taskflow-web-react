import type { TaskListParams } from '@/types'

export interface TaskFilters {
  status?: TaskListParams['status']
  priority?: TaskListParams['priority']
  assignee?: string
}

export interface TaskFormData {
  title: string
  description?: string
  status?: TaskListParams['status']
  priority?: TaskListParams['priority']
  assignee: string
  dueDate: string
}

export const DEFAULT_FILTERS: TaskFilters = {
  status: undefined,
  priority: undefined,
  assignee: undefined,
}

export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 10