const ProductLoading = () => {
  return (
    <main className="p-10 animate-pulse">
      <header className="flex items-center justify-between mb-6">
        <div className="h-8 w-48 bg-gray-800 rounded"></div>
        <div className="h-4 w-24 bg-gray-800 rounded"></div>
      </header>

      <section aria-label="Loading products">
        <div className="flex flex-wrap gap-4 p-4 list-none">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col h-[320px] w-64 border border-gray-800 rounded-lg p-4 bg-gray-900 shadow-sm">
              <div className="w-full h-40 mb-3 bg-gray-800 rounded"></div>
              <div className="h-6 w-3/4 bg-gray-800 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-800 rounded mb-4"></div>
              <div className="mt-auto h-10 w-full bg-gray-800 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default ProductLoading
