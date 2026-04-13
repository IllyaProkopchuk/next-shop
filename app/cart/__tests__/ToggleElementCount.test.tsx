import { useTransition } from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import ToggleElementCount from '../ToggleElementCount'

// Mock the server actions
vi.mock('@/app/lib/actions', () => ({
  changeQuantityAction: vi.fn(() => Promise.resolve({ success: true })),
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

describe('ToggleElementCount', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    image: '/test.png',
    price: 100
  }

  it('renders correctly with initial quantity', () => {
    render(<ToggleElementCount element={mockProduct} quantity={2} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('calls changeQuantityAction with "increase" when plus button is clicked', async () => {
    const { changeQuantityAction } = await import('@/app/lib/actions')
    render(<ToggleElementCount element={mockProduct} quantity={2} />)

    fireEvent.click(screen.getByText('+'))

    expect(changeQuantityAction).toHaveBeenCalledWith(mockProduct.id, 'increase')
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('calls changeQuantityAction with "decrease" when minus button is clicked', async () => {
    const { changeQuantityAction } = await import('@/app/lib/actions')
    render(<ToggleElementCount element={mockProduct} quantity={2} />)

    fireEvent.click(screen.getByText('-'))

    expect(changeQuantityAction).toHaveBeenCalledWith(mockProduct.id, 'decrease')
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('disables minus button when count is 1', () => {
    render(<ToggleElementCount element={mockProduct} quantity={1} />)
    expect(screen.getByText('-')).toBeDisabled()
  })

  it('shows pending state during update', () => {
    vi.mocked(useTransition).mockReturnValue([true, (cb: () => void) => cb()])
    render(<ToggleElementCount element={mockProduct} quantity={2} />)

    expect(screen.getByText('…')).toBeInTheDocument()
    expect(screen.getByText('+')).toBeDisabled()
    expect(screen.getByText('-')).toBeDisabled()
  })
})
