import { Button } from './Button'
import { cn } from '@/lib/utils'

export interface PaginationProps {
  page: number
  limit: number
  total: number
  lastPage: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ page, limit, total, lastPage, onPageChange, className }: PaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * limit + 1
  const to = Math.min(page * limit, total)

  return (
    <div className={cn('flex flex-col items-center justify-between gap-4 sm:flex-row', className)}>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Mostrando <span className="font-medium text-slate-700 dark:text-slate-300">{from}</span>–
        <span className="font-medium text-slate-700 dark:text-slate-300">{to}</span> de{' '}
        <span className="font-medium text-slate-700 dark:text-slate-300">{total}</span>
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Anterior
        </Button>
        <span className="px-2 text-sm text-slate-600 dark:text-slate-400">
          {page} / {lastPage}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= lastPage}
          onClick={() => onPageChange(page + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}