// Test smoke — verifica que el shell renderiza
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router'

describe('App smoke', () => {
  it('renderiza el shell con el título TaskFlow', () => {
    const router = createMemoryRouter(
      [{ path: '/', element: <div>TaskFlow</div> }],
    )
    render(<RouterProvider router={router} />)
    expect(screen.getByText('TaskFlow')).toBeInTheDocument()
  })
})