import React from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import ProductCard from '../ProductCard'

// Mock the server actions to avoid DB connection issues
vi.mock('@/app/lib/actions', () => ({
  addToCartAction: vi.fn(() => Promise.resolve({ success: true })),
  removeFromCartAction: vi.fn(() => Promise.resolve({ success: true }))
}))

// Mock ToggleCardButton since it's tested separately
vi.mock('../../components/ToggleCardButton', () => ({
  default: () => <button>ToggleCardButton Mock</button>
}))

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  )
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
}))

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    image: '/test.png',
    price: 100
  }

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} cardIds={[]} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '/test.png')
    expect(image).toHaveAttribute('alt', 'Test Product')
  })

  it('renders a link to the product details page', () => {
    render(<ProductCard product={mockProduct} cardIds={[]} />)

    const link = screen.getByRole('link', { name: 'Test Product' })
    expect(link).toHaveAttribute('href', '/products/1')
  })

  it('renders the ToggleCardButton', () => {
    render(<ProductCard product={mockProduct} cardIds={[]} />)
    expect(screen.getByText('ToggleCardButton Mock')).toBeInTheDocument()
  })
})
