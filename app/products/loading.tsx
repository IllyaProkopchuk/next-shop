import Image from 'next/image'

import ImgPlaceholder from '@/app/shared/sceletonImagePlaceholder.png'

export default function Loading() {
  const products = new Array(5).fill(1)

  return (
    <main className="p-10">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-sm text-white-300">
          Bucket: <span className="font-medium">Loading</span>
        </p>
      </header>

      <section aria-label="Product list">
        <ul className="flex flex-wrap gap-4 p-4 list-none" role="list">
          {products.map((_, index: number) => (
            <li key={index}>
              <SceletonProductCard />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

const SceletonProductCard = () => {
  return (
    <article className="flex flex-col h-full border rounded-lg p-4 w-64 bg-gray-200 shadow-sm animate-pulse">
      <figure className="relative w-full h-40 mb-3 overflow-hidden rounded shrink-0 bg-gray-300">
        <Image
          src={ImgPlaceholder}
          alt="Loading..."
          fill
          className="object-cover opacity-50"
          priority
        />
      </figure>

      <div className="space-y-3">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-10 bg-gray-300 rounded w-full mt-4"></div>
      </div>
    </article>
  )
}
