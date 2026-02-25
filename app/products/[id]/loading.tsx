const ProductPageSkeleton = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-16 animate-pulse">
      <nav className="mb-8 flex items-center gap-2">
        <div className="h-4 w-16 bg-gray-300  rounded"></div>
        <div className="h-4 w-4 bg-gray-300  rounded"></div>
        <div className="h-4 w-32 bg-gray-300  rounded"></div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <section>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-300  border border-gray-700">
            <div className="w-full h-full bg-gray-300 "></div>
          </div>
        </section>

        <section className="flex flex-col">
          <div className="h-10 w-3/4 bg-gray-300  rounded mb-4"></div>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-9 w-24 bg-gray-300  rounded"></div>
            <div className="h-7 w-20 bg-gray-300  rounded-full"></div>
          </div>

          <div className="space-y-3 mb-8">
            <div className="h-4 w-full bg-gray-300  rounded"></div>
            <div className="h-4 w-full bg-gray-300  rounded"></div>
            <div className="h-4 w-2/3 bg-gray-300  rounded"></div>
          </div>

          {/* Характеристики та Кнопка */}
          <div className="space-y-6 pt-6 border-t border-gray-800">
            <div className="grid grid-cols-2 gap-y-4 max-w-xs">
              <div className="h-4 w-16 bg-gray-300  rounded"></div>
              <div className="h-4 w-24 bg-gray-300  rounded"></div>
              <div className="h-4 w-16 bg-gray-300  rounded"></div>
              <div className="h-4 w-24 bg-gray-300  rounded"></div>
            </div>

            <div className="h-12 max-w-md bg-gray-300  rounded-lg"></div>

            <div className="h-3 w-48 bg-gray-300  rounded italic"></div>
          </div>
        </section>
      </div>

      <section className="mt-20 border-t border-gray-800 pt-10">
        <div className="h-8 w-48 bg-gray-300  rounded mb-6"></div>
        <div className="max-w-2xl space-y-4">
          <div className="py-3 flex justify-between border-b border-gray-800">
            <div className="h-4 w-20 bg-gray-300  rounded"></div>
            <div className="h-4 w-24 bg-gray-300  rounded"></div>
          </div>
          <div className="py-3 flex justify-between border-b border-gray-800">
            <div className="h-4 w-20 bg-gray-300  rounded"></div>
            <div className="h-4 w-32 bg-gray-300  rounded"></div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductPageSkeleton
