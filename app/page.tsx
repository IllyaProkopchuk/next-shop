import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">Welcome to Next Shop</h1>
      <p className="max-w-xl text-gray-300">
        Discover a curated selection of products and manage your cart with a simple,
        modern interface.
      </p>
      <div className="flex gap-4">
        <Link
          href="/products"
          className="rounded-lg bg-yellow-500 px-6 py-3 text-sm font-semibold text-black shadow hover:bg-yellow-400 transition-colors"
        >
          Go to products
        </Link>
        <Link
          href="/cart"
          className="rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-200 hover:bg-gray-800 transition-colors"
        >
          View cart
        </Link>
      </div>
    </section>
  );
}
