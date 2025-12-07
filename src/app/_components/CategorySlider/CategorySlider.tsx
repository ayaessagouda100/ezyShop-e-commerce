import React from 'react'
import CategoryClientSlider from '../CategoryClientSlider/CategoryClientSlider';

export default async function CategorySlider() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`, {
      cache: "no-store"
    })
    const { data } = await response.json()

    return (
      <>
        <h1 className="py-5 pt-10 font-bold text-2xl px-4 md:px-12">
          Shop Popular Categories
        </h1>
        <CategoryClientSlider data={data} />
      </>
    )
  } catch (error) {
    return (
      <p className="text-red-500 px-4 md:px-12">
        Failed to load categories
      </p>
    )
  }
}