import { Spinner } from '@/components/ui/Spinner'
import { cn } from '@/lib/utils'

interface LoadingStateProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingState({ message = 'Cargando...', size = 'md', className }: LoadingStateProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-3 py-12', className)}
      role="status"
      aria-live="polite"
    >
      <Spinner size={size} />
      <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  )
}

export function TableLoadingState({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full space-y-2" role="status" aria-label="Cargando datos">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-12 w-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800"
        />
      ))}
    </div>
  )
}