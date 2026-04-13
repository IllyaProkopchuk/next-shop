const ProductDetailLoading = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-16 animate-pulse">
      <div className="h-4 w-48 bg-gray-800 rounded mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="aspect-square bg-gray-800 rounded-2xl"></div>

        <section className="flex flex-col space-y-4">
          <div className="h-10 w-3/4 bg-gray-800 rounded"></div>
          <div className="flex gap-4">
            <div className="h-8 w-24 bg-gray-800 rounded"></div>
            <div className="h-8 w-24 bg-gray-800 rounded-full"></div>
          </div>
          <div className="space-y-2 pt-4">
            <div className="h-4 w-full bg-gray-800 rounded"></div>
            <div className="h-4 w-full bg-gray-800 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-800 rounded"></div>
          </div>
          <div className="pt-6 border-t border-gray-800 space-y-4">
            <div className="h-12 w-full bg-gray-800 rounded"></div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ProductDetailLoading
