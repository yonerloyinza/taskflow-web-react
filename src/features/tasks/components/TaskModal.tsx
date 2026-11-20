import { Modal } from '@/components/ui/Modal'
import { TaskForm } from './TaskForm'
import type { CreateTaskForm } from '@/lib/validation'
import type { Task } from '@/types'

interface TaskModalProps {
  open: boolean
  onClose: () => void
  task?: Task
  onSubmit: (data: CreateTaskForm) => void
  isLoading?: boolean
}

export function TaskModal({ open, onClose, task, onSubmit, isLoading }: TaskModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={task ? 'Editar tarea' : 'Nueva tarea'}
      description={task ? 'Modifica los campos y guarda los cambios' : 'Completa los datos de la nueva tarea'}
    >
      <TaskForm task={task} onSubmit={onSubmit} onCancel={onClose} isLoading={isLoading} />
    </Modal>
  )
}