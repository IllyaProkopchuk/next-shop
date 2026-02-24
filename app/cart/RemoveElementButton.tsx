'use client'

import { refreshCartAction } from '@/app/lib/actions'
import { removeProductFromCart } from '@/app/lib/products-api'
import { ProductId } from '@/app/types/products'
import { useTransition } from 'react'

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
      className="text-sm text-red-500 hover:underline cursor-pointer"
    >
      {isPending ? 'Видаляємо...' : 'Видалити'}
    </button>
  )
}

export default RemoveElementButton
