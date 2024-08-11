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
  <div className="swiper-slide relative">
    <Image
      className="w-full h-full object-cover object-center"
      src={imageSrc}
      alt={title}
      layout="fill"
    />
    <div className="absolute inset-0 bg-background/25 dark:bg-background/50 flex flex-col justify-center items-start p-4 sm:p-6 md:p-8 lg:p-12">
      <h1
        className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3 md:mb-4"
        data-swiper-parallax="-500"
      >
        {title}
      </h1>
      <h2
        className="text-lg sm:text-xl md:text-2xl lg:text-3xl"
        data-swiper-parallax="-200"
      >
        {subtitle}
      </h2>
    </div>
  </div>
);

export default function Carousel() {
  const { slideContents } = useGlobalData();
  return (
    <div className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] mt-4 sm:mt-6 md:mt-8 overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl">
      <Swiper
        modules={[Autoplay, Parallax]}
        centeredSlides={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={1500}
        parallax={true}
        loop={true}
        allowTouchMove={false}
        className="w-full h-full"
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
