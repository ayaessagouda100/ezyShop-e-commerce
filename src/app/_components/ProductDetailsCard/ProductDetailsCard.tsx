import { productItem } from '@/types/productDetails.type'
import React from 'react'
import ButtonBtn from '../Button/Button'
import ProductSlider from '../ProductSlider/ProductSlider'

export default function ProductDetailsCard({ product }: { product: productItem }) {
  const { category: { name }, price, ratingsAverage, title, id, description, images } = product

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 items-start py-5 my-5 gap-6">
        <div className="md:col-span-5 p-4 sm:p-6 rounded-md">
          <ProductSlider images={images} />
        </div>
        <div className="md:col-span-7">
          <h2 className="text-yellow-500 pb-2 text-lg sm:text-xl">{name}</h2>
          <h1 className="font-bold mb-2 text-xl sm:text-2xl md:text-3xl">{title}</h1>
          <p className="mb-3 text-gray-700 text-sm sm:text-base">{description}</p>
          <div className="flex justify-between items-center pb-5">
            <span className="font-semibold text-lg">{price} EGP</span>
            <span className="me-5 font-semibold flex items-center">
              <i className="fa-solid fa-star text-yellow-400 mx-1"></i>
              {ratingsAverage}
            </span>
          </div>
          <ButtonBtn id={id} />
        </div>
      </div>
    </div>
  )
}