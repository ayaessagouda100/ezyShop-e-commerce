

import { Card, CardContent } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"


export default async function BrandPage({ params }:{params:{id:string}}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands/${params.id}`)
  const brand = await response.json()
  const data = brand.data

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50">
      <Card className=" md:w-1/3 w-1/2 rounded-2xl">
        
        <CardContent className="flex flex-col items-center space-y-4">
          <Image
            width={1000}
            height={1000}
            src={data.image}
            alt={data.name}
            className="w-full h-full object-contain rounded-lg  p-2"
          />
          
          <Link href="/brands">
            <Button className="mt-4 w-full bg-yellow-400 cursor-pointer"> back to all brands</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
