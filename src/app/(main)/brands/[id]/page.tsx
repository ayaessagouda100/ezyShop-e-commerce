import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default async function BrandPage({ params }: { params: { id: string } }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands/${params.id}`, {
    cache: "no-store" // علشان يجيب أحدث بيانات كل مرة
  })
  const brand = await response.json()
  const data = brand.data

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50">
      <Card className="w-full max-w-md md:max-w-lg rounded-2xl shadow-lg">
        <CardContent className="flex flex-col items-center space-y-6">
          <Image
            width={400}
            height={300}
            src={data.image}
            alt={data.name}
            className="w-full h-48 sm:h-64 object-contain rounded-lg p-2"
          />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-700">{data.name}</h2>
          <Link href="/brands" className="w-full">
            <Button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
              Back to all brands
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}