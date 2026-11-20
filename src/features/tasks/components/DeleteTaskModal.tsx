import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import type { Task } from '@/types'

interface DeleteTaskModalProps {
  open: boolean
  task: Task | null
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export function DeleteTaskModal({ open, task, onClose, onConfirm, isLoading }: DeleteTaskModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Eliminar tarea"
      description="Esta acción no se puede deshacer"
    >
      <p className="text-sm text-slate-600 dark:text-slate-400">
        ¿Estás seguro de que quieres eliminar{' '}
        <span className="font-semibold text-slate-900 dark:text-slate-100">
          &quot;{task?.title}&quot;
        </span>
        ?
      </p>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
          Eliminar
        </Button>
      </div>
    </Modal>
  )
}