import Link from 'next/link'

import { getProducts, getUserProductIds } from '@/app/lib/server-api'
import ProductCard from '@/app/products/ProductCard'
import { ProductId, Product as ProductType } from '@/app/types/products'

const Product = async () => {
  const [products, cardIds]: [ProductType[], ProductId[]] = await Promise.all([
    getProducts(),
    getUserProductIds()
  ])

  return (
    <main className="p-10">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/cart" aria-live="polite" className="text-sm text-white-300">
          Bucket: <span className="font-medium">{cardIds.length || 0}</span>
        </Link>
      </header>

      <section aria-label="Product list">
        <ul className="flex flex-wrap gap-4 p-4 list-none" role="list">
          {products.map((product: ProductType) => (
            <li key={product.id}>
              <ProductCard product={product} cardIds={cardIds} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Product
