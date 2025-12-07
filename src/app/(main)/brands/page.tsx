import { Brands } from '@/types/brands.type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function AllBrands() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`, {
    cache: "no-store" // علشان يجيب أحدث بيانات كل مرة
  })
  const data: Brands = await response.json()

  return (
    <div className="p-6 pb-10">
      <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-slate-700 px-4 md:px-10 py-6 text-center md:text-left">
        Shop by Brands
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data?.data.map((brand) => (
          <div
            key={brand._id}
            className="w-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 dark:bg-gray-800"
          >
            <Link href={`/brands/${brand._id}`}>
              <Image
                width={300}
                height={200}
                className="p-6 w-full h-32 sm:h-40 object-contain"
                src={brand.image}
                alt={brand.name}
              />
            </Link>
            <div className="px-4 pb-4">
              <h5 className="font-semibold text-center text-gray-900 dark:text-white">
                {brand.name}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}