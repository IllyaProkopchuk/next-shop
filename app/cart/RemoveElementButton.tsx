'use client'

import { useTransition } from 'react'

import { refreshCartAction } from '@/app/lib/actions'
import { removeProductFromCart } from '@/app/lib/products-api'
import { ProductId } from '@/app/types/products'

interface Props {
  productId: ProductId
}

const RemoveElementButton = ({ productId }: Props) => {
  const [isPending, startTransition] = useTransition()

  const handleRemoveElement = async () => {
    startTransition(async () => {
      await removeProductFromCart(productId)

      await refreshCartAction()
    })
  }

  return (
    <button
      onClick={handleRemoveElement}
      className="text-sm text-red-500 hover:underline cursor-pointer min-h-11 inline-flex items-center px-1"
    >
      {isPending ? 'Видаляємо...' : 'Видалити'}
    </button>
  )
}

export default RemoveElementButton
