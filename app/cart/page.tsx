import Image from 'next/image'
import Link from 'next/link'

import ToggleElementCount from '@/app/cart/ToggleElementCount'
import { getUserCartData } from '@/app/lib/server-api'
import { ProductId } from '@/app/types/products'

const CartPage = async () => {
  const { products: cartItems, productIds: cartItemIds } = await getUserCartData()

  const getQuantity = (id: ProductId): number =>
    cartItemIds.filter(productId => productId === id).length || 1

  const totalPrice = cartItems.reduce((acc, el) => acc + el.price * getQuantity(el.id), 0)
  const taxes = Math.floor(totalPrice * 0.1)

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-white">Кошик ({cartItems.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <section className="lg:col-span-2 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-800">
                  <div className="w-full h-full bg-gray-700 animate-pulse" />
                  <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                </div>

                <div className="grow">
                  <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                  <ToggleElementCount element={item} quantity={getQuantity(item.id)} />
                </div>

                <div className="text-right">
                  <span className="text-xl font-bold text-white">
                    ${item.price * getQuantity(item.id)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-900 rounded-xl border border-dashed border-gray-700">
              <p className="text-gray-400">Твій кошик порожній</p>
              <Link href="/products" className="text-blue-500 hover:underline mt-2 inline-block">
                Перейти до покупок
              </Link>
            </div>
          )}
        </section>

        <aside className="bg-gray-900 p-6 rounded-xl border border-gray-800 lg:sticky lg:top-24">
          <h2 className="text-xl font-bold mb-6 text-white">Підсумок замовлення</h2>

          <div className="space-y-4 text-gray-300">
            <div className="flex justify-between">
              <span>Товари ({cartItemIds.length})</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Доставка</span>
              <span className="text-green-500">Безкоштовно</span>
            </div>
            <div className="flex justify-between">
              <span>Податки</span>
              <span>${taxes}</span>
            </div>

            <hr className="border-gray-800 my-4" />

            <div className="flex justify-between text-xl font-bold text-white">
              <span>Разом</span>
              <span>${totalPrice + taxes}</span>
            </div>
          </div>

          <button className="w-full mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-xl transition-colors">
            Оформити замовлення
          </button>

          <div className="mt-4 flex flex-col gap-2">
            <p className="text-xs text-gray-500 text-center">
              Приймаємо до оплати: Visa, MasterCard, Crypto
            </p>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default CartPage
