import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import ToggleCardButton from '../ToggleCardButton'

// Mock the server actions
vi.mock('@/app/lib/actions', () => ({
  addToCartAction: vi.fn(() => Promise.resolve({ success: true })),
  removeFromCartAction: vi.fn(() => Promise.resolve({ success: true }))
}))

// Mock Next.js hooks
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useTransition: () => [false, (cb: () => void) => cb()],
    useOptimistic: (state: unknown) => [state, vi.fn()]
  }
})

describe('ToggleCardButton', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    image: '/test.png',
    price: 100
  }

  it('renders "Add to bucket" when product is not in cart', () => {
    render(<ToggleCardButton product={mockProduct} cardsIds={[]} />)
    expect(screen.getByText('Add to bucket')).toBeInTheDocument()
  })

  it('renders "Remove from bucket" when product is already in cart', () => {
    render(<ToggleCardButton product={mockProduct} cardsIds={[1]} />)
    expect(screen.getByText('Remove from bucket')).toBeInTheDocument()
  })

  it('calls addToCartAction when clicked and not in cart', async () => {
    const { addToCartAction } = await import('@/app/lib/actions')
    render(<ToggleCardButton product={mockProduct} cardsIds={[]} />)

    fireEvent.click(screen.getByRole('button'))

    expect(addToCartAction).toHaveBeenCalledWith(mockProduct.id)
  })
})
