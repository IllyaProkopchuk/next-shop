import Image from 'next/image'
import Link from 'next/link'

import ToggleCardButton from '@/app/components/ToggleCardButton'
import { getProductById, getUserProductIds } from '@/app/lib/server-api'
import { Product, ProductId } from '@/app/types/products'

const Page = async ({ params }: { params: { id: ProductId } }) => {
  const { id } = await params
  const [product, cartIds]: [Product, ProductId[]] = await Promise.all([
    getProductById(id),
    getUserProductIds()
  ])

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <nav className="mb-8 text-sm text-gray-400">
        <Link href="/products" className="hover:text-white transition">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-200">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <section className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-800 border border-gray-700">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </section>

        <section className="flex flex-col">
          <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-blue-400">$ {product.price}</span>
            <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm">
              In Stock
            </div>
          </div>

          <div className="prose prose-invert mb-8 text-gray-300">
            <p>{product.description}</p>
          </div>

          <div className="space-y-6 pt-6 border-t border-gray-800">
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-500">Category:</span>
              <span className="text-gray-200">Electronics</span>
              <span className="text-gray-500">Brand:</span>
              <span className="text-gray-200">NextGen</span>
            </div>

            <div className="max-w-md">
              <ToggleCardButton product={product} cardsIds={cartIds} />
            </div>

            <p className="text-xs text-gray-500 italic">
              * Free shipping on orders over $100. 30-day return policy.
            </p>
          </div>
        </section>
      </div>

      <section className="mt-20 border-t border-gray-800 pt-10">
        <h2 className="text-2xl font-bold mb-6">Detailed Specifications</h2>
        <div className="max-w-2xl divide-y divide-gray-800">
          <div className="py-3 flex justify-between">
            <span className="text-gray-500">Weight</span>
            <span className="text-gray-200">1.2 kg</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="text-gray-500">Dimensions</span>
            <span className="text-gray-200">20 x 15 x 5 cm</span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page
