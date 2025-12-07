'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
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
    <div className="grid grid-cols-12 gap-4 my-5 px-4">
      <div className="col-span-12 md:col-span-8">
        <Slider {...settings}>
          <div>
            <Image
              src="/images/slider.gif"
              alt="slider"
              width={1000}
              height={1000}
              className="w-full h-40 sm:h-60 md:h-72 object-cover rounded-md"
            />
          </div>
          <div>
            <Image
              src="/images/womenfashion.avif"
              alt="women fashion"
              width={1000}
              height={1000}
              className="w-full h-40 sm:h-60 md:h-72 object-cover rounded-md"
            />
          </div>
          <div>
            <Image
              src="/images/calvin.avif"
              alt="calvin"
              width={1000}
              height={1000}
              className="w-full h-40 sm:h-60 md:h-72 object-cover rounded-md"
            />
          </div>
          <div>
            <Image
              src="/images/5691814.jpg"
              alt="fashion"
              width={1000}
              height={1000}
              className="w-full h-40 sm:h-60 md:h-72 object-cover rounded-md"
            />
          </div>
          <div>
            <Image
              src="/images/renewed.avif"
              alt="renewed"
              width={1000}
              height={1000}
              className="w-full h-40 sm:h-60 md:h-72 object-cover rounded-md"
            />
          </div>
          <div>
            <Image
              src="/images/iphone17.avif"
              alt="iphone"
              width={1000}
              height={1000}
              className="w-full h-40 sm:h-60 md:h-72 object-cover rounded-md"
            />
          </div>
          <div>
            <Image
              src="/images/a1373427-dc4e-4861-a959-c19b35b53c6e.avif"
              alt="accessories"
              width={1000}
              height={1000}
              className="w-full h-40 sm:h-60 md:h-72 object-cover rounded-md"
            />
          </div>
        </Slider>
      </div>

      <div className="col-span-12 md:col-span-4">
        <Image
          src="/images/New_Arrival_2.png"
          alt="groceries"
          width={1000}
          height={1000}
          className="w-full h-40 sm:h-60 md:h-72 object-cover rounded-md"
        />
      </div>
    </div>
  );
}