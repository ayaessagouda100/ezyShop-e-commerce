import { Brands} from '@/types/brands.type'
import Image from 'next/image'
import React from 'react'

export default async function allBrands() {
  const response =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`)
  const data:Brands = await response.json()
  return (
    <div className="p-6 pb-10">
      <h2 className='font-semibold text-4xl  text-slate-700 p-10'>Shop by Brands</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data?.data.map((brand) => (
          <div
            key={brand._id}
            className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 "
          >
            <a href={`/brands/${brand._id}`}>
              <Image
              width={1000}
              height={1000}
                className="p-6 w-full h-40 object-contain "
                src={brand.image}
                alt={brand.name}
              />
            </a>
            <div className="px-4 pb-4">
              <h5 className=" font-semibold text-center text-gray-900 ">
                {brand.name}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
