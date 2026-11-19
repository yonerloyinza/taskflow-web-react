import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-6xl font-bold text-slate-300 dark:text-slate-700">404</p>
      <h2 className="mt-4 text-xl font-semibold">Página no encontrada</h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        La ruta solicitada no existe.
      </p>
      <Link
        to="/tasks"
        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Volver a Tareas
      </Link>
    </div>
  )
}