import { useEffect, useRef, useState } from 'react'
import { useBackend } from '@/hooks/useBackend'
import { useBackendHealth, type HealthStatus } from '@/hooks/useBackendHealth'
import { cn } from '@/lib/utils'
import type { Backend } from '@/lib/backends'

const DOT_CLASSES: Record<HealthStatus, string> = {
  up: 'bg-green-500',
  down: 'bg-red-500',
  checking: 'bg-amber-400 animate-pulse',
}

function HealthDot({ status, className }: { status: HealthStatus; className?: string }) {
  return (
    <span
      className={cn('inline-block h-2 w-2 shrink-0 rounded-full', DOT_CLASSES[status], className)}
      aria-hidden
    />
  )
}

function BackendOption({
  backend,
  selected,
  onSelect,
}: {
  backend: Backend
  selected: boolean
  onSelect: () => void
}) {
  const { status } = useBackendHealth(backend.id)

  return (
    <button
      type="button"
      onClick={onSelect}
      role="option"
      aria-selected={selected}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors',
        selected
          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
      )}
    >
      <HealthDot status={status} />
      <span className="flex-1 font-medium">{backend.name}</span>
      <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
        {backend.shortName}
      </span>
    </button>
  )
}

export function BackendSelector() {
  const { backend, backendId, setBackend, backends } = useBackend()
  const { status } = useBackendHealth(backendId)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const statusLabel: Record<HealthStatus, string> = {
    up: 'disponible',
    down: 'sin respuesta',
    checking: 'verificando',
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Backend: ${backend.name}, ${statusLabel[status]}`}
        className={cn(
          'flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-sm font-medium transition-colors',
          'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
          'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
        )}
      >
        <HealthDot status={status} />
        <span className="max-w-[7rem] truncate">{backend.name}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn('transition-transform', open && 'rotate-180')}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Seleccionar backend"
          className={cn(
            'absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border p-1 shadow-lg',
            'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900',
            'animate-in fade-in-0 zoom-in-95',
          )}
        >
          <p className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            API Backends
          </p>
          <div className="max-h-80 overflow-y-auto">
            {backends.map((b) => (
              <BackendOption
                key={b.id}
                backend={b}
                selected={b.id === backendId}
                onSelect={() => {
                  setBackend(b.id)
                  setOpen(false)
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}