'use client'

import { MouseEvent, useOptimistic, useTransition } from 'react'

import { addToCartAction, removeFromCartAction } from '@/app/lib/actions'
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

      const result = !isInBucket
        ? await addToCartAction(product.id)
        : await removeFromCartAction(product.id)

      if (!result.success) {
        alert(result.error || 'Щось пішло не так')
        // Optimistic UI автоматично відкотиться після завершення transition, 
        // оскільки ми не оновили cardIds через revalidatePath (якщо була помилка)
      }
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
