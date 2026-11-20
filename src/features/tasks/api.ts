import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { queryKeys } from '@/lib/query-keys'
import type {
  CreateTaskRequest,
  PaginatedTasksResponse,
  Task,
  TaskListParams,
  UpdateTaskRequest,
} from '@/types'

export function useTasks(params?: TaskListParams) {
  return useQuery<PaginatedTasksResponse>({
    queryKey: queryKeys.tasks.list(params),
    queryFn: ({ signal }) =>
      api.get<PaginatedTasksResponse>('/tasks', {
        query: params as Record<string, string | number | undefined> | undefined,
        signal,
      }),
  })
}

export function useTask(id: string) {
  return useQuery<Task>({
    queryKey: queryKeys.tasks.detail(id),
    queryFn: ({ signal }) => api.get<Task>(`/tasks/${id}`, { signal }),
    enabled: Boolean(id),
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation<Task, Error, CreateTaskRequest>({
    mutationFn: (body) => api.post<Task>('/tasks', body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tasks.lists() })
    },
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation<Task, Error, { id: string; data: UpdateTaskRequest }, { previous?: Task }>({
    mutationFn: ({ id, data }) => api.patch<Task>(`/tasks/${id}`, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.tasks.detail(id) })

      const previous = queryClient.getQueryData<Task>(queryKeys.tasks.detail(id))

      if (previous) {
        const optimistic: Task = {
          ...previous,
          ...data,
          description: data.description !== undefined ? data.description : previous.description,
          updatedAt: new Date().toISOString(),
        }
        queryClient.setQueryData<Task>(queryKeys.tasks.detail(id), optimistic)
      }

      return { previous }
    },
    onError: (_err, { id }, context) => {
      if (context?.previous) {
        queryClient.setQueryData<Task>(queryKeys.tasks.detail(id), context.previous)
      }
    },
    onSettled: (_data, _error, { id }) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tasks.detail(id) })
      void queryClient.invalidateQueries({ queryKey: queryKeys.tasks.lists() })
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: (id) => api.delete<void>(`/tasks/${id}`),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tasks.lists() })
    },
  })
}