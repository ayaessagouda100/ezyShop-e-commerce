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
    <div className="grid grid-cols-12 my-5">
      <div className=" col-span-8">
        <Slider {...settings}>
          <div>
            <Image src='/images/slider.gif' alt="image4" width={1000} height={1000}  className="w-full h-60 object-cover" />
          </div>
          <div>
            <Image src='/images/womenfashion.avif' alt="image4" width={1000} height={1000} className="w-full h-60 object-cover" />
          </div>
          <div>
            <Image src='/images/calvin.avif' alt="image6" width={1000} height={1000} className="w-full h-60 object-cover" />
          </div>
          <div>
            <Image src='/images/5691814.jpg' alt="image4" width={1000} height={1000} className="w-full h-60 object-cover" />
          </div>
          <div>
            <Image src='/images/renewed.avif' alt="image3" width={1000} height={1000} className="w-full h-60 object-cover" />
          </div>
          <div>
            <Image src='/images/iphone17.avif' alt="image1" width={1000} height={1000} className="w-full h-60 object-cover" />
          </div>
          <div>
            <Image src='/images/a1373427-dc4e-4861-a959-c19b35b53c6e.avif' alt="image2" width={1000} height={1000} className="w-full h-60 object-cover" />
          </div>
        </Slider>
      </div>
      <div className="col-span-12 md:col-span-4">
        <Image src='/images/New_Arrival_2.png' alt="groceries" width={1000} height={1000} className="w-full h-60 object-cover" />
      </div>
    </div>
  );
}