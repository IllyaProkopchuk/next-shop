'use client'

import { useEffect, useState, useTransition } from 'react'

import RemoveElementButton from '@/app/cart/RemoveElementButton'
import { refreshCartAction } from '@/app/lib/actions'
import { changeCartItemQuantity } from '@/app/lib/products-api'
import { Product } from '@/app/types/products'

interface Props {
  element: Product
  quantity: number
}

const ToggleElementCount = ({ element, quantity }: Props) => {
  const [count, setCount] = useState<number>(quantity)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setCount(quantity)
  }, [quantity])

  const updateQuantity = (action: 'increase' | 'decrease') => {
    setCount(prev => {
      if (action === 'decrease') {
        return Math.max(1, prev - 1)
      }

      return prev + 1
    })

    startTransition(async () => {
      await changeCartItemQuantity(element.id, action)
      await refreshCartAction()
    })
  }

  return (
    <div className="flex items-center gap-4 mt-2">
      <div className="flex items-center border border-gray-700 rounded-md">
        <button
          type="button"
          onClick={() => updateQuantity('decrease')}
          className="px-3 py-1 hover:bg-gray-800 text-gray-400 disabled:opacity-40"
          disabled={count <= 1 || isPending}
        >
          -
        </button>
        <span className="px-3 py-1 text-white border-x border-gray-700">
          {isPending ? 'Loading...' : count}
        </span>
        <button
          type="button"
          onClick={() => updateQuantity('increase')}
          className="px-3 py-1 hover:bg-gray-800 text-gray-400 disabled:opacity-40"
          disabled={isPending}
        >
          +
        </button>
      </div>
      <RemoveElementButton productId={element.id} />
    </div>
  )
}

export default ToggleElementCount
