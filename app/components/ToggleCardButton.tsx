'use client'

import { MouseEvent, useOptimistic, useTransition } from 'react'

import { refreshProductsAction } from '@/app/lib/actions'
import { addProductToUser, removeProductFromCart } from '@/app/lib/products-api'
import { Product, ProductId } from '@/app/types/products'

interface Props {
  product: Product
  cardsIds: ProductId[]
}

const ToggleCardButton = ({ product, cardsIds }: Props) => {
  const isInBucket: boolean = cardsIds.includes(product.id)

  const [isPending, startTransition] = useTransition()
  const [optimisticInCard, toggleOptimisticInCard] = useOptimistic(
    isInBucket,
    (state, newState: boolean) => newState
  )

  const handleAddToBucket = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    startTransition(async () => {
      toggleOptimisticInCard(!optimisticInCard)

      if (!isInBucket) {
        await addProductToUser(product.id)
      } else {
        await removeProductFromCart(product.id)
      }

      await refreshProductsAction()
    })
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleAddToBucket}
      aria-label={`Add ${product.name} to bucket`}
      className="cursor-pointer inline-block mt-2 w-full bg-blue-900 text-white text-sm py-2 px-3 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {optimisticInCard ? 'Remove from bucket' : 'Add to bucket'}
    </button>
  )
}

export default ToggleCardButton
