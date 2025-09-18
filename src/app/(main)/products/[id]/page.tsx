import ProductDetailsCard from '@/app/_components/ProductDetailsCard/ProductDetailsCard'
import { ProductDetails, productItem } from '@/types/productDetails.type'
import React from 'react'


export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`)
  const data: ProductDetails = await response.json()
  const product: productItem = data.data
  return (
    <div>
      <ProductDetailsCard product={product} />
    </div>
  )
}
