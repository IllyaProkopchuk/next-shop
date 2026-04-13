import { useTransition } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import RemoveElementButton from '../RemoveElementButton'

// Mock the server actions
vi.mock('@/app/lib/actions', () => ({
  removeFromCartAction: vi.fn(() => Promise.resolve({ success: true }))
}))

// Mock Next.js hooks
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useTransition: vi.fn(() => [false, (cb: () => void) => cb()])
  }
})

describe('RemoveElementButton', () => {
  const productId = 1

  it('renders correctly', () => {
    render(<RemoveElementButton productId={productId} />)
    expect(screen.getByText('Видалити')).toBeInTheDocument()
  })

  it('calls removeFromCartAction when clicked', async () => {
    const { removeFromCartAction } = await import('@/app/lib/actions')
    render(<RemoveElementButton productId={productId} />)
    
    fireEvent.click(screen.getByText('Видалити'))
    
    expect(removeFromCartAction).toHaveBeenCalledWith(productId)
  })

  it('shows pending state when isPending is true', () => {
    vi.mocked(useTransition).mockReturnValue([true, (cb: () => void) => cb()])
    
    render(<RemoveElementButton productId={productId} />)
    expect(screen.getByText('Видаляємо...')).toBeInTheDocument()
  })
})
