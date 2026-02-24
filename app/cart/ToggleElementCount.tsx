'use client'

import RemoveElementButton from '@/app/cart/RemoveElementButton'
import { Product } from '@/app/types/products'

interface Props {
  element: Product
}

const ToggleElementCount = ({ element }: Props) => {
  return (
    <div className="flex items-center gap-4 mt-2">
      <div className="flex items-center border border-gray-700 rounded-md">
        <button className="px-3 py-1 hover:bg-gray-800 text-gray-400">-</button>
        <span className="px-3 py-1 text-white border-x border-gray-700">1</span>
        <button className="px-3 py-1 hover:bg-gray-800 text-gray-400">+</button>
      </div>
      <RemoveElementButton productId={element.id} />
    </div>
  )
}

export default ToggleElementCount
