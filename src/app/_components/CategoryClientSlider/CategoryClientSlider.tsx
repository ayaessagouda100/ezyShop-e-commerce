'use client'
import { Data } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";

export default function CategoryClientSlider({ data }: { data: Data[] }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="my-5 w-[95%] mx-auto">
      <Slider {...settings}>
        {data.map((obj) => (
          <div key={obj._id} className="px-2">
            <Link href={`/categories/${obj._id}`}>
              <div className="flex flex-col items-center">
                <Image
                  src={obj.image}
                  alt={obj.name}
                  width={200}
                  height={200}
                  className="w-full h-32 sm:h-40 object-cover rounded-md"
                />
                <h2 className="font-semibold text-center pt-2 text-sm sm:text-base">
                  {obj.name}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}