export type Product = {
  id: ProductId
  name: string
  description: string
  image: string
  price: number
}

export type ProductId = number

export type CartItem = {
  id: ProductId
  quantity: number
}
