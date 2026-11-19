import { Link, useLocation } from 'react-router'

const NAV_ITEMS = [
  { to: '/tasks', label: 'Tareas', icon: '✓' },
  { to: '/health', label: 'Health', icon: '♥' },
]

export function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:block">
      <nav className="flex flex-col gap-1">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Navegación
        </p>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.to || pathname.startsWith(item.to + '/')
          return (
            <Link
              key={item.to}
              to={item.to}
              className={[
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
              ].join(' ')}
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}