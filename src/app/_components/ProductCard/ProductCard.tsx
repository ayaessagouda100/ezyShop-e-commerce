'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { product } from '@/types/products.type';
import ButtonBtn from './../Button/Button';
import Link from 'next/link';
import ButtonWishlist from '../ButtonWishlist/ButtonWishlist';



export default function ProductCard({ product }: { product: product }) {
  const { category: { name }, imageCover, price, ratingsAverage, title, id } = product
  
  return (
    <>
  <Card className="py-5 border-0 relative flex flex-col h-full">
    <Link href={"/products/" + id} className="flex-1 flex flex-col">
      <CardHeader>
        <Image
          src={imageCover}
          alt={title}
          width={200}
          height={200}
          className="w-full h-50 object-contain rounded"
        />
      </CardHeader>
      <CardContent className="flex-1">
        <CardTitle className="text-yellow-500 pb-2">{name}</CardTitle>
        <CardTitle className="py-2">
          {title.split(" ").slice(0, 3).join(" ")}
        </CardTitle>
        <div className="flex justify-between items-center">
          <span>{price} EGP</span>
          <span>
            <i className="fa-solid fa-star text-yellow-400 mx-1"></i>
            {ratingsAverage}
          </span>
        </div>
      </CardContent>
    </Link>
    <CardFooter className="pt-3 gap-2 flex  flex-col">
      <ButtonBtn id={id} />
      <ButtonWishlist id={id}/>
    </CardFooter>
  </Card>
</>

  )
}
