"use client";
import React, { useState, useEffect, useCallback } from "react";
import NextImage from "next/image";
import { useGlobalData } from "../Context/GlobalData";
import { useRouter } from "next/navigation";

const slides = [
  {
    imageSrc: "/images/hero-1.png",
    eyebrow: "New Season",
    title: "The Apex\nCollection",
    subtitle: "Luxury technology, effortlessly elevated",
    cta: "Explore Collection",
  },
  {
    imageSrc: "/images/hero-2.png",
    eyebrow: "Editorial",
    title: "Curated for\nthe Discerning",
    subtitle: "Precision crafted essentials for modern living",
    cta: "Shop the Edit",
  },
  {
    imageSrc: "/images/hero-3.png",
    eyebrow: "Premium",
    title: "Crafted with\nPrecision",
    subtitle: "Where innovation meets timeless sophistication",
    cta: "Discover Now",
  },
];

export default function Carousel() {
  const { isLoggedIn } = useGlobalData();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const DURATION = 6000;
  const TRANSITION = 800;

  const goToSlide = useCallback(
    (index: number) => {
      if (animating || index === activeIndex) return;
      setAnimating(true);
      setProgress(0);
      setTimeout(() => {
        setActiveIndex(index);
        setAnimating(false);
      }, TRANSITION);
    },
    [animating, activeIndex]
  );

  const nextSlide = useCallback(() => {
    const next = (activeIndex + 1) % slides.length;
    goToSlide(next);
  }, [activeIndex, goToSlide]);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(nextSlide, DURATION);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Progress bar
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(0);
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeIndex]);

  const slide = slides[activeIndex];

  return (
    <div className="relative w-full h-[92vh] min-h-[600px] overflow-hidden bg-black">
      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity"
          style={{
            opacity: i === activeIndex ? (animating ? 0 : 1) : 0,
            transitionDuration: `${TRANSITION}ms`,
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <NextImage
            src={s.imageSrc}
            alt={s.title}
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-20 px-8 md:px-16 lg:px-24 max-w-[1440px] mx-auto left-0 right-0">
        <div key={activeIndex} className="max-w-4xl">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-4 mb-6"
            style={{ animation: "fade-up 0.6s 0.1s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <div className="w-8 h-px bg-gold" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
              {slide.eyebrow}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-white mb-6"
            style={{ animation: "fade-up 0.7s 0.2s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            {slide.title.split("\n").map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <em className="not-italic text-gold-muted">{line}</em> : line}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            className="font-body text-sm md:text-base tracking-[0.1em] uppercase text-white/70 mb-10 max-w-md"
            style={{ animation: "fade-up 0.7s 0.35s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            {slide.subtitle}
          </p>

          {/* CTA */}
          <div
            className="flex items-center gap-6"
            style={{ animation: "fade-up 0.7s 0.45s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <button
              onClick={() => {
                document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
                router.push("/#collection");
              }}
              id="hero-cta-btn"
              className="group relative inline-flex items-center gap-4 bg-white text-black px-8 py-4 font-body text-xs tracking-[0.2em] uppercase font-medium overflow-hidden transition-all duration-300 hover:bg-gold hover:text-white dark:bg-zinc-900 dark:text-white dark:hover:bg-gold"
            >
              <span className="relative z-10">{slide.cta}</span>
              <span className="relative z-10 w-8 h-px bg-current inline-block group-hover:w-12 transition-all duration-300" />
            </button>

            {!isLoggedIn && (
              <button
                onClick={() => router.push("/login")}
                className="font-body text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-3"
              >
                <span className="w-4 h-px bg-current" />
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-8 right-8 md:right-16 lg:right-24 flex items-center gap-6">
          {/* Slide number */}
          <div className="font-body text-xs text-white/50 tracking-wider">
            <span className="text-white">{String(activeIndex + 1).padStart(2, "0")}</span>
            {" / "}
            {String(slides.length).padStart(2, "0")}
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                id={`hero-dot-${i}`}
                className="relative h-px overflow-hidden transition-all duration-300"
                style={{ width: i === activeIndex ? "32px" : "16px" }}
              >
                <div className="absolute inset-0 bg-white/30" />
                {i === activeIndex && (
                  <div
                    className="absolute inset-y-0 left-0 bg-gold"
                    style={{
                      width: `${progress}%`,
                      transition: "none",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-8 md:left-16 lg:left-24 flex flex-col items-center gap-2"
        style={{ animation: "fade-in 1s 1s both" }}
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-white/40 rotate-90 origin-center mb-8">
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-white/0 via-white/40 to-white/0 animate-pulse" />
      </div>
    </div>
  );
}
