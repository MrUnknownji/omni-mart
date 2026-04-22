"use client";
import React from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import { SlideContent } from "@/lib/types";
import { useGlobalData } from "../Context/GlobalData";

const CarouselSlide: React.FC<SlideContent> = ({
  imageSrc,
  title,
  subtitle,
}) => (
  <div className="swiper-slide relative w-full h-full">
    <Image
      className="object-cover object-center w-full h-full"
      src={imageSrc}
      alt={title}
      fill
      priority={true}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent flex flex-col justify-end items-center text-center pb-24 px-6">
      <h1 className="font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 tracking-tight text-foreground drop-shadow-sm max-w-4xl leading-tight">
        {title}
      </h1>
      <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-widest uppercase text-foreground/80 max-w-2xl">
        {subtitle}
      </h2>
    </div>
  </div>
);

export default function Carousel() {
  const { slideContents } = useGlobalData();
  return (
    <div className="w-full h-[60vh] md:h-[75vh] lg:h-[85vh] overflow-hidden relative group">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={1500}
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
