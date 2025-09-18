import React from 'react'
import CategoryClientSlider from '../CategoryClientSlider/CategoryClientSlider';

export default async function CategorySlider() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`)
  const {data}= await response.json()
  return (
    <>
      <h1 className='py-5  pt-10  font-bold text-2xl ms-12 '>
        Shop Popular Categories
      </h1>
    <CategoryClientSlider data={data} />
    </>
  )
}
