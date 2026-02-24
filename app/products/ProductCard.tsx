'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Product, ProductId } from '@/app/types/products'

import ToggleCardButton from '../components/ToggleCardButton'

type ProductCardProps = {
  product: Product
  cardIds: ProductId[]
}

const ProductCard = ({ product, cardIds }: ProductCardProps) => {
  return (
    <article
      className="relative flex flex-col h-full border rounded-lg p-4 w-64 bg-gray-400 shadow-sm group hover:bg-gray-300 transition-colors"
      aria-labelledby={`product-${product.id}`}
    >
      <figure className="w-full h-40 mb-3 overflow-hidden rounded shrink-0">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </figure>

      <div className="flex flex-col grow">
        <h2 id={`product-${product.id}`}>
          <Link
            href={`/products/${product.id}`}
            className="text-lg font-semibold mb-1 line-clamp-2 text-black min-h-14 
                   after:content-[''] after:absolute after:inset-0 after:z-10"
          >
            {product.name}
          </Link>
        </h2>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3 grow">{product.description}</p>

        <div className="mt-auto relative z-20">
          <ToggleCardButton product={product} cardsIds={cardIds} />
        </div>
      </div>
    </article>
  )
}

export default ProductCard
