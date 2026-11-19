export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">✓</span>
          <h1 className="text-lg font-bold tracking-tight">TaskFlow</h1>
        </div>
        <nav className="flex items-center gap-4">
          <a
            href="https://taskflow-react.xprad.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            taskflow.xprad.com
          </a>
        </nav>
      </div>
    </header>
  )
}