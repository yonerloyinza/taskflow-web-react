import { createBrowserRouter, Navigate } from 'react-router'
import { lazy, Suspense } from 'react'
import type { ReactNode } from 'react'
import { RootLayout } from './layouts/RootLayout'
import { PageLoader } from './components/PageLoader'

const TasksPage = lazy(() => import('./features/tasks/pages/TasksPage'))
const HealthPage = lazy(() => import('./features/health/pages/HealthPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function withSuspense(node: ReactNode) {
  return <Suspense fallback={<PageLoader />}>{node}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/tasks" replace /> },
      { path: 'tasks', element: withSuspense(<TasksPage />) },
      { path: 'health', element: withSuspense(<HealthPage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
])