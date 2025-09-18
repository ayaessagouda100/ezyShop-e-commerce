'use client'
import { Data } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";

export default function CategoryClientSlider({ data }: { data: Data[] }) {
  console.log(data)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ]
  };

  return (
    <>
      <div className="my-5 w-[90%] mx-auto">
        <div className="cursor-pointer">
          <Slider {...settings}>
            {data.map((obj) => (
              <div key={obj._id} className="px-1 rounded-full ">
                <Link  href={`/categories/${obj._id}`}>
      <Image
        src={obj.image}
        alt={obj.name}
        width={1000}
        height={1000}
        className="w-full h-40 object-center"
      />
      <h2 className="font-bold text-center pt-2">{obj.name}</h2>
    </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
