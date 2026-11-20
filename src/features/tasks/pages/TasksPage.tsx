import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Pagination } from '@/components/ui/Pagination'
import { useToastContext } from '@/components/ui'
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '../api'
import { TaskFiltersBar } from '../components/TaskFilters'
import { TaskTable } from '../components/TaskTable'
import { TaskModal } from '../components/TaskModal'
import { DeleteTaskModal } from '../components/DeleteTaskModal'
import { DEFAULT_FILTERS, DEFAULT_PAGE, DEFAULT_LIMIT } from '../types'
import type { TaskFilters } from '../types'
import type { CreateTaskForm } from '@/lib/validation'
import type { Task } from '@/types'

export default function TasksPage() {
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS)
  const [page, setPage] = useState(DEFAULT_PAGE)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined)
  const [deleteTask, setDeleteTask] = useState<Task | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const { addToast } = useToastContext()

  const { data, isLoading } = useTasks({
    ...filters,
    page,
    limit: DEFAULT_LIMIT,
  })

  const createMutation = useCreateTask()
  const updateMutation = useUpdateTask()
  const deleteMutation = useDeleteTask()

  const handleFiltersChange = (newFilters: TaskFilters) => {
    setFilters(newFilters)
    setPage(DEFAULT_PAGE)
  }

  const handleOpenCreate = () => {
    setEditingTask(undefined)
    setModalOpen(true)
  }

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditingTask(undefined)
  }

  const handleSubmit = (formData: CreateTaskForm) => {
    if (editingTask) {
      updateMutation.mutate(
        { id: editingTask.id, data: formData },
        {
          onSuccess: () => {
            addToast('Tarea actualizada correctamente', 'success')
            handleCloseModal()
          },
          onError: () => {
            addToast('Error al actualizar la tarea', 'error')
          },
        },
      )
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          addToast('Tarea creada correctamente', 'success')
          handleCloseModal()
        },
        onError: () => {
          addToast('Error al crear la tarea', 'error')
        },
      })
    }
  }

  const handleOpenDelete = (task: Task) => {
    setDeleteTask(task)
    setDeleteModalOpen(true)
  }

  const handleCloseDelete = () => {
    setDeleteModalOpen(false)
    setDeleteTask(null)
  }

  const handleConfirmDelete = () => {
    if (!deleteTask) return
    deleteMutation.mutate(deleteTask.id, {
      onSuccess: () => {
        addToast('Tarea eliminada correctamente', 'success')
        handleCloseDelete()
      },
      onError: () => {
        addToast('Error al eliminar la tarea', 'error')
      },
    })
  }

  const tasks = data?.data ?? []
  const meta = data?.meta
  const isModalLoading = createMutation.isPending || updateMutation.isPending
  const isDeleteLoading = deleteMutation.isPending

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tareas</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Gestiona las tareas del proyecto
          </p>
        </div>
        <Button onClick={handleOpenCreate}>Nueva tarea</Button>
      </div>

      <TaskFiltersBar filters={filters} onChange={handleFiltersChange} />

      <TaskTable
        tasks={tasks}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      {meta && meta.lastPage > 1 && (
        <div className="mt-6">
          <Pagination
            page={meta.page}
            limit={meta.limit}
            total={meta.total}
            lastPage={meta.lastPage}
            onPageChange={setPage}
          />
        </div>
      )}

      <TaskModal
        open={modalOpen}
        onClose={handleCloseModal}
        task={editingTask}
        onSubmit={handleSubmit}
        isLoading={isModalLoading}
      />

      <DeleteTaskModal
        open={deleteModalOpen}
        task={deleteTask}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleteLoading}
      />
    </div>
  )
}