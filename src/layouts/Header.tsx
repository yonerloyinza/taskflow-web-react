import { Link, useLocation } from 'react-router'
import { useDarkMode } from '@/hooks/useDarkMode'
import { BackendSelector } from './BackendSelector'

const NAV_ITEMS = [
  { to: '/tasks', label: 'Tareas', icon: '✓' },
  { to: '/health', label: 'Health', icon: '♥' },
]

export function Header() {
  const { pathname } = useLocation()
  const { isDark, toggle } = useDarkMode()

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">✓</span>
          <h1 className="text-lg font-bold tracking-tight">TaskFlow</h1>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-1 sm:flex">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.to || pathname.startsWith(item.to + '/')
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={[
                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <BackendSelector />
          <button
            onClick={toggle}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDark ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}