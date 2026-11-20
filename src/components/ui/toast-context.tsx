import { createContext, useCallback, useContext, useState } from 'react'

export type ToastVariant = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  variant: ToastVariant
}

export interface ToastContextValue {
  toasts: Toast[]
  addToast: (message: string, variant?: ToastVariant) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToastContext must be used within ToastProvider')
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (message: string, variant: ToastVariant = 'info') => {
      const id = crypto.randomUUID()
      setToasts((prev) => [...prev, { id, message, variant }])
      setTimeout(() => removeToast(id), 5000)
    },
    [removeToast],
  )

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}