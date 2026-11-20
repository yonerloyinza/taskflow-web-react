import { useToastContext } from './toast-context'
import { cn } from '@/lib/utils'

const variantClasses = {
  success: 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/50 dark:text-green-300',
  error: 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300',
  info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300',
}

const variantIcons = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastContext()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className={cn(
            'flex items-start gap-3 rounded-lg border p-4 shadow-lg animate-in slide-in-from-right-full',
            variantClasses[toast.variant],
          )}
        >
          <span className="text-lg font-bold">{variantIcons[toast.variant]}</span>
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="rounded p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
            aria-label="Cerrar notificación"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}