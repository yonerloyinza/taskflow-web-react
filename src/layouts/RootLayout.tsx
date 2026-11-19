import { Outlet } from 'react-router'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden p-4 md:p-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}