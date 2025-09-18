import { product, Products } from "@/types/products.type";
import ProductCard from "./_components/ProductCard/ProductCard";
import MainSlider from "./_components/MainSlider/MainSlider";
import { Suspense } from "react";
import { HomeSkeleton } from "./_components/HomeSkeleton/HomeSkeleton";
import CategorySlider from "./_components/CategorySlider/CategorySlider";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?sort=-price`)
  const data: Products = await response.json()
  const productList: product[] = data.data
  return <>
    <div className="w-full bg-yellow-400 text-white text-center text-sm py-2">
      🎉 Back to School Sale – Up to 50% Off!
    </div>
    <MainSlider />
    <CategorySlider />
    <div className="grid lg:grid-cols-5 md:grid-cols-2 w-[90%] mx-auto gap-6 py-5 pb-10">
      <Suspense fallback={<HomeSkeleton />}>
        {
          productList.map((product) => {
            return <ProductCard key={product._id} product={product} />
          })
        }
      </Suspense>
    </div>
  </>
}
