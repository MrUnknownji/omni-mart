"use client";
import React from "react";
import { Autoplay, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import { SlideContent } from "@/lib/types";
import { useGlobalData } from "../Context/GlobalData";

const CarouselSlide: React.FC<SlideContent> = ({
  imageSrc,
  title,
  subtitle,
}) => (
  <div className="swiper-slide">
    <Image
      className="w-full h-full object-cover object-center"
      src={imageSrc}
      alt={title}
      width={500}
      height={500}
    />
    <div className="w-full h-full absolute top-0 left-0 bg-background/25 dark:bg-background/50 flex flex-col justify-center items-start gap-2 pl-8">
      <h1 className="font-bold text-5xl" data-swiper-parallax="-500">
        {title}
      </h1>
      <h2 className="text-2xl" data-swiper-parallax="-200">
        {subtitle}
      </h2>
    </div>
  </div>
);

export default function Carousel() {
  const { slideContents } = useGlobalData();
  return (
    <div className="flex items-center h-[80vh] w-[90%] rounded-3xl m-auto mt-[5vh] justify-center overflow-hidden">
      <Swiper
        modules={[Autoplay, Parallax]}
        centeredSlides={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={1500}
        parallax={true}
        loop={true}
        allowTouchMove={false}
      >
        {slideContents.map((slideContent, index) => (
          <SwiperSlide key={index}>
            <CarouselSlide {...slideContent} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
