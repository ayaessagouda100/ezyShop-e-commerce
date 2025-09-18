import { productItem } from '@/types/productDetails.type'
import React from 'react'
import ButtonBtn from '../Button/Button'
import ProductSlider from '../ProductSlider/ProductSlider'

export default function ProductDetailsCard({ product }: { product: productItem }) {
  const { category: { name }, price, ratingsAverage, title, id, description, images } = product
  
  
  return (
    <>
      <div className='w-[90%] mx-auto '>
        <div className='grid grid-cols-12 items-center  py-5 my-5 gap-4'>
          <div className='col-span-4 p-10 rounded rounded-4'>
            <ProductSlider images={images} />
          </div>
          <div className='col-span-8'>
            <h2 className='text-yellow-500 pb-2'>{name}</h2>
            <h1 className='font-bold mb-2'>{title}</h1>
            <p className='mb-3'>{description}</p>
            <div className='flex justify-between items-center pb-5'>
              <span className='font-semibold'>{price} EGP</span>
              <span className='me-5 font-semibold'> <i className='fa-solid fa-star text-yellow-400 mx-1 '></i>{ratingsAverage}</span>
            </div>
            <ButtonBtn id={id}/>
          </div>
        </div>
      </div>
    </>
  )
}
;