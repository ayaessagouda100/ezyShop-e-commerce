'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function ProductSlider({ images }: { images: string[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {images.map((image) => (
        <div key={image} className="px-2">
          <Image
            src={image}
            alt="product image"
            width={1000}
            height={1000}
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-md"
          />
        </div>
      ))}
    </Slider>
  );
}