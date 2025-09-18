export interface ShippingAddress {
  details: string
  phone: string
  city: string
}

export interface User {
  _id: string
  name: string
  email: string
  phone: string
}

export interface Product {
  _id: string
  title: string
  imageCover: string
  category: {
    _id: string
    name: string
    slug: string
    image: string
  }
  brand: {
    _id: string
    name: string
    slug: string
    image: string
  }
  ratingsAverage: number
  ratingsQuantity: number
  id: string
}

export interface CartItem {
  count: number
  _id: string
  product: Product
  price: number
}

export interface Order {
  _id: string
  shippingAddress: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  user: User
  cartItems: CartItem[]
  paidAt: string
  createdAt: string
  updatedAt: string
  id: number
  __v: number
}
