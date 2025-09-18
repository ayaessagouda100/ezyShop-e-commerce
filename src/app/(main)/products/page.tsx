import { product, Products } from '@/types/products.type'
import React from 'react'
import ProductCard from './../../_components/ProductCard/ProductCard';

export default async function ProductsPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`)
  const data: Products = await response.json()
  const productList: product[] = data.data

  return <>

<h2 className='font-semibold text-4xl  text-slate-700 p-10 '>Shop All products</h2>
    <div className="grid lg:grid-cols-5 md:grid-cols-2 w-[90%] mx-auto gap-6 py-5 pb-10">
      
      {
        productList.map((product) => {
          return <ProductCard key={product._id} product={product} />
        })
      }
    </div>
  </>
}

